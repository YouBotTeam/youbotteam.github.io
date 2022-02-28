# youbotteam.github.io

# youbotteam.github.io

Configuration web-chat:

```
{
 "custom": {
   "autoFocusOnInput": true,
   "baseUrl": "https://weai.it/service/",
   "clearCacheOnRefresh": true,
   "color": {
     "message": {
       "bot": {
         "backgroundColor": "#5556d3",
         "color": "#fff"
       },
       "user": {
         "backgroundColor": "#101f42",
         "color": "#ffffff"
       }
     },
     "primary": "#7617e6",
     "sendButton": "#5c1aad",
     "title": {
       "color": "#fff"
     },
     "subTitle": {
       "color": "#fff"
     }
   },
   "enableClickOnImage": true,
   "mainButtonDimension": {
     "height": "5rem",
     "width": "5rem"
   },
   "project_id": null,
   "section": {
     "attachments": {
       "accept": "image/png, image/jpeg",
       "show": true,
       "intentTrigger": "/welcome"
     },
     "autocomplete": {
       "enable": false
     },
     "buttonMenu": {
       "enable": true
     },
     "feedback": {
       "enable": true,
       "title": "Lascia un feedback"
     },
     "pillole": {
       "disableButton": false,
       "enable": false,
       "enableFullScreen": false,
       "filename": "config-pillole.json"
     },
     "popup": {
       "show": true,
       "text": "Clicca sul bottone per inziare la chat"
     },
     "resetChat": {
       "enable": true
     },
     "widget": {
       "width": "80%"
     }
   }
 },
 "token": "",
 "webchat": {
   "customData": {
     "language": "it"
   },
   "docViewer": false,
   "elementTriggerResetChat": {
     "elementRef": "reset-chat",
     "typeOfEvent": "click"
   },
   "hideWhenNotConnected": true,
   "initPayload": "/welcome",
   "inputTextFieldHint": "Scrivi la tua richiesta...",
   "openAutomatically": false,
   "profileAvatar": "https://firebasestorage.googleapis.com/v0/b/youaistudio.appspot.com/o/YouAI_onlyicon.svg?alt=media&token=789f9be9-5fe7-4e56-96cc-2af5ac9fa295",
   "selector": "#webchat",
   "showBadge": true,
   "showFullScreenButton": true,
   "socketPath": "/socket.io/",
   "socketUrl": "https://demo.weai.it",
   "storage": "session",
   "subtitle": "YouAi",
   "title": "Assistente Virtuale"
 }
}
```
