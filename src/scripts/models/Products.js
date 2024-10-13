import Product from "./Product.js";

/**
 * Contains a list of Products and metadata regarding the state of said products
 */
export default class Products {
	constructor() {
		this.parsedData = null;
		this.toArray = [Product];
		this.isEmpty = this.toArray.length === 0;
		this.isCategorized = false;
		this.isAlphabetized = false;
	}

	setParsedData(parsedData) {
		this.parsedData = parsedData;
	}

	/**
	 * Accepts parsed data from a purchase order and stores it in an array as a local property.
	 * @param {string} parsedData A string of parsed data
	 */
	createProducts() {
		if (this.parsedData) {
			const products = [];
			this.parsedData = this.parsedData.data.slice(15);
			for (let i = 0; i < this.parsedData.length; i++) {
				const item = this.parsedData[i];
				// PapaParse adds entries for blank spaces so we're not going to include those
				if (item[0] !== "") {
					const product = new Product(
						item[0], // SKU
						item[1], // Name
						item[2], // Package Reference
						item[3], // Category
						item[4], // Subcategory
						item[5], // Ordered Quantity
						item[6], // Current Quantity
						item[7], // Unit Cost
						item[8] // Total Cost
					);
					products.push(product);
				}
			}
			this.toArray = products;
		} else {
			console.error("No parsed data to create products from.");
		}
	}
}
