import PurchaseOrderToolsController from "./functions/PurchaseOrderToolsController.js";

const purchaseOrderToolsController = new PurchaseOrderToolsController();

addFormEventListeners();

function addFormEventListeners() {
	addPrintFormEventListeners();
	if (document.title === "Tag Generator") {
		addGenerateFormEventListeners();
	}
	if (document.title === "Barcode Test") {
		addBarcodeTestFormEventListeners();
	}
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
		resetGenerateTagForm();
	});
}

function addBarcodeTestFormEventListeners() {
	document.querySelector("#generateBarcodeTestBtn").addEventListener("click", (event) => {
		event.preventDefault();
		handleBarcodeTestFormSubmit(event.currentTarget.form);
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

function handleBarcodeTestFormSubmit(formResult) {
	const formData = {
		file: null,
		options: {
			tagOptions: {
				withBarcodes: true,
				displayCategoryColors: formResult.querySelector("#displayCategoryColors").checked,
				tagSize: formResult.querySelector("#tagSizeSmall").checked ? "small" : "large",
			},
			sortOptions: { sortEdibles: false, sortVaporizers: false },
			summaryOptions: { withSummary: false, withCategoryTables: false },
		},
	};
	handleGenerate(formData, true);
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
	if (document.title === "Tag Generator") {
		resetGenerateTagForm(generateFormContainer);
	}

	if (document.title === "Barcode Test") {
		resetGenerateBarcodeTestForm(generateFormContainer);
	}

	// display generate tag form
	generateFormContainer.classList.remove("d-none");
}

function resetGenerateTagForm(generateFormContainer) {
	generateFormContainer.querySelector("form").reset();
	const withCategoryTablesSwitch = generateFormContainer.querySelector("#withCategoryTables");
	withCategoryTablesSwitch.checked = false;
	withCategoryTablesSwitch.disabled = true;
}

function resetGenerateBarcodeTestForm(generateFormContainer) {
	generateFormContainer.querySelector("form").reset();
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
				tagSize: formResult.querySelector("#tagSizeSmall").checked ? "small" : "large",
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

async function handleGenerate(formData, barcodeTest) {
	purchaseOrderToolsController.setOptions(formData.options);
	toggleGenerateFormVisibility(false); // hide generate form
	toggleSpinnerVisibility(true); // show spinner
	await purchaseOrderToolsController.generate(formData.file, barcodeTest);

	const generatorContainer = document.querySelector("#generator");

	const tagElementContainer = handleTags();
	if (tagElementContainer) {
		if (formData.options.summaryOptions.withSummary) {
			const summaryTableContainer = handleSummary();
			generatorContainer.replaceChildren(summaryTableContainer, tagElementContainer);
		} else {
			generatorContainer.replaceChildren(tagElementContainer);
		}
		handleBarcodes(tagElementContainer, formData.options.tagOptions, barcodeTest);
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
function handleBarcodes(tagElementContainer, tagOptions, barcodeTest) {
	if (barcodeTest) {
		addTestBarcodes(tagElementContainer, tagOptions.tagSize);
	} else {
		addBarcodes(tagElementContainer, tagOptions.tagSize);
	}

	// Toggle visibility of barcodes based on withBarcodes flag
	toggleBarcodes(tagElementContainer, tagOptions.withBarcodes);
}

/**
 * Generates barcodes for Tag Elements which are already on the DOM in the ITF format.
 * @param {HTMLDivElement} tagElementContainer A DIV container on the DOM which contains
 * all generated TagElements.
 */
function addBarcodes(tagElementContainer, tagSize) {
	tagElementContainer.childNodes.forEach((childNode) => {
		const img = childNode.querySelector("img");
		JsBarcode(`#${img.id}`, `${img.id.replace("barcode-", "")}`, {
			format: "ITF",
			height: tagSize === "small" ? 25 : 50,
			width: tagSize === "small" ? 1 : 2,
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

function addTestBarcodes(tagElementContainer, tagSize) {
	tagElementContainer.childNodes.forEach((childNode) => {
		const img = childNode.querySelector("img");
		JsBarcode(`#${img.id}`, `${img.id.replace("barcode-", "")}`, {
			format: getBarcodeType(childNode),
			height: tagSize === "small" ? 25 : 50,
			width: tagSize === "small" ? 1 : 2,
			fontSize: 14,
			margin: 1,
			textMargin: 0,
			displayValue: false,
		});
	});
}

function getBarcodeType(element) {
	if (element.querySelector("p.name").textContent.includes("Code128 A")) {
		return "CODE128A";
	}
	if (element.querySelector("p.name").textContent.includes("Code128 auto")) {
		return "CODE128";
	}
	if (element.querySelector("p.name").textContent.includes("Code128 B")) {
		return "CODE128B";
	}
	if (element.querySelector("p.name").textContent.includes("Code128 C")) {
		return "CODE128C";
	}
	if (element.querySelector("p.name").textContent.includes("Code39")) {
		return "CODE39";
	}
	if (element.querySelector("p.name").textContent.includes("ITF")) {
		return "ITF";
	}
	if (element.querySelector("p.name").textContent.includes("MSI")) {
		return "MSI";
	}
	if (element.querySelector("p.name").textContent.includes("Pharmacode")) {
		return "pharmacode";
	}
}
