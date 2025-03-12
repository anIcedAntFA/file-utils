/**
 * Creates an anchor (`<a>`) element, sets it up for downloading a file,
 * programmatically clicks it, and then removes it from the document.
 *
 * @param {string} href - The URL of the file to be downloaded.
 * @param {string} name - The name of the file for the downloaded content.
 */
export function createAndClickDownloadLink(href: string, name: string): void {
	const link = document.createElement("a");
	link.href = href;
	link.download = name;
	link.style.display = "none";
	link.rel = "noopener";

	document.body.appendChild(link);
	link.click();

	// Use setTimeout to ensure the browser processes the click event before removing the element.
	// This prevents potential issues where removing the link immediately could interfere with the download process,
	// particularly in some browsers that require a slight delay for the download action to take effect.
	setTimeout(() => document.body.removeChild(link), 0);
}
