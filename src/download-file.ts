import { createAndClickDownloadLink } from "./helper";

/**
 * Represents possible file data sources for download.
 * Can be a URL string, File object, Blob, or ArrayBuffer.
 */
export type FileSource = string | File | Blob | ArrayBuffer;

/**
 * Configuration options for file downloads.
 */
export interface DownloadFileOptions {
	/**
	 * MIME type for the file content.
	 * Applied when source is a string or ArrayBuffer.
	 * Defaults to "text/plain" for strings and "application/octet-stream" for ArrayBuffers.
	 */
	mimeType?: string;
	/**
	 * Whether to force download as a file instead of displaying in browser.
	 * When true, creates a download link (useful for PDFs, images, etc.).
	 * When false, opens content in a new tab if browser can display it.
	 * @default true
	 */
	forceDownload?: boolean;
}

/**
 * Downloads or displays file content from various sources.
 *
 * Handles multiple source types:
 * - Strings (treated as text content)
 * - Files (used directly)
 * - Blobs (used directly)
 * - ArrayBuffers (converted to Blob)
 *
 * @param {string} fileSource - The content to download (string, File, Blob, or ArrayBuffer)
 * @param {string} fileName - Optional name for the downloaded file
 *                   If omitted, uses File.name or defaults to "download-file"
 * @param {string} options - Configuration options for the download process
 *
 * @example
 * // Download text as a file
 * downloadFile("Hello, world!", "greeting.txt");
 *
 * @example
 * // Download binary data with specific MIME type
 * downloadFile(arrayBufferData, "data.bin", {
 *   mimeType: "application/octet-stream"
 * });
 *
 * @example
 * // Open a PDF in browser instead of downloading
 * downloadFile(pdfBlob, "document.pdf", { forceDownload: false });
 */
export function downloadFile(
	fileSource: FileSource,
	fileName?: string,
	options: DownloadFileOptions = {},
): void {
	const { mimeType, forceDownload = true } = options;

	const resolvedFileName = getFileName(fileSource, fileName);

	let blob: Blob;

	if (fileSource instanceof Blob) {
		blob = fileSource;
	} else if (fileSource instanceof ArrayBuffer) {
		blob = new Blob([fileSource], {
			type: mimeType || "application/octet-stream",
		});
	} else if (typeof fileSource === "string") {
		blob = new Blob([fileSource], { type: mimeType || "text/plain" });
	} else {
		throw new Error("Unsupported file type");
	}

	const blobURL = URL.createObjectURL(blob);

	if (forceDownload) {
		createAndClickDownloadLink(blobURL, resolvedFileName);
		setTimeout(() => URL.revokeObjectURL(blobURL), 0);
	} else {
		// For content the browser can display, open in new tab unless forceDownload is set
		window.open(blobURL, "_blank");
	}
}

/**
 * Determines appropriate filename based on the file source and provided name.
 *
 * @param fileSource - The source of the file content
 * @param fileName - Optional explicit filename to use
 * @returns The resolved filename to use for the download
 */
function getFileName(fileSource: FileSource, fileName?: string): string {
	if (fileName) return fileName;

	if (fileSource instanceof File) return fileSource.name;

	return "download-file";
}
