import Product from "./models/Product.js";
import Tags from "./models/Tags.js";
import Tag from "./models/Tag.js";
import TagElement from "./models/TagElement.js";

const appContainer = document.querySelector("#app");
let hasGenerated = false;
let newUpload = false;
let selectedFile = "";

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
	csvInput.addEventListener("change", (event) => {
		// no files have attempted to be uploaded
		newUpload = selectedFile !== "" && selectedFile !== event.target.value;
		selectedFile = event.target.value;
	});
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

	const generateButton = document.createElement("button");
	generateButton.classList.add("generate-btn");
	generateButton.addEventListener("click", (event) => {
		event.preventDefault();
		generateTagElements(event);
	});
	const fileCirclePlusIcon = document.createElement("i");
	fileCirclePlusIcon.classList.add("fa-solid", "fa-xl", "fa-file-circle-plus");
	generateButton.appendChild(fileCirclePlusIcon);
	buttonContainer.appendChild(generateButton);

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
 * Determines if a new tag document should be created based on two booleans:
 * hasGenerated - if a tag document has never been generated, start the process to create a new one.
 * newUpload -
 */
function generateTagElements(event) {
	if (!hasGenerated) {
		readFileInput(event);
	} else if (newUpload) {
		removeTagElements();
		newUpload = false;
		readFileInput(event);
	}
}

/**
 * Reads the file input and sends it to the parser.
 * @param {Event} event
 */
function readFileInput(event) {
	const fileInput = event.currentTarget.form[0].files[0];
	if (fileInput !== null && fileInput !== undefined) {
		let reader = new FileReader();
		reader.readAsText(fileInput);
		reader.onload = () => {
			parsePurchaseOrderCSV(reader.result);
		};
	} else {
		console.log("no file");
		hasGenerated = false;
	}
}

/**
 * Parses a purchase order based on the following CSV structure:
 * 0,   1,    2,                3,        4,           5,          6,          7,        8
 * Sku, Name, PackageReference, Category, Subcategory, OrderedQty, CurrentQty, UnitCost, Total Cost
 * @param {ArrayBuffer} fileInputResult
 */
function parsePurchaseOrderCSV(fileInputResult) {
	if (fileInputResult.length > 0) {
		Papa.parse(fileInputResult, {
			complete: (results) => {
				createProducts(results);
			},
		});
	} else {
		console.log("no data");
		hasGenerated = false;
	}
}

function createProducts(results) {
	const products = [];
	const data = results.data.slice(15);
	for (let i = 0; i < data.length; i++) {
		const item = data[i];
		// PapaParse adds entries for blank spaces so we're not going to include those
		if (item[0] !== "") {
			const product = new Product(
				item[0], // SKU
				item[1], // Name
				item[2], // Package Reference
				item[3], // Category
				item[4], // Subcategory
				item[5], // Ordered Quantity
				item[6], // Current Quantity
				item[7], // Unit Cost
				item[8] // Total Cost
			);
			products.push(product);
		}
	}
	createTags(products);
}

function createTags(products) {
	const tags = new Tags();
	if (products.length > 0) {
		products.forEach((product) => tags.appendTag(new Tag(product)));
	}
	createTagElements(tags);
}

function createTagElements(tags) {
	const tagElements = [];
	if (tags.entries.length > 0) {
		tags.entries.forEach((tag) => {
			tagElements.push(new TagElement(tag));
		});
	}
	addTagElementsToDOM(tagElements);
}

function addTagElementsToDOM(tagElements) {
	if (tagElements.length > 0) {
		const tagContainer = document.createElement("div");
		tagContainer.id = "tag-container";
		tagElements.forEach((tagElement) => {
			tagContainer.appendChild(tagElement.element);
		});
		appContainer.appendChild(tagContainer);
		tagContainer.childNodes.forEach((childNode) => {
			const img = childNode.querySelector("img");
			JsBarcode(`#${img.id}`, `${img.id.replace("barcode-", "")}`, {
				format: "ITF",
				height: 25,
				width: 1,
				fontSize: 14,
				margin: 1,
				marginTop: 5,
				textMargin: 0,
				displayValue: false,
			});
		});
		hasGenerated = true;
	} else {
		hasGenerated = false;
	}
}

function removeTagElements() {
	const tagContainer = document.querySelector("#tag-container");
	tagContainer.parentNode.removeChild(tagContainer);
	hasGenerated = false;
}
