const fromCdn = require('from-cdn');
const stripoCdn = 'https://plugins.stripo.email/static/latest/stripo.js';

class StripoWrapper {
  constructor() {
    this.Stripo = null;
  }
  async load() {
    const results = await fromCdn([stripoCdn]);
    this.Stripo = results[0];
    return this;
  }

  async init(stripoSettings) {
    if (!this.Stripo) {
      await this.load();
    }
    this.Stripo.init(stripoSettings);
  }

  isLoaded() {
    return this.Stripo !== null;
  }
}

module.exports = new StripoWrapper();