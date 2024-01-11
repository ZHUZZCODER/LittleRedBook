module.exports = {
  presets: ['module:@react-native/babel-preset'],
  //通过babel-plugin-root-import设置绝对路径
  "plugins": [
    [
      "babel-plugin-root-import",
      {
        "paths": [
          {
            "rootPathSuffix": "./src",
            "rootPathPrefix": "@/"
          }
        ]
      }
    ]
  ]
};
