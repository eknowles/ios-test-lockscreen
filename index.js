var lockscreen = require('./lib/lockscreen'), ls = new lockscreen();

ls.getDeviceData(function (err) {
  ls.buildImage('bbc');
});
