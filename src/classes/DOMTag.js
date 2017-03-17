/**
 * DOMTag
 * Represents a tag of a HTML DOM element
 *
 * {Integer} index - The position of the tag relative to other tags
 * {String} tag - The raw tag in all of it's glory
 * {String} name - The name of the tag
 * {String} parent - The name of this tag's parent tag
 */

class DOMTag {

	constructor(tag, index) {
		this.index = index;
		this.tag = tag;
		this.name = tag.replace(/(<)|(>)|(\/)/g, '');
		this.parent = null;
	}

	/**
	 * Returns true if this is a closing tag
	 *
	 * @return Boolean
	 */
	isClosing() {
		return this.tag.indexOf("/") != -1;
	}

}

module.exports = DOMTag;
