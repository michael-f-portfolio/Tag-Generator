/**
 * * The product info, typically in the following order:
 *      The sellable product name.
 *      Strain Type.
 *      The size of the Product.
 *
 * WIP due to extreme naming inconsistencies between producers and product types.
 * Will need a lot of hand written logic to correctly split the name, strain type and size
 * based on the products category and subcategory and which producer it is.
 */
export default class ProductInfo {
	constructor(name) {
		this.sellableProductName = "";
		this.strainType = "";
		this.productSize = "";
	}
}
