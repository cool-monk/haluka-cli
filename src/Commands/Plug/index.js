/**
 * @name Plug
 * @author Robin Panta <hacktivistic@gmail.com>
 */

var BaseCommand = require('../Base')
const axios = require('axios')
var twirling;

class Plug extends BaseCommand{

	signature () {
		return `plug`
	}

	arguments () {
		return '<plugin>'
	}

	alias () {
	}

	description () {
		return 'Installs and initializes a haluka plugin'
	}

	handle (plugin) {
		console.log(`Looking up for '${plugin}'`)
		console.log()
		fetchPlugin(plugin)
		twirling = twirlTimer()
	}

}

module.exports = Plug


var fetchPlugin = (plugin) => {
	axios.get('https://haluka.jsaxe.com/hpm/api/package/' + plugin)
		.then(response => {
			if (response.data['status'] === 'error') {
				log(response.data.message)
				process.exit(1)
			}else if (response.data['status'] === 'success') {

				var repoData = response.data.data
				var repoUrl = `https://github.com/${repoData.admin}/${repoData.repo}`
				clearInterval(twirling)
				log('Fetched package data!')

				var async = require('async')
				var dirName = `haluka_packages/${plugin}`
				async.waterfall([
					function(callback) {
						console.log('Cloning from repo...')
						runCommand('git', ['clone', '--depth=1', repoUrl, dirName], callback)
					},
					function(done, callback) {
						console.log('Removing .git directory...')
						runCommand('rm', ['-rf', dirName + '/.git'], callback)
					},
					function(done, callback) {

						const execSync = require('child_process').execSync
						var packageFile = require('path').resolve(`./${dirName}/package.json`)
						if (require('fs').existsSync(packageFile)){
							var halukaConfig = require(packageFile)

							var appFile = require('path').resolve('./package.json')
							var appConfig = require(appFile)

							if (halukaConfig.dependencies) {

								console.log('Writing Dependencies...')
								for (dependency in halukaConfig.dependencies) {
									appConfig.dependencies[dependency] = halukaConfig.dependencies[dependency]
								}
								require('fs').writeFileSync(appFile, JSON.stringify(appConfig, null, 2))
							}

							console.log('Installing Dependencies...')
							try {
								execSync('npm install', {stdio: 'inherit'})
							} catch (error) {
								console.log('Error installing npm packages. This might be a problem in the package.')
							}

							if (halukaConfig.postInstall) {
								console.log('Running post install script...')
								try {
									var pis = require('path').resolve(`./${dirName}`)
									execSync(halukaConfig.postInstall, { stdio:'inherit', cwd: pis })
								} catch (error) {
									console.log('Error running post installation script. This might be a problem in the package.')
								}
							}
						}

						callback(null, true)
					}
				], function (err, result) {
					console.log()
					console.log('Package plugged successfully!')
				});

			}else {
				log('Unknown error occurred while fetching the package.')
				process.exit(1)
			}
			// Found Package

		})
		.catch(err => {
			console.log('Unknown error occurred while fetching the package.')
			process.exit(1)
		})
}

var twirlTimer = function() {
	var P = ["\\", "|", "/", "-"];
	var x = 0;
	return setInterval(function() {
	  process.stdout.write("\r" + P[x++]);
	  x &= 3;
	}, 150);
}

var log = (txt) => {
	process.stdout.write("\r" + txt + "\n")
}

var runCommand = (processName, args, callback) => {
	var spawn = require('child_process').spawn
	var command = spawn(processName, args, {stdio:'inherit'})
	command.on('exit', function (error) {
		if (error) {
			console.error('Unable to plug the package.')
			process.exit(1)
		}
		callback(null, false)
	})
}
