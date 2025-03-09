import { describe, expect, it } from "vitest";
import { isValidFileName, isValidURL } from "../src";

describe("validation utils", () => {
	describe("isValidURL", () => {
		it("should return true for valid URLs", () => {
			expect(isValidURL("https://example.com")).toBe(true);
			expect(isValidURL("http://example.com/path/to/file.pdf")).toBe(true);
			expect(isValidURL("file:///path/to/file.pdf")).toBe(true);
		});

		it("should return false for invalid URLs", () => {
			expect(isValidURL("example.com")).toBe(false);
			expect(isValidURL("not a url")).toBe(false);
			expect(isValidURL("")).toBe(false);
		});
	});

	describe("isValidFileName", () => {
		it("should return true for valid file names", () => {
			expect(isValidFileName("file.pdf")).toBe(true);
			expect(isValidFileName("my-file.txt")).toBe(true);
			expect(isValidFileName("document_1.docx")).toBe(true);
		});

		it("should return false for invalid file names", () => {
			expect(isValidFileName("")).toBe(false);
			expect(isValidFileName("file?.pdf")).toBe(false);
			expect(isValidFileName("file/name.txt")).toBe(false);
		});
	});
});
