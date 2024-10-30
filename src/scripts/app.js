import PurchaseOrderToolsController from "./functions/PurchaseOrderToolsController.js";

const purchaseOrderToolsController = new PurchaseOrderToolsController();

addFormEventListeners();

function addFormEventListeners() {
	addPrintFormEventListeners();
	addGenerateFormEventListeners();
}

function addPrintFormEventListeners() {
	document.querySelectorAll(".print-btn").forEach((node) => {
		node.addEventListener("click", (event) => {
			event.preventDefault();
			print();
		});
	});
	document.querySelectorAll(".clear-reset-btn").forEach((node) => {
		node.addEventListener("click", (event) => {
			handlePageResetButton();
		});
	});
}

function addGenerateFormEventListeners() {
	document.querySelector("#withSummary").addEventListener("click", (event) => {
		document.querySelector("#withCategoryTables").toggleAttribute("disabled");
	});
	document.querySelector("#generateBtn").addEventListener("click", (event) => {
		event.preventDefault();
		if (validateGenerateFormSubmit(event.currentTarget.form)) {
			handleGenerateFormSubmit(event.currentTarget.form);
		}
	});
	document.querySelector("#optionsResetBtn").addEventListener("click", (event) => {
		resetGenerateForm();
	});
}

function validateGenerateFormSubmit(formResult) {
	if (formResult.querySelector("#csvFileUpload").files.length === 0) {
		return false;
	} else if (formResult.querySelector("#csvFileUpload").files.length > 1) {
		return false;
	}

	return true;
}

function handleGenerateFormSubmit(formResult) {
	handleGenerate(getFormData(formResult));
	toggleGenerateFormVisibility(false);
}

function handlePageResetButton() {
	//// reset page
	// remove generation
	document.querySelector("#generator").replaceChildren();
	// hide print/reset button divs
	document.querySelectorAll(".reset-form-container").forEach((node) => {
		node.classList.add("d-none");
	});
	const generateFormContainer = document.querySelector("#generateFormContainer");
	// reset generate tag form
	resetGenerateForm();

	// display generate tag form
	generateFormContainer.classList.remove("d-none");
}

function resetGenerateForm() {
	generateFormContainer.querySelector("form").reset();
	const withCategoryTablesSwitch = generateFormContainer.querySelector("#withCategoryTables");
	withCategoryTablesSwitch.checked = false;
	withCategoryTablesSwitch.disabled = true;
}

function toggleGenerateFormVisibility(isVisible) {
	const generateFormContainer = document.querySelector("#generateFormContainer");
	isVisible
		? generateFormContainer.classList.remove("d-none")
		: generateFormContainer.classList.add("d-none");
}

function togglePrintResetContainerVisibility(isVisible) {
	const resetFormContainers = document.querySelectorAll(".reset-form-container");
	resetFormContainers.forEach((node) => {
		isVisible ? node.classList.remove("d-none") : node.classList.add("d-none");
	});
}

function toggleSpinnerVisibility(isVisible) {
	const spinnerContainer = document.querySelector("#spinnerContainer");
	isVisible
		? spinnerContainer.classList.remove("d-none")
		: spinnerContainer.classList.add("d-none");
}

function getFormData(formResult) {
	return {
		file: formResult.querySelector("#csvFileUpload").files,
		options: {
			tagOptions: {
				withBarcodes: formResult.querySelector("#withBarcodes").checked,
				displayCategoryColors: formResult.querySelector("#displayCategoryColors").checked,
			},
			sortOptions: {
				sortEdibles: formResult.querySelector("#sortEdibles").checked,
				sortVaporizers: formResult.querySelector("#sortVaporizers").checked,
			},
			summaryOptions: {
				withSummary: formResult.querySelector("#withSummary").checked,
				withCategoryTables: formResult.querySelector("#withCategoryTables").checked,
			},
		},
	};
}

async function handleGenerate(formData) {
	purchaseOrderToolsController.setOptions(formData.options);
	toggleGenerateFormVisibility(false); // hide generate form
	toggleSpinnerVisibility(true); // show spinner
	await purchaseOrderToolsController.generate(formData.file);

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
		toggleSpinnerVisibility(false); // hide spinner
		togglePrintResetContainerVisibility(true); // show print/reset container
	} else {
		console.error("Tag generation failed");
	}
}

function handleTags() {
	return purchaseOrderToolsController.getTagElementContainer();
}

function handleSummary() {
	return purchaseOrderToolsController.getSummaryTableContainer();
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
 * Generates barcodes for Tag Elements which are already on the DOM in the ITF format.
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
			textMargin: 0,
			displayValue: false,
		});
	});
}

/**
 * Toggles the visibility of the barcodes within the Tag Elements.
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
