import { defineConfig } from "tsup";

export default defineConfig({
	entry: ["src/index.ts"],
	format: ["cjs", "esm"],
	dts: true,
	splitting: false,
	sourcemap: true,
	clean: true,
	minify: true,
	treeshake: true,
	shims: true,
	target: "es2020",
	outExtension({ format }) {
		return {
			js: format === "cjs" ? ".js" : ".mjs",
		};
	},
	esbuildOptions(options) {
		options.footer = {
			// This adds a banner to the generated files
			js: "// file-utils - https://github.com/anIcedAntFA/file-utils",
		};
	},
});
