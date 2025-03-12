import { readFile } from "node:fs";
import { promisify } from "node:util";

const readFileAsync = promisify(readFile);

// the *.hbs template and partials should be passed as strings of contents
const template = readFileAsync("./default-template.hbs");
let choreMessage = "";
if (process.env.GITHUB_ACTIONS) {
	// CI IS SET
	choreMessage = ":construction_worker: chore(release): ${nextRelease.version}";
} else {
	// CI IS NOT SET
	choreMessage =
		":construction_worker: chore(release): ${nextRelease.version} [skip ci]";
}

export default {
	branches: ["main", { name: "next", prerelease: true }],
	plugins: [
		[
			"semantic-release-gitmoji",
			{
				releaseRules: {
					// Major version bumps
					major: [
						":boom:", // "💥": Breaking changes
						":firecracker:", // "🧨": Breaking changes,
						":building_construction:", // "🏗️": Architectural changes.
					],
					// Minor version bumps
					minor: [
						":sparkles:", // "✨": New feature
					],
					// Patch version bumps
					patch: [
						":zap:", // "⚡": Improve performance.
						":bug:", // "🐛": Fix a bug.
						":ambulance:", // "🚑": Critical hotfix.
						":lipstick:", // "💄": Add or update the UI and style files.
						":lock:", // "🔒": Fix security or privacy issues.
						":arrow_down:", // "⬇️": Downgrade dependencies.
						":arrow_up:", // "⬆️": Upgrade dependencies.
						":pushpin:", // "📌": Pin dependencies to specific versions.
						":chart_with_upwards_trend:", // "📊": Add or update analytics or track code.
						":heavy_plus_sign:", // "➕": Add a dependency.
						":heavy_minus_sign:", // "➖": Remove a dependency.
						":wrench:", // "🔧": Add or update configuration files.
						":globe_with_meridians:", // "🌐": Internationalization and localization.
						":pencil2:", // "✏️": Fix typos.
						":rewind:", // "⏪": Revert changes.
						":package:", // "📦": Add or update compiled files or packages.
						":alien:", // "👽": Update code due to external API changes.
						":bento:", // "🍱": Add or update assets.
						":wheelchair:", // "♿": Improve accessibility.
						":speech_balloon:", // "💬": Add or update text and literals.
						":card_file_box:", // "🗃️": Perform database related changes.
						":children_crossing:", // "🚸": Improve user experience / usability.
						":iphone:", // "📱": Work on responsive design.
						":egg:", // "🥚": Add or update an easter egg.
						":alembic:", // "🧪": Perform experiments.
						":mag:", // "🔍": Improve SEO.
						":label:", // "🏷️": Add or update types.
						":triangular_flag_on_post:", // "🚩": Add, update, or remove feature flags.
						":goal_net:", // "🥅": Catch errors.
						":dizzy:", // "💫": Add or update animations and transitions.
						":wastebasket:", // "🗑️": Deprecate code that needs to be cleaned up.
						":passport_control:", // "🛂": Work on code related to authorization, roles, and permissions.
						":adhesive_bandage:", // "🩹": Simple fix for a non-critical issue.
						":necktie:", // "👔": Add or update business logic.
						":recycle:", // "♻️": Refactor code.
					],
				},
				// Ensure `cz-git` and `semantic-release-gitmoji` work correctly together
				parserOpts: {
					noteKeywords: ["BREAKING CHANGE", "BREAKING CHANGES"],
				},
				releaseNotes: {
					template,
				},
			},
		],
		[
			"@semantic-release/changelog",
			{
				changelogFile: "CHANGELOG.md",
				changelogTitle: "# Changelog",
			},
		],
		[
			"@semantic-release/npm",
			{
				// Ensure package.json is updated with the new version
				npmPublish: true,
				tarballDir: "dist",
			},
		],
		[
			"@semantic-release/git",
			{
				assets: ["package.json", "CHANGELOG.md"],
				message: [
					":bookmark: v${nextRelease.version} [skip ci]",
					"",
					"chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}",
				].join("\n"),
			},
		],
		[
			"@semantic-release/github",
			{
				assets: [{ path: "dist/*.tgz", label: "npm package" }],
			},
		],
	],
};
