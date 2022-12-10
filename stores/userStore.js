import { makeAutoObservable, flow } from "mobx";
import { userAPI, pitAPI } from "../api";
import * as Location from "expo-location";
import { DEFAULT_VARS } from "../common";

class UserStore {
  userInfo = {};
  userLocation = { ...DEFAULT_VARS.coords };
  userPits = [];
  parkings = [];

  constructor() {
    makeAutoObservable(this);
  }

  setParkings(val) {
    this.parkings = val;
  }

  setUserPits(val) {
    this.userPits = val;
  }

  getUser = flow(function* (id) {
    try {
      const data = yield userAPI.getUser(id);
      if (data) {
        this.userInfo = data;
      }
    } catch {}
  });

  locateUser = flow(function* () {
    const { status } = yield Location.requestForegroundPermissionsAsync();
    if (status !== "granted") return;
    const location = yield Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced,
      enableHighAccuracy: true,
    });
    const { longitude, latitude } = location.coords;
    if (longitude && latitude) {
      this.userLocation = { longitude, latitude };
    }
  });
}

const userStore = new UserStore();
export default userStore;
