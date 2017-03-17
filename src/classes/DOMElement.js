/**
 * DOMElement
 * Represents a HTML DOM element and it's children elements
 *
 * {DOMTag} tag - The DOM tag that makes up this element
 * {Array<DOMElement>} children - The children elements of this element
 */

class DOMElement {

	constructor(tag) {
		this.tag = tag;
		this.children = [];
	}
}

module.exports = DOMElement;
