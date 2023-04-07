module.exports = {
  ignores: [(commit) => commit.includes('init')],
  extends: ['cz'],
};
