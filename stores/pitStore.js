import { makeAutoObservable, flow, autorun } from "mobx";
import { pitAPI, mapAPI } from "../api";
import { DEFAULT_VARS, timeDiff } from "../common";
import userStore from "./userStore";

class PitStore {
  nearbyPits = [];
  userPits = [];

  constructor() {
    makeAutoObservable(this);
  }

  setNearbyPits(val) {
    this.nearbyPits = val;
  }
  setUserPits(val) {
    this.userPits = val;
  }

  mapPits(pit) {
    const { place_id, name, geometry, vicinity } = pit;
    const latitude = geometry.location.lat;
    const longitude = geometry.location.lng;
    const compound_code = pit?.plus_code?.compound_code || "";
    return { id: place_id, name, latitude, longitude, vicinity, compound_code };
  }

  getNearbyPits = flow(function* () {
    try {
      const parking = yield mapAPI.getNearbyParking(userStore.userLocation);
      const pitsMapped = parking.results.map(this.mapPits);
      this.setNearbyPits(pitsMapped);
      pitAPI.batchAddPits(pitsMapped);
    } catch {}
  });

}

const pitStore = new PitStore();
autorun(
  () => {
    if (userStore.userLocation) {
      pitStore.getNearbyPits();
    }
  },
  {
    delay: 1000,
  }
);
export default pitStore;
