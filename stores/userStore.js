import { makeAutoObservable, flow, autorun } from "mobx";
import { userAPI, pitAPI } from "../api";
import * as Location from "expo-location";
import { DEFAULT_VARS, timeDiff } from "../common";

class UserStore {
  userInfo = {};
  userLocation = { ...DEFAULT_VARS.coords };
  userPits = [];
  parkings = [];
  currentTime = Date.now();
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
    this.currentTime = val;
  }

  setUserLocation(val) {
    this.userLocation = val;
  }

  isCurrent({ startTime, endTime }) {
    return (
      timeDiff(startTime.toDate(), this.currentTime) < 0 &&
      timeDiff(endTime.toDate(), this.currentTime) > 0
    );
  }

  get currentParkings() {
    return this.parkings.filter(this.isCurrent);
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
    yield Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.Balanced,
        timeInterval: 5000,
      },
      (location) => {
        const { longitude, latitude } = location.coords;
        if (longitude && latitude) {
          this.setUserLocation({ longitude, latitude });
        }
      }
    );
  });
}

const userStore = new UserStore();

export default userStore;
