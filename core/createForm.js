const path = require("path");
const google = require("@googleapis/forms");
const { authenticate } = require("@google-cloud/local-auth");

async function createForm(auth, info, reqList) {
	const forms = google.forms({
		version: "v1",
		auth: auth,
	});
	const newForm = {
		info: {
			title: info.title,
		},
	};

	const res = await forms.forms.create({
		requestBody: newForm,
	});

	const createResponse = res.data;
	const id = res.data.formId;

	const update = {
		requests: reqList,
	};
	const updateResponse = await forms.forms.batchUpdate({
		formId: id,
		requestBody: update,
	});
	return createResponse.responderUri;
}

if (module === require.main) {
	runSample().catch(console.error);
}
module.exports = createForm;
