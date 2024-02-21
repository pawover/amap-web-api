const cz = require("./commitlint.cz.cjs");

module.exports = {
  ignores: [(commit) => commit === "project init"],
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [2, "always", cz.types.map((i) => i.value)],
    "scope-enum": [2, "always", cz.scopes.map((i) => i.name)],
  },
};
