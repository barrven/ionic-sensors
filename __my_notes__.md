### starting command used
$ ionic start sensors2 blank

select Angular framwork and select integrate with capacitor

### then install the plugins
$ npm install cordova-plugin-device-motion
$ npm install @ionic-native/device-motion

### prep the project
$ ionic cap sync

### build
$ ionic build

### run on android
$ ionic cap run android

### copy and sync (whenever you install new dependencies)
$ ionic cap copy
$ ionic cap sync

### geolocation plugin
$ npm install cordova-plugin-geolocation
$ npm install @ionic-native/geolocation

### run the app on android with live reload
$ ionic capacitor run android --livereload --external

### run the app in browser based lab
ionic lab