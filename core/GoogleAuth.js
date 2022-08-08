const path = require("path");
const google = require("@googleapis/forms");
const { authenticate } = require("@google-cloud/local-auth");

async function GoogleAuth() {
	const authClient = await authenticate({
		keyfilePath: path.join(__dirname, "../credentials.json"),
		scopes: "https://www.googleapis.com/auth/drive",
	});

	return authClient;
}

if (module === require.main) {
	GoogleAuth().catch(console.error);
}
module.exports = GoogleAuth;
