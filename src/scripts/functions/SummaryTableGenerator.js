/**
 * Generates a table based on the inputted Purchase Order ordered in the following way, then sorted alphabetically:
 * 1. Category - Beverages
 * 2. Category - Concentrates
 * 3. Category - Edibles
 *      a. Optional SubCategory Sort - Chocolate
 *      b. Optional SubCategory Sort - Gummies
 * 4. Category - Flower
 *      a. 3.5 g
 *      b. 7 g
 *      c. 14 g & 15 g
 *      d. 28 g
 * 5. Category - PreRolls - Non-Infused
 * 6. Category - PreRolls - Infused (Is subcategory of Pre-Rolls but treated as a main category)
 * 7. Category - Capsules, Oils And Topicals
 * 8. Category - Vaporizers
 *      a. Optional SubCategory Sort - All 510s
 *      b. Optional SubCategory Sort - All In Ones/Disposables
 */
export default class SummaryTableGenerator {
	constructor(products, options) {
		this.products = products;
		if (options) {
			this.options = options;
		} else {
			this.options = null;
		}
	}

	generate() {
		// Build Header Titles
		const headers = [];
	}
}
