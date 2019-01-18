// var path = require("path");
var prettyStandard = require("../");
var test = require("tape");
// var filePath = path.resolve("./bin/cmd.js");

test("api usage", function(t) {
  t.plan(3);
  prettyStandard.lintFiles([], { cwd: "bin" }, function(err, result) {
    t.error(err, "no error while linting");
    t.equal(typeof result, "object", "result is an object");
    t.equal(result.errorCount, 0, "no errors");

    // t.equal(
    //   path.resolve(result.results[0].filePath),
    //   filePath,
    //   "error filepath correct"
    // );
    // t.equal(
    //   result.results[0].messages[0].message,
    //   "Missing semicolon.",
    //   "first mising semicolon message"
    // );
    // t.equal(
    //   result.results[0].messages[0].message,
    //   "Missing semicolon.",
    //   "second mising semicolon message"
    // );
  });
});

test("prettier style", function(t) {
  t.plan(4);
  const result = prettyStandard.lintTextSync(`const a = '2'`);
  t.equal(typeof result, "object", "result is an object");
  t.equal(result.errorCount, 2, "2 errors");

  t.equal(
    result.results[0].messages[0].message,
    "'a' is assigned a value but never used.",
    "first message"
  );
  t.equal(
    result.results[0].messages[1].message,
    "Replace `'2'` with `\"2\";⏎`",
    "second message"
  );
});

test("standard code quality", function(t) {
  t.plan(3);
  const result = prettyStandard.lintTextSync(`a();\n`);
  t.equal(typeof result, "object", "result is an object");
  t.equal(result.errorCount, 1, "1 errors");

  t.equal(
    result.results[0].messages[0].message,
    "'a' is not defined.",
    "first message"
  );
});
