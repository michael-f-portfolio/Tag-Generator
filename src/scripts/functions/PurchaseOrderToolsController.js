import ExportedCSVParser from "./ExportedCSVParser.js";
import SummaryTableGenerator from "./SummaryTableGenerator.js";
import TagElementGenerator from "./TagElementGenerator.js";
import Products from "../models/Products.js";

export default class PurchaseOrderToolsController {
	constructor() {
		this.exportedCSVParser = new ExportedCSVParser();
		this.tagElementGenerator = new TagElementGenerator();
		this.summaryTableGenerator = new SummaryTableGenerator();
		this.products = new Products();
		this.options = {
			withBarcodes: false,
			withSummary: false,
		};
	}

	setOptions(options) {
		this.options = options;
	}

	async createProducts(files) {
		this.exportedCSVParser.setFileList(files);
		const parsedData = await this.exportedCSVParser.parse();
		if (parsedData) {
			this.products.setParsedData(parsedData);
			this.products.createProducts();
		} else {
		}
	}

	async getTagElementContainer(files) {
		await this.createProducts(files);
		return this.tagElementGenerator.createTagElementContainer(
			this.products.toArray,
			this.options.withBarcodes
		);
	}

	getSummaryTable() {}
}