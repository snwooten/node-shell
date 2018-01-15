var fs = require('fs');
var request = require('request');

function done(output) {
  process.stdout.write(output);
  process.stdout.write('\nprompt > ');
}


  var commands = {
    pwd: function() {
      process.stdout.write('prompt > ');
      var pwd = process.env.PWD;
      done(pwd);
  },
    ls: function() {
      fs.readdir('.', function(err, files) {
      if (err) throw err;
      files.forEach(function(file) {
      done(file.toString() + "\n");
     })
    });

    },
    echo: function(str) {
      var act = '';
      var arr = str.split(' ');
      for (var i = 0; i < arr.length; i++) {
       if (arr[i][0] === '$') {
          act += arr[i].slice(1);
          arr[i] = process.env[act];
        }
      }
      done(arr.join(' '));
    },
    cat: function(fileName) {
      fs.readFile(fileName, function(err, data) {
        if (err) throw err;
        done(data)
      });
    },
    head: function(fileName) {
      fs.readFile(fileName, function(err, data) {
        if (err) throw err;
          var output = data.toString().substring(0).split('\n');
          done(output.slice(0, 5).join('\n'));
      });
    },
    tail: function (fileName) {
     fs.readFile(fileName, function(err, data) {
        if (err) throw err;
          var output = data.toString().substring(0).split('\n');
          done(output.slice(output.length - 6, output.length - 1).join('\n'));
      });
    },
    curl:  function (url) {
      if (url.slice(0, 7) !== 'http://') url = 'http://' + url;
      request(url, function(err, response, body) {
        if (err) throw err;
        else if (response && (response.statusCode > 399)) throw new Error(response.statusCode);
        if (body){
          done(body);
        }
      });
    }
}

module.exports = commands;
