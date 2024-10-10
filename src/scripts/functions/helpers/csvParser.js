/**
 * An asynchronous function which parses a CSV string of data and returns a
 * "Parse Result Object".
 * @param {String} csvDataString A string of data in CSV format.
 * @returns {ParseResultObject} An Object which contains three properties: data, errors and meta.
 */
export default function csvParser(csvStringData) {
	if (csvStringData.length > 0) {
		var parsedData = Papa.parse(csvStringData);
	} else {
		console.log("csvParser() - No Data");
		// hasGenerated = false;
	}

	return parsedData;
}
