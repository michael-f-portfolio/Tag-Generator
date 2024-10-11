import Product from "../models/Product.js";
import TagElement from "../models/TagElement.js";
import csvParser from "./helpers/csvParser.js";
import fileInputReader from "./helpers/fileInputReader.js";

/**
 * Generates a DIV containing TagElements from a PurchaseOrder.csv via the generateTags() method.
 */
export default class TagElementGenerator {
	constructor() {
		/**
		 * A flag determining whether the generator has successfully generated.
		 */
		this.hasGenerated = false;

		/**
		 * A flag determining if the file to be uploaded is different than the
		 * previously uploaded file.
		 */
		this.newUpload = false;

		/**
		 * A string containing the file name of the Purchase Order.
		 */
		this.currentFile = "";

		/**
		 * An object containing the current configured set of options.
		 */
		this.options = {
			withBarcodes: false,
			withSummary: false,
		};
	}

	setOptions(options) {
		this.options = options;
	}

	async generateTags(files) {
		const parsedData = await this.readAndParsePurchaseOrder(files);
		const products = this.createProducts(parsedData);
		const tagContainer = this.createTagElementContainer(products);
		return tagContainer;
	}

	async readAndParsePurchaseOrder(files) {
		const data = await fileInputReader(files);
		if (data) {
			const parsedData = csvParser(data);
			return parsedData;
		} else {
			console.log("readAndParsePurchaseOrder() - No data received");
		}
	}

	/**
	 * Accepts parsed data from a purchase order and returns an array of Products.
	 * @param {string} parsedData A string of parsed data
	 * @returns {[Product]} An array of Products
	 */
	createProducts(parsedData) {
		const products = [];
		parsedData = parsedData.data.slice(15);
		for (let i = 0; i < parsedData.length; i++) {
			const item = parsedData[i];
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
		return products;
	}

	/**
	 * Accepts an array of products and returns a div containing TagElements element property.
	 * @param {[Product]} products An array of products
	 * @returns {HTMLDivElement} A div containing all the TagElements
	 */
	createTagElementContainer(products, withBarcodes) {
		const tagElementContainer = document.createElement("div");
		tagElementContainer.id = "tag-container";
		if (products.length > 0) {
			products.forEach((product) => {
				tagElementContainer.appendChild(new TagElement(product, withBarcodes).element);
			});
		}
		return tagElementContainer;
	}
}
