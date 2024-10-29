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
			withBarcodes: false,
			displayCategoryColors: false,
			withSummary: false,
			withCategoryTables: false,
			productOptions: {
				sortEdibles: false,
				sortVaporizers: false,
			},
		};
	}

	setOptions(options) {
		this.options.withBarcodes = options.tagOptions.withBarcodes;
		this.options.displayCategoryColors = options.tagOptions.displayCategoryColors;
		this.options.productOptions.sortEdibles = options.sortOptions.sortEdibles;
		this.options.productOptions.sortVaporizers = options.sortOptions.sortVaporizers;
		this.options.withSummary = options.summaryOptions.withSummary;
		this.options.withCategoryTables = options.summaryOptions.withCategoryTables;
	}

	async generate(files) {
		await this.createProducts(files);
		this.createTagElementContainer();
		if (this.options.withSummary) {
			this.createSummaryTableContainer();
		}
	}

	async createProducts(files) {
		this.exportedCSVParser.setFileList(files);
		const parsedData = await this.exportedCSVParser.parse();
		if (parsedData) {
			this.products = new Products(parsedData, this.options.productOptions);
			this.products.createProducts();
		} else {
			console.error("No parsed data to create products from.");
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

	createSummaryTableContainer() {
		this.summaryTableGenerator = new SummaryTableGenerator(
			this.products,
			this.options.withCategoryTables
		);
		this.summaryTableContainer = this.summaryTableGenerator.createSummaryTableContainer(
			this.products.toArray
		);
	}

	getSummaryTableContainer() {
		return this.summaryTableContainer;
	}
}
