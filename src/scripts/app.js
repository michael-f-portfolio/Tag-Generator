function appStart() {
	const app = document.querySelector("#app");
	buildImportForm(app);
}

function buildImportForm(appContainer) {
	const form = document.createElement("form");
	form.id = "import-form";
	const formTitle = document.createElement("h2");
	formTitle.textContent = "Import Purchase Order";
	form.appendChild(formTitle);
	const importActionContainer = document.createElement("div");
	importActionContainer.classList.add("import-actions-container");
	const csvInput = document.createElement("input");
	csvInput.type = "file";
	csvInput.accept = ".csv";
	importActionContainer.appendChild(csvInput);
	const submitButton = document.createElement("button");
	submitButton.textContent = "Generate";
	submitButton.addEventListener("click", (event) => {
		event.preventDefault();
		generateTags(event);
	});
	importActionContainer.appendChild(submitButton);
	form.appendChild(importActionContainer);
	appContainer.appendChild(form);
}

/**
 * Based on the following CSV structure:
 * 0,   1,    2,                3,        4,           5,          6,          7,        8
 * Sku, Name, PackageReference, Category, Subcategory, OrderedQty, CurrentQty, UnitCost, Total
 * @param {Event} event
 */
function generateTags(event) {
	event.preventDefault();
	const purchaseOrderCSV = event.currentTarget.form[0].files[0];
	if (purchaseOrderCSV !== null && purchaseOrderCSV !== undefined) {
		let reader = new FileReader();
		reader.readAsText(purchaseOrderCSV);
		reader.onload = () => {
			const purchaseOrderResult = reader.result;
			if (purchaseOrderResult.length > 0) {
				let papaParseResult = Papa.parse(purchaseOrderResult).data;

				// trim 0-14 elements
				papaParseResult = papaParseResult.slice(15);

				// from 15 -> end
				const tagContainer = document.createElement("div");
				tagContainer.id = "tag-container";
				for (let i = 0; i < papaParseResult.length - 1; i++) {
					const product = papaParseResult[i];

					// for each remaining element
					// create a div
					const tag = document.createElement("div");
					tag.classList.add("tag");

					// insert a p.product with data from position 1
					const productName = document.createElement("p");
					productName.textContent = product[1];
					productName.classList.add("product-name");

					// insert a class into p.product based on position 3 to highlight based on category
					if (product[3].indexOf(" ") >= 0) {
						product[3] = product[3].replace(/\s/g, "-");
						productName.classList.add(`category-${product[3]}`);
					} else {
						productName.classList.add(`category-${product[3]}`);
					}

					if (product[4].indexOf(" ") >= 0) {
						product[4] = product[4].replace(/\s/g, "-");
						productName.classList.add(`subCategory-${product[4]}`);
					} else {
						productName.classList.add(`subCategory-${product[4]}`);
					}
					tag.appendChild(productName);

					// insert a p.sku with data from position 0
					const productSKU = document.createElement("p");
					productSKU.textContent = product[0];
					productSKU.classList.add("product-sku");
					tag.appendChild(productSKU);
					tagContainer.appendChild(tag);
				}
				app.appendChild(tagContainer);
			} else {
				console.log("no data");
			}
		};
		reader.onerror = () => {
			console.log("reader.onerror:" + reader.error);
		};
	} else {
		console.log("no file");
	}
}

appStart();
