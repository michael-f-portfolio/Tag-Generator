export default class TagElement {
	constructor(product, withBarcode) {
		this.element = document.createElement("div");
		this.element.classList.add("tag");

		this.name = document.createElement("p");
		this.name.classList.add("name");
		// If using barcodes, check length of name and trim it if it is over 63 characters to avoid overflowing
		if (withBarcode) {
			if (product.name.toString().length <= 63) {
				this.name.textContent = product.name.toString();
			} else {
				this.name.textContent = product.name.toStringTrimmed();
			}
		} else {
			this.name.textContent = product.name.toString();
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

		this.name.classList.add(`category-${category}`);
		this.name.classList.add(`subCategory-${subCategory}`);

		this.element.appendChild(this.name);

		if (withBarcode) {
			this.SKUBarcode = document.createElement("img");
			this.SKUBarcode.id = `barcode-${product.SKU}`;
			this.SKUBarcode.classList.add("barcode");
			this.element.appendChild(this.SKUBarcode);
		}

		this.SKU = document.createElement("p");
		this.SKU.textContent = product.SKU;
		this.SKU.classList.add("sku");
		this.element.appendChild(this.SKU);
	}
}
