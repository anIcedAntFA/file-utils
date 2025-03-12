import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { downloadFile } from "../src/download-file";

describe("downloadFile", () => {
	// Setup mocks for browser-specific APIs
	beforeEach(() => {
		// Create a proper document.body mock
		if (!document.body) {
			Object.defineProperty(document, "body", {
				value: {
					appendChild: vi.fn(),
					removeChild: vi.fn(),
				},
				writable: true,
			});
		} else {
			document.body.appendChild = vi.fn();
			document.body.removeChild = vi.fn();
		}

		// Mock document.createElement, keeping default behavior for other tags
		const originalCreateElement = document.createElement;
		document.createElement = vi.fn().mockImplementation((tag) => {
			if (tag === "a") {
				return {
					href: "",
					download: "",
					click: vi.fn(),
				};
			}
			return originalCreateElement(tag);
		});

		// Mock URL.createObjectURL and revokeObjectURL
		window.URL.createObjectURL = vi.fn().mockReturnValue("blob:mock-url");
		window.URL.revokeObjectURL = vi.fn();

		// Mock fetch API
		window.fetch = vi.fn().mockResolvedValue({
			ok: true,
			blob: vi.fn().mockResolvedValue(new Blob(["test data"])),
		});
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	it("should create a link element and trigger download", async () => {
		await downloadFile("https://example.com/file.pdf", "example.pdf");

		expect(document.createElement).toHaveBeenCalledWith("a");
		expect(document.body.appendChild).toHaveBeenCalled();
		expect(document.body.removeChild).toHaveBeenCalled();
	});

	it("should throw an error for invalid URLs", async () => {
		await expect(downloadFile("invalid-url", "example.pdf")).rejects.toThrow(
			"Invalid file URL",
		);
	});

	it("should use fetch when forceDownload is true", async () => {
		await downloadFile("https://example.com/file.pdf", "example.pdf", {});

		expect(fetch).toHaveBeenCalledWith("https://example.com/file.pdf", {
			signal: undefined,
		});
		expect(URL.createObjectURL).toHaveBeenCalled();
		expect(URL.revokeObjectURL).toHaveBeenCalled();
	});

	it("should handle fetch response that is not ok", async () => {
		// Mock a failed fetch response
		window.fetch = vi.fn().mockResolvedValue({
			ok: false,
			status: 404,
			statusText: "Not Found",
		});

		await expect(
			downloadFile("https://example.com/file.pdf", "example.pdf", {}),
		).rejects.toThrow(
			"Error downloading file: Failed to fetch file: 404 Not Found.",
		);
	});

	it("should handle fetch blob error", async () => {
		// Mock a fetch response with a blob method that throws an error
		window.fetch = vi.fn().mockResolvedValue({
			ok: {},
			blob: vi.fn().mockRejectedValue(new Error("Failed to create blob")),
		});

		await expect(
			downloadFile("https://example.com/file.pdf", "example.pdf", {}),
		).rejects.toThrow("Error downloading file: Failed to create blob.");
	});

	it("should handle network error during fetch", async () => {
		// Mock a network error during fetch
		window.fetch = vi.fn().mockRejectedValue(new Error("Network error"));

		await expect(
			downloadFile("https://example.com/file.pdf", "example.pdf", {}),
		).rejects.toThrow("Error downloading file: Network error.");
	});

	it("should handle non-Error exceptions", async () => {
		// Mock a non-Error exception during fetch
		window.fetch = vi.fn().mockRejectedValue("Some unknown error");

		await expect(
			downloadFile("https://example.com/file.pdf", "example.pdf", {}),
		).rejects.toThrow("Error downloading file: An unknown error.");
	});

	it("should pass the abort signal to fetch", async () => {
		// Create a mock AbortSignal
		const mockSignal = {} as AbortSignal;

		await downloadFile("https://example.com/file.pdf", "example.pdf", {});

		expect(fetch).toHaveBeenCalledWith("https://example.com/file.pdf", {
			signal: mockSignal,
		});
	});
});
