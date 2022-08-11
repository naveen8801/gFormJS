const path = require("path");
const google = require("@googleapis/forms");
const { authenticate } = require("@google-cloud/local-auth");

async function createForm(auth, object) {
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
		requestBody: object,
	});
	const createResponse = res.data;
	const id = res.data.formId;
	return createResponse;
	// const update = {
	// 	requests: [
	// 		{
	// 			createItem: {
	// 				item: {
	// 					title: "Homework video",
	// 					description: "Quizzes in Google Forms",
	// 					videoItem: {
	// 						video: {
	// 							youtubeUri: "https://www.youtube.com/watch?v=Lt5HqPvM-eI",
	// 						},
	// 					},
	// 				},
	// 				location: {
	// 					index: 0,
	// 				},
	// 			},
	// 		},
	// 	],
	// };
	// const updateResponse = await forms.forms.batchUpdate({
	// 	formId: createResponse.data.formId,
	// 	requestBody: update,
	// });
	// console.log(updateResponse.data);
	// return updateResponse.data;
}

if (module === require.main) {
	runSample().catch(console.error);
}
module.exports = createForm;
