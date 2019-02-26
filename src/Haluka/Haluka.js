'use strict'

/**
 *
 * @name HalukaCLI
 * @author Robin Panta <hacktivistic@gmail.com>
 *
 */

/**
 * Dependencies
 */
var Helpers = require('./helpers')
const program = require('commander');

class Haluka {

	constructor (version) {
		this.version = version

		program
			.version(version)
			.description('Haluka CLI Toolkit')

		Helpers.loadCommands(program)
	}

	execute () {
		program.parse(process.argv)
		Helpers.welcome(program)
		Helpers.errorHandler()
	}

	async checkForSelfUpdate () {

		const axios = require('axios')
		const compareVersions = require('compare-versions')

		try {
			var response = await axios.get('https://cdn.jsdelivr.net/npm/haluka-cli/package.json')
			var fetchedVersion = response.data.version

			if (compareVersions(fetchedVersion, this.version) === 1) {
				console.log('A newer version of Haluka CLI is available. Please update using `npm install -g haluka-cli`')
				process.exit(0)
			}

		} catch (error) {
			console.log('Unknown error occured while checking for Haluka CLI version')
		}

	}

}

module.exports = Haluka
