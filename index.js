#!/usr/bin/env node --harmony

var program = require('commander');

var DOMTree = require('./src/classes/DOMTree.js');

program
	.version('0.0.1')
	
	.arguments('<file>')
	
	.action(function(file) {
		
		// Do something.
		var domTree = new DOMTree(file);
	
	})

	.parse(process.argv);