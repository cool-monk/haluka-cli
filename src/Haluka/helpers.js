'use strict'

// Dependencies
var _ = require('lodash')
const Commands = require('../Commands')
const commandNames = []

var Helpers = module.exports = {}

Helpers.welcome = function (program) {

	if (program.args.length < 1 ) {
		console.log()
		console.log('Welcome to Haluka CLI Toolkit')
		console.log()
		console.log('Please run `haluka -h` for the list of available commands.')
		console.log()
		process.exit(0)
	}

}


Helpers.loadCommands = function (program) {

	Object.keys(Commands).forEach((name) => {
		commandNames.push(name)
		var cmd = new (Commands[name])()
		program
			.command(cmd.signature())
			.arguments(cmd.arguments())
			.alias(cmd.alias())
			.description(cmd.description())
			.action(cmd.handle.bind(cmd))
	})


}


Helpers.errorHandler = function () {

	if (!_.includes(commandNames, process.argv[2])) {
		console.log()
		console.log('Command not available! Please run `haluka -h` for list of commands.')
		console.log()
	}

}
