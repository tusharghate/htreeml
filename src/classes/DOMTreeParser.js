// Modules
const fs = require('fs');
const path = require('path');
const DOMTree = require('./DOMTree.js');

class DOMTreeParser {

	constructor() {

	}

	/**
	 * Reads and parses the HTML file to create the DOM Tree
	 *
	 * @param {String} file
	 * @return {Promise}
	 */
	parse(file) {
		return new Promise((resolve, reject) => {
			if (!file || path.extname(file) != '.html') {
				reject('Please provide valid HTML file.');
				return;
			}

			fs.readFile(file, 'utf-8', (err, html) => {
				if (err) {
					reject(err);
					return;
				}

				// Return the DOM Tree
				let domTree = new DOMTree(html);
				resolve(domTree);
			});
		});
	}
}

module.exports = DOMTreeParser;
