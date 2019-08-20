const fromCdn = require('from-cdn');
const stripoCdn = 'https://plugins.stripo.email/static/latest/stripo.js';

class StripoWrapper {
  constructor() {
    this.Stripo = null;
  }
  async init(stripoSettings) {
    const Stripo = await fromCdn(stripoCdn);
    this.Stripo = Stripo;
    this.Stripo.init(stripoSettings);
    return this.Stripo;
  }

  isLoaded() {
    return this.Stripo !== null;
  }
}

module.exports = new StripoWrapper();