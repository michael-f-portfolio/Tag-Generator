import Products from "../models/Products.js";
import TagElement from "../models/TagElement.js";

/**
 * Generates a TagElementContainer Div containing TagElements parsed from a PurchaseOrder.csv via the generateTags() method.
 */
export default class TagElementContainerGenerator {
	/**
	 * Instantiates a new TagElementContainerGenerator which can be used to generate a TagElementContainer
	 * which contains TagElements.
	 * @param {Products} products A Products object which contains a list of data which will be used to create the Tag Elements.
	 * @param {boolean} withBarcodes If true, will trim the Product Name of a product when creating Tag Elements to make room for the barcode.
	 */
	constructor(products, withBarcodes) {
		this.products = products;
		this.withBarcodes = withBarcodes;
		this.tagElementContainer = document.createElement("div");
		this.tagElementContainer.id = "tag-container";
	}

	getTagElementContainer() {
		return this.tagElementContainer;
	}

	/**
	 * Accepts an array of products and returns a div containing TagElements element property.
	 * @returns {HTMLDivElement} A div containing all the TagElements.
	 */
	createTagElementContainer() {
		if (!this.products.isEmpty) {
			this.createSortedTagElementContainer();
		} else {
			console.error("cannot create tag elements, no products supplied.");
		}
	}

	/**
	 * Appends TagElements to the tagElementContainer based on data from the
	 * products.sortedCategoryContainer object.
	 */
	createSortedTagElementContainer() {
		// beverages
		this.products.sortedCategoryContainer.beverages.forEach((product) => {
			this.tagElementContainer.appendChild(
				new TagElement(product, this.withBarcodes).element
			);
		});
		// concentrates
		this.products.sortedCategoryContainer.concentrates.forEach((product) => {
			this.tagElementContainer.appendChild(
				new TagElement(product, this.withBarcodes).element
			);
		});
		// edibles
		if (this.products.options.sortEdibles) {
			// optional chocolate
			this.products.sortedCategoryContainer.edibles.chocolates.forEach((product) => {
				this.tagElementContainer.appendChild(
					new TagElement(product, this.withBarcodes).element
				);
			});
			// optional gummy
			this.products.sortedCategoryContainer.edibles.gummies.forEach((product) => {
				this.tagElementContainer.appendChild(
					new TagElement(product, this.withBarcodes).element
				);
			});
		} else {
			// or all unsorted
			this.products.sortedCategoryContainer.edibles.unsorted.forEach((product) => {
				this.tagElementContainer.appendChild(
					new TagElement(product, this.withBarcodes).element
				);
			});
		}
		// flower
		//// eighth
		this.products.sortedCategoryContainer.flower.eighths.forEach((product) => {
			this.tagElementContainer.appendChild(
				new TagElement(product, this.withBarcodes).element
			);
		});
		//// quarter
		this.products.sortedCategoryContainer.flower.quarters.forEach((product) => {
			this.tagElementContainer.appendChild(
				new TagElement(product, this.withBarcodes).element
			);
		});
		//// half
		this.products.sortedCategoryContainer.flower.halves.forEach((product) => {
			this.tagElementContainer.appendChild(
				new TagElement(product, this.withBarcodes).element
			);
		});
		//// ounce
		this.products.sortedCategoryContainer.flower.ounces.forEach((product) => {
			this.tagElementContainer.appendChild(
				new TagElement(product, this.withBarcodes).element
			);
		});
		// prerolls
		//// non infused
		this.products.sortedCategoryContainer.prerolls.nonInfused.forEach((product) => {
			this.tagElementContainer.appendChild(
				new TagElement(product, this.withBarcodes).element
			);
		});
		//// infused
		this.products.sortedCategoryContainer.prerolls.infused.forEach((product) => {
			this.tagElementContainer.appendChild(
				new TagElement(product, this.withBarcodes).element
			);
		});
		// capsules, oils and topicals
		this.products.sortedCategoryContainer.capsulesOilsTopicals.forEach((product) => {
			this.tagElementContainer.appendChild(
				new TagElement(product, this.withBarcodes).element
			);
		});
		// vaporizers
		if (this.products.options.sortVaporizers) {
			// optional cartridges
			this.products.sortedCategoryContainer.vaporizers.cartridges.forEach((product) => {
				this.tagElementContainer.appendChild(
					new TagElement(product, this.withBarcodes).element
				);
			});
			// optional pods
			this.products.sortedCategoryContainer.vaporizers.pods.forEach((product) => {
				this.tagElementContainer.appendChild(
					new TagElement(product, this.withBarcodes).element
				);
			});
			// optional disposable
			this.products.sortedCategoryContainer.vaporizers.disposables.forEach((product) => {
				this.tagElementContainer.appendChild(
					new TagElement(product, this.withBarcodes).element
				);
			});
		} else {
			// or all unsorted
			this.products.sortedCategoryContainer.vaporizers.unsorted.forEach((product) => {
				this.tagElementContainer.appendChild(
					new TagElement(product, this.withBarcodes).element
				);
			});
		}
		// all others
		this.products.sortedCategoryContainer.other.forEach((product) => {
			this.tagElementContainer.appendChild(
				new TagElement(product, this.withBarcodes).element
			);
		});
	}
}
