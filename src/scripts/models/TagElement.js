import Product from "./Product.js";

export default class TagElement {
	/**
	 * Creates a TagElement based on the supplied Product data.
	 * @param {Product} product A single Product object containing data the Tag Element will display.
	 */
	constructor(product, tagOptions) {
		/**
		 * The actual HTMLDivElement to be added to the DOM.
		 */
		this.element = document.createElement("div");
		this.element.classList.add("tag");
		if (tagOptions.withBarcodes) {
			this.element.classList.add("with-barcode");
		}
		if (tagOptions.tagSize === "large") {
			this.element.classList.add("tag-large");
		}

		const name = document.createElement("p");
		name.classList.add("name", "lh-1");
		if (!tagOptions.displayCategoryColors) {
			name.classList.add("background-color-transparent");
		}
		name.textContent = product.name.toString(tagOptions.withBarcodes);

		//// sanitize category and sub-category
		let category = product.category;
		let subCategory = product.subCategory;

		// remove all whitespace - " "
		category = category.replace(/\s/g, "-");
		subCategory = subCategory.replace(/\s/g, "-");

		// remove all ampersands - "&"
		category = category.replace("&", "and");
		subCategory = subCategory.replace("&", "and");

		name.classList.add(`category-${category}`);
		name.classList.add(`subCategory-${subCategory}`);

		this.element.appendChild(name);

		const SKUBarcode = document.createElement("img");
		SKUBarcode.id = `barcode-${product.SKU}`;
		SKUBarcode.classList.add("barcode");
		this.element.appendChild(SKUBarcode);

		const SKU = document.createElement("p");
		SKU.textContent = product.SKU;
		SKU.classList.add("sku", "lh-1");
		this.element.appendChild(SKU);
	}
}
