import PurchaseOrderToolsController from "./functions/PurchaseOrderToolsController.js";

const purchaseOrderToolsController = new PurchaseOrderToolsController();

build();

function build() {
	buildHeader();
}

function buildHeader() {
	const header = document.querySelector("header");
	buildImportForm(header);
	buildOptionsModal();
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

	const showOptionsButton = document.createElement("button");
	showOptionsButton.classList.add("options-btn");
	showOptionsButton.addEventListener("click", (event) => {
		event.preventDefault();
		document.querySelector("#optionsModal").showModal();
	});
	const gearsIcon = document.createElement("i");
	gearsIcon.classList.add("fa-solid", "fa-xl", "fa-gears");
	showOptionsButton.appendChild(gearsIcon);
	buttonContainer.appendChild(showOptionsButton);

	const generateButton = document.createElement("button");
	generateButton.classList.add("generate-btn");
	generateButton.addEventListener("click", (event) => {
		event.preventDefault();
		handleGenerate(event.currentTarget.form[0].files);
	});
	const fileCirclePlusIcon = document.createElement("i");
	fileCirclePlusIcon.classList.add("fa-solid", "fa-xl", "fa-file-circle-plus");
	generateButton.appendChild(fileCirclePlusIcon);
	buttonContainer.appendChild(generateButton);

	const printButton = document.createElement("button");
	printButton.classList.add("print-btn");
	printButton.addEventListener("click", (event) => {
		event.preventDefault();
		print();
	});
	const printIcon = document.createElement("i");
	printIcon.classList.add("fa-solid", "fa-xl", "fa-print");
	printButton.appendChild(printIcon);
	buttonContainer.appendChild(printButton);

	form.appendChild(buttonContainer);
	parentElement.appendChild(form);
}

function buildOptionsModal() {
	const optionsModal = document.querySelector("#optionsModal");
	const optionsSubmitButton = document.querySelector("#optionsSubmit");
	optionsSubmitButton.addEventListener("click", (event) => {
		event.preventDefault();
		handleSetOptions(event);
		optionsModal.close();
	});
}

function handleSetOptions(event) {
	const options = {
		withBarcodes: event.target.form.querySelector("#withBarcodes").checked,
		withSummary: event.target.form.querySelector("#withSummary").checked,
		withCategoryTables: event.target.form.querySelector("#withCategoryTables").checked,
		productOptions: {
			sortEdibles: event.target.form.querySelector("#sortEdibles").checked,
			sortVaporizers: event.target.form.querySelector("#sortVaporizers").checked,
		},
	};
	purchaseOrderToolsController.setOptions(options);
}

async function handleGenerate(files) {
	await purchaseOrderToolsController.generate(files);

	const generatorContainer = document.querySelector("#generator");

	const tagElementContainer = handleTags();
	if (tagElementContainer) {
		if (purchaseOrderToolsController.options.withSummary) {
			const summaryTableContainer = handleSummary();
			generatorContainer.replaceChildren(summaryTableContainer, tagElementContainer);
		} else {
			generatorContainer.replaceChildren(tagElementContainer);
		}
		handleBarcodes(tagElementContainer);
	} else {
		console.error("Tag generation failed");
	}
}

function handleTags() {
	return purchaseOrderToolsController.getTagElementContainer();
}

/**
 * Handles adding barcodes to the tag elements and toggling visibility.
 * JsBarcode requires elements to be on the DOM to be able to add the barcode images
 * it will not work with a collection not already added to the dom.
 * @param {HTMLDivElement} tagElementContainer
 */
function handleBarcodes(tagElementContainer) {
	addBarcodes(tagElementContainer);
	// Toggle visibility of barcodes based on withBarcodes flag
	toggleBarcodes(tagElementContainer, purchaseOrderToolsController.options.withBarcodes);
}

/**
 *
 * @param {HTMLDivElement} tagElementContainer A DIV container on the DOM which contains
 * all generated TagElements.
 */
function addBarcodes(tagElementContainer) {
	tagElementContainer.childNodes.forEach((childNode) => {
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
}

/**
 *
 * @param {HTMLDivElement} tagElementContainer A DIV container on the DOM which contains
 * all generated TagElements.
 * @param {boolean} withBarcodes A flag which determines whether the barcodes should be visible.
 */
function toggleBarcodes(tagElementContainer, withBarcodes) {
	tagElementContainer.childNodes.forEach((childNode) => {
		const img = childNode.querySelector("img");
		img.style.display = withBarcodes ? "inline" : "none";
	});
}

function handleSummary() {
	return purchaseOrderToolsController.getSummaryTableContainer();
}
