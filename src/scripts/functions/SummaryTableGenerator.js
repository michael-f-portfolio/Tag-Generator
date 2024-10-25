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
	constructor(products, withCategoryTables) {
		this.products = products;
		this.withCategoryTables = withCategoryTables;
	}

	createSummaryTableContainer() {
		const summaryTableContainer = document.createElement("div");
		summaryTableContainer.id = "summary-container";
		if (this.withCategoryTables) {
			summaryTableContainer.appendChild(this.createCategoryTables());
		} else {
			summaryTableContainer.appendChild(this.createSummaryTable());
		}
		return summaryTableContainer;
	}

	createCategoryTables() {
		const categoryTableContainer = document.createElement("div");
		categoryTableContainer.id = "category-table-container";

		// beverages
		categoryTableContainer.appendChild(
			this.createCategoryTable("Beverages", this.products.sortedCategoryContainer.beverage)
		);

		// concentrates
		categoryTableContainer.appendChild(
			this.createCategoryTable(
				"Concentrates",
				this.products.sortedCategoryContainer.concentrate
			)
		);

		// edibles
		if (this.products.options.sortEdibles) {
			// optional chocolate
			if (this.products.sortedCategoryContainer.edible.chocolate.length > 0) {
				categoryTableContainer.appendChild(
					this.createCategoryTable(
						"Chocolates",
						this.products.sortedCategoryContainer.edible.chocolate
					)
				);
			}

			// optional gummy
			if (this.products.sortedCategoryContainer.edible.gummy.length > 0) {
				categoryTableContainer.appendChild(
					this.createCategoryTable(
						"Gummies",
						this.products.sortedCategoryContainer.edible.gummy
					)
				);
			}
		} else {
			// or all unsorted
			categoryTableContainer.appendChild(
				this.createCategoryTable(
					"Edibles",
					this.products.sortedCategoryContainer.edible.unsorted
				)
			);
		}
		// flower
		//// eighth
		categoryTableContainer.appendChild(
			this.createCategoryTable("Eighths", this.products.sortedCategoryContainer.flower.eighth)
		);
		//// quarter
		categoryTableContainer.appendChild(
			this.createCategoryTable(
				"Quarters",
				this.products.sortedCategoryContainer.flower.quarter
			)
		);
		//// half
		categoryTableContainer.appendChild(
			this.createCategoryTable("Halfs", this.products.sortedCategoryContainer.flower.half)
		);
		//// ounce
		categoryTableContainer.appendChild(
			this.createCategoryTable("Ounces", this.products.sortedCategoryContainer.flower.ounce)
		);
		// prerolls
		//// non infused
		categoryTableContainer.appendChild(
			this.createCategoryTable(
				"Non-Infused Pre-Rolls",
				this.products.sortedCategoryContainer.preroll.nonInfused
			)
		);
		//// infused
		categoryTableContainer.appendChild(
			this.createCategoryTable(
				"Infused Pre-Rolls",
				this.products.sortedCategoryContainer.preroll.infused
			)
		);
		// capsules, oils and topicals
		categoryTableContainer.appendChild(
			this.createCategoryTable(
				"Capsules, Oils and Topicals",
				this.products.sortedCategoryContainer.capsuleOilTopical
			)
		);

		// vaporizers
		if (this.products.options.sortVaporizers) {
			// optional cartridge
			if (this.products.sortedCategoryContainer.vaporizer.cartridge.length > 0) {
				categoryTableContainer.appendChild(
					this.createCategoryTable(
						"510 Cartridges",
						this.products.sortedCategoryContainer.vaporizer.cartridge
					)
				);
			}

			// optional pods
			if (this.products.sortedCategoryContainer.vaporizer.pod.length > 0) {
				categoryTableContainer.appendChild(
					this.createCategoryTable(
						"Pods",
						this.products.sortedCategoryContainer.vaporizer.pod
					)
				);
			}

			// optional disposable
			if (this.products.sortedCategoryContainer.vaporizer.disposable.length > 0) {
				categoryTableContainer.appendChild(
					this.createCategoryTable(
						"Disposables",
						this.products.sortedCategoryContainer.vaporizer.disposable
					)
				);
			}
		} else {
			// or all unsorted
			categoryTableContainer.appendChild(
				this.createCategoryTable(
					"Vaporizers",
					this.products.sortedCategoryContainer.vaporizer.unsorted
				)
			);
		}

		// all others
		if (this.products.sortedCategoryContainer.other.length > 0) {
			categoryTableContainer.appendChild(
				this.createCategoryTable("Other", this.products.sortedCategoryContainer.other)
			);
		}

		return categoryTableContainer;
	}

	createCategoryTable(categoryName, category) {
		const summaryTable = document.createElement("table");
		const tableCaption = document.createElement("caption");
		tableCaption.textContent = categoryName;
		summaryTable.appendChild(tableCaption);
		summaryTable.appendChild(this.createCategoryTableHeader());
		summaryTable.appendChild(this.createCategoryTableBody(category));
		return summaryTable;
	}

	createCategoryTableHeader() {
		return this.createSummaryTableHeader();
	}

	createCategoryTableBody(category) {
		const categoryTableBody = document.createElement("tbody");
		category.forEach((item) => {
			categoryTableBody.appendChild(this.createSummaryTableRow(item));
		});
		return categoryTableBody;
	}

	createSummaryTable() {
		const summaryTable = document.createElement("table");
		summaryTable.appendChild(this.createSummaryTableHeader());
		summaryTable.appendChild(this.createSummaryTableBody());
		return summaryTable;
	}

	createSummaryTableHeader() {
		const summaryTableHeader = document.createElement("thead");
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
		summaryTableHeader.appendChild(summaryTableHeaderRow);
		return summaryTableHeader;
	}

	createSummaryTableBody() {
		const summaryTableBody = document.createElement("tbody");
		this.products.toArray.forEach((product) =>
			summaryTableBody.appendChild(this.createSummaryTableRow(product))
		);
		return summaryTableBody;
	}

	createSummaryTableRow(product) {
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
		return summaryTableDataRow;
	}
}
