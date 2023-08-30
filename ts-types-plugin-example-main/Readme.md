# FrayTools Type Definition Plugin Example

## Overview

This repository demonstrates a working FrayTools type definition plugin, which adds a simple global interface named `IMyTypeDefinitionPluginInterface`.

To activate this plugin in FrayTools, you must enable it in the Plugin Manager.

## Build Instructions

* Install [Node.js v16.x or newer](https://nodejs.org/en/) (Latest LTS version is recommended, easiest installation method is to use [NVM](https://github.com/nvm-sh/nvm))
* Clone this github repo and navigate to directory
* Install NPM dependencies by running `npm install`
* Build project using `npm run build`
* Copy plugin folder out of the `dist/` directory into your `[User]/FrayToolsData/plugins` folder
* Activate the plugin in your FrayTools project using the Plugin Manager

## Development instructions

Same steps as build instructions above, but after `npm install`:

* Run `npm run dev` to build and watch for file changes
* Generated plugin folder will automatically be copied to `[User]/FrayToolsData/plugins`
* Activate the plugin in your FrayTools project using the Plugin Manager
* Changes to the plugin source will automatically appear in FrayTools after reloading the plugin
