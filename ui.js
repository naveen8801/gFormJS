"use strict";
const React = require("react");
const { Text, Box } = require("ink");
const { useEffect, useState } = require("react");
const createForm = require("./core/createForm");
const Gradient = require("ink-gradient");
const BigText = require("ink-big-text");
const { default: SelectInput } = require("ink-select-input");
const GoogleAuth = require("./core/GoogleAuth");

const App = ({ login = false }) => {
	const [currentStage, setCurrentStage] = useState(0);
	git s
	const handleSelect = (item) => {
		setCurrentStage(item.value);
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
				<Text>Creating</Text>
			) : (
				<Text>Looking</Text>
			)}
		</Box>
	);
};

module.exports = App;
