// import Papa from "papaparse";

const app = document.querySelector("#app");

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
	console.log(event.currentTarget.form[0].files[0]);
	const purchaseOrderCSV = event.currentTarget.form[0].files[0];
	if (purchaseOrderCSV !== null && purchaseOrderCSV !== undefined) {
		let reader = new FileReader();
		reader.readAsText(purchaseOrderCSV);

		reader.onload = () => {
			const purchaseOrderResult = reader.result;
			if (purchaseOrderResult.length > 0) {
				let papaParseResult = Papa.parse(purchaseOrderResult, {
					//   header: true,
				}).data;
				// trim 0-14 elements
				papaParseResult = papaParseResult.slice(15);
				// from 15 -> end
				const tagContainer = document.createElement("div");
				tagContainer.id = "tag-container";
				for (let i = 0; i < papaParseResult.length - 1; i++) {
					// for each remaining element
					// create a div
					const tag = document.createElement("div");
					tag.classList.add("tag");
					// insert a p.product with data from position 1
					const productName = document.createElement("p");
					productName.textContent = papaParseResult[i][1];
					productName.classList.add("product-name");
					// insert a class into p.product based on position 3 to highlight based on category
					productName.classList.add(
						`category-${papaParseResult[i][3]}`
					);
					tag.appendChild(productName);
					// insert a p.sku with data from position 0
					const productSKU = document.createElement("p");
					productSKU.textContent = papaParseResult[i][0];
					productSKU.classList.add("product-sku");
					tag.appendChild(productSKU);
					tagContainer.appendChild(tag);
				}
				app.appendChild(tagContainer);
				// console.log(reader.result);
			} else {
				console.log("no data");
			}
		};

		reader.onerror = () => {
			console.log(reader.error);
		};
	} else {
		console.log("no file");
	}
});

importActionContainer.appendChild(submitButton);
form.appendChild(importActionContainer);
app.appendChild(form);
