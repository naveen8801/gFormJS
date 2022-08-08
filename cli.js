#!/usr/bin/env node
"use strict";
const React = require("react");
const importJsx = require("import-jsx");
const { render } = require("ink");
const meow = require("meow");

const ui = importJsx("./ui");

const cli = meow(
	`
	Description:
	  	Create google forms directly from terminal very easily
`
);

render(React.createElement(ui, cli.flags));
