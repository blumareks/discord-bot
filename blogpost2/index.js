const Discord = require('discord.js');
const client = new Discord.Client();
const AssistantV2 = require('ibm-watson/assistant/v2'); //Watson Assistant
const { IamAuthenticator } = require('ibm-watson/auth'); //Watson Auth

const ASSISTANT_ID= process.env.assistantId; //from UI
const ASSISTANT_URL=process.env.assistantUrl; //service-credentials-blog
const ASSISTANT_APIKEY=process.env.apiKey; //service-credentials-blog
const ASST_API_VERSION = '2020-05-04';  

const assistantId = ASSISTANT_ID;
let assistant = false;
if (assistantId) {
  let url;
  let disableSSL = false;
  let auth;

  try {
    auth = new IamAuthenticator({ apikey: ASSISTANT_APIKEY });
    url = ASSISTANT_URL; 
  } catch (e) {
    console.log(e.result.stringify);
  }


  assistant = new AssistantV2({
    version: ASST_API_VERSION,
    authenticator: auth,
    url: url,
    disableSslVerification: disableSSL,
  });
}
var text = 'no text' // the response text from Watson Assistant

async function getMessage(request, sessionId) {
  assistant.message(
    {
      input: { text: request },
      assistantId: ASSISTANT_ID,
      sessionId: sessionId
    })
    .then(response => {
      console.log("successful call");
      console.log("text0: " + JSON.stringify(response.result, null, 2)); //an entire response from the service
      text =  JSON.stringify(response.result.output.generic[0].text, null, 2); //pass the value to the global variable
      return JSON.stringify(response.result.output.generic[0].text, null, 2);
    })
    .catch(err => {
      console.log("unsuccessful call");
      console.log(err);
      return error.stringify;
    });
}

async function callAssistant(request) {
  try {
    const sessionId = (await assistant.createSession({ assistantId: assistantId })).result.session_id;
    const responseText = (await getMessage(request, sessionId));
    return responseText;
  } catch (error) {
    console.error(error);
  }
}
 
//test
//console.log("text1: " + callAssistant("Ping"));

const Token = process.env.token;

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

const regexPrefix = new RegExp('blu*');

client.on('message', msg => {
  //regexp for a key word 'blu*'
  if (regexPrefix.test(msg.content)) {
    //connecting to Watson Assistant here
    callAssistant(msg.content.substring(3));
    msg.reply(text);
  }
});

client.login(Token);
