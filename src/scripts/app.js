import TagElementGenerator from "./functions/TagElementGenerator.js";

const appContainer = document.querySelector("#app");
const tagElementGenerator = new TagElementGenerator();

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
	csvInput.addEventListener("change", (event) => {
		// no files have attempted to be uploaded
		tagElementGenerator.newUpload =
			tagElementGenerator.selectedFile !== "" &&
			tagElementGenerator.selectedFile !== event.target.value;
		tagElementGenerator.selectedFile = event.target.value;
	});
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
		handleGenerateTags(event.currentTarget.form[0].files);
	});
	const fileCirclePlusIcon = document.createElement("i");
	fileCirclePlusIcon.classList.add("fa-solid", "fa-xl", "fa-file-circle-plus");
	generateButton.appendChild(fileCirclePlusIcon);
	buttonContainer.appendChild(generateButton);

	const printButton = document.createElement("button");
	printButton.classList.add("print-btn");
	printButton.addEventListener("click", (event) => {
		event.preventDefault();
		if (tagElementGenerator.hasGenerated) {
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
	};
	tagElementGenerator.setOptions(options);
	tagElementGenerator.newUpload = true;
}

async function handleGenerateTags(files) {
	const tagContainer = await tagElementGenerator.generateTags(files);
	if (!tagElementGenerator.hasGenerated) {
		appContainer.append(tagContainer);
		tagElementGenerator.hasGenerated = true;
	}
	appContainer.querySelector("#tag-container").replaceWith(tagContainer);
	// JsBarcode requires elements to be on the DOM to be able to add the barcode images
	// it will not work with a collection and referencing the id's
	addBarcodes(tagContainer);
	// Toggle visibility of barcodes based on withBarcodes flag
	toggleBarcodes(tagContainer, tagElementGenerator.options.withBarcodes);
}

function addBarcodes(tagContainer) {
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
}

function toggleBarcodes(tagContainer, withBarcodes) {
	tagContainer.childNodes.forEach((childNode) => {
		const img = childNode.querySelector("img");
		img.style.display = withBarcodes ? "inline" : "none";
	});
}
