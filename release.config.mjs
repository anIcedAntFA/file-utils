/**
 * @type {import('semantic-release').GlobalConfig}
 */
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
						":firecracker:", // "🧨": Breaking changes
					],
					// Minor version bumps
					minor: [
						":sparkles:", // "✨": New feature
						":tada:", // "🎉": New feature
						":rocket:", // "🚀": Performance improvements
						":wheelchair:", // "♿": Accessibility
						":building_construction:", // "🏗️": Architecture changes
					],
					// Patch version bumps
					patch: [
						":bug:", // "🐛": Bug fix
						":adhesive_bandage:", // "🩹": Simple fix
						":lock:", // "🔒": Security
						":zap:", // "⚡": Performance
						":recycle:", // "♻️": Refactor
						":wrench:", // "🔧": Configuration
						":arrow_up:", // "⬆️": Dependencies
						":memo:", // "📝": Documentation
						":ambulance:", // "🚑": Critical hotfix
						":magnifying_glass:", // "🔍": SEO improvements
					],
				},
				// Ensure `cz-git` and `semantic-release-gitmoji` work correctly together
				parserOpts: {
					noteKeywords: ["BREAKING CHANGE", "BREAKING CHANGES"],
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
					"chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}",
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
