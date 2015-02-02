 Prerequisites

##Node

First, install the latest stable version of Node
To do so, either follow the installation instructions on [nodejs.org](nodejs.org), or use your preferred package manager (such as Homebrew on OS X) if you have one.

After installing Node, verify that Node is set up correctly by typing the following commands on the command line. Both should output help messages:

``` sh
$ node --help
$ npm --help
```

##Bower
####You’ll need to install Bower, a package manager that keeps your front-end dependencies (including JQuery, Ember, and QUnit) up to date. This is as easy as running:

``` sh
$ npm install -g bower
```

####This will give you access to the bower command-line runner.

##Gulp
####You’ll need to install Gulp, gulp's use of streams and code-over-configuration makes for a simpler and more intuitive build.

```sh
$ npm install --global gulp
```

# Installation

##Gulp Plugins
####Install gulp plugins located in packagecookie_init.json file:

``` sh
$ npm install
```

##Bower Packages
####Install bower packages located in bowercookie_init.json file:

``` sh
$ bower install
```

##Main tasks
#### serve task

```sh
$ gulp serve
```

####This task responsible for running three tasks
#####1- ``` $ gulp src.scripts ``` task which concatenate all javascript files inside the following paths :
'src/scripts/appcookie_init.js',
'src/scripts/routercookie_init.js',
'src/scripts/base/constantcookie_init.js',
'src/scripts/base/sessioncookie_init.js',
'src/scripts/base/servicecookie_init.js',
'src/scripts/classes/',
'src/scripts/services/',
'src/scripts/helpers/',
'src/scripts/components/',
'src/scripts/routes/',
'src/scripts/controllers/',
'src/scripts/views/'
#####into a single file as src/scripts/concatcookie_init.js

#####2- ``` $ gulp src.templates ``` task which compile and concatenate all handlebars template files inside the following path 'src/templates/' into a single file as src/scripts/concat.hbscookie_init.js

#####3- ``` $ gulp src.styles ``` task which concatenate all style files inside the following paths :
'src/styles/main.css',
'src/styles/block.css',
'src/styles/style.css'
#####into a single file as src/styles/concat.css


####default task
#####This task should be used during development by running the command below on project root folder.

```sh
$ gulp
```

####This task responsible for running two tasks:
#####1- ``` $ gulp serve ``` task which described above.
#####2- ``` $ gulp src.watch ``` task which watches any changes in the source files for 'src.scripts', 'src.templates' and 'src.styles' tasks and execute related task after each change.



####build task
#####This task should be used to make a production build

```sh
$ gulp build
```

####This task responsible for running seven tasks:
###TODO



