const fs = require("fs");
const path = require("path");
const chokidar = require("chokidar");
const globby = require("globby");
const ContratosParser = require(__dirname + "/contratos.js");

class Contratos {

	static $error(error, options = {}) {
		console.error(error);
	}

	static $debug(error, options = {}) {
		if(options.debug) {
			console.error(error);
		}
	}

	static parse(...args) {
		return ContratosParser.parse(...args);
	}

	static check(options = {}) {
		if(!options.files) {
			throw new Error("Parameter <files> required to <check>");
		}
		try {
			const matches = globby.sync(options.files);
			if(matches.length === 0) {
				throw new Error("No files matched by <" + JSON.stringify(options.files) + ">");
			}
			this.$debug("Found " + matches.length + " files.", options);
			for(let i=0; i<matches.length; i++) {
				const match = matches[i];
				this.$debug("  Checking " + path.basename(match) + ".", options);
				const text = fs.readFileSync(match).toString();
				ContratosParser.parse(text);
			}
			this.$debug("All files were okay.", options);
			return true;
		} catch(error) {
			return error;
		}
	}

	static compile(options = {}) {
		if(!options.files) {
			throw new Error("Parameter <files> required to <compile>");
		}
		let currentFile = undefined;
		try {
			const matches = globby.sync(options.files);
			if(matches.length === 0) {
				throw new Error("No files matched by <" + JSON.stringify(options.files) + ">");
			}
			this.$debug("Found " + matches.length + " files.", options);
			const output = [];
			for(let i=0; i<matches.length; i++) {
				const match = matches[i];
				this.$debug("  Compiling " + path.basename(match) + ".", options);
				const text = fs.readFileSync(match).toString();
				const data = ContratosParser.parse(text);
				fs.writeFileSync(match + ".json", JSON.stringify(data, null, 4), "utf8");
				output.push({ file:match, data });
			}
			this.$debug("All files were okay.", options);
			return { input: matches, output};
		} catch(error) {
			throw error;
		}
	}

	static watch(options = {}) {
		if(!options.files) {
			throw new Error("Parameter <files> required to <watch>");
		}
		try {
			const matches = globby.sync(options.files);
			if(matches.length === 0) {
				throw new Error("No files matched by <" + JSON.stringify(options.files) + ">");
			}
			this.$debug("Found " + matches.length + " files.", options);
			const watcher = chokidar.watch(matches).on("change", (file) => {
				this.compile({ files: file });
				this.$debug("Finished. Watching for changes again...");
			});
			this.$debug("Watching for changes...");
			return { input: matches, output: watcher };
		} catch(error) {
			throw error;
		}
	}

}

module.exports = Contratos;