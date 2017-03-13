class DOMTag {
	
	constructor(tag, index) {
		this.tag = tag;
		this.index = index;
		this.parent = null;
		this.depth = null;
		this.name = tag.replace(/(<)|(>)|(\/)/g, '');
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