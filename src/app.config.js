export default class Configuration {
  static get CONFIG() {
    return {
      baseURL: '$VITE_BASE_URL',
      baseURLCompile: '$VITE_BASE_COMPILE_URL',
      googleClientId: '$VITE_GOOGLE_OAUTH_CLIENT_ID',
      socketURL: '$VITE_SOCKET_URL',
      posthogApiKey: '$VITE_POSTHOG_API_KEY',
      posthogHost: '$VITE_POSTHOG_HOST',
    };
  }

  static value(name) {
    if (!(name in this.CONFIG)) {
      console.log(`Configuration: There is no key named "${name}"`);
      return;
    }

    const value = this.CONFIG[name];

    if (!value) {
      console.log(`Configuration: Value for "${name}" is not defined`);
      return;
    }

    if (value.startsWith('$VITE_')) {
      // value was not replaced, it seems we are in development.
      // Remove $ and get current value from process.env
      const envName = value.substr(1);
      const envValue = import.meta.env[envName];
      if (envValue) {
        return envValue;
      } else {
        console.log(`Configuration: Environment variable "${envName}" is not defined`);
      }
    } else {
      // value was already replaced, it seems we are in production.
      return value;
    }
  }
}
