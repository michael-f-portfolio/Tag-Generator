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
	constructor() {}

	createSummaryTableContainer(products) {
		const summaryTableContainer = document.createElement("div");
		summaryTableContainer.id = "summary-container";

		const summaryTable = document.createElement("table");

		// header
		const summaryTableHeaderRow = document.createElement("tr");
		const summaryTableHeaderSKU = document.createElement("th");
		summaryTableHeaderSKU.textContent = "SKU";
		const summaryTableHeaderProductName = document.createElement("th");
		summaryTableHeaderProductName.textContent = "Product Name";
		const summaryTableHeaderCategory = document.createElement("th");
		summaryTableHeaderCategory.textContent = "Category";
		const summaryTableHeaderQuantity = document.createElement("th");
		summaryTableHeaderQuantity.textContent = "Quantity";

		summaryTableHeaderRow.append(
			summaryTableHeaderSKU,
			summaryTableHeaderProductName,
			summaryTableHeaderCategory,
			summaryTableHeaderQuantity
		);

		summaryTable.appendChild(summaryTableHeaderRow);

		// data
		products.forEach((product) => {
			const summaryTableDataRow = document.createElement("tr");
			const summaryTableDataSKU = document.createElement("td");
			summaryTableDataSKU.classList.add("td-sku");
			summaryTableDataSKU.textContent = product.SKU;
			const summaryTableDataProductName = document.createElement("td");
			summaryTableDataProductName.classList.add("td-product-name");
			summaryTableDataProductName.textContent = product.name.toString();
			const summaryTableDataCategory = document.createElement("td");
			summaryTableDataCategory.classList.add("td-category");
			summaryTableDataCategory.textContent = product.category;
			const summaryTableDataQuantity = document.createElement("td");
			summaryTableDataQuantity.classList.add("td-quantity");
			summaryTableDataQuantity.textContent = product.orderedQty;
			summaryTableDataRow.append(
				summaryTableDataSKU,
				summaryTableDataProductName,
				summaryTableDataCategory,
				summaryTableDataQuantity
			);
			summaryTable.appendChild(summaryTableDataRow);
		});

		summaryTableContainer.appendChild(summaryTable);
		return summaryTableContainer;
	}
}
