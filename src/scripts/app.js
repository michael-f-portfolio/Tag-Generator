import Product from "./models/Product.js";
import Tags from "./models/Tags.js";
import Tag from "./models/Tag.js";
import TagElement from "./models/TagElement.js";

const app = document.querySelector("#app");
buildImportForm(app);
let hasGenerated = false;

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
		if (!hasGenerated) {
			hasGenerated = true;
			generateTags(event);
		}
	});
	importActionContainer.appendChild(submitButton);

	form.appendChild(importActionContainer);
	appContainer.appendChild(form);
}

/**
 * Based on the following CSV structure:
 * 0,   1,    2,                3,        4,           5,          6,          7,        8
 * Sku, Name, PackageReference, Category, Subcategory, OrderedQty, CurrentQty, UnitCost, Total Cost
 * @param {Event} event
 */
function generateTags(event) {
	const purchaseOrderCSV = event.currentTarget.form[0].files[0];
	if (purchaseOrderCSV !== null && purchaseOrderCSV !== undefined) {
		let reader = new FileReader();
		reader.readAsText(purchaseOrderCSV);
		reader.onload = () => {
			const purchaseOrderResult = reader.result;
			if (purchaseOrderResult.length > 0) {
				let papaParseResults = Papa.parse(purchaseOrderResult).data;
				papaParseResults = papaParseResults.slice(15);

				const tags = new Tags();
				const tagContainer = document.createElement("div");
				tagContainer.id = "tag-container";

				for (let i = 0; i < papaParseResults.length - 1; i++) {
					const papaParseResult = papaParseResults[i];
					const product = new Product(
						papaParseResult[0], // SKU
						papaParseResult[1], // Name
						papaParseResult[2], // Package Reference
						papaParseResult[3], // Category
						papaParseResult[4], // Subcategory
						papaParseResult[5], // Ordered Quantity
						papaParseResult[6], // Current Quantity
						papaParseResult[7], // Unit Cost
						papaParseResult[8] // Total Cost
					);

					const tag = new Tag(product);
					tags.appendTag(tag);

					const tagElement = new TagElement(tag);
					tagContainer.appendChild(tagElement.element);
				}
				app.appendChild(tagContainer);
			} else {
				this.hasGenerated = false;
				console.log("no data");
			}
		};
		reader.onerror = () => {
			this.hasGenerated = false;
			console.log("reader.onerror:" + reader.error);
		};
	} else {
		this.hasGenerated = false;
		console.log("no file");
	}
}
