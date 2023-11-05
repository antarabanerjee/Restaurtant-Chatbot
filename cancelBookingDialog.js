const {ComponentDialog, WaterfallDialog} = require('botbuilder-dialogs');
const {CardFactory, MessageFactory, ActivityTypes} = require('botbuilder');
const {cancelBookingDialog} = require('../Constants/DialogIds');
const {alreadyreserved} = require('../Cards/cards');

const config = require('../config/sqlconfigdb');
const sql = require('mssql');

const cancelBookingDialogWF1 = 'cancelBookingDialogWF1';

class CancelBookingDialog extends ComponentDialog{
    constructor(conversationState){
        super(cancelBookingDialog);

        if(!conversationState) throw new Error('conversation state required');
        this.conversationState = conversationState;
        this.cancelTableStateAccessor = this.conversationState.createProperty('CancelTableState');
        
        this.addDialog(new WaterfallDialog(cancelBookingDialogWF1, [
            this.bookingdetails.bind(this),
            this.cancel.bind(this),
            this.final.bind(this)
        ]));

        this.initialDialogId = cancelBookingDialogWF1;
    }

    async bookingdetails(stepContext){
       
        let pool = await sql.connect(config);
        let resultSet = await pool.request().query("SELECT * from bookingTableDetails");

        for(let i = (resultSet.recordset.length - 1); i< resultSet.recordset.length; i++){
        let numofperson = resultSet.recordset[i].totalPerson;
        let date = resultSet.recordset[i].date;
        let time = resultSet.recordset[i].time;
        let id = resultSet.recordset[i].bookingid;
        
        
        await stepContext.context.sendActivity({
            attachments: [CardFactory.adaptiveCard(alreadyreserved(numofperson, date, time, id))]
          });
        }
        return await stepContext.next();
    }

    async cancel(stepContext){
       
        const heroCardResponse = await stepContext.context.sendActivity({
            attachments: [CardFactory.heroCard(
                'Are you sure you want to cancel your booking reservation?',
                null,
                CardFactory.actions([
                    {
                        type:'imBack',        //type of button
                        title: 'Yes, cancel the entire booking',
                        value: 'Yes, cancel the entire booking'
                    },
                    {
                        type:'imBack',
                        title: "No, I don't want to cancel",
                        value:"No, I don't want to cancel"
                    }
                ])
            )]
        })
        const heroCardData = JSON.parse(heroCardResponse).content;
        return await stepContext.next();
    }

    async final(stepContext){
        if(stepContext.context.activity.text === 'Yes, cancel the entire booking'){
        
        const typingImage = 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif?20151024034921'; // URL of the custom typing image
        const message = { 
            type: ActivityTypes.Message, 
            attachments: [{ 
                contentType: 'image/gif', 
                contentUrl: typingImage 
            }] 
        }; 
        let loadingID = await stepContext.context.sendActivity(message);
        loadingID = loadingID.id; 
        // this is for testing waiting
        await new Promise(resolve => setTimeout(resolve, 3000)); 
        await stepContext.context.updateActivity({ 
            id: loadingID, 
            type: 'message', 
            text: "Your reservation booking has been cancelled."
        });

        let pool = await sql.connect(config);
        let resultSet = await pool.request().query("SELECT * from bookingTableDetails");
        for(let i = (resultSet.recordset.length - 1); i< resultSet.recordset.length; i++){
            let id = resultSet.recordset[i].bookingid;
            //console.log("id= ", id);
            await pool.request().query(`DELETE FROM bookingTableDetails WHERE bookingid = '${id}'`);
        }

    }
        else {
             await stepContext.sendActivity("Your reservation booking was not cancelled.")
        }
    return await stepContext.endDialog();
    }
    }




module.exports.CancelBookingDialog = CancelBookingDialog;