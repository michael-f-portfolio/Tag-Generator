import Product from "./Product.js";

export default class Tag {
	/**
	 *
	 * @param {Product} product
	 */
	constructor(product) {
		this.productName = product.name;
		this.category = product.category;
		this.subCategory = product.subCategory;
		this.SKU = product.SKU;
	}
}
