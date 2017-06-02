# Traffic App

This app for Project2

## Prerequisites
You will need the following things properly installed on your computer.
* [Node.js](http://nodejs.org/) (latest version with NPM)
* [Git](http://git-scm.com/)
* [Grunt](https://gruntjs.com/) (to serve the CMS)
* [Api docs](http://apidocjs.com/) (install it globaly, it nees sudo permission).

## Server Installation
* `cd server`.
* `git clone https://github.com/Hani-Ghazi/traffic.git`.
* `npm install` (to create the server dependencies).
* `npm start` (to run the server at localhost:3000).

## CMS Installation
* `cd cms`.
* `npm install` (to create the CMS dependencies).
* `bower install` (to create the CMS bower depencdencies).
* `grunt serve` (to run the CMS website interface).


## Create the Docs (make sure you have installed the API docs)
* `cd server`
* `apidoc -i routes/ -o api-doc/`