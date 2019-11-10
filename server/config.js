const { join: joinPath, resolve: resolvePath } = require('path');

const root = resolvePath(joinPath(__dirname, '..'));

exports.path = (...segments) => joinPath(root, ...segments);

exports.port = parseEnvInt('MSG_CENTRAL_PORT', 1, 65535) || parseEnvInt('PORT') || 3000;

function parseEnvInt(name, min, max) {

  const value = process.env[name];
  if (value === undefined) {
    return;
  }

  const parsed = parseInt(value, 10);
  if (isNaN(parsed)) {
    throw new Error(`Environment variable $${name} must be an integer between ${min || '-Infinity'} and ${max || 'Infinity'}`);
  }

  return parsed;
}