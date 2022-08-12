const formSchema = {
	$id: "/gform",
	type: "object",
	properties: {
		info: {
			type: "object",
			properties: {
				title: { type: "string" },
				documentTitle: { type: "string" },
				description: { type: "string" },
			},
		},
		items: {
			type: "array",
			properties: {
				title: { type: "string" },
				documentTitle: { type: "string" },
				questionItem: {
					type: "object",
					properties: {
						question: {
							type: "object",
							properties: {
								required: { type: "boolean" },
								textQuestion: {
									type: "object",
									properties: {
										paragraph: { type: "boolean" },
									},
								},
							},
						},
					},
				},
			},
		},
	},
	required: ["info", "items"],
};

module.exports = formSchema;
