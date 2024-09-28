export default function createSummarizer(products) {
	return createTable(products);
}

function createTable(products) {
	const table = document.createElement("table");
	table.appendChild(createTableHeader());
	table.appendChild(createTableBody(products));
	return table;
}

function createTableHeader() {
	// Build table header:
	// SKU | Product | Quantity
	const tableHeader = document.createElement("thead");
	const tableHeaderRow = document.createElement("tr");

	const tableHeaderSKU = document.createElement("th");
	tableHeaderSKU.textContent = "SKU";

	const tableHeaderProduct = document.createElement("th");
	tableHeaderProduct.textContent = "Product";

	const tableHeaderCategory = document.createElement("th");
	tableHeaderCategory.textContent = "Category";

	const tableHeaderQuantity = document.createElement("th");
	tableHeaderQuantity.textContent = "Quantity";

	tableHeaderRow.append(
		tableHeaderSKU,
		tableHeaderProduct,
		tableHeaderCategory,
		tableHeaderQuantity
	);
	tableHeader.appendChild(tableHeaderRow);
	return tableHeader;
}

// create new arrays for each present category
// iterate through products and place in respective category arrays
// handle specific subcategories (Non-Infused vs Infused)
// place category: flower with name.contains("28g") in it's own category array
// sort each category array alphabetically
// join each array into master array based on category, alphabetically

// make generic enough to work with counts too

function sortProducts(products) {
	sortProductsByCategory(products);
	console.log(products.categories());
	console.log(products.subCategories());
	// console.log(products.numberOfCategories());
}

function sortProductsByCategory(products) {
	products.array.sort((a, b) => {
		return a.category.localeCompare(b.category);
	});
}

function sortProductsByName(products) {}

function sortPreRollSubCategory(products) {}

function createTableBody(products) {
	// Sort product data
	sortProducts(products);

	// Build table body:
	const tableBody = document.createElement("tbody");
	products.array.forEach((product) => {
		const tableRow = document.createElement("tr");

		const SKUData = document.createElement("td");
		SKUData.textContent = product.SKU;

		const productData = document.createElement("td");
		productData.textContent = product.name;

		const categoryData = document.createElement("td");
		categoryData.textContent = product.category;

		const quantityData = document.createElement("td");
		quantityData.textContent = product.orderedQty;

		tableRow.append(SKUData, productData, categoryData, quantityData);
		tableBody.appendChild(tableRow);
	});
	return tableBody;
}
