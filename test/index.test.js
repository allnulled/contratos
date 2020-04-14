const fs = require("fs");
const Contratos = require(__dirname + "/../src/index.js");
const exec = require("execute-command-sync");
const { expect } = require("chai");

describe("definition", function() {
	
	this.timeout(1000 * 2);

	const tryToUnlink = (f) => {
		try {
			fs.unlinkSync(f);
		} catch(error) {}
	}

	it("compiles", function(done) {
		try {
			tryToUnlink(__dirname + "/data/test1.cnt.json");
			tryToUnlink(__dirname + "/data/test2.cnt.json");
			Contratos.compile({ files: __dirname + "/data/*.cnt" });
			expect(fs.existsSync(__dirname + "/data/test1.cnt.json")).to.equal(true);
			expect(fs.existsSync(__dirname + "/data/test2.cnt.json")).to.equal(true);
			done();
		} catch(error) {
			console.log(error);
			throw error;
		}
	});

	it("checks", function(done) {
		try {
			const out = Contratos.check({ files: __dirname + "/data/*.cnt", debug:true });
			expect(out).to.equal(true);
			done();
		} catch(error) {
			console.log(error);
			throw error;
		}
	});

	it.skip("watches", function(done) {
		try {
			Contratos.watch({ files: __dirname + "/data/*.cnt" });
			done();
		} catch(error) {
			console.log(error);
			throw error;
		}
	});

	it("compiles by CLI", function(done) {
		try {
			tryToUnlink(__dirname + "/data/test1.cnt.json");
			tryToUnlink(__dirname + "/data/test2.cnt.json");
			exec("contratos compile 'test/data/test*.cnt'", { cwd: __dirname + "/.." });
			expect(fs.existsSync(__dirname + "/data/test1.cnt.json")).to.equal(true);
			expect(fs.existsSync(__dirname + "/data/test2.cnt.json")).to.equal(true);
			done();
		} catch(error) {
			console.log(error);
			throw error;
		}
	});

	it("checks by CLI", function(done) {
		try {
			exec("contratos check 'test/data/test*.cnt'", { cwd: __dirname + "/.." });
			done();
		} catch(error) {
			console.log(error);
			throw error;
		}
	});

	it.skip("watches by CLI", function(done) {
		try {
			exec("contratos watch 'test/data/test*.cnt'", { cwd: __dirname + "/.." });
			done();
		} catch(error) {
			console.log(error);
			throw error;
		}
	});

});