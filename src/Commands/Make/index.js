/**
 * @name Make
 * @author Robin Panta <hacktivistic@gmail.com>
 */

var BaseCommand = require('../Base')

class MakeController extends BaseCommand{

	signature () {
		return `make:controller`
	}

	arguments () {
		return '<controller_name>'
	}

	alias () {
	}

	description () {
		return 'Create a new base controller at Controllers directory'
	}

	handle (name) {
		var file = this.getFile(`app/Controllers/${name}.js`)
		if (require('fs').existsSync(file)) {
			console.error(`Controller with name '${name}' already exists!`)
			process.exit(1)
		}
		try {
			require('fs').writeFileSync(file, getData(name))
			console.log('Controller created successfully!')
		} catch (error) {
			console.error('Unable to write controller file. Make sure you are in a Haluka Application directory.')
			process.exit(1)
		}
	}

}

module.exports = { Controller: MakeController }

var getData = (name) => {
	return `/**
* @name ${ucfirst(name)}Controller
*/
'use strict'
const router = use('Router')

/**
* GET /
*/
router.get('/', (req, res) => {
	res.send('Voila, from ${ucfirst(name)} Controller!')
})

module.exports = router
`
}

function ucfirst(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}
