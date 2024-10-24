import ExportedCSVParser from "./ExportedCSVParser.js";
import SummaryTableGenerator from "./SummaryTableGenerator.js";
import TagElementContainerGenerator from "./TagElementContainerGenerator.js";
import Products from "../models/Products.js";

export default class PurchaseOrderToolsController {
	constructor() {
		this.exportedCSVParser = new ExportedCSVParser();
		this.summaryTableGenerator = new SummaryTableGenerator();
		this.products = null;
		this.tagElementContainer = null;
		this.summaryTableContainer = null;

		/**
		 * An object which contains options that determine how the table and tag
		 * generation is handled.
		 */
		this.options = {
			withBarcodes: false,
			withSummary: false,
			productOptions: {
				sortEdibles: false,
				sortVaporizers: false,
			},
		};
	}

	setOptions(options) {
		this.options = options;
	}

	async generate(files) {
		try {
			await this.createProducts(files);
			this.createTagElementContainer();
			if (this.options.withSummary) {
				this.createSummaryTable();
			}
		} catch (error) {
			console.error(error.message);
		}
	}

	async createProducts(files) {
		this.exportedCSVParser.setFileList(files);
		const parsedData = await this.exportedCSVParser.parse();
		if (parsedData) {
			this.products = new Products(parsedData, this.options.productOptions);
			this.products.createProducts();
		} else {
			throw new Error("No parsed data to create products from.");
			// console.error("No parsed data to create products from.");
		}
	}

	createTagElementContainer() {
		// instantiate new tag element generator with data
		this.tagElementGenerator = new TagElementContainerGenerator(
			this.products,
			this.options.withBarcodes
		);
		// create
		this.tagElementGenerator.createTagElementContainer();
		// return
		return this.tagElementGenerator.getTagElementContainer();
	}

	getTagElementContainer() {
		return this.tagElementGenerator.getTagElementContainer();
	}

	createSummaryTable() {
		this.summaryTableContainer = this.summaryTableGenerator.createSummaryTableContainer(
			this.products.toArray
		);
	}

	getSummaryTable() {
		return this.summaryTableContainer;
	}
}
