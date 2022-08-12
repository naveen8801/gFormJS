#!/usr/bin/env node
"use strict";
const React = require("react");
const importJsx = require("import-jsx");
const { render } = require("ink");
const meow = require("meow");

const ui = importJsx("./ui");

const cli = meow(`
gformjs --help

	Description :
		Create google forms directly from terminal very easily

	Usage :
		Step 1 : gformjs
		Step 2 : Select form 2 options Create Form or Check Form Responses
		Step 3 : Type FormJson file path while creating and formID while gettting form responses
		Step 4 : That's it 🚀
`);

render(React.createElement(ui, cli.flags));
