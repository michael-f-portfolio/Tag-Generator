/**
 * A class representing the separate pieces of information that a product's name contains.
 * This includes, in order:
 * A 2 to 4 character long Producer Code.
 * The product info, typically in the following order:
 *      The sellable product name.
 *      Strain Type.
 *      The size of the Product.
 * A hyphen "-" symbol.
 * The brand name.
 * I.E:
 *      "CRO Sourz: Tropical Party Pack Gummies Hybrid 10 Pack - Spinach" becomes:
 *      1: Producer Code = CRO
 *      2: Product Info = Sourz: Tropical Party Pack Gummies Hybrid 10 Pack
 *      3: Brand = Spinach
 * Note: Due to user input error and inconsistent naming conventions between LP's,
 *       the long form product name may be in a different order or missing information.
 */
export default class ProductName {
	constructor(name) {
		this.MAX_TOSTRING_LENGTH = 80;
		// Split between the hyphen
		let nameSplit = name.split("-");
		// Any characters before the first whitespace is the Producer Code
		this.producerCode = nameSplit[0].substr(0, nameSplit[0].indexOf(" "));
		// Anything past the Producer Code and before the hyphen ("-") is the Product Info
		this.productInfo = nameSplit[0].substr(nameSplit[0].indexOf(" ")).trim();
		// Anything past the hyphen ("-") is the Brand Name.
		this.brandName = nameSplit[1].trim();
	}

	toString() {
		const toString = `${this.producerCode} ${this.productInfo} - ${this.brandName}`;
		if (toString.length > this.MAX_TOSTRING_LENGTH) {
			return this.toStringTrimmed();
		} else {
			return toString;
		}
	}

	toStringTrimmed() {
		// Get the total length of the toString
		let trimmedProductInfo = this.productInfo;

		// trim enough of the product info until toString.length <= MAX_TOSTRING_LENGTH
		while (
			`${this.producerCode} ${trimmedProductInfo}... - ${this.brandName}`.length >
			this.MAX_TOSTRING_LENGTH
		) {
			trimmedProductInfo = trimmedProductInfo.substr(0, trimmedProductInfo.length - 1);
		}

		trimmedProductInfo = trimmedProductInfo.trim();

		return `${this.producerCode} ${trimmedProductInfo}... - ${this.brandName}`;
	}
}
