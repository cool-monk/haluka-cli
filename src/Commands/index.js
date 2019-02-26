/**
 * haluka-cli
 * MIT Licensed
 *
 * @author Robin Panta <hacktivistic@gmail.com>
 */

'use strict'

module.exports = {

	create: require('./Create'),
	serve: require('./Serve'),
	'make:controller' : require('./Make').Controller,
	plug: require('./Plug')

}
