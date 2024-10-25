/**
 * An asynchronous function which reads a file and returns an object containing the result or an error message.
 * @param {FileList} files A list of files received from a forms file input.
 */
export default async function fileInputReader(files) {
	const [file] = files;
	if (!file) {
		// console.log("fileInputReader() - No Files");
		return;
	}
	return await file.text();
}
