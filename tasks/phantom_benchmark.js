/*
 * grunt-phantom-benchmark
 * https://github.com/kevincennis/grunt-phantom-benchmark
 *
 * Copyright (c) 2014 Kevin Ennis
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function( grunt ) {

  var phantomjs = require('grunt-lib-phantomjs').init( grunt ),
    fs = require('fs');

  // pass console logs from phantom through to the terminal
  phantomjs.on( 'console', console.log.bind( console ) );

  phantomjs.on( 'benchmark.error', function( e ) {
    throw e;
  });

  // log individual test results
  phantomjs.on( 'benchmark.cycle', function( bench ) {
    var widths = [ 40, 70 ],
      columns = bench.split(' x '),
      str = grunt.log.table( widths, columns );
    grunt.log.ok( str );
  });

  // halt phantom on benchmark.done
  phantomjs.on( 'benchmark.done', function() {
    phantomjs.halt();
  });

  // register the benchmark task
  grunt.registerTask( 'benchmark', 'Benchmarks directories or files',
    function( pattern ) {
    var path, done = this.async(), options, files;

    options = this.options({
      inject: []
    });

    options.inject = ([
      '../node_modules/lodash/dist/lodash.js',
      '../node_modules/benchmark/benchmark.js',
      './scripts/setup.js'
    ]).concat( options.inject );

    path = options.root;
    pattern = pattern || '**/*.js';
    pattern = path + '/' + pattern;
    pattern = pattern.replace( /\*+$/, '**/*.js' );
    if ( !/\.js/.test( pattern ) ) {
      files = grunt.file.expand( pattern.replace( /\/?$/, '/**/*.js' ) );
      if ( !files.length ) {
        files = grunt.file.expand( pattern + '.js' );
      }
    } else {
      files = grunt.file.expand( pattern );
    }
    if ( !files.length ) {
      console.log( 'No files matching pattern ' + pattern + ' were found.' );
    }

    if ( files ) {
      grunt.util.async.forEachSeries( files, function( url, next ) {
        phantomjs.spawn( options.html, {
          options: {
            inject: options.inject.concat( url )
          },
          done: function( err ) {
            if ( err ) {
              done();
            }
            else {
              next();
            }
          }
        });
      },
      function() {
        done();
      });
    }

  });

};
