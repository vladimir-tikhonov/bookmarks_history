const fileSystem = require('fs');
const path = require('path');

const manifest = require('../src/assets/manifest.template.json');

manifest.description = process.env.npm_package_description;
manifest.version = process.env.npm_package_version;
manifest.homepage_url = process.env.npm_package_homepage;

fileSystem.writeFileSync(
    path.join(__dirname, '../build/manifest.json'),
    JSON.stringify(manifest, null, '    '),
);
