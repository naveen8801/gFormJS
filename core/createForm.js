const path = require("path");
const google = require("@googleapis/forms");
const { authenticate } = require("@google-cloud/local-auth");

async function runSample(query) {
	const authClient = await authenticate({
		keyfilePath: path.join(__dirname, "../credentials.json"),
		scopes: "https://www.googleapis.com/auth/drive",
	});
	const forms = google.forms({
		version: "v1",
		auth: authClient,
	});
	const newForm = {
		info: {
			title: "Creating a new form in Node",
		},
	};
	const res = await forms.forms.create({
		requestBody: newForm,
	});
	console.log(res.data);
	return res.data;
}

if (module === require.main) {
	runSample().catch(console.error);
}
module.exports = runSample;
