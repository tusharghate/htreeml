#!/usr/bin/env node --harmony

let program = require('commander');
let DOMTreeParser = require('./src/classes/DOMTreeParser.js');

process.on('unhandledRejection', console.log.bind(console));

program
	.version('0.0.1')
	
	.arguments('<file>')
	
	.action(function(file) {
		let domTreeParser = new DOMTreeParser();
		
		domTreeParser
			.parse(file)
			.then(function(domTree) {
				domTree.draw();
			}, (err) => {
				console.error("Uh oh! Unable to build DOM Tree due to:", err);
			});
	})

	.parse(process.argv);