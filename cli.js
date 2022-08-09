#!/usr/bin/env node
"use strict";
const React = require("react");
const importJsx = require("import-jsx");
const { render } = require("ink");
const meow = require("meow");

const ui = importJsx("./ui");

const cli = meow(`

	Description :
    	Create google forms directly from terminal very easily

	Usage :
		Step 1 : $ gformJS
		Step 2 : Select form 2 options Create Form or Check Form Responses
		Step 3 : Type no. of question if creating a form
`
);

render(React.createElement(ui, cli.flags));
