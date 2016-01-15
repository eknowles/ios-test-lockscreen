var path = require('path');
var async = require('async');
var terminal = require('child_process');
var gd = require('node-gd');

function LockScreen() {
  this.logoHeight = 54;
  this.data = {};
  this.deviceProps = [
    'DeviceName',
    'SerialNumber',
    'ProductType',
    'ProductVersion',
    //'ModelNumber',
    //'DeviceClass',
    //'DeviceColor',
    'WiFiAddress',
    'BluetoothAddress'
  ];
  this.devices = {
    'iPad2': {w: 640, h: 960},
    'iPhone4': {w: 640, h: 960},
    'iPhone5': {w: 640, h: 1136},
    'iPhone6': {w: 640, h: 1136},
    'iPhone7': {w: 750, h: 1334}
  };
}

LockScreen.prototype.init = function () {
  var self = this;
};

LockScreen.prototype.getDeviceData = function (cb) {
  var self = this;
  async.eachSeries(self.deviceProps, function (prop, callback) {
    terminal.exec('mobiledevice get_device_prop ' + prop, function (err, stdout, stderr) {
      if (err) {
        callback(stderr);
      } else {
        self.data[prop] = stdout.replace('\n', '');
        callback();
      }
    });
  }, function (err) {
    cb(err);
  });
};

LockScreen.prototype.buildImage = function (logoName) {
  var self, key, dims, logoPath, fontBold, fontReg;
  self = this;
  key = self.data.ProductType.split(',')[0];
  dims = self.devices[key];
  logoPath = path.normalize(__dirname + '/../img/logos/' + logoName + '.png');
  fontBold = path.normalize(__dirname + '/../fonts/OpenSans-Bold.ttf');
  fontReg = path.normalize(__dirname + '/../fonts/OpenSans-Regular.ttf');
  gd.createTrueColor(dims.w, dims.h, function (error, img) {
    var x = parseInt(dims.w * 0.15);
    if (error) throw error;
    gd.openPng(logoPath, function (error, logo) {
      var lines, gray, white, bgColor, black;
      if (error) throw error;
      bgColor = img.colorAllocate(255, 255, 255);
      white = img.colorAllocate(255, 255, 255);
      black = img.colorAllocate(0, 0, 0);
      gray = img.colorAllocate(180, 180, 180);
      lines = 0;
      img.filledRectangle(0, 0, dims.w, dims.h, bgColor);
      var newlogoWidth = Math.round((self.logoHeight / logo.height) * logo.width);
      logo.copyResized(img, x, parseInt((dims.h * 0.45) - (self.logoHeight + 35)), 0, 0, newlogoWidth, self.logoHeight, logo.width, logo.height);
      Object.keys(self.data).map(function (value, index) {
        img.stringFT(gray, fontReg, 15, 0, x, yPos(lines, dims.h), value);
        img.stringFT(black, fontBold, 20, 0, x, yPos(lines + 1, dims.h), self.data[value]);
        lines += 2;
      });
      img.saveJpeg('output/' + self.data.SerialNumber + '.jpg', 100, function (err) {
        if (err) throw err;
      });
    });
  });
};

function yPos(line, h) {
  var o = parseInt((h * 0.45) + (line * 35));
  return o;
}

module.exports = LockScreen;
