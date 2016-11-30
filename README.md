## Overview
A Google AngularJS v1.5 app that implements the fundamental features found in most business applications.

__Intended Audiences:__
* Businesses that wish to get their app out to market faster by "buying off the shelf" and extending
* Businesses that want to avoid the high risk of failure when rewriting or building a new app
* Development teams that want to leap forward in their technology stacks by leveraging an existing platform they can extend
* Development teams that want to follow and adopt a standard of development and best practices
* Developers that wish to learn new technology by reading good documentation and extending code that tightly follows the reference documentation. 

__Development Core Tenants__
* Keep it simple
* Build for the "now". Don't build features for a future that is unclear
* Follow defacto standards & best practices of the tech stacks chosen
* Memorialize team decisions in Markdown (.md) files and store in the repo for future developers (ie this doc)

__App Features__
* User Login w/ Password Recovery
* User Account Management
* User Admin Console
* User Settings
* Alerts & Notifications
* Responsive UI for Desktop, Tablet, Mobile
* Integrates with Launchpad API for all data

__Technology Stack__
* Reference AngularJS 1.5 implementation
* Bootstrap v3 for responsive UI
* Angular Material components
* SASS 
* Gulp + Bower build scripting
* JSLint enforcement of Javascript best practices
* 


> NOTE: If you are extending this codebase to build a new app, then replace this section with a detailed overview of the new app. Include as much or as little detail as necessary to convey to the developers what this project is about. Often times less is more. 

## Table of Contents
* [Quick Start](#quick-start)
* Features
* Best Practices
* Development

## Quick Start
Describe the bare minimum steps to download, install, configure, and run the app locally


### Quick start

> Clone/Download the repo from git

```bash
# clone repo
$ git clone https://github.com/sJhonny-e/extended-angular-starter.git my-app

# change directory to your app
$ cd my-app

# install development dependencies with npm
$ npm install

# install ui dependencies with bower
$ bower install

# start the server
$ gulp serve
```

The app will open in your browser.

# Table of Contents

* [Getting Started](#getting-started)
    * [Dependencies](#dependencies)
    * [Installing](#installing)
    * [Running the app](#running-the-app)
    * [Developing](#developing)
    * [Testing](#testing)
* [JavaScript Best Practices](./readme_docs/JAVASCRIPT.md)
* [Angular Best Practices](./readme_docs/ANGULAR.md)

# Getting Started

## Dependencies

What you need to run this app:
* `node` and `npm` (Use [NVM](https://github.com/creationix/nvm))
* Ensure you're running Node (`v4.1.x`+) and NPM (`2.14.x`+)

## Installing

* `clone` this repo
* `npm install` to install all dependencies

## Running the app

After you have installed all dependencies you can now run the app with:
```bash
npm start
```

It will start a local server using `webpack-dev-server` which will watch, build (in-memory), and reload for you. The port will be displayed to you as `http://localhost:8080`.

## Developing

### Build files

* single run: `npm run build`
* build files and watch: `npm run watch`

## Testing

#### 1. Unit Tests

* single run: `npm test`
* live mode (TDD style): `npm run test-watch`
* live mode in firefox (for debugging): `npm run test:firefox`
