# Haluka CLI 🍖
> The CLI Toolkit for Haluka

[![Node Version][node-image]][npm-url]
[![NPM Version][npm-image]][npm-url]
[![Dependencies][dependencies]][david-dm]
[![License: MIT][license-image]][license-link]

[Haluka CLI](https://haluka.jsaxe.com/cli) is the CLI toolkit for Haluka to provide ease in development process.

<img src="https://i.imgur.com/oUzUUsC.png" width="250px" align="right" hspace="30px" vspace="100px">


## Installation

This repo is the library repo of Haluka CLI. To start developing, go to [Haluka App repo](https://github.com/jsaxe/haluka-app)

To install Haluka CLI, use the following command:
```bash
$ npm install haluka-cli -g
```

## Node

Axe Core is supposed to run on platforms with `Node.js >=7.10.1`

## Development

It would be GREAT if you plan for contribution. For contribution, make sure to adhere to following conventions, since a consistent code-base is always joy to work with.

Run the following command to see list of available npm scripts.

```
npm run
```

### Available Scripts

1. `npm start` - Executes your index.js file with node
2. `npm test` - Runs tests in test directory without linting or coverage results.
3. `npm run test:cover` - Runs tests and produces local html based coverage report in './coverage' directory
5. `npm run lint` - Runs ESLint for linting code

### Tests & Linting

1. Lint your code using ESLint. Run `npm run lint` command to check if there are any linting errors.
2. Make sure you write tests for all the changes/bug fixes.
3. Make sure all the tests are passing on `travis`.
4. Make sure to have full coverage on your tests.

### General Practices

ES6 shall be prefered for development, since it comes with latest javascript features. Also, we love comments. Be sure to comment your codes properly so that your fellow can understand you easily.

If commenting is not done properly, following may happen
>While Coding: Only You and God knows what it does

>After some time: Only God knows what it does

To prevent this, let's all commit to commenting. 😉

## Issues & Pull Requests

1. Always try creating regression tests when you find a bug (if possible).
2. Share some context on what you are trying to do, with enough code to reproduce the issue.
3. For general questions, please create a forum thread.
4. When creating a Pull Request for a feature, make sure to create a parallel Pull Request for docs too.

## Author

Robin Panta (Hacktivistic) 😎  &nbsp; [GitHub](https://github.com/hacktivistic) | [Blog](https://robinpanta.com)

[node-image]: https://img.shields.io/node/v/haluka-cli.svg?style=flat-square
[npm-image]: https://img.shields.io/npm/v/haluka-cli.svg?style=flat-square
[npm-url]: https://npmjs.org/package/haluka-cli
[dependencies]: https://david-dm.org/jsaxe/haluka-cli/status.svg
[dev-dependencies]: https://david-dm.org/jsaxe/haluka-cli/dev-status.svg
[david-dm]: https://david-dm.org/jsaxe/haluka-cli
[david-dm-dev]: https://david-dm.org/jsaxe/haluka-cli?type=dev
[license-image]: https://img.shields.io/badge/License-MIT-blue.svg
[license-link]: https://opensource.org/licenses/MIT
