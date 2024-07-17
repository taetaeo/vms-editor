const envConfig = {
  mode: {
    dev: import.meta.env.VITE_ENV_MODE,
    prod: import.meta.env.VITE_ENV_MODE,
  },
};

export default envConfig;
