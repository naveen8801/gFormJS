"use strict";
const React = require("react");
const { Text, Box } = require("ink");
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

const PathHandler = ({ FilePath, mainStep, setMainStep }) => {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState({ err: false, msg: "" });

	return (
		<>
			{loading ? (
				<Text color="green">
					<Spinner type="dots" /> Creating your form through your file
				</Text>
			) : (
				<>
					<Text color="green">{FilePath}</Text>
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
