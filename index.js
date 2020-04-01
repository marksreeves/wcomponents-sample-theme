const pkgJson = require("./package.json");
const fs = require("fs-extra");
const path = require("path");
const MergeTrees = require('merge-trees');
const merge = require("deepmerge");
const rootDir = __dirname;

if (require.main === module) {
	let dirs = init();
	copyI18n(dirs.targetDir);
	buildDirs(dirs.themeDir, dirs.srcDir, dirs.targetDir);
}

/**
 * Determines what we are building and where, creates necessary build directory etc.
 */
function init() {
	let srcDir = path.join(rootDir, pkgJson.directories.src);
	let targetDir = path.join(rootDir, pkgJson.directories.target);
	let themeDir = path.join(targetDir, "wcomponents-theme");
	fs.mkdirpSync(targetDir);
	return { srcDir, targetDir, themeDir };
}


function buildDirs(themeDir, sourceDir, targetDir) {
	fs.removeSync(path.join(themeDir, "target"));
	let mergeDir = path.join(targetDir, "merged");
	fs.removeSync(mergeDir);
	// copy wcomponents-theme to a merge location
	fs.copySync(themeDir, mergeDir);

	// merge this theme's source into the merge source
	let mergeSrc = path.join(mergeDir, "src");
	fs.removeSync(mergeSrc);
	var mergeTrees = new MergeTrees([path.join(themeDir,"src"), sourceDir], mergeSrc, { overwrite: true });
	mergeTrees.merge();
	// modify the wcomponents-theme package JSON to refer to this theme
	mergePkg(themeDir, mergeDir);
	
	// this theme does not have a .npmrc and at the time of 
	// writing neither did wcomponents-theme if either or
	// both change then they will need to be merged into 
	// the mergeDir


}

function mergePkg(themeDir, mergeDir) {

	let themePkg = require(path.join(themeDir, "package.json"));
	let mergePkg = merge(themePkg, pkgJson);
	// modify the merged target to point back to the maven target.
	mergePkg.directories.target = "../target";

	let targetPath = path.join(mergeDir, "package.json");
	fs.removeSync(targetPath);
	fs.writeFileSync(targetPath, JSON.stringify(mergePkg, null, "\t"), "utf8");

}

function copyI18n(targetDir) {
	let i18nFromDir = path.join(targetDir, "wcomponents-i18n", "com");  // When we unpack i18n we will have this structure
	let i18nToDir = path.join(targetDir, "wcomponents-i18n", "src", "main", "resources", "com");  // The build script expects this structure
	fs.moveSync(i18nFromDir, i18nToDir);
}

module.exports = {
	buildDirs
};
