/**
 * @name Serve
 * @author Robin Panta <hacktivistic@gmail.com>
 */

var BaseCommand = require('../Base')

class Serve extends BaseCommand{

	signature () {
		return `serve`
	}

	arguments () {
		return ''
	}

	alias () {
	}

	description () {
		return 'Serves the application to the user'
	}

	handle () {
		require('child_process')
			.spawn('npm', ['run', 'start'], {stdio:'inherit'})
			.on('exit', function (error) {
				if (error) {
					console.error('Unable to serve this directory. Please make sure that you are on a Haluka App directory')
				}
			})
	}

}

module.exports = Serve
