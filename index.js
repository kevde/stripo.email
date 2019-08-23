const fromCdn = require('from-cdn');
const axios = require('axios');
const CDN_PATH = 'https://plugins.stripo.email/static/latest/stripo.js';
const AUTH_PATH = 'https://plugins.stripo.email/api/v1/auth';

class StripoWrapper {
  constructor() {
    this.Stripo = null;
  }
  async load() {
    const results = await fromCdn([CDN_PATH]);
    this.Stripo = (window.Stripo) ? window.Stripo : results[0];
    return this;
  }

  get StripoApi() {
    return window.StripoApi;
  }

  get StripoPerfTraceEnabled() {
    return window.StripoPerfTraceEnabled;
  }

  get StripoPerfTrace() {
    return window.StripoPerfTrace;
  }

  async init({
    pluginId,
    secretKey,
    ...stripoSettings
  }) {
    if (!this.Stripo) {
      await this.load();
    }
    this.Stripo.init({
      ...stripoSettings,
      getAuthToken: async (callback) => {
        const token = await this.getAuthToken(pluginId, secretKey);
        callback(token)
      },
    });
  }

  async getAuthToken(pluginId, secretKey) {
    const response = await axios.post(AUTH_PATH, {
      pluginId,
      secretKey
    });
    return response.data.token;
  }

  isLoaded() {
    return this.Stripo !== null;
  }
}

module.exports = new StripoWrapper();