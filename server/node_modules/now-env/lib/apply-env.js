const getValue = require('./get-value.js')

/**
 * Apply the environment variables to `process.env`
 * @param  {Object} env      Map of environment variables
 * @param  {Object} secrets  Map of secrets
 * @param  {Object} required Map of required values
 */
function applyEnv(env, secrets = {}, required = {}) {
  if (Array.isArray(env)) {
    env.forEach(key => {
      // if the key already exists don't overwrite it
      if (!process.env[key]) {
        const value = getValue(key, {}, secrets, required)
        process.env[key] = value
      }
    })
  } else {
    Object.entries(env).forEach(([key, value]) => {
      // if the key already exists don't overwrite it
      if (!process.env[key]) {
        const value = getValue(key, env, secrets, required)
        process.env[key] = value
      }
    })
  }
}

module.exports = applyEnv
