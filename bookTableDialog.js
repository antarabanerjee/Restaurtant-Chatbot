const {ComponentDialog, WaterfallDialog, NumberPrompt, Dialog, ChoicePrompt, ChoiceFactory, TextPrompt} = require('botbuilder-dialogs');
const {CardFactory} = require('botbuilder');
const {bookTableDialog} = require('../Constants/DialogIds');
const {confirmcheck, reservation} = require('../Cards/cards');
const {v4: uuidv4} = require('uuid');

const config = require('../config/sqlconfigdb');
const sql = require('mssql');

const bookTableDialogWF1 = 'bookTableDialogWF1';
const NumberPromptDialog = 'NumberPromptDialog';
const TextPromptDialog = 'TextPromptDialog';



class BookTableDialog extends ComponentDialog{
    
    constructor(conversationState){
        super(bookTableDialog);  //this is the name which we call from rootdialog

        if(!conversationState) throw new Error('conversation state required');
        
        this.conversationState = conversationState;
        this.bookTableStateAccessor = this.conversationState.createProperty('BookTableState');
      

        this.addDialog(new NumberPrompt(NumberPromptDialog))
        this.addDialog(new TextPrompt(TextPromptDialog))
      

        this.addDialog(new WaterfallDialog(bookTableDialogWF1, [
            this.askforperson.bind(this),
            this.askdate.bind(this),
            this.asktime.bind(this),
            this.checktime.bind(this),
            this.confirm.bind(this),
            this.cardsvalidate.bind(this),
           this.finalvalidate.bind(this)
        ]));

        this.initialDialogId = bookTableDialogWF1;
    }

    async askforperson(stepContext){
      let dialogData = await this.bookTableStateAccessor.get(stepContext.context,{});
      if(stepContext.options && stepContext.options.person){
        dialogData.person = stepContext.options.person;  
        return stepContext.next();
      }
      else {
        return await stepContext.prompt(NumberPromptDialog, 'How many people would you like to book for?')
      }
    }

    async askdate(stepContext){
      let dialogData = await this.bookTableStateAccessor.get(stepContext.context);
    //  dialogData.person = stepContext.result; 
      
      if(stepContext.options && stepContext.options.date){
        dialogData.date = stepContext.options.date;
        return stepContext.next();
      }
      else {
        dialogData.person = stepContext.result; 
      }

      if(dialogData.person < 8){
        return await stepContext.prompt(TextPromptDialog, 'Please type the date, about when should we book your table.')
     }
      
       else {
          await stepContext.context.sendActivity("Sorry, you cannot book a table for more than 8 persons. Try again and continue with the booking!")
          await stepContext.endDialog();
          return await stepContext.beginDialog(bookTableDialogWF1);
        }      
      
    }   
    async asktime(stepContext){
      let dialogData = await this.bookTableStateAccessor.get(stepContext.context);
     // dialogData.date = stepContext.result; 

      if(stepContext.options && !stepContext.options.date){
        dialogData.date = stepContext.result; 
      }

      return await stepContext.prompt(TextPromptDialog, 'Please mention the time during which you want to book.')
    }

    async checktime(stepContext){
      let dialogData = await this.bookTableStateAccessor.get(stepContext.context);
      dialogData.timecheck = stepContext.result;
      //console.log(stepContext.context.activity);

      let pool = await sql.connect(config);
      const resultSet = await pool.request()
      .input('time', sql.VarChar, dialogData.timecheck)
      .query('SELECT COUNT(*) AS count FROM timeAvailable WHERE availableTimeSlots = @time');

      const count = resultSet.recordset[0].count;
  
      if(count > 0) {
      await stepContext.context.sendActivity(`The time ${dialogData.timecheck} is available.`);
      //  dialogData.timecheck = stepContext.result;
        return await stepContext.next();
      // return stepContext.endDialog();
    }
      else {
        await stepContext.context.sendActivity(`Sorry, the time ${dialogData.timecheck} is not available. Please select a different time.`);
        delete stepContext.context.activity.text;
      //  await stepContext.prompt(TextPromptDialog, 'Please mention the time during which you want to book.');
      await stepContext.endDialog();  
      return await stepContext.beginDialog(bookTableDialog, {
          person: dialogData.person,
          date: dialogData.date
        });
      
      }
  }

    async confirm(stepContext){
       let dialogData = await this.bookTableStateAccessor.get(stepContext.context);
       dialogData.time = dialogData.timecheck;
      //  console.log("Time= ",stepContext.result);
      // console.log("Activity= ", stepContext.context.activity);
      //console.log(dialogData.time);
       
      await stepContext.context.sendActivity({
        attachments: [CardFactory.adaptiveCard(confirmcheck(dialogData.person, dialogData.date,dialogData.time))
        ]
      });
    return await stepContext.next();
}
    async cardsvalidate(stepContext){
      const heroCardResponse = await stepContext.context.sendActivity({
        attachments: [CardFactory.heroCard(
            'Do you want to continue?',
            ["https://speque.com/Posts/TitleImages/5-advantages-of-a-table-booking-management-system-for-restaurants.jpg"],
            CardFactory.actions([
                {
                    type:'imBack',        //type of button
                    title: 'Confirm',
                    value: 'Confirm'
                },
                {
                    type:'imBack',
                    title: 'Lets try again',
                    value:'Lets try again'
                }
            ])
        )]
    })
    const heroCardData = JSON.parse(heroCardResponse).content;
    return await stepContext.endDialog();
  }

    async finalvalidate(stepContext){
      let dialogData = await this.bookTableStateAccessor.get(stepContext.context);
      let bookingid = uuidv4();
      if(stepContext.context.activity.text === 'Confirm'){
         await stepContext.context.sendActivity({
          attachments: [CardFactory.adaptiveCard(reservation(dialogData.person, dialogData.date,dialogData.time, bookingid))
          ]
        });
      }
      else {
        await stepContext.endDialog();
        await stepContext.beginDialog(bookTableDialogWF1);
      }
    
      let pool = await sql.connect(config);
      const query = `
      INSERT INTO bookingTableDetails (totalPerson, date, time, bookingid)
      VALUES (@totalPerson, @date, @time, @bookingId)
    `;

    const result = await pool.request()
      .input('totalPerson', sql.Int, dialogData.person)
      .input('date', sql.VarChar, dialogData.date)
      .input('time', sql.VarChar, dialogData.time)
      .input('bookingId', sql.VarChar, bookingid)
      .query(query);

      return await stepContext.endDialog();
    }
}

module.exports.BookTableDialog = BookTableDialog;