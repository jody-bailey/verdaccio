const config = require('../../jest/config');

module.exports = Object.assign({}, config, {
  coverageThreshold: {
    global: {
      // FIXME: increase to 90
      branches: 62,
      functions: 86,
      lines: 76,
    },
  },
});
