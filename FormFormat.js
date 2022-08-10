const getFormSchema = () => {
	return {
		formId: "",
		info: {
			title: "",
			documentTitle: "",
			description: "",
		},
		items: [
			{
				itemId: "",
				title: "",
				description: "",
				questionItem: {
					questionId: "",
					required: true,
					choiceQuestion: {
						type: "RADIO CHECKBOX DROP_DOWN",
						options: [
							{
								value: "",
							},
						],
						shuffle: false,
					},
					textQuestion: {
						paragraph: true,
					},
				},
			},
		],
		settings: {},
		revisionId: "",
		responderUri: "",
		linkedSheetId: "",
	};
};

module.exports = getFormSchema;
