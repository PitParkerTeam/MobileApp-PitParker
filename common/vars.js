export const COLORS = {
  TINT: {
    120: "#17775C",
    100: "#5FB49C",
    80: "#98DFAF",
    60: "#DEEFB7",
    40: "#E8F4CD",
    20: "#F7FBD0",
  },
  BASE: {
    100: "#0E0E2C",
    80: "#6C6C6C",
    60: "#ABABAB",
    40: "#DFDFDF",
    20: "#F3F3F3",
    0: "#FFFFFF",
  },
  DARK: {
    100: "#0002A9",
    80: "#934F8D",
  },
};

export const DEFAULT_VARS = {
  coords: {
    latitude: 37.78825,
    longitude: -122.4324,
  },
};

export const locationLinkConfigs = {
  googleForceLatLon: false,
  alwaysIncludeGoogle: true,
  dialogTitle: "Get Directions",
  appsWhiteList: ["google-maps", "apple-maps"],
  dialogMessage: "",
  naverCallerName: "com.example.myapp",
  directionsMode: "drive",
};

export const reminderOptions = [
  { text: "None", value: null },
  { text: "When parking expires", value: 0 },
  { text: "5 minutes before", value: 5 },
  { text: "10 minutes before", value: 10 },
  { text: "15 minutes before", value: 15 },
  { text: "30 minutes before", value: 30 },
];
