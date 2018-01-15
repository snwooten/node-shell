var fs = require('fs');

  var commands = {
    pwd: function() {
      process.stdout.write('prompt > ');
      var pwd = process.env.PWD;
      process.stdout.write(pwd);
  },
    ls: function() {
      fs.readdir('.', function(err, files) {
      if (err) throw err;
      files.forEach(function(file) {
      process.stdout.write(file.toString() + "\n");
     })
    process.stdout.write('prompt > ');
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
      process.stdout.write(arr.join(' '));
    },
    cat: function(fileName) {
      fs.readFile(fileName, function(err, data) {
        if (err) throw err;
        process.stdout.write(data)
      });
    },
    head: function(fileName) {
      fs.readFile(fileName, function(err, data) {
        if (err) throw err;
          var output = data.toString().substring(0).split('\n');
          process.stdout.write(output.slice(0, 5).join('\n'));
      });
    },
    tail: function (fileName) {
     fs.readFile(fileName, function(err, data) {
        if (err) throw err;
          var output = data.toString().substring(0).split('\n');
          process.stdout.write(output.slice(output.length- 6, output.length - 1).join('\n'));
      });
    },
}

module.exports = commands;
