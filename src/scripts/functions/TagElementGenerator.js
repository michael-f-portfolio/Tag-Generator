import Product from "../models/Product.js";
import TagElement from "../models/TagElement.js";

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

	/**
	 * Accepts an array of products and returns a div containing TagElements element property.
	 * @param {[Product]} products An array of products.
	 * @param {Boolean} withBarcodes A boolean signifying whether barcodes will be generated, trimming product names to make them fit within the TagElement.
	 * @returns {HTMLDivElement} A div containing all the TagElements.
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
