const path = require("path");
const google = require("@googleapis/forms");
const { authenticate } = require("@google-cloud/local-auth");

const formID = "<YOUR_FORM_ID>";

async function getFormResponse(auth, formID) {
	const forms = google.forms({
		version: "v1",
		auth: auth,
	});
	const res = await forms.forms.get({ formId: formID });
	console.log(res.data);
	return res.data;
}

if (module === require.main) {
	runSample().catch(console.error);
}
module.exports = getFormResponse;
