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
			this.createCategoryTable("Beverages", this.products.sortedCategoryContainer.beverages)
		);

		// concentrates
		categoryTableContainer.appendChild(
			this.createCategoryTable(
				"Concentrates",
				this.products.sortedCategoryContainer.concentrates
			)
		);

		// edibles
		if (this.products.options.sortEdibles) {
			// optional chocolates
			if (this.products.sortedCategoryContainer.edibles.chocolates.length > 0) {
				categoryTableContainer.appendChild(
					this.createCategoryTable(
						"Edibles: Chocolates",
						this.products.sortedCategoryContainer.edibles.chocolates
					)
				);
			}

			// optional gummies
			if (this.products.sortedCategoryContainer.edibles.gummies.length > 0) {
				categoryTableContainer.appendChild(
					this.createCategoryTable(
						"Edibles: Gummies",
						this.products.sortedCategoryContainer.edibles.gummies
					)
				);
			}
		} else {
			// or all unsorted
			categoryTableContainer.appendChild(
				this.createCategoryTable(
					"Edibles",
					this.products.sortedCategoryContainer.edibles.unsorted
				)
			);
		}
		// flower
		//// eighth
		categoryTableContainer.appendChild(
			this.createCategoryTable(
				"Flower: Eighths",
				this.products.sortedCategoryContainer.flower.eighths
			)
		);
		//// quarter
		categoryTableContainer.appendChild(
			this.createCategoryTable(
				"Flower: Quarters",
				this.products.sortedCategoryContainer.flower.quarters
			)
		);
		//// half
		categoryTableContainer.appendChild(
			this.createCategoryTable(
				"Flower: Halves",
				this.products.sortedCategoryContainer.flower.halves
			)
		);
		//// ounce
		categoryTableContainer.appendChild(
			this.createCategoryTable(
				"Flower: Ounces",
				this.products.sortedCategoryContainer.flower.ounces
			)
		);
		// prerolls
		//// non infused
		categoryTableContainer.appendChild(
			this.createCategoryTable(
				"Pre-Rolls: Non-Infused",
				this.products.sortedCategoryContainer.prerolls.nonInfused
			)
		);
		//// infused
		categoryTableContainer.appendChild(
			this.createCategoryTable(
				"Pre-Rolls: Infused",
				this.products.sortedCategoryContainer.prerolls.infused
			)
		);
		// capsules, oils and topicals
		categoryTableContainer.appendChild(
			this.createCategoryTable(
				"Capsules, Oils and Topicals",
				this.products.sortedCategoryContainer.capsulesOilsTopicals
			)
		);

		// vaporizers
		if (this.products.options.sortVaporizers) {
			// optional cartridges
			if (this.products.sortedCategoryContainer.vaporizers.cartridges.length > 0) {
				categoryTableContainer.appendChild(
					this.createCategoryTable(
						"Vaporizers: 510 Cartridges",
						this.products.sortedCategoryContainer.vaporizers.cartridges
					)
				);
			}

			// optional pods
			if (this.products.sortedCategoryContainer.vaporizers.pods.length > 0) {
				categoryTableContainer.appendChild(
					this.createCategoryTable(
						"Vaporizers: Pods",
						this.products.sortedCategoryContainer.vaporizers.pods
					)
				);
			}

			// optional disposables
			if (this.products.sortedCategoryContainer.vaporizers.disposables.length > 0) {
				categoryTableContainer.appendChild(
					this.createCategoryTable(
						"Vaporizers: Disposables",
						this.products.sortedCategoryContainer.vaporizers.disposables
					)
				);
			}
		} else {
			// or all unsorted
			categoryTableContainer.appendChild(
				this.createCategoryTable(
					"Vaporizers",
					this.products.sortedCategoryContainer.vaporizers.unsorted
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
		summaryTable.classList.add("table", "table-sm", "caption-top");
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
		summaryTable.classList.add("table", "table-sm");
		summaryTable.appendChild(this.createSummaryTableHeader());
		summaryTable.appendChild(this.createSummaryTableBody());
		return summaryTable;
	}

	createSummaryTableHeader() {
		const summaryTableHeader = document.createElement("thead");
		summaryTableHeader.classList.add("table-light");
		const summaryTableHeaderRow = document.createElement("tr");
		const summaryTableHeaderSKU = document.createElement("th");
		summaryTableHeaderSKU.classList.add("col-sm-1");
		summaryTableHeaderSKU.textContent = "SKU";
		const summaryTableHeaderProductName = document.createElement("th");
		summaryTableHeaderProductName.classList.add("col-sm-9");
		summaryTableHeaderProductName.textContent = "Product Name";
		const summaryTableHeaderCategory = document.createElement("th");
		summaryTableHeaderCategory.classList.add("col-sm-1");
		summaryTableHeaderCategory.textContent = "Category";
		const summaryTableHeaderQuantity = document.createElement("th");
		summaryTableHeaderQuantity.classList.add("col-sm-1");
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
