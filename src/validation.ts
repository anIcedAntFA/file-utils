/**
 * Regular expression for validating URLs.
 * Checks for common URL patterns including http://, https://, file://, etc.
 */
export const VALID_URL_REGEX =
	/^(https?|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]*[-A-Za-z0-9+&@#/%=~_|]$/;

/**
 * Validates if a given string is a valid URL.
 *
 * @param {string} url - The URL string to validate.
 * @returns {boolean} - Returns true if the URL is valid, false otherwise.
 */
export function isValidURL(url: string): boolean {
	return VALID_URL_REGEX.test(url);
}

/**
 * Validates if a given file name is valid.
 *
 * @param {string} fileName - The file name to validate.
 * @returns {boolean} - Returns true if the file name is valid, false otherwise.
 */
export function isValidFileName(fileName: string): boolean {
	// Basic validation: filename should not contain invalid characters
	// biome-ignore lint/suspicious/noControlCharactersInRegex: <explanation>
	const invalidChars = /[<>:"/\\|?*\x00-\x1F]/g;
	return fileName.length > 0 && !invalidChars.test(fileName);
}
