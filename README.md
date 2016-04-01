# Introduction

This is a simple web application that demonstrates my knowledge of web application design and ability to apply modern JavaScript and UI libraries to solving a problem. I am currently seeking  employment as a full-stack web application developer and BriteCore proposed this [demo project](https://github.com/IntuitiveWebSolutions/EngineeringMidLevel) for their candidates.

## Running

Just open **index.html** with your browser. 

*In the future, I may deploy the app to Amazon Web Services if potential employers are interested in seeing some server-side code and a deployment demonstration.*

# Commentary

## Technologies

I chose to use the technologies used by BriteCore to demonstrate my ability to learn and apply new software: **jQuery, Knockout, and Bootstrap.**

In my past projects a few years ago I primarily used the [Dojo Toolkit](http://dojotoolkit.org). My recent Ionic mobile app project used Angular and angular-material for UI components. I have used jQuery and Bootstrap just a few times in the past.

In general I like Bootstrap's aesthetic and it's more mature than Angular Material. However, my first impression of the grid system wasn't very positive; arranging form-control's in a grid was a frustrating experience. Angular Material's flex grid seems more elegant. However, I'm sure Bootstrap's grid works fine if you're experienced with it though it does seem to require an excessive number of classes.

## Structure

For this demo, I decided to keep the code as simple as possible. In a production codebase, the source would be structured in a more organized fashion: *src/js, src/css*

Also, the dependencies would probably be managed by a package manager such as bower or npm. However, I elected to just use CDNs.
You might also breakup the JavaScript code into multiple files and concatenate and minify files for production with a build tool. Dojo has a layers concept, which I've used in the past. For my Angular project I used Typescript, systemjs, and a gulp build system.

However, for the purpose of this demo, I've decided to keep the file system simple and avoid package managers and build systems. For an example of a codebase I wrote with a modern build system and structure, see the SportTap app on my GitHub account.

# Future Features

There are a few features I may add soon:

 - Clear form when opened
 - Form validation
 - Client management area
 - Filter/Search
