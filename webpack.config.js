module.exports = (env) => {
  return require(`./webpack.config.${env.NODE_ENV}.js`);
};
