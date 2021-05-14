# MATRICIntegrationDemo

API and demo make it in Node.js

```javascript
const { APIMatric } = require("apimatric");
const api = new APIMatric("NameOfYourApplication");
api.Connect();
```

**MATRIC Server show you a PIN, save it!**

> You can read this PIN later in the MATRIC Server in Settings/API Integration.

## INSTALL

This is a [Node.js](https://nodejs.org/en/) module available through the [npm registry](https://www.npmjs.com/).

Before installing, [download and install Node.js](https://nodejs.org/en/download/). Node.js 0.10 or higher is required.

Installation is done using the [`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

`$ npm install apimatric --save`

## USER MANUAL

- Set the PIN
  `api.setPIN("YourMATIC Server PIN");`

- GetConnectedClients
  `api.GetConnectedClients();`

- SetDeck.- Parameters **deckId** and **pageId**
  `api.SetDeck(deckId, pageId);`

- SetActivePage.- Parameters **pageId**
  `api.SetActivePage(pageID)`

- SetButtonProperties.- Parameters **buttonId** and **props**
  - props.
    - imageOff
    - imageOn
    - textcolorOn
    - textcolorOff
    - backgroundcolorOn
    - backgroundcolorOff
    - fontSize
    - text

```javascript
api.SetButtonProperties(buttonId, {
	backgroundcolorOff: "red",
	text: "Fire",
});
```

- Close.- Close the client connection.
  `api.Close();`
