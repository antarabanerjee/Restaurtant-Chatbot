const {ComponentDialog, WaterfallDialog, ChoicePrompt, ChoiceFactory, Dialog} = require('botbuilder-dialogs');
const {orderOnlineDialog} = require('../Constants/DialogIds');
const {CardFactory, MessageFactory, ActivityTypes} = require('botbuilder');
const { drinksOrder1, snacksOrder1, pizzaOrder1, orderDetails} = require('../Cards/cards');
const {v4: uuidv4} = require('uuid');

const config = require('../config/sqlconfigdb');
const sql = require('mssql');

const orderOnlineDialogWF1 = 'orderOnlineDialogWF1';
const ChoicePromptDialog = 'ChoicePromptDialog';

class OrderOnlineDialog extends ComponentDialog{
    
    constructor(conversationState){
        super(orderOnlineDialog);

        if(!conversationState) throw new Error('conversation state required');
        this.conversationState = conversationState;
        this.orderOnlineStateAccessor = this.conversationState.createProperty('OrderOnlineState');
        this.addDialog(new ChoicePrompt(ChoicePromptDialog))

        this.addDialog(new WaterfallDialog(orderOnlineDialogWF1, [
            this.pickFoodCategory.bind(this),
            this.selection.bind(this),
            this.confirmation.bind(this)
        ]));

        this.initialDialogId = orderOnlineDialogWF1;
    }

    async pickFoodCategory(stepContext) {
        await stepContext.context.sendActivity({ type: 'typing' });
        await stepContext.context.sendActivity('Please Pick a Food Category 👇');
       const heroCardResponse = await stepContext.context.sendActivity({
            attachments: [CardFactory.heroCard(
                null,
                null,
                CardFactory.actions([
                    {
                        type:'imBack',        //type of button
                        title: '🍕 Pizza',
                        value: '🍕 Pizza'
                    },
                    {
                        type:'imBack',
                        title: '🥤 Dessert & Drinks',
                        value: '🥤 Dessert & Drinks'
                    },
                    {
                        type:'imBack',
                        title: '🥪 Snacks Combo',
                        value:'🥪 Snacks Combo'               
                    }
                ])
            )]
        })
       const heroCardData = JSON.parse(heroCardResponse).content;
       return await stepContext.endDialog();
    }

    async selection(stepContext){

       if(stepContext.context.activity.text === '🍕 Pizza'){
        let pizzaCardArray = [];

        let pool = await sql.connect(config);
        let resultSet = await pool.request().query('SELECT * from pizza');
        
        //await pool.close();

        for(let i = 0; i< resultSet.recordset.length; i++){
            let pizzaid = resultSet.recordset[i].id;
            let pizzaname = resultSet.recordset[i].pizzaName;
            let pizzaprice = resultSet.recordset[i].price;
            let pizzaurl = resultSet.recordset[i].url;
            pizzaCardArray.push(CardFactory.adaptiveCard(pizzaOrder1(pizzaid, pizzaname, pizzaprice, pizzaurl)))
        }
        await stepContext.context.sendActivity({ type: 'typing' });
        await stepContext.context.sendActivity(MessageFactory.carousel(pizzaCardArray));

       }

       if(stepContext.context.activity.text === '🥤 Dessert & Drinks'){
        let drinksCardArray = [];

        let pool = await sql.connect(config);
        let resultSet = await pool.request().query('SELECT * from drinks');

        for(let i = 0; i< resultSet.recordset.length; i++){
            let drinksid = resultSet.recordset[i].id;
            let drinksname = resultSet.recordset[i].drinksName;
            let drinksprice = resultSet.recordset[i].price;
            let drinksurl = resultSet.recordset[i].url;
            drinksCardArray.push(CardFactory.adaptiveCard(drinksOrder1(drinksid,drinksname,drinksprice,drinksurl)))
        }
        
        await stepContext.context.sendActivity({ type: 'typing' });
        await stepContext.context.sendActivity(MessageFactory.carousel(drinksCardArray));
               
        }

        if(stepContext.context.activity.text === '🥪 Snacks Combo'){
         let snacksCardArray = [];

         let pool = await sql.connect(config);
         let resultSet = await pool.request().query('SELECT * from snacks');

         for(let i = 0; i< resultSet.recordset.length; i++){
            let snacksid = resultSet.recordset[i].id;
            let snacksname = resultSet.recordset[i].snacksName;
            let snacksprice = resultSet.recordset[i].price;
            let snacksurl = resultSet.recordset[i].url;
            snacksCardArray.push(CardFactory.adaptiveCard(snacksOrder1(snacksid,snacksname,snacksprice,snacksurl)))
         }
         
         await stepContext.context.sendActivity({ type: 'typing' });
         await stepContext.context.sendActivity(MessageFactory.carousel(snacksCardArray));

        }
        return Dialog.EndOfTurn;
        }

    async confirmation(stepContext){
        if(stepContext.context.activity.value.orderedornot === 'ordered'){
        const typingImage = 'https://designlibrary.sebgroup.com/ImageVault/publishedmedia/wbyjta3ylx06eo6zxnkl/animation-icon-fill-v5.gif'; // URL of the custom typing image
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
            text: "Thank you for ordering. Your order is confirmed!!"
        });

        const orderid = uuidv4();
        if(stepContext.context.activity.value.foodselect === 'drinksordered'){
           // const orderId = stepContext.context.activity.value.id;
            const foodName = stepContext.context.activity.value.name;
            const foodPrice = stepContext.context.activity.value.price;
        //    console.log("Id name price = ", orderId,foodName,foodPrice);
        let pool = await sql.connect(config);
        const query = `
        INSERT INTO onlineFoodOrdered (idOfFoodOrdered, foodName, foodPrice)
        VALUES (@idOfFoodOrdered, @foodName, @foodPrice)
        `;

        const result = await pool.request()
        .input('idOfFoodOrdered', sql.VarChar, orderid)
        .input('foodName', sql.VarChar, foodName)
        .input('foodPrice', sql.VarChar, foodPrice)
        .query(query);

        await stepContext.context.sendActivity({
            attachments: [CardFactory.adaptiveCard(orderDetails(orderid, foodName, foodPrice))]
          });
        }

        if(stepContext.context.activity.value.foodselect === 'pizzaordered'){
            // const orderId = stepContext.context.activity.value.id;
             const foodName = stepContext.context.activity.value.name;
             const foodPrice = stepContext.context.activity.value.price;
         //    console.log("Id name price = ", orderId,foodName,foodPrice);
         let pool = await sql.connect(config);
         const query = `
         INSERT INTO onlineFoodOrdered (idOfFoodOrdered, foodName, foodPrice)
         VALUES (@idOfFoodOrdered, @foodName, @foodPrice)
         `;
 
         const result = await pool.request()
         .input('idOfFoodOrdered', sql.VarChar, orderid)
         .input('foodName', sql.VarChar, foodName)
         .input('foodPrice', sql.VarChar, foodPrice)
         .query(query);
 
         await stepContext.context.sendActivity({
             attachments: [CardFactory.adaptiveCard(orderDetails(orderid, foodName, foodPrice))]
           });
         }
         
         if(stepContext.context.activity.value.foodselect === 'snacksordered'){
            // const orderId = stepContext.context.activity.value.id;
             const foodName = stepContext.context.activity.value.name;
             const foodPrice = stepContext.context.activity.value.price;
         //    console.log("Id name price = ", orderId,foodName,foodPrice);
         let pool = await sql.connect(config);
         const query = `
         INSERT INTO onlineFoodOrdered (idOfFoodOrdered, foodName, foodPrice)
         VALUES (@idOfFoodOrdered, @foodName, @foodPrice)
         `;
 
         const result = await pool.request()
         .input('idOfFoodOrdered', sql.VarChar, orderid)
         .input('foodName', sql.VarChar, foodName)
         .input('foodPrice', sql.VarChar, foodPrice)
         .query(query);
 
         await stepContext.context.sendActivity({
             attachments: [CardFactory.adaptiveCard(orderDetails(orderid, foodName, foodPrice))]
           });
         } 
    }
        return await stepContext.endDialog();
    }
}
module.exports.OrderOnlineDialog = OrderOnlineDialog;