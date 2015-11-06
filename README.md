# iOS Test Lock Screen

Create a lock screen image for testing iOS devices. Useful for seeing at a glance ownership and device properties. Uses https://github.com/imkira/mobiledevice to get device properties.

### Setup

```
brew update
brew install mobiledevice
brew install gd
git clone https://github.com/eknowles/ios-test-lockscreen.git
npm install
```

### Usage

1. Connect iPhone/iPad via USB.
2. Unlock and mark the machine as trusted on the device.
3. Run the application with `npm start` (this will create a JPG in the output directory).
4. Send .jpg to device via AirDrop.

### Customisation

You can set the device properties to whatever you want. Example of the data gathered from the device is below.

```
{
  DeviceName: 'My iPhone 6+',
  SerialNumber: 'ABCDEFGHIJKL',
  ProductType: 'iPhone7,1',
  ProductVersion: '9.1',
  WiFiAddress: 'a8:08:2c:7d:38:5a',
  BluetoothAddress: '4f:32:ba:59:13:5d'
}
```
