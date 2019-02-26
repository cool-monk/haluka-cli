/**
 * @name BaseCommand
 * @author Robin Panta <hacktivistic@gmail.com>
 */

var path = require('path')
var dotenv = require('dotenv')

class BaseCommand{

	constructor () {
		this.directory = process.cwd()
		dotenv.config({
			path: this.getFile('.env')
		})
	}

	getFile (...args) {
		return path.join(this.directory, ...args)
	}

	env (key, defaultValue) {
		var val = process.env[key] || defaultValue
		if (val === 'true' || val === '1') {
			return true
		}
		if (val === 'false' || val === '0') {
			return false
		}
		return val
	}

}

module.exports = BaseCommand
