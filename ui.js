"use strict";
const React = require("react");
const { Text, Box } = require("ink");
const { useEffect } = require("react");
const runSample = require("./core/createForm");
const Gradient = require("ink-gradient");
const BigText = require("ink-big-text");

const App = ({ name = "Stranger" }) => {
	// useEffect(() => {
	// 	runSample();
	// }, []);

	return (
		<>
			<Text color="green" font="chrome">
				Welcome !
			</Text>
			<Gradient name="summer">
				<BigText text="gFormJS" align="center" font="chrome" />
			</Gradient>
		</>
	);
};

module.exports = App;
