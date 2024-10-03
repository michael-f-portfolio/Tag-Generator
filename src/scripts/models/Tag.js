import Product from "./Product.js";

export default class Tag {
	/**
	 *
	 * @param {Product} product
	 */
	constructor(product) {
		if (product.name.toString().length <= 63) {
			this.productName = product.name.toString();
		} else {
			this.productName = product.name.toStringTrimmed();
		}
		this.category = product.category;
		this.subCategory = product.subCategory;
		this.SKU = product.SKU;
	}
}
