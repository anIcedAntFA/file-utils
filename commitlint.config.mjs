import { defineConfig } from "cz-git";

const types = [
	"init",
	"feat",
	"update",
	"validate",
	"database",
	"update-log",
	"fix",
	"simple-fix",
	"hotfix",
	"docs",
	"style",
	"refactor",
	"remove",
	"perf",
	"seo",
	"test",
	"ignore",
	"build",
	"update-deps",
	"downgrade-deps",
	"pin-deps",
	"ci",
	"configs",
	"chore",
	"breaking",
	"revert",
	"deploy",
	"bookmark",
	"security",
	"security-critical",
	"lint",
	"green-build",
	"analytics",
	"ui",
	"translation",
	"typo",
	"merge",
	"alien",
	"move",
	"license",
	"ux",
	"architecture",
	"responsive",
	"mock",
	"experiment",
	"animations",
	"cleanup",
	"auth",
	"concurrency",
	"offline",
];

export default defineConfig({
	extends: ["gitmoji"],
	rules: {
		"header-case": [2, "always", "lower-case"],
		"type-empty": [2, "never"],
		"type-case": [2, "always", "lower-case"],
		"type-enum": [2, "always", types],
		"scope-case": [2, "never"],
		"subject-min-length": [2, "always", 2],
		"subject-empty": [2, "never"],
	},
	prompt: {
		alias: {
			b: "chore: bump dependencies",
			c: "chore: update config files",
			f: "docs: fix typos",
			":": "docs: update README",
		},
		themeColorCode: "38;5;043",
		aiDiffIgnore: ["pnpm-lock.yaml", "docs/public"],
		useEmoji: true,
		emojiAlign: "left",
		types: [
			{
				value: "init",
				name: "init:             🎉  Begin a project.",
				emoji: "🎉",
			},
			{
				value: "feat",
				name: "feat:             ✨  Introduce new features.",
				emoji: "✨",
			},
			{
				value: "update",
				name: "update:           👔  Add or update business logic.",
				emoji: "👔",
			},
			{
				value: "validate",
				name: "validate:         🦺  Add or update validation.",
				emoji: "🦺",
			},
			{
				value: "database",
				name: "database:         🗃️  Perform database-related changes.",
				emoji: "🗃️",
			},
			{
				value: "update-log",
				name: "update-log:       🔊  Add or update logs.",
				emoji: "🔊",
			},
			{
				value: "fix",
				name: "fix:              🐛  Fix a bug.",
				emoji: "🐛",
			},
			{
				value: "simple-fix",
				name: "simple-fix:       🩹  Simple fix for a minor issue.",
				emoji: "🩹",
			},
			{
				value: "hotfix",
				name: "hotfix:           🚑️  Critical hotfix.",
				emoji: "🚑️",
			},
			{
				value: "docs",
				name: "docs:             📝  Add or update documentation.",
				emoji: "📝",
			},
			{
				value: "style",
				name: "style:            🎨  Improve code style and formatting.",
				emoji: "🎨",
			},
			{
				value: "refactor",
				name: "refactor:         ♻️  Refactor code without changing behavior.",
				emoji: "♻️",
			},
			{
				value: "remove",
				name: "remove:           🔥  Remove code or files.",
				emoji: "🔥",
			},
			{
				value: "perf",
				name: "perf:             ⚡️  Improve performance.",
				emoji: "⚡️",
			},
			{
				value: "seo",
				name: "seo:              🔍  Improve SEO.",
				emoji: "🔍",
			},
			{
				value: "test",
				name: "test:             ✅  Add, update, or fix tests.",
				emoji: "✅",
			},
			{
				value: "ignore",
				name: "ignore:           🙈  Modify .gitignore or ignore rules.",
				emoji: "🙈",
			},
			{
				value: "build",
				name: "build:            📦️  Modify the build system or dependencies.",
				emoji: "📦️",
			},
			{
				value: "update-deps",
				name: "update-deps:      ⬆️  Upgrade dependencies.",
				emoji: "⬆️",
			},
			{
				value: "downgrade-deps",
				name: "downgrade-deps:   ⬇️  Downgrade dependencies.",
				emoji: "⬇️",
			},
			{
				value: "pin-deps",
				name: "pin-deps:         📌  Pin dependencies to specific versions.",
				emoji: "📌",
			},
			{
				value: "ci",
				name: "ci:               🤖  Update CI/CD configuration.",
				emoji: "🤖",
			},
			{
				value: "configs",
				name: "configs:          🔧  Modify configuration files.",
				emoji: "🔧",
			},
			{
				value: "chore",
				name: "chore:            🔨  Perform maintenance tasks.",
				emoji: "🔨",
			},
			{
				value: "breaking",
				name: "breaking:         💥  Introduce breaking changes.",
				emoji: "💥",
			},
			{
				value: "revert",
				name: "revert:           ⏪️  Revert changes.",
				emoji: "⏪️",
			},
			{
				value: "deploy",
				name: "deploy:           🚀  Deploy the application.",
				emoji: "🚀",
			},
			{
				value: "bookmark",
				name: "bookmark:         🔖  Tag a release or version.",
				emoji: "🔖",
			},
			{
				value: "security",
				name: "security:         🔒️  Fix security vulnerabilities.",
				emoji: "🔒️",
			},
			{
				value: "security-critical",
				name: "security-critical: 🔐  Add or update secrets.",
				emoji: "🔐",
			},
			{
				value: "lint",
				name: "lint:             🚨  Fix linter/compiler warnings.",
				emoji: "🚨",
			},
			{
				value: "green-build",
				name: "green-build:      💚  Fix CI build.",
				emoji: "💚",
			},
			{
				value: "analytics",
				name: "analytics:        📈  Add or update analytics.",
				emoji: "📈",
			},
			{
				value: "ui",
				name: "ui:               💄  Add or update UI and styles.",
				emoji: "💄",
			},
			{
				value: "translation",
				name: "translation:      🌐  Internationalization and localization.",
				emoji: "🌐",
			},
			{
				value: "typo",
				name: "typo:             ✏️  Fix typos.",
				emoji: "✏️",
			},
			{
				value: "merge",
				name: "merge:            🔀  Merge branches.",
				emoji: "🔀",
			},
			{
				value: "alien",
				name: "alien:            👽️  Update due to external API changes.",
				emoji: "👽️",
			},
			{
				value: "move",
				name: "move:             🚚  Move or rename files.",
				emoji: "🚚",
			},
			{
				value: "license",
				name: "license:          📄  Add or update license.",
				emoji: "📄",
			},
			{
				value: "ux",
				name: "ux:               🚸  Improve user experience.",
				emoji: "🚸",
			},
			{
				value: "architecture",
				name: "architecture:     🏗️  Make architectural changes.",
				emoji: "🏗️",
			},
			{
				value: "responsive",
				name: "responsive:       📱  Improve responsive design.",
				emoji: "📱",
			},
			{
				value: "mock",
				name: "mock:             🤡  Mock data or features.",
				emoji: "🤡",
			},
			{
				value: "experiment",
				name: "experiment:       ⚗️  Perform experiments.",
				emoji: "⚗️",
			},
			{
				value: "animations",
				name: "animations:       💫  Add or update animations.",
				emoji: "💫",
			},
			{
				value: "cleanup",
				name: "cleanup:          🗑️  Deprecate unused code.",
				emoji: "🗑️",
			},
			{
				value: "auth",
				name: "auth:             🛂  Work on authentication/authorization.",
				emoji: "🛂",
			},
			{
				value: "concurrency",
				name: "concurrency:      🧵  Modify multithreading/concurrency.",
				emoji: "🧵",
			},
			{
				value: "offline",
				name: "offline:          ✈️  Improve offline support.",
				emoji: "✈️",
			},
		],
	},
});
