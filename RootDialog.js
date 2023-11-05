const {ComponentDialog, DialogSet, DialogTurnStatus, WaterfallDialog, } = require('botbuilder-dialogs');
const {rootDialog, orderOnlineDialog, bookTableDialog, cancelBookingDialog, trackOrderDialog} = require('../Constants/DialogIds');
const {OrderOnlineDialog, BookTableDialog, CancelBookingDialog, TrackOrderDialog} = require('./index');

const parseMessage = 'parseMessage';
const config = require('../config/sqlconfigdb');
const sql = require('mssql');

class RootDialog extends ComponentDialog {

    constructor(conversationState){
        super(rootDialog);

        if(!conversationState) throw new Error('conversation state required');
        this.conversationState = conversationState;

        this.addDialog(new WaterfallDialog(parseMessage, [
            this.routeMessage.bind(this)
        ]));

        this.addDialog(new OrderOnlineDialog(conversationState))
        this.addDialog(new BookTableDialog(conversationState))
        this.addDialog(new CancelBookingDialog(conversationState))
        this.addDialog(new TrackOrderDialog(conversationState))

        this.initialDialogId = parseMessage;
    }

    async run(context, accessor){
        try {
          const dialogSet = new DialogSet(accessor); //to hold the dialogs we require dialog set
          dialogSet.add(this);    //this refers to current reference object
          const dialogContext = await dialogSet.createContext(context); //memory that is created for this dialog set
          const results = await dialogContext.continueDialog();
          if(results && results.status === DialogTurnStatus.empty){  //if bot do not have any state or is not in a middle of conversation
            await dialogContext.beginDialog(this.id);     //then just begin whatever initial id is in the current instance
        }
        else{
            console.log('Dialog stack is empty'); 
        } 
        }
        catch(error){
            console.log(error);
        }
    }

    async routeMessage(stepContext){
        switch(stepContext.context.activity.text.toLowerCase()){
            case 'order food online':
                return await stepContext.beginDialog(orderOnlineDialog);
               
            case 'book a table':
                return await stepContext.beginDialog(bookTableDialog);

            case 'cancel booking':
                return await stepContext.beginDialog(cancelBookingDialog);
            
            case 'track your order':
                return await stepContext.beginDialog(trackOrderDialog);
            default:
                await stepContext.context.sendActivity('Please refresh your query');
        }
        return await stepContext.endDialog();
    }
}

module.exports.RootDialog = RootDialog;