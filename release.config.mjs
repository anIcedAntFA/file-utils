import { readFile } from "node:fs";
import { promisify } from "node:util";

const readFileAsync = promisify(readFile);

// the *.hbs template and partials should be passed as strings of contents
const template = readFileAsync("./default-template.hbs");
let choreMessage = "";
if (process.env.GITHUB_ACTIONS) {
	// CI IS SET
	choreMessage = ":hammer: chore(release): ${nextRelease.version}";
} else {
	// CI IS NOT SET
	choreMessage = ":hammer: chore(release): ${nextRelease.version} [skip ci]";
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
						":zap:", // "⚡️" Improve performance.
						":bug:", // "🐛" Fix a bug.
						":ambulance:", // "🚑️" Critical hotfix.
						":lipstick:", // "💄" Add or update UI and style files.
						":lock:", // "🔒️" Fix security vulnerabilities.
						":arrow_down:", // "⬇️" Downgrade dependencies.
						":arrow_up:", // "⬆️" Upgrade dependencies.
						":pushpin:", // "📌" Pin dependencies to specific versions.
						":chart_with_upwards_trend:", // "📈" Add or update analytics or tracking code.
						":heavy_plus_sign:", // "➕" Add a dependency.
						":heavy_minus_sign:", // "➖" Remove a dependency.
						":wrench:", // "🔧" Add or update configuration files.
						":globe_with_meridians:", // "🌐" Internationalization and localization.
						":pencil2:", // "✏️" Fix typos.
						":rewind:", // "⏪️" Revert changes.
						":package:", // "📦️" Add or update compiled files or packages.
						":alien:", // "👽️" Update code due to external API changes.
						":bento:", // "🍱" Add or update assets.
						":wheelchair:", // "♿️" Improve accessibility.
						":speech_balloon:", // "💬" Add or update text and literals.
						":card_file_box:", // "🗃️" Perform database-related changes.
						":children_crossing:", // "🚸" Improve user experience / usability.
						":iphone:", // "📱" Work on responsive design.
						":egg:", // "🥚" Add or update an easter egg.
						":test_tube:", // "🧪" Add a failing test.
						":white_check_mark:", // "✅" Add or update tests.
						":mag:", // "🔍️" Improve SEO.
						":label:", // "🏷️" Add or update types.
						":triangular_flag_on_post:", // "🚩" Add, update, or remove feature flags.
						":goal_net:", // "🥅" Catch errors.
						":dizzy:", // "💫" Add or update animations and transitions.
						":wastebasket:", // "🗑️" Deprecate old code that needs removal.
						":passport_control:", // "🛂" Work on authentication, roles, or permissions.
						":adhesive_bandage:", // "🩹" Simple fix for a non-critical issue.
						":necktie:", // "👔" Add or update business logic.
						":recycle:", // "♻️" Refactor code without changing behavior.
						":twisted_rightwards_arrows:", // "🔀" Merge branches.
						":fire:", // "🔥" Remove code or files.
						":construction:", // "🚧" Work in progress.
						":rotating_light:", // "🚨" Fix compiler/linter warnings.
						":chart_with_upwards_trend:", // "📈" Improve tracking or metrics.
						":construction_worker:", // "👷" Add or update CI/CD pipeline.
						":money_with_wings:", // "💸" Handle financial transactions or payments.
						":technologist:", // "🧑‍💻" Improve developer experience.
						":bricks:", // "🧱" Infrastructure-related changes.
						":stethoscope:", // "🩺" Add or update health checks.
						":thread:", // "🧵" Work on concurrency or parallel processing.
						":safety_vest:", // "🦺" Add or update validation logic.
						":clown_face:", // "🤡" Mock or test something in a fun way.
						":poop:", // "💩" Write or improve bad code (tech debt).
						":beers:", // "🍻" Work done while having fun.
						":monocle_face:", // "🧐" Data exploration or inspection.
						":coffin:", // "⚰️" Remove dead code.
						":bulb:", // "💡" Add or update comments in source code.
						":camera_flash:", // "📸" Add or update snapshots (testing).
						":seedling:", // "🌱" Add or update seed data files.
						":alembic:", // "⚗️" Experiment with new ideas.
						":airplane:", // "✈️" Improve offline support.
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
				message:
					":hammer: chore(release): v${nextRelease.version} [skip ci]\n\n${nextRelease.notes}",
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
