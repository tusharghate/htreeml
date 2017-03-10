// Modules
const fs = require('fs');
const util = require('util');
const DOMTag = require('./DOMTag.js');
const DOMElement = require('./DOMElement.js');

// Constants
const regExpPatterns = {
	htmlTag: /<(\w+)>|<\/(\w+)>/g
};

class DOMTree {
	
	constructor(file) {
		this.tags = [];
		this.rootElement;
		
		this.parseHTML(file);
	}
	
	/**
	 * Reads and parses the HTML file
	 *
	 * @param {String} file
	 */
	parseHTML(file) {
		const self = this;
		
		fs.readFile(file, 'utf-8', (err, html) => {
			if (err) throw err;
			
			self.html = html;
			self.tags = self.getTags();
			
			self.build();
			console.log(self.tags);
			self.draw();
		});
	}
	
	/**
	 * Returns all of the tags (in order) that make up this DOM tree
	 * 
	 * @return {Array<DOMTag>}
	 */
	getTags() {
		const self = this;
		
		let tagMatches = self.html.match(regExpPatterns.htmlTag),
			tags = [];
		
		for (let [index, tag] of tagMatches.entries()) {
			tags.push(new DOMTag(tag, index));
		}
				
		return tags;
	}
	
	/**
	 * Traverses through the DOM tags and builds the tree
	 * 
	 * @param {DOMElement} [element]
	 */
	build(element) {	
		const self = this;
														
		// If this tree has no root, lets set it 
		if (!self.rootElement) {
			self.rootElement = new DOMElement(self.tags[0]);
			return self.build(this.rootElement);
		}
										
		// Find children
		for (let tag of self.tags.slice(element.tag.index + 1)) {
			 // console.log("    Tag:", tag.tag);
			
			// Found matching closing tag, stop adding children
			if (tag.isClosing() && tag.name === element.tag.name) {
				// console.log("    Found closing tag for Element:", element.tag.name);
				return;
			}
			
			// Found child element, add to element's children and then traverse the child element
			if (!tag.isClosing() && 
				!tag.parent &&
				tag.name != self.rootElement.tag.name &&
				tag.name != element.tag.name) {
				
				// console.log("    Found child " + tag.name + " for element " + element.tag.name);
				
				tag.parent = element.tag;
				// console.log("    Setting parent of " + tag.name + " to " + element.tag.name);
				
				let childElement = new DOMElement(tag);
				element.children.push(childElement);
				
				self.build(childElement);
			}
		}
				
		return;
	}
	
	draw(element) {
		const self = this;
		console.log(util.inspect(self.rootElement, false, null));
	}
}

module.exports = DOMTree;