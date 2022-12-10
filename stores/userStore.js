import { makeAutoObservable, flow, autorun } from "mobx";
import { userAPI, pitAPI } from "../api";
import * as Location from "expo-location";
import { DEFAULT_VARS, timeDiff } from "../common";

class UserStore {
  userInfo = {};
  userLocation = { ...DEFAULT_VARS.coords };
  userPits = [];
  parkings = [];
  currentTime = Date.now()
  constructor() {
    makeAutoObservable(this);
  }

  setParkings(val) {
    this.parkings = val;
  }

  setUserPits(val) {
    this.userPits = val;
  }
  setCurrentTime(val) {
    this.currentTime = val
  }
  get currentParkings() {
    return this.parkings.filter(({ startTime, endTime }) => {
      return (
        timeDiff(startTime.toDate(), this.currentTime) < 0 &&
        timeDiff(endTime.toDate(), this.currentTime) > 0
      );
    });
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
