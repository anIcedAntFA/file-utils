import { createAndClickDownloadLink } from "./helper";
import { isValidURL } from "./validation";

/**
 * Configuration options for remote file downloads.
 */
export interface DownloadRemoteFileOptions {
	/**
	 * Controls download method:
	 * - When true (default): Uses fetch API to download the file first, then creates a download link
	 * - When false: Creates a direct download link to the remote URL
	 *
	 * Note: Using fetch (true) provides more control over the download process but requires CORS access.
	 * Direct links (false) may work better for cross-origin resources but offer less control.
	 *
	 * @default true
	 */
	forceDownload?: boolean;
	/**
	 * Callback function invoked when download completes successfully.
	 * Useful for triggering UI updates or follow-up actions.
	 */
	onSuccess?: VoidFunction;
	/**
	 * Callback function invoked when an error occurs during download.
	 * Receives the error object with details about what went wrong.
	 * This callback is executed before the error is thrown.
	 */
	onError?: (error: Error) => void;
}

/**
 * Downloads a file from a remote URL with error handling and success callbacks.
 *
 * This function supports two download methods:
 * 1. Fetch API (default) - Downloads the file first then creates a download link
 * 2. Direct link - Creates a download link directly to the remote URL
 *
 * The fetch method provides more control and better error handling but requires CORS access.
 *
 * @param {string} fileURL - The complete URL of the file to download
 * @param {string} fileName - Name to save the file as (defaults to "download-file" if not provided)
 * @param {DownloadRemoteFileOptions} options - Configuration options including callbacks and download method
 * @returns A Promise that resolves when the download is complete
 * @throws Error if the URL is invalid or if the download fails
 *
 * @example
 * // Basic usage with default options
 * try {
 *   await downloadRemoteFile('https://example.com/file.pdf');
 *   console.log('Download successful');
 * } catch (err) {
 *   console.error('Download failed:', err);
 * }
 *
 * @example
 * // Custom filename with success and error callbacks
 * await downloadRemoteFile(
 *   'https://example.com/file.pdf',
 *   'my-document.pdf',
 *   {
 *     onSuccess: () => showNotification('Download complete'),
 *     onError: (error) => logError('Download failed', error)
 *   }
 * );
 *
 * @example
 * // Using direct link download (no fetch)
 * await downloadRemoteFile(
 *   'https://example.com/file.pdf',
 *   'my-document.pdf',
 *   { forceDownload: false }
 * );
 */
export async function downloadRemoteFile(
	fileURL: string,
	fileName?: string,
	options: DownloadRemoteFileOptions = {},
): Promise<void> {
	const { forceDownload = true, onSuccess, onError } = options;
	const resolvedFileName = fileName || "download-file";

	// Validate the URL before proceeding
	if (!isValidURL(fileURL)) {
		const error = new Error(`Invalid file URL: ${fileURL}`);
		if (onError) onError(error);
		throw error;
	}

	// If not forcing download, use direct link method and exit
	if (!forceDownload) {
		try {
			createAndClickDownloadLink(fileURL, resolvedFileName);
			if (onSuccess) onSuccess();
			return;
		} catch (error) {
			const formattedError =
				error instanceof Error
					? error
					: new Error(`Error creating download link: ${String(error)}`);
			if (onError) onError(formattedError);
			throw formattedError;
		}
	}

	// Otherwise use fetch method
	try {
		const fileResponse = await fetch(fileURL);
		if (!fileResponse.ok) {
			throw new Error(
				`Failed to fetch file: ${fileResponse.status} ${fileResponse.statusText}.`,
			);
		}

		const fileBlob = await fileResponse.blob();
		const blobURL = URL.createObjectURL(fileBlob);

		createAndClickDownloadLink(blobURL, resolvedFileName);
		setTimeout(() => URL.revokeObjectURL(blobURL), 0);

		if (onSuccess) onSuccess();
	} catch (error) {
		const formattedError =
			error instanceof Error
				? new Error(`Error downloading file: ${error.message}`)
				: new Error(`Error downloading file: ${String(error)}`);

		if (onError) {
			onError(formattedError);
		}

		throw formattedError;
	}
}
