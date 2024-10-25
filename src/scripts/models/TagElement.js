import Product from "./Product.js";

export default class TagElement {
	/**
	 * Creates a TagElement based on the supplied Product data.
	 * @param {Product} product A single Product object containing data the Tag Element will display.
	 * @param {boolean} withBarcodes If true, will trim the Product Name of a product when creating Tag Elements to make room for the barcode.
	 */
	constructor(product, withBarcodes) {
		/**
		 * The actual HTMLDivElement to be added to the DOM.
		 */
		this.element = document.createElement("div");
		this.element.classList.add("tag");

		const name = document.createElement("p");
		name.classList.add("name", "lh-1");
		// If using barcodes, check length of name and trim it if it is over 63 characters to avoid overflowing
		if (withBarcodes) {
			if (product.name.toString().length <= 63) {
				name.textContent = product.name.toString();
			} else {
				name.textContent = product.name.toStringTrimmed();
			}
		} else {
			name.textContent = product.name.toString();
		}

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
