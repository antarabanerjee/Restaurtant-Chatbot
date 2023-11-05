const {ActivityHandler, CardFactory} =require('botbuilder');
// const sql = require('mssql');
// const config = require('./config/sqlconfigdb');

class BotActivityHandler extends ActivityHandler {
    constructor(conversationState, rootDialog){
        super();

        if(!conversationState) throw new Error ("conversation state required.");
        this.conversationState = conversationState;
        this.rootDialog = rootDialog;
        this.accessor = this.conversationState.createProperty('DialogAccessor');

        this.onMessage(async (context, next) => {
            if(context.activity.text === 'hi' || context.activity.text === 'Hi' || context.activity.text === 'HI'){
                await context.sendActivity({ type: 'typing' });
                await context.sendActivity({
                    attachments: [CardFactory.adaptiveCard({
                        "type": "AdaptiveCard",
                        "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
                        "version": "1.3",
                        "body": [
                            {
                                "type": "TextBlock",
                                "text": "Welcome to La Pizzario🍕",
                                "wrap": true,
                                "fontType": "Default",
                                "size": "Medium",
                                "weight": "Bolder",
                                "color": "Accent",
                                "isSubtle": false
                            },
                            {
                                "type": "Container",
                                "items": [
                                    {
                                        "type": "Image",
                                        "url": "https://media.istockphoto.com/id/938742222/photo/cheesy-pepperoni-pizza.jpg?s=612x612&w=0&k=20&c=D1z4xPCs-qQIZyUqRcHrnsJSJy_YbUD9udOrXpilNpI="
                                    }
                                ]
                            },
                            {
                                "type": "TextBlock",
                                "text": "Hi there!😍 \n\n My name is Maria and I am your assistant for today, you can order your favourite pizzas, book a table at the restaurant and track your order with just a few taps.",
                                "wrap": true,
                                "size": "Medium",
                                "weight": "Bolder",
                                "color": "Accent"
                            }
                        ]
                    })]
                }); 

                await context.sendActivity({
                    attachments: [CardFactory.heroCard(
                        'Use the buttons below to find out more',
                        null,
                        CardFactory.actions([
                            {
                                type:'imBack',        //type of button
                                title: '🍕Order Food Online',
                                value: 'Order Food Online'
                            },
                            {
                                type:'imBack',
                                title: '🪑Book a Table',
                                value:'Book a Table'
                            },
                            {
                                type:'imBack',
                                title: '📍Track your Order',
                                value:'Track your Order'               
                            },
                            {
                                type:'imBack',
                                title: 'Cancel Booking',
                                value: 'Cancel Booking'               
                                
                            }
                        ])
                    )]
                })
            }
            else{
                await this.rootDialog.run(context, this.accessor);
            }
           
            await next();
        });

        this.onConversationUpdate(async (context, next) => {
            if(context.activity.membersAdded && context.activity.membersAdded[1].id == context.activity.from.id){
                await stepContext.context.sendActivity({ type: 'typing' });
                await context.sendActivity({
                    attachments: [CardFactory.adaptiveCard({
                        "type": "AdaptiveCard",
                        "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
                        "version": "1.3",
                        "body": [
                            {
                                "type": "TextBlock",
                                "text": "Welcome to La Pizzario🍕",
                                "wrap": true,
                                "fontType": "Default",
                                "size": "Medium",
                                "weight": "Bolder",
                                "color": "Accent",
                                "isSubtle": false
                            },
                            {
                                "type": "Container",
                                "items": [
                                    {
                                        "type": "Image",
                                        "url": "https://media.istockphoto.com/id/938742222/photo/cheesy-pepperoni-pizza.jpg?s=612x612&w=0&k=20&c=D1z4xPCs-qQIZyUqRcHrnsJSJy_YbUD9udOrXpilNpI="
                                    }
                                ]
                            },
                            {
                                "type": "TextBlock",
                                "text": "Hi there!😍 \n\n My name is Joy and I am your assistant for today, you can order your favourite pizzas, book a table at the restaurant and track your order with just a few taps.",
                                "wrap": true,
                                "size": "Medium",
                                "weight": "Bolder",
                                "color": "Dark"
                            }
                        ]
                    })]
                });

                await context.sendActivity({
                    attachments: [CardFactory.heroCard(
                        'Use the buttons below to find out more 👇',
                        null,
                        CardFactory.actions([
                            {
                                type:'imBack',        //type of button
                                title: '🍕Order Food Online',
                                value: 'Order Food Online'
                            },
                            {
                                type:'imBack',
                                title: '🪑Book a Table',
                                value:'Book a Table'
                            },
                            {
                                type:'imBack',
                                title: '📍Track your Order',
                                value:'Track your Order'               
                            }
                        ])
                    )]
                })
            }
            
            await next();
        })
    }

    async run(context){
     await super.run(context);
     await this.conversationState.saveChanges(context, false)       
    }
}

module.exports.BotActivityHandler =BotActivityHandler;