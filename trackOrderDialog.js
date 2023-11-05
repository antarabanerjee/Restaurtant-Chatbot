const {ComponentDialog, WaterfallDialog, TextPrompt} = require('botbuilder-dialogs');
const {CardFactory, MessageFactory, ActivityTypes} = require('botbuilder');
const {trackOrderDialog} = require('../Constants/DialogIds');
const {orderstatus} = require('../Cards/cards');

const config = require('../config/sqlconfigdb');
const sql = require('mssql');

const trackOrderDialogWF1 = 'trackOrderDialogWF1';
const TextPromptDialog = 'TextPromptDialog';

class TrackOrderDialog extends ComponentDialog{
    constructor(conversationState){
        super(trackOrderDialog);

        if(!conversationState) throw new Error('conversation state required');
        this.conversationState = conversationState;
        this.trackOrderStateAccessor = this.conversationState.createProperty('TrackOrderState');
        
        this.addDialog(new TextPrompt(TextPromptDialog));
        this.addDialog(new WaterfallDialog(trackOrderDialogWF1, [
            this.askorderid.bind(this),
            this.idexistsornot.bind(this),
            this.fetchstatus.bind(this)
        ]));

        this.initialDialogId = trackOrderDialogWF1;
    }

    async askorderid(stepContext){
        return await stepContext.prompt(TextPromptDialog,`Please enter your order id.`);
    }

    async idexistsornot(stepContext){
        let dialogData = await this.trackOrderStateAccessor.get(stepContext.context,{});
        dialogData.idexists = stepContext.result;
        console.log(dialogData.idexists);
        let pool = await sql.connect(config);
         const resultSet = await pool.request()
        .input('idOfFoodOrdered', sql.VarChar, dialogData.idexists)
        .query('SELECT COUNT(*) AS count FROM onlineFoodOrdered WHERE idOfFoodOrdered = @idOfFoodOrdered');

        const count = resultSet.recordset[0].count;
        if(count > 0) {
            console.log("order id exists");
            return await stepContext.next();
        }
        else {
            console.log("order not found");
            return await stepContext.endDialog();
        }
    }

    async fetchstatus(stepContext){
        let dialogData = await this.trackOrderStateAccessor.get(stepContext.context);

        let pool = await sql.connect(config);
        const resultSet = await pool.request()
        .input('idOfFoodOrdered', sql.VarChar, dialogData.idexists)
        .query('SELECT Status, TimeStamp FROM OrderStatus WHERE OrderId = @idOfFoodOrdered ORDER BY TimeStamp DESC');

        const recordset = resultSet.recordset;
        console.log("Recordset= ", recordset);
        if(recordset.length > 0) {
            console.log("order status fetched");
            let orderStatus = recordset[0].Status;
            let orderTimestamp = recordset[0].TimeStamp;
            
            // Format the timestamp
            let formattedTimestamp = orderTimestamp.toLocaleString();
            // Send the order status to the user
            await stepContext.context.sendActivity({
                attachments: [CardFactory.adaptiveCard(orderstatus(dialogData.idexists, orderStatus, formattedTimestamp))
                ]
              });
          //  await stepContext.context.sendActivity(`The current status of your order (${dialogData.idexists}) is "${orderStatus}". It was last updated on ${formattedTimestamp}.`);
        }
        else {
            console.log("order status not found");
            await stepContext.context.sendActivity(`Sorry, we couldn't find the status of the order with the id "${dialogData.idexists}". Please try again later.`);
        }

        return await stepContext.endDialog();
    }
}

module.exports.TrackOrderDialog = TrackOrderDialog;