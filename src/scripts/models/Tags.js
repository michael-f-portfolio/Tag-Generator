import Tag from "./Tag.js";

export default class Tags {
	/**
	 *
	 * @param {Array<Tag>} tags
	 */
	constructor(tags) {
		this.tags = [];
		if (tags) {
			this.tags.push(tags);
		}
	}

	/**
	 *
	 * @param {Tag} tag
	 */
	appendTag(tag) {
		this.tags.push(tag);
	}
}
