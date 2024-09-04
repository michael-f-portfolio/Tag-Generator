import Product from "./models/Product.js";
import Tags from "./models/Tags.js";
import Tag from "./models/Tag.js";
import TagElement from "./models/TagElement.js";

const appContainer = document.querySelector("#app");
let hasGenerated = false;

build();

function build() {
	buildHeader();
}

function buildHeader() {
	const header = document.createElement("header");
	const title = document.createElement("h2");
	title.textContent = "PO TAG GENERATOR";
	header.appendChild(title);
	buildImportForm(header);
	appContainer.appendChild(header);
}

function buildImportForm(parentElement) {
	const form = document.createElement("form");
	form.id = "import-form";

	const csvInput = document.createElement("input");
	csvInput.type = "file";
	csvInput.accept = ".csv";
	csvInput.id = "csv-file-upload";
	form.appendChild(csvInput);

	const buttonContainer = document.createElement("div");

	const optionsButton = document.createElement("button");
	optionsButton.classList.add("options-btn");
	optionsButton.addEventListener("click", (event) => event.preventDefault());
	const gearsIcon = document.createElement("i");
	gearsIcon.classList.add("fa-solid", "fa-xl", "fa-gears");
	optionsButton.appendChild(gearsIcon);
	buttonContainer.appendChild(optionsButton);

	const submitButton = document.createElement("button");
	submitButton.classList.add("generate-btn");
	submitButton.addEventListener("click", (event) => {
		event.preventDefault();
		if (!hasGenerated) {
			hasGenerated = true;
			generateTags(event);
		}
	});
	const fileCirclePlusIcon = document.createElement("i");
	fileCirclePlusIcon.classList.add(
		"fa-solid",
		"fa-xl",
		"fa-file-circle-plus"
	);
	submitButton.appendChild(fileCirclePlusIcon);
	buttonContainer.appendChild(submitButton);

	const printButton = document.createElement("button");
	printButton.classList.add("print-btn");
	printButton.addEventListener("click", (event) => {
		event.preventDefault();
		if (hasGenerated) {
			print();
		}
	});
	const printIcon = document.createElement("i");
	printIcon.classList.add("fa-solid", "fa-xl", "fa-print");
	printButton.appendChild(printIcon);
	buttonContainer.appendChild(printButton);

	form.appendChild(buttonContainer);
	parentElement.appendChild(form);
}

/**
 * Main function, generates tags based on a inputted purchase order CSV file.
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
				appContainer.appendChild(tagContainer);
			} else {
				hasGenerated = false;
				console.log("no data");
			}
		};
		reader.onerror = () => {
			hasGenerated = false;
			console.log("reader.onerror:" + reader.error);
		};
	} else {
		hasGenerated = false;
		console.log("no file");
	}
}
