import csvParser from "./helpers/csvParser.js";
import fileInputReader from "./helpers/fileInputReader.js";

/**
 * Parses the exported CSV file.
 */
export default class ExportedCSVParser {
	constructor() {
		this.fileList = null;
	}

	setFileList(fileList) {
		this.fileList = fileList;
	}

	/**
	 * Parses the files supplied during initialization
	 * @returns
	 */
	async parse() {
		if (this.fileList) {
			const data = await fileInputReader(this.fileList);
			if (data) {
				const parsedData = csvParser(data);
				if (parsedData) {
					return parsedData;
				} else {
					console.error("Parsing failed");
					return null;
				}
			} else {
				console.error("No data received from fileInputReader");
				return null;
			}
		} else {
			console.error("No files to parse.");
			return null;
		}
	}
}
