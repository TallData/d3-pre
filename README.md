# d3-pre
Pre-render your visualizations, keep the same d3 code.

Serving a page with inline SVG elements can offer significant
performance benefits over creating them after pageload,
especially with respect to perceived load time, and cuts down on unwanted paint flashes.

The idea behind d3-pre is to run your d3 script locally on a
headless browser, allow d3 to build the initial `SVG`, and then attach event listeners
and interactivity in the browser. This library allows you to run
exactly the same code locally and in the browser.

See a simple example of this concept in action: [without pre-rendering](http://fivethirtyeight.github.io/d3-pre/examples/standard/)
and [with pre-rendering](http://fivethirtyeight.github.io/d3-pre/examples/prerendered/) (refresh the pages to see the difference in loading).

## Examples

* [Axis Pan+Zoom](http://fivethirtyeight.github.io/d3-pre/examples/axes/) ([code](./examples/axis.js))
* [Streamgraph](http://fivethirtyeight.github.io/d3-pre/examples/streamgraph/) ([code](./examples/stream.js))
* [Choropleth](http://fivethirtyeight.github.io/d3-pre/examples/choropleth/) ([code](./examples/choropleth.js))

##### In the wild

* http://projects.fivethirtyeight.com/facebook-primary/
* http://projects.fivethirtyeight.com/2016-election-forecast/

## Installation

```
npm install --save d3-pre
```

## Usage

There are **two** things that you need to do to use this library.

### 1. Include d3-pre in your javascript

```js
var d3 = require('d3');

// Require the library and give it a reference to d3
var Prerender = require('d3-pre');
var prerender = Prerender(d3);


// Then, when you start drawing SVG, call `prerender.start()`.
// This modifies some d3 functions to allow it to be
// aware of SVGs that already exist on the page.
prerender.start();

/*
 * normal d3 code goes here
 * d3.select('body')
 *   .append('svg')
 *      .data(data)
 *   .enter()
 *      .append('rect')
 *      .on('click', clickhandler)
 *      etc. etc.
*/

// If you ever want to go back to the unmodified d3,
// just call `prerender.stop()`.
// This is optional and usually not necessary.
prerender.stop();

```


### 2. Pass your HTML through the pre-rendering tool.

This can either be done via a build task (like gulp), or on the command line.

#### Command line example

```
$ npm install -g d3-pre-cli
$ d3-pre ./path/to/index.html
```

This will modify the `index.html` file, running any scripts that are included,
letting these scripts modify the DOM and saving the modifications.

[See the repo for the command line tool](https://github.com/fivethirtyeight/d3-pre-cli)

#### Gulp example

Install the gulp plugin:
```
$ npm install gulp-d3-pre
```

Create a gulp task:

```js
var gulp = require('gulp');
var d3Pre = require('gulp-d3-pre');


gulp.task('prerender-svgs', function() {
  gulp.src('./public/index.html')
    .pipe(d3Pre())
    .pipe(gulp.dest('./public/'));
})
```
Again, this will modify the file in-place, saving any DOM modifications that
the javascript made.

[See the repo for the gulp plugin](https://github.com/fivethirtyeight/gulp-d3-pre)

#### Custom Example

Both of the above modules are thin wrappers around [d3-pre-renderer](https://github.com/fivethirtyeight/d3-pre-renderer). If you require more fine-grained control of when and where the pre-rendering step takes place, use [d3-pre-renderer](https://github.com/fivethirtyeight/d3-pre-renderer) directly.

## LICENSE

MIT
