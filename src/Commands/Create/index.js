/**
 * @name Create
 * @author Robin Panta <hacktivistic@gmail.com>
 */

var BaseCommand = require('../Base')

class Create extends BaseCommand{

	signature () {
		return `create`
	}

	arguments () {
		return '<project_name>'
	}

	alias () {
	}

	description () {
		return 'Initialize a new haluka project in the current directory'
	}

	handle (name) {
		if (require('fs').existsSync(this.getFile(name))) {
			console.log(`Directory with name '${name}' already exists.`)
			process.exit(1)
		}

		var async = require('async')

		async.waterfall([
			function(callback) {
				runCommand('git', ['clone', '--depth=1', 'https://github.com/jsaxe/haluka-app', name], callback)
			},
			function(done, callback) {
				console.log()
				console.log('Removing .git directory...')
				runCommand('rm', ['-rf', name + '/.git'], callback)
			},
			function(done, callback) {
				console.log()
				console.log('Copying environment file...')
				runCommand('cp', [name + '/.env.example', name + '/.env'], callback)
			},
			function(done, callback) {
				console.log()
				console.log('Creating README.md file...')
				writeReadme(process.cwd() + '/' + name + '/README.md', name)
				callback(null, true)
			}
		], function (err, result) {
			console.log()
			console.log('Project created successfully!')
		});

		// GIT

	}

}

module.exports = Create


var runCommand = (process, args, callback) => {
	require('child_process')
		.spawn(process, args, {stdio:'inherit'})
		.on('exit', function (error) {
			if (error) {
				console.error('Unable to create a new project.')
				process.exit(1)
			}
			callback(null, true)
		})
}

var writeReadme = (path, name) => {
	require('fs').writeFileSync(path, getData(name))
}


var getData = (name) => {
	return `# ${ucfirst(name)} ♾️
>	A robust application powered with Haluka

[![Node Version][node-image]][npm-url]
[![NPM Version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Coveralls][coveralls-image]][coveralls-url]
[![Dependencies][dependencies]][david-dm]
[![License: MIT][license-image]][license-link]

[${ucfirst(name)}](#) is a powerful application that has the potential to change the world. This application happened all thanks to Haluka and Haluka CLI. To try out Haluka, [click here](https://github.com/jsaxe/haluka-app)


## Digging into ${ucfirst(name)}

You can use Haluka CLI to create a basic route controller by using following command:

\`\`\`bash
$ haluka make:controller <controller_name>
\`\`\`

If this is your first time in an Haluka app, read the Haluka docs at [Haluka repo](https://github.com/jsaxe/haluka-app)

[node-image]: https://img.shields.io/node/v/haluka.svg?style=flat-square
[npm-image]: https://img.shields.io/npm/v/haluka.svg?style=flat-square
[npm-url]: https://npmjs.org/package/haluka
[travis-image]: https://travis-ci.org/jsaxe/haluka.svg?branch=master
[travis-url]: https://travis-ci.org/jsaxe/haluka
[coveralls-image]: https://coveralls.io/repos/github/jsaxe/haluka/badge.svg?branch=master
[coveralls-url]: https://coveralls.io/github/jsaxe/haluka?branch=master
[dependencies]: https://david-dm.org/jsaxe/haluka/status.svg
[dev-dependencies]: https://david-dm.org/jsaxe/haluka/dev-status.svg
[david-dm]: https://david-dm.org/jsaxe/haluka
[david-dm-dev]: https://david-dm.org/jsaxe/haluka?type=dev
[license-image]: https://img.shields.io/badge/License-MIT-blue.svg
[license-link]: https://opensource.org/licenses/MIT

`
}

function ucfirst(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}
