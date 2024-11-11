import ExportedCSVParser from "./ExportedCSVParser.js";
import SummaryTableGenerator from "./SummaryTableGenerator.js";
import TagElementContainerGenerator from "./TagElementContainerGenerator.js";
import Products from "../models/Products.js";
import getBarcodeTestData from "../tests/getBarcodeTestData.js";

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
				barcodeType: "",
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
		const testData = getBarcodeTestData();
		this.products = new Products(testData, this.options.sortOptions);
		this.products.createProducts();
	}
}
