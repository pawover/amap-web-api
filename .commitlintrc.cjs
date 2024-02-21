module.exports = {
  ignores: [(commit) => commit === "project init"],
  extends: ["@commitlint/config-conventional"],
};
