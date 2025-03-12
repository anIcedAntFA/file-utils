import { defineConfig } from "cz-git";

export default defineConfig({
	extends: ["@commitlint/config-conventional"],
	rules: {
		"header-case": [2, "always", "lower-case"],
		"scope-enum": [2, "always", ["test", "site", "cli"]],
		"subject-min-length": [2, "always", 2],
		"subject-empty": [2, "never"],
	},
	prompt: {
		alias: {
			b: "chore: bump dependencies",
			c: "chore: update config files",
			f: "docs: fix typos",
			":": "docs: update README",
			schema: "chore: update czrc configure JSON schema",
			"table:data": "chore: :hammer: update project using table data",
			"table:docs": "docs: update project using table",
		},
		themeColorCode: "38;5;043",
		aiDiffIgnore: ["pnpm-lock.yaml", "docs/public"],
		types: [
			{
				value: "init",
				name: "init:            🎉  Begin a project.",
				emoji: ":tada:",
			},
			{
				value: "feat",
				name: "feat:            ✨  A new feature",
				emoji: ":sparkles:",
			},
			{
				value: "update",
				name: "update:          👔  Add or update business logic.",
				emoji: ":necktie:",
			},
			{
				value: "validate",
				name: "validate:        🦺  Add or update code related to validation.",
				emoji: ":safety_vest:",
			},
			{
				value: "database",
				name: "database:        🗃️   Perform database related changes.",
				emoji: ":card_file_box:",
			},
			{
				value: "update-log",
				name: "update-log:      🔊  Add or update logs.",
				emoji: ":loud_sound:",
			},
			{
				value: "fix",
				name: "fix:             🐛  A bug fix",
				emoji: ":bug:",
			},
			{
				value: "simple-fix",
				name: "simple-fix:      🩹  Simple fix for a non-critical issue.",
				emoji: ":adhesive_bandage:",
			},
			{
				value: "hotfix",
				name: "hotfix:          🚑️  Critical hotfix.",
				emoji: ":bug:",
			},
			{
				value: "docs",
				name: "docs:            📝  Documentation only changes",
				emoji: ":memo:",
			},
			{
				value: "style",
				name: "style:           💄  Changes that do not affect the meaning of the code",
				emoji: ":lipstick:",
			},
			{
				value: "refactor",
				name: "refactor:        ♻️   A code change that neither fixes a bug nor adds a feature",
				emoji: ":recycle:",
			},
			{
				value: "in-progress",
				name: "in-progress:     🚧  Work in progress.",
				emoji: ":construction:",
			},
			{
				value: "remove",
				name: "remove:          🔥  Remove code or files.",
				emoji: ":fire:",
			},
			{
				value: "perf",
				name: "perf:            ⚡️  A code change that improves performance",
				emoji: ":mag:",
			},
			{
				value: "seo",
				name: "seo:             🔍️  Improve SEO.",
				emoji: ":zap:",
			},
			{
				value: "test",
				name: "test:            ✅  Adding missing tests or correcting existing tests",
				emoji: ":white_check_mark:",
			},
			{
				value: "ignore",
				name: "ignore:          🙈  Add or update a .gitignore file.",
				emoji: ":see_no_evil:",
			},
			{
				value: "build",
				name: "build:           📦️  Changes that affect the build system or external dependencies",
				emoji: ":package:",
			},
			{
				value: "update-deps",
				name: "update-deps:     ⬆️   Upgrade dependencies.",
				emoji: ":arrow_up:",
			},
			{
				value: "ci",
				name: "ci:              🎡  Changes to our CI configuration files and scripts",
				emoji: ":ferris_wheel:",
			},
			{
				value: "configs",
				name: "configs:         🔧  Add or update configuration files.",
				emoji: ":wrench:",
			},
			{
				value: "chore",
				name: "chore:           🔨  Other changes that don't modify src or test files",
				emoji: ":hammer:",
			},
			{
				value: "breaking",
				name: "breaking-change: 💥  Introduce breaking changes.",
				emoji: ":boom:",
			},
			{
				value: "revert",
				name: "revert:          ⏪️  Reverts a previous commit",
				emoji: ":rewind:",
			},
			{
				value: "deploy",
				name: "deploy:          🚀  Deploy stuff.",
				emoji: ":rocket:",
			},
			{
				value: "bookmark",
				name: "bookmark:        🔖  Release / Version tags.",
				emoji: ":bookmark:",
			},
			{
				value: "lock",
				name: "lock:            🔒️  Fix security or privacy issues.",
				emoji: ":lock:",
			},
			{
				value: "closed-lock",
				name: "closed-lock:     🔐  Fix security or privacy issues.",
				emoji: ":closed_lock_with_key:",
			},
		],
		useEmoji: true,
		emojiAlign: "center",
	},
});
