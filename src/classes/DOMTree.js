/**
 * DOMTree
 * Represents the DOM tree of DOM elements
 *
 * {String} html - The raw HTML that makes up this tree
 * {Array<DOMTag>} tags - The DOM tags that make up this tree
 * {DOMElement} rootElement - The root DOM element that makes up this tree
 */

// Modules
const fs = require('fs');
const colors = require('colors');
const DOMTag = require('./DOMTag.js');
const DOMElement = require('./DOMElement.js');

// Constants
const REG_EXP_PATTERNS = {
	htmlTag: /<(\w+)>|<\/(\w+)>/g
};

class DOMTree {

	constructor(html) {
		const self = this;

		self.html = html;
		self.tags = [];
		self.rootElement;

		self.build();
	}

	/**
	 * Builds the DOM tree
	 */
	build() {
		const self = this;

		self.buildTags();
		self.buildTree();
	}

	/**
	 * Builds all of the tags (in order) that make up this DOM tree
	 *
	 * @param {String} html
	 */
	buildTags(html) {
		const self = this;

		let tagMatches = self.html.match(REG_EXP_PATTERNS.htmlTag);

		for (let [index, tag] of tagMatches.entries()) {
			self.tags.push(new DOMTag(tag, index));
		}
	}

	/**
	 * Traverses through the DOM tags and builds the tree
	 *
	 * @param {DOMElement} element
	 */
	buildTree(element) {
		const self = this;

		// If this tree has no root, lets set it
		if (!self.rootElement) {
			self.rootElement = new DOMElement(self.tags[0]);
			return self.buildTree(this.rootElement);
		}

		// Start iterating from the current tag onwards
		let tags = self.tags.slice(element.tag.index + 1);

		for (let tag of tags) {

			// Found matching closing tag, stop adding children
			if (tag.isClosing() && tag.name === element.tag.name) {
				return;
			}

			// Found child element, add to element's children and then traverse the child element
			if (!tag.isClosing() && !tag.parent) {

				// Set parent of tag
				tag.parent = element.tag.name;

				// Add child element
				let childElement = new DOMElement(tag);
				element.children.push(childElement);

				// Traverse through child element
				self.buildTree(childElement);
			}
		}

		return;
	}

	/**
	 * Draws the tree
	 *
	 * @param {DOMElement} element
	 * @param {Integer} depth
	 */
	draw(element, depth = 0) {
		const self = this;
		let el = element || self.rootElement;

		if (!el) {
			console.log(colors.red.bold('Tree must have a root element!'));
			return;
		}

		// Add depth
		let padding = '';
		for (var i = 0; i < depth; i++) {
			padding += ' │ ';
		}

		// Draw element
		console.log(colors.gray.dim(padding) + colors.gray(' ├ ') + colors.green.bold(el.tag.name));

		// Draw element's children
		for (let [index, child] of el.children.entries()) {
			self.draw(child, depth + 1);
		}

		return;
	}
}

module.exports = DOMTree;
