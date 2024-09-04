import Tag from "./Tag.js";

export default class TagElement {
	constructor(tag) {
		this.element = document.createElement("div");
		this.element.classList.add("tag");

		this.name = document.createElement("p");
		this.name.textContent = tag.productName;
		this.name.classList.add("name");

		this.name.classList.add(`category-${tag.category.replace(/\s/g, "-")}`);
		this.name.classList.add(
			`subCategory-${tag.subCategory.replace(/\s/g, "-")}`
		);

		this.element.appendChild(this.name);

		this.SKU = document.createElement("p");
		this.SKU.textContent = tag.SKU;
		this.SKU.classList.add("sku");
		this.element.appendChild(this.SKU);
	}
}
