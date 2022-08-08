const path = require("path");
const google = require("@googleapis/forms");
const { authenticate } = require("@google-cloud/local-auth");

async function createForm(auth) {
	const forms = google.forms({
		version: "v1",
		auth: auth,
	});
	const newForm = {
		info: {
			title: "Creating a new form in Node",
		},
	};
	const res = await forms.forms.create({
		requestBody: newForm,
	});
	return res.data;
}

if (module === require.main) {
	runSample().catch(console.error);
}
module.exports = createForm;
