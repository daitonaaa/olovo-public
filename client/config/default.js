const pkg = require('../package.json');

module.exports = {
	WEB_APP: {
		mode: 'local',
		template: 'default',
		ENABLE_MOCK: false,
		UI_VERSION: pkg.version,
        API_ADMIN_URL: 'http://localhost:9000/v1',
	},
};

