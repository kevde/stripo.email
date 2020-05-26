import fromCdn from 'from-cdn';
import axios from 'axios';
const CDN_PATH = 'https://plugins.stripo.email/static/latest/stripo.js';
const AUTH_PATH = 'https://plugins.stripo.email/api/v1/auth';

class StripoWrapperClass {
  constructor() {
    this.Stripo = null;
  }
  async load() {
    const results = await fromCdn([CDN_PATH]);
    this.Stripo = (window.Stripo) ? window.Stripo : results[0];
    return this;
  }

  async init(initValues) {
    const {
      pluginId,
      secretKey,
      ...stripoSettings
    } = initValues;
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

  get StripoApi() {
    return window.StripoApi;
  }

  get StripoPerfTraceEnabled() {
    return window.StripoPerfTraceEnabled;
  }

  get StripoPerfTrace() {
    return window.StripoPerfTrace;
  }
}

const StripoWrapper = new StripoWrapperClass();

export const StripoApi = window.StripoApi;

export const StripoPerfTraceEnabled = window.StripoPerfTraceEnabled;

export const StripoPerfTrace = window.StripoPerfTrace;

export default StripoWrapper;