import csvParser from "./helpers/csvParser.js";
import fileInputReader from "./helpers/fileInputReader.js";

/**
 * Parses the exported CSV file.
 */
export default class ExportedCSVParser {
	constructor() {
		this.files = null;
	}

	setFiles(files) {
		this.files = files;
	}

	/**
	 * Parses the files supplied during initialization
	 * @returns
	 */
	async parse() {
		if (this.files) {
			const data = await fileInputReader(files);
			if (data) {
				const parsedData = csvParser(data);
				if (parsedData) {
					return parsedData;
				} else {
					console.log("parsing failed");
					return null;
				}
			} else {
				console.error("No data received from fileInputReader");
			}
		} else {
			console.log("No files to parse.");
			return null;
		}
	}
}
