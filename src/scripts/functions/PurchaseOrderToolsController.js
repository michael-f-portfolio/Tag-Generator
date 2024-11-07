import ExportedCSVParser from "./ExportedCSVParser.js";
import SummaryTableGenerator from "./SummaryTableGenerator.js";
import TagElementContainerGenerator from "./TagElementContainerGenerator.js";
import Products from "../models/Products.js";

export default class PurchaseOrderToolsController {
	constructor() {
		this.exportedCSVParser = new ExportedCSVParser();
		this.summaryTableGenerator = null;
		this.tagElementGenerator = null;
		this.products = null;
		this.tagElementContainer = null;
		this.summaryTableContainer = null;

		/**
		 * An object which contains options that determine how the table and tag
		 * generation is handled.
		 */
		this.options = {
			tagOptions: {
				withBarcodes: false,
				displayCategoryColors: false,
				tagSize: "small",
			},
			sortOptions: {
				sortEdibles: false,
				sortVaporizers: false,
			},
			summaryOptions: {
				withSummary: false,
				withCategoryTables: false,
			},
		};
	}

	setOptions(options) {
		this.options = options;
	}

	async generate(files, barcodeTest) {
		if (barcodeTest) {
			this.createTestProducts();
		} else {
			await this.createProducts(files);
		}
		this.createTagElementContainer();
		if (this.options.summaryOptions.withSummary) {
			this.createSummaryTableContainer();
		}
	}

	async createProducts(files) {
		this.exportedCSVParser.setFileList(files);
		const parsedData = await this.exportedCSVParser.parse();
		if (parsedData) {
			this.products = new Products(parsedData, this.options.sortOptions);
			this.products.createProducts();
		} else {
			console.error("No parsed data to create products from.");
		}
	}

	createTagElementContainer() {
		// instantiate new tag element generator with data
		this.tagElementGenerator = new TagElementContainerGenerator(
			this.products,
			this.options.tagOptions
		);
		// create
		this.tagElementGenerator.createTagElementContainer();
		// return
		return this.tagElementGenerator.getTagElementContainer();
	}

	getTagElementContainer() {
		return this.tagElementGenerator.getTagElementContainer();
	}

	createSummaryTableContainer() {
		this.summaryTableGenerator = new SummaryTableGenerator(
			this.products,
			this.options.summaryOptions.withCategoryTables
		);
		this.summaryTableContainer = this.summaryTableGenerator.createSummaryTableContainer(
			this.products.toArray
		);
	}

	getSummaryTableContainer() {
		return this.summaryTableContainer;
	}

	createTestProducts() {
		const testData = {
			data: [
				["Id", "0000"],
				["Description", "ABC"],
				["Supplier Invoice Number", "0000"],
				["Vendor Name", "ABCD"],
				["Payment Due Date", "1/1/1970 12:00:00 AM"],
				["Date Expected", "1/1/1970 12:00:00 AM"],
				["Subtotal", "0.00"],
				["Shipping", "0.00"],
				["Recycling Fee", "0.00"],
				["Deposit Amount", "0.00"],
				["GST", "0.00"],
				["Total", "0.00"],
				[""],
				[""],
				[
					"Sku",
					"Name",
					"PackageReference",
					"Category",
					"Subcategory",
					"OrderedQty",
					"CurrentQty",
					"UnitCost",
					"Total",
				],
				[
					"222222",
					"TEST Code128 auto Barcode - Test",
					"Beverages",
					"Beverages",
					"0",
					"0",
					"0",
					"0",
					"0",
				],
				[
					"111111",
					"TEST Code128 A Barcode - Test",
					"Beverages",
					"Beverages",
					"0",
					"0",
					"0",
					"0",
					"0",
				],
				[
					"333333",
					"TEST Code128 B Barcode - Test",
					"Beverages",
					"Beverages",
					"0",
					"0",
					"0",
					"0",
					"0",
				],
				[
					"444444",
					"TEST Code128 C Barcode - Test",
					"Beverages",
					"Beverages",
					"0",
					"0",
					"0",
					"0",
					"0",
				],
				[
					"555555",
					"TEST Code39 Barcode - Test",
					"Beverages",
					"Beverages",
					"0",
					"0",
					"0",
					"0",
					"0",
				],
				[
					"666666",
					"TEST ITF Barcode - Test",
					"Beverages",
					"Beverages",
					"0",
					"0",
					"0",
					"0",
					"0",
				],
				[
					"777777",
					"TEST MSI Barcode - Test",
					"Beverages",
					"Beverages",
					"0",
					"0",
					"0",
					"0",
					"0",
				],
			],
		};
		this.products = new Products(testData, this.options.sortOptions);
		this.products.createProducts();
	}
}
