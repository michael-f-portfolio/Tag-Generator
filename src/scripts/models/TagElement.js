import Tag from "./Tag.js";

export default class TagElement {
	constructor(tag) {
		this.element = document.createElement("div");
		this.element.classList.add("tag");

		this.name = document.createElement("p");
		this.name.textContent = tag.productName;
		this.name.classList.add("name");

		//// sanitize category and sub-category
		let category = tag.category;
		let subCategory = tag.subCategory;

		// remove all whitespace
		category = category.replace(/\s/g, "-");
		subCategory = subCategory.replace(/\s/g, "-");

		// remove all ampersands
		category = category.replace("&", "and");
		subCategory = subCategory.replace("&", "and");

		this.name.classList.add(`category-${category}`);
		this.name.classList.add(`subCategory-${subCategory}`);

		this.element.appendChild(this.name);

		this.SKUBarcode = document.createElement("img");
		this.SKUBarcode.id = `barcode-${tag.SKU}`;
		this.SKUBarcode.classList.add("barcode");
		this.element.appendChild(this.SKUBarcode);

		this.SKU = document.createElement("p");
		this.SKU.textContent = tag.SKU;
		this.SKU.classList.add("sku");
		this.element.appendChild(this.SKU);
	}
}
