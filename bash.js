var commands = require('./command.js');

process.stdout.write('prompt > ');

// The stdin 'data' event fires after a user types in a line
process.stdin.on('data', function (data) {
  var cmd = data.toString().trim(); // remove the newline
  var commandArr = cmd.split(' ');
  var action = commandArr[0];
  var str = commandArr.slice(1).join(' ');
  var date = Date();
  //var pwd = process.env.PWD;

  if (action === 'date') {
    process.stdout.write(date);
  } else if (action === 'pwd') {
    commands.pwd();
  } else if (action === 'ls') {
    commands.ls();
  } else if (action === 'echo') {
    commands.echo(str);
  } else if (action === 'cat') {
    commands.cat(str)
  } else if (action === 'head') {
    commands.head(str);
  } else if (action === 'tail') {
    commands.tail(str);
  } else if (action === 'curl') {
    commands.curl(str);
  }
  done(str);

});

function done(output) {
  process.stdout.write(output);
  process.stdout.write('\nprompt > ');
}
