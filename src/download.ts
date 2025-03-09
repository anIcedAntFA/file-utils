import { isValidURL } from "./validation";

/**
 * Downloads a file from a given URL.
 *
 * This function handles the downloading of a file by either directly triggering the download
 * or forcefully downloading the file using the `fetch` API if specified. It creates a temporary
 * link element, appends it to the document, triggers a click to download the file, and then removes
 * the link from the DOM. If `forceDownload` is true, the file is fetched as a Blob before being
 * downloaded.
 *
 * @param {string} fileURL - The URL of the file to be downloaded.
 * @param {string} fileName - The name that the downloaded file should have.
 * @param {boolean} forceDownload - A flag that determines whether to force the download using `fetch`. Defaults to false.
 * @param {AbortSignal} signal - Optional signal to abort the fetch request.
 *
 * @returns A promise that resolves when the download is triggered.
 * @throws Error if the file URL is invalid or if the fetch request fails.
 */
export async function downloadFile(
	fileURL: string,
	fileName: string,
	forceDownload = false,
	signal?: AbortSignal,
): Promise<void> {
	/**
	 * Create a temporary download link, triggers a click event, and removes the link.
	 *
	 * @param {string} href - The URL of the file to be downloaded.
	 * @param {string} name - The name to assign to the downloaded file.
	 */
	function handleBuildLink(href: string, name: string): void {
		const link = document.createElement("a");
		link.href = href;
		link.download = name;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	}

	if (!isValidURL(fileURL)) {
		throw new Error("Invalid file URL");
	}

	if (!forceDownload) {
		handleBuildLink(fileURL, fileName);
		return;
	}

	try {
		const fileResponse = await fetch(fileURL, { signal });
		if (!fileResponse.ok) {
			throw new Error(
				`Failed to fetch file: ${fileResponse.status} ${fileResponse.statusText}.`,
			);
		}

		const fileBlob = await fileResponse.blob();
		const blobURL = URL.createObjectURL(fileBlob);
		handleBuildLink(blobURL, fileName);
		URL.revokeObjectURL(blobURL);
	} catch (error) {
		if (error instanceof Error) {
			throw new Error(`Error downloading file: ${error.message}.`);
		}
		throw new Error("Error downloading file: An unknown error.");
	}
}
