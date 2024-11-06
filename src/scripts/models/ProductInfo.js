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
		this.name = name;

		if (name.includes("Indica")) {
			this.parseProductInfoFromName(name, "Indica");
		} else if (name.includes("Sativa")) {
			this.parseProductInfoFromName(name, "Sativa");
		} else if (name.includes("Hybrid")) {
			this.parseProductInfoFromName(name, "Hybrid");
		} else if (name.includes("Blend")) {
			this.parseProductInfoFromName(name, "Blend");
		} else {
			// Product does not have a strain type included in name
			this.noStrainType = true;
		}
	}

	parseProductInfoFromName(name, strainType) {
		this.strainType = strainType;
		let nameSplit = name.split(strainType);

		// Some products have their strain type included in their name as well
		if (nameSplit.length > 2) {
			const amountOfStrainTypeOccurrences = nameSplit.length - 1;
			let productNameSegment = "";
			nameSplit.forEach((nameSegment, i) => {
				if (i === nameSplit.length - 1) {
					return;
				}
				productNameSegment = `${productNameSegment} ${nameSegment.trim()}`;
				if (i < amountOfStrainTypeOccurrences - 1) {
					productNameSegment = `${productNameSegment} ${strainType}`;
				}
			});
			nameSplit = [productNameSegment.trim(), nameSplit[nameSplit.length - 1].trim()];
		}

		this.sellableProductName = nameSplit[0].trim();
		const sizeSplit = nameSplit[1].trim().split(" ");
		this.productSize = parseFloat(sizeSplit[0]);
		this.measurementUnit = sizeSplit[1];
	}

	toString() {
		if (this.noStrainType) {
			return this.name;
		} else {
			return `${this.sellableProductName} ${this.strainType} ${this.productSize} ${this.measurementUnit}`;
		}
	}
}
