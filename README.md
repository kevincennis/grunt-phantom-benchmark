# grunt-phantom-benchmark

> Grunt plugin for running benchmarks in PhantomJS

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-phantom-benchmark --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-phantom-benchmark');
```

## The "benchmark" task

### Overview
In your project's Gruntfile, add a section named `benchmark` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  benchmark: {
    options: {
      root: 'path/to/benchmark/directory',
      inject: [
        'required/script.js',
        'another/required/script'
      ],
      html: 'path/to/markup.html'
    }
});
```

### Options

#### options.root
Type: `String`

Path to the directory where your benchmark files live. This can contain any number of nested subdirectories.

#### options.inject
Type: `Array`

An array of JS files that should be injected into the PhantomJS instance. These are not your benchmark tests,
but rather things like jQuery or other libraries.

#### options.html
Type: `String`

Path to your benchmark HTML file. This will probably just be an empty HTML document with nothing inside of it.

*NOTE*: It seems like Phantom will bail here if your HTML document doesn't have a script tag inside of it. I don't know why. But including an JS comment inside of a script tag on the page seemed to fix it. Whatevs.

### Usage

Files inside your `options.root` directory will have access to a `benchmark.js` `Suite` object with the name `suite`. So you can call `suite.add( name, fn )` or whatever you want to do with `benchmark.js`. Don't forget to call `suite.run()` at the end of your benchmark files.

To run it, just use `grunt benchmark` to run all files, or `grunt benchmark:path/to/files` to run benchmarks in specific files or directories. Results will be logged to your console.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
