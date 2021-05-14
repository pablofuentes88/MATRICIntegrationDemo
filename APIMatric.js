const udp = require("dgram");
const client = udp.createSocket("udp4");

const APILOG = "APILOG >>";

let hasClientData = false;
let m_clientData;

client.on("message", (msg, remote) => {
	let str = msg.toString();
	if (!hasClientData) {
		m_clientData = JSON.parse(str)[0];
		hasClientData = true;
	}
	console.log(APILOG, "Answer from MATRIC Server: ");
	console.log(JSON.parse(str));
});

class APIMatric {
	/**
	 *
	 * @param {(appName : string)} appName
	 */
	constructor(appName) {
		this.appName = appName;
		console.log(APILOG, appName);
	}

	/**
	 * @param {(appPIN: string) => void} appPIN
	 */
	setPIN(appPIN) {
		this.appPIN = appPIN;
		console.log(APILOG, appPIN);
	}

	Connect() {
		let msg = {
			command: "CONNECT",
			appName: this.appName,
		};
		UDPSend(msg);
	}

	async GetConnectedClients() {
		let msg = {
			command: "GETCONNECTEDCLIENTS",
			appName: this.appName,
			appPIN: this.appPIN,
		};
		UDPSend(msg);
		await sleep(300);
	}

	Close() {
		client.close();
	}

	SetDeck(deckId, pageId) {
		let msg = {
			command: "SETDECK",
			appName: this.appName,
			appPIN: this.appPIN,
			clientId: m_clientData.clientId,
			deckId: deckId,
			pageId: pageId,
		};

		UDPSend(msg);
	}

	SetActivePage(pageId) {
		let msg = {
			command: "SETACTIVEPAGE",
			appName: this.appName,
			appPIN: this.appPIN,
			clientId: m_clientData.clientId,
			pageId: pageId,
		};

		UDPSend(msg);
	}

	SetButtonProperties(buttonId, props) {
		let msg = {
			command: "SETBUTTONPROPS",
			appName: this.appName,
			appPIN: this.appPIN,
			clientId: m_clientData.clientId,
			buttonId: buttonId,
			//buttonName: "RED",
			data: {
				imageOff: null,
				imageOn: null,
				textcolorOn: null,
				textcolorOff: null,
				backgroundcolorOn: null,
				backgroundcolorOff: null,
				fontSize: null,
				text: null,
			},
		};
		Object.assign(msg.data, props);

		UDPSend(msg);
	}
}

function UDPSend(msg) {
	client.send(JSON.stringify(msg), 50300, "localhost", (err) => {
		if (err) client.close();
		else {
			//console.log(APILOG, "Message to send: ");
			//console.log(APILOG, msg);
		}
	});
}

function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

const propsBtn = {
	imageOff: null,
	imageOn: null,
	textcolorOn: null,
	textcolorOff: null,
	backgroundcolorOn: null,
	backgroundcolorOff: null,
	fontSize: null,
	text: null,
};

module.exports.APIMatric = APIMatric;
module.exports.propsBtn = propsBtn;
