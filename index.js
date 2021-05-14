const { APIMatric, propsBtn } = require("./APIMatric");
const promt = require("prompt");

let m_pin = "8264";
let api = new APIMatric("Mi Test");
const deckId = "7f18056c-7a2a-46ac-9956-662e7d0b78ec";
const pageId = "00d9c649-f2df-405f-abfd-06d38f8626be";
const demoCompletePageId = "b0a0b559-9e2c-42af-9c64-95951ef09cbd";

if (m_pin == "") api.Connect();
//Agregar el PIN que sale en MATIC Server usando:
api.setPIN(m_pin);

api.GetConnectedClients().then(() => {
	api.SetDeck(deckId, pageId);
	startDemo();
});

const redBtnId = "70158257-0124-4e3d-bc26-728a2d417109";
const yellowBtnId = "ba9a39d5-9cac-4d4e-94f0-b67fa0cbedc2";
const greenBtnId = "cf3cd93c-e43c-4649-9f47-5441555ca7ce";

const pageShieldWeaponId = "16856457-d2f8-405e-927e-749b1dc7d7ec";

async function startDemo() {
	await sleep(1000);
	api.SetButtonProperties(redBtnId, { backgroundcolorOff: "black" });
	api.SetButtonProperties(yellowBtnId, { backgroundcolorOff: "black" });
	api.SetButtonProperties(greenBtnId, { backgroundcolorOff: "green" });
	await sleep(1000);
	api.SetButtonProperties(redBtnId, { backgroundcolorOff: "black" });
	api.SetButtonProperties(yellowBtnId, { backgroundcolorOff: "yellow" });
	api.SetButtonProperties(greenBtnId, { backgroundcolorOff: "black" });
	await sleep(1000);
	api.SetButtonProperties(redBtnId, { backgroundcolorOff: "red" });
	api.SetButtonProperties(yellowBtnId, { backgroundcolorOff: "black" });
	api.SetButtonProperties(greenBtnId, { backgroundcolorOff: "black" });
	await sleep(1000);
	api.SetButtonProperties(redBtnId, { backgroundcolorOff: "black" });
	api.SetButtonProperties(yellowBtnId, { backgroundcolorOff: "black" });
	api.SetButtonProperties(greenBtnId, { backgroundcolorOff: "black" });
	await sleep(1000);

	shieldsWeapons();
}

async function shieldsWeapons() {
	let shieldsCriticalId = "2aadc834-56f7-49e7-93d0-e047f772e7f9";
	let shieldsPercentId = "9ec833c2-dd31-40a8-b919-ca332fb97b51";
	let ammoCountId = "ef59a421-e820-49e2-b223-b0efa9c95555";
	const gray = "#111111";

	api.SetActivePage(pageShieldWeaponId);
	//Simulate Battle
	let ammo = 500;
	let shield = 100;

	api.SetButtonProperties(shieldsCriticalId, {
		textcolorOff: "white",
		backgroundcolorOff: "black",
	});

	for (let i = 0; i < 100; i++) {
		if (shield < 30) {
			flashCriticalShield(i, shieldsCriticalId);

			api.SetButtonProperties(shieldsPercentId, {
				textcolorOff: "red",
				backgroundcolorOff: gray,
				text: shield,
			});
		} else if (shield < 50) {
			api.SetButtonProperties(shieldsPercentId, {
				textcolorOff: "yellow",
				backgroundcolorOff: gray,
				text: shield,
			});
		} else {
			api.SetButtonProperties(shieldsPercentId, {
				textcolorOff: "green",
				backgroundcolorOff: gray,
				text: shield,
			});
		}
		api.SetButtonProperties(ammoCountId, {
			textcolorOff: "white",
			backgroundcolorOff: gray,
			text: ammo,
		});

		shield--;
		ammo -= 5;
		await sleep(200);
	}
	await sleep(1000);
	api.SetActivePage(demoCompletePageId);
	await sleep(1000);
	api.Close();
}

function flashCriticalShield(i, shieldsCriticalId) {
	if (i % 5 == 0) {
		api.SetButtonProperties(shieldsCriticalId, {
			textcolorOff: "white",
			backgroundcolorOff: "black",
		});
	} else {
		api.SetButtonProperties(shieldsCriticalId, {
			textcolorOff: "black",
			backgroundcolorOff: "red",
		});
	}
}

function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}
