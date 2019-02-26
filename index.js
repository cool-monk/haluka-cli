#!/usr/bin/env node

/**
 * haluka-cli
 * A CLI Tool for Haluka
 * MIT Licensed
 *
 * @author Robin Panta <hacktivistic@gmail.com>
**/

'use strict'

/**
 * Bootstrapping out Library
 */
var Haluka = require('./src/Haluka/Haluka')
var CommandProvider = require('./src/Commands/Base')

module.exports.CommandProvider = CommandProvider

// Get Current Version from Package.json file
var version = require('./package.json').version

var app = new Haluka(version)
app.checkForSelfUpdate()
	.then(() => {
		app.execute()
	})
