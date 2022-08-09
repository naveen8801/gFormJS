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

const QuestionJourney = ({ quesCount }) => {
	return <Text>{quesCount}</Text>;
};

const SeeResponse = () => {
	return <Text>Responses</Text>;
};

const CreateForm = ({ mainStep, setMainStep }) => {
	const [quesCount, setQuesCount] = useState("");
	const [loading, setLoading] = useState(false);
	const [showPrompt, setShowPrompt] = useState(true);
	const [error, setError] = useState({ err: false, msg: "" });
	const onSubmitHandler = () => {
		setLoading(true);
		setShowPrompt(false);
		if (
			isNaN(quesCount) ||
			parseInt(quesCount) > 5 ||
			parseInt(quesCount) === 0
		) {
			setLoading(false);
			setShowPrompt(true);
			setError({ err: true, msg: "Plese input a number between 1 and 5" });
			return;
		} else {
			setLoading(true);
			setShowPrompt(false);
			setError({ err: false, msg: "" });
			setMainStep(2);
		}
	};
	return (
		<>
			{mainStep === 1 ? (
				<>
					{showPrompt ? (
						<>
							<Text color="green">Enter No. of Questions :</Text>
							<TextInput
								value={quesCount}
								onChange={setQuesCount}
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
				<QuestionJourney quesCount={parseInt(quesCount)} />
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
				<BigText text="gFormJS" align="center" font="chrome" />
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
