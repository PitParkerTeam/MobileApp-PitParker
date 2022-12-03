module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module:react-native-dotenv",
        ("expo-image-picker", {cameraPermission: "The app needs access to your camera.",})
      ],
    ],
  };
};
