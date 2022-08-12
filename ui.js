"use strict";
const React = require("react");
const { Text, Box, Static, Newline } = require("ink");
const { useEffect, useState } = require("react");
const createForm = require("./core/createForm");
const Gradient = require("ink-gradient");
const BigText = require("ink-big-text");
const { default: SelectInput } = require("ink-select-input");
const GoogleAuth = require("./core/GoogleAuth");
const { default: TextInput } = require("ink-text-input");
const { default: Spinner } = require("ink-spinner");
const getFormSchema = require("./FormFormat");
const fs = require("fs");
const formSchema = require("./core/FormJsonSchema");
const Ajv = require("ajv");
const ajv = new Ajv();
const validate = ajv.compile(formSchema);

const PathHandler = ({ FilePath, mainStep, setMainStep }) => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState({ err: false, msg: "" });
	const [jsonData, setJsonData] = useState(null);
	const [url, setUrl] = useState(null);

	useEffect(async () => {
		if (FilePath) {
			setLoading(true);
			await fs.readFile(FilePath, "utf8", async (err, jsonString) => {
				if (err) {
					setError({ err: true, msg: `"File read failed:", ${err}` });
					setLoading(false);
				} else {
					let data = JSON.parse(jsonString);
					let NewReq = [];
					for (let i = 0; i < data.items.length; i++) {
						const obj = {
							createItem: {
								item: { ...data.items[i] },
								location: {
									index: 0,
								},
							},
						};
						NewReq.push(obj);
					}
					const valid = validate(data);
					if (!valid) {
						console.log(validate.errors[0].message);
						setError({ err: true, msg: validate.errors[0].message });
						setJsonData(null);
						setLoading(false);
					} else {
						const auth = await GoogleAuth();
						const url = await createForm(auth, data.info, NewReq);
						setUrl(url);
						setJsonData(data);
						setLoading(false);
					}
				}
			});
		}
	}, []);

	return (
		<>
			{loading ? (
				<Text color="green">
					<Spinner type="dots" /> Creating your form through your file
				</Text>
			) : (
				<>
					{error.err ? (
						<Text color="red">{error.msg}</Text>
					) : (
						<>
							{jsonData ? (
								<>
									<Text color="green" bold>
										Title :
									</Text>
									<Text>{jsonData.info.title}</Text>
									<Newline />
									<Text color="green" bold>
										Document Title :
									</Text>
									<Text>{jsonData.info.documentTitle}</Text>
									<Newline />
									<Text color="green" bold>
										Description :
									</Text>
									<Text>{jsonData.info.description}</Text>
									<Newline />
									<Text color="green" bold>
										Items :
									</Text>
									{jsonData.items &&
										jsonData.items.map((item, i) => (
											<Box key={i} flexDirection="column">
												<Text>{item.title}</Text>
												<Text>{item.description}</Text>
												<Newline />
											</Box>
										))}
								</>
							) : null}
							{url ? (
								<Box flexDirection="column">
									<Text color="green" bold>
										Form created successfully with follwing url :)
									</Text>
									<Text color="blue" bold>
										{url}
									</Text>
								</Box>
							) : null}
						</>
					)}
				</>
			)}
		</>
	);
};

const SeeResponse = () => {
	return <Text>Responses</Text>;
};

const CreateForm = ({ mainStep, setMainStep }) => {
	const [FilePath, setFilePath] = useState("");
	const [loading, setLoading] = useState(false);
	const [showPrompt, setShowPrompt] = useState(true);
	const [error, setError] = useState({ err: false, msg: "" });
	const onSubmitHandler = async () => {
		setLoading(true);
		setShowPrompt(false);
		const check = await exists(FilePath);
		if (!isNaN(FilePath) || !check) {
			setLoading(false);
			setShowPrompt(true);
			setError({ err: true, msg: "Plese input a valid path" });
			return;
		} else {
			setLoading(true);
			setShowPrompt(false);
			setError({ err: false, msg: "" });
			setMainStep(2);
		}
	};

	async function exists(path) {
		const res = fs.existsSync(path);
		return res;
	}

	return (
		<>
			{mainStep === 1 ? (
				<>
					{showPrompt ? (
						<>
							<Text color="green">
								Enter absolute path of your form json file :{" "}
							</Text>
							<TextInput
								value={FilePath}
								onChange={setFilePath}
								onSubmit={onSubmitHandler}
							/>
						</>
					) : null}
					{loading ? (
						<Text color="green">
							<Spinner type="dots" /> Loading...
						</Text>
					) : null}
					{error.err ? <Text color="red">{error.msg}</Text> : null}
				</>
			) : (
				<PathHandler FilePath={FilePath} />
			)}
		</>
	);
};

const App = ({ login = false }) => {
	const [currentStage, setCurrentStage] = useState(0);
	const [mainStep, setMainStep] = useState(0);
	const handleSelect = (item) => {
		setCurrentStage(item.value);
		setMainStep(1);
	};

	const items = [
		{
			label: "Create Google Form",
			value: 1,
		},
		{
			label: "See Responses",
			value: 2,
		},
	];

	return (
		<Box borderStyle="single" marginRight={2} flexDirection="column">
			<Gradient name="summer">
				<BigText text="google-formjs" align="center" font="chrome" />
			</Gradient>
			{currentStage == 0 ? (
				<SelectInput items={items} onSelect={handleSelect} />
			) : currentStage === 1 ? (
				<CreateForm mainStep={mainStep} setMainStep={setMainStep} />
			) : (
				<SeeResponse mainStep={mainStep} setMainStep={setMainStep} />
			)}
		</Box>
	);
};

module.exports = App;
