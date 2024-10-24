import Product from "./Product.js";

/**
 * Contains a list of Products and metadata regarding the state of said products
 */
export default class Products {
	constructor(parsedData, options) {
		this.parsedData = parsedData || null;
		this.toArray = [Product];
		this.isEmpty = this.toArray.length === 0;
		this.sortedCategoryContainer = {
			beverage: [],
			concentrate: [],
			edible: {
				unsorted: [],
				chocolate: [],
				gummy: [],
			},
			flower: {
				eighth: [],
				quarter: [],
				half: [],
				ounce: [],
			},
			preroll: {
				nonInfused: [],
				infused: [],
			},
			capsuleOilTopical: [],
			vaporizer: {
				unsorted: [],
				cartridge: [],
				pod: [],
				disposable: [],
			},
			other: [],
		};
		this.options = {
			sortEdibles: options.sortEdibles || false,
			sortVaporizers: options.sortVaporizers || false,
		};
	}

	setOptions(options) {
		this.options.sortEdibles = options.sortEdibles;
		this.options.sortVaporizers = options.sortVaporizers;
	}

	setParsedData(parsedData) {
		this.parsedData = parsedData;
	}

	/**
	 * Accepts parsed data from a purchase order and stores in a local property as an array.
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
			this.sortByCategoryThenProductName();
			this.populateCategoryContainer();
		} else {
			console.error("No parsed data to create products from.");
		}
	}

	sortByCategoryThenProductName() {
		this.toArray.sort((a, b) => {
			if (a.category.toUpperCase() === b.category.toUpperCase()) {
				return a.name.toString().toUpperCase() < b.name.toString().toUpperCase() ? -1 : 1;
			} else {
				return a.category.toUpperCase() < b.category.toUpperCase() ? -1 : 1;
			}
		});
	}

	populateCategoryContainer() {
		this.toArray.forEach((product) => {
			if (product.category === "Beverages") {
				this.sortedCategoryContainer.beverage.push(product);
			} else if (product.category === "Concentrates") {
				this.sortedCategoryContainer.concentrate.push(product);
			} else if (product.category === "Edibles") {
				if (this.options.sortEdibles) {
					if (product.subCategory === "Chocolates") {
						this.sortedCategoryContainer.edible.chocolate.push(product);
					} else if (product.subCategory === "Gummies") {
						this.sortedCategoryContainer.edible.gummy.push(product);
					} else {
						this.sortedCategoryContainer.other.push(product);
					}
				} else {
					this.sortedCategoryContainer.edible.unsorted.push(product);
				}
			} else if (product.category === "Flower") {
				if (product.name.productInfo.includes("3.5 g")) {
					this.sortedCategoryContainer.flower.eighth.push(product);
				} else if (product.name.productInfo.includes("7 g")) {
					this.sortedCategoryContainer.flower.quarter.push(product);
				} else if (product.name.productInfo.includes("14 g")) {
					this.sortedCategoryContainer.flower.half.push(product);
				} else if (product.name.productInfo.includes("28 g")) {
					this.sortedCategoryContainer.flower.ounce.push(product);
				} else {
					this.sortedCategoryContainer.other.push(product);
				}
			} else if (product.category === "Pre-Rolls") {
				if (
					product.subCategory === "Infused Pre-Rolls" ||
					product.subCategory === "Infused Blunts"
				) {
					this.sortedCategoryContainer.preroll.infused.push(product);
				} else {
					this.sortedCategoryContainer.preroll.nonInfused.push(product);
				}
			} else if (product.category === "Oils & Caps" || product.category === "Topicals") {
				this.sortedCategoryContainer.capsuleOilTopical.push(product);
			} else if (product.category === "Vapes") {
				if (this.options.sortVaporizers) {
					if (product.subCategory === "All-In-Ones") {
						this.sortedCategoryContainer.vaporizer.disposable.push(product);
					} else if (product.subCategory === "Pod Systems") {
						this.sortedCategoryContainer.vaporizer.pod.push(product);
					} else {
						this.sortedCategoryContainer.vaporizer.cartridge.push(product);
					}
				} else {
					this.sortedCategoryContainer.vaporizer.unsorted.push(product);
				}
			} else {
				this.sortedCategoryContainer.other.push(product);
			}
		});

		console.log(this.sortedCategoryContainer);
	}
}
