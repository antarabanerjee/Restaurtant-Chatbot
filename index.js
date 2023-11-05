require('dotenv').config();
//importing express
const express = require('express');
const sql = require('mssql');
const config = require('./config/sqlconfigdb');

//import botbuilder
const {BotFrameworkAdapter, ConversationState, MemoryStorage} = require('botbuilder');
const {BotActivityHandler} =require('./BotActivityHandler');
const { RootDialog } = require('./Dialogs/RootDialog');

const app = express();
app.use(express.json());

//adapter init 
const adapter = new BotFrameworkAdapter({
    appId: process.env.appId,
    appPassword: process.env.appPassword
})

//adapter error handler
adapter.onTurnError = async (context,error) => {
    console.log('Error occurred =>', error);
    //send a message to user about error
    await context.sendActivity('Bot encountered an error.');
}

//create server 
app.listen(process.env.PORT || process.env.port || 3978, () => {
    console.log('Listening to port 3978...');
});

const memory = new MemoryStorage();
let conversationState = new ConversationState(memory);

const rootDialog = new RootDialog(conversationState);  
//activity handler object
const mainBot = new BotActivityHandler(conversationState, rootDialog);


app.post('/api/messages', async(req, res) => {
    adapter.processActivity(req, res, async(context) => {
        await mainBot.run(context);
    })
})