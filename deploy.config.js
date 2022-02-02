module.exports = {
	app: [
    {
    	name: 'official_web_site_api',
    	script: 'app.js',
    	env: {
    		COMMON_VARIABLE: 'true'
    	},
    	env_production: {
    		NODE_ENV: 'production'
    	}
    }
	],

	deploy: {
		production: {
			user: 'root',
			host: '8.142.77.25',
			ref: 'origin/main',
			repo: 'https://github.com/zzxswl/jspp_api.git',
			path: '/www/jspp_api/production',
			'pre-deploy': 'git fetch --all',
			'post-deploy': 'npm install && npm run prd && pm2 startOrRestart deploy.config.js --env production'
		}
	}
}