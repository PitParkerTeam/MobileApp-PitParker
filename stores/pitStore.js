import { makeAutoObservable, flow, autorun } from "mobx";
import { pitAPI, mapAPI } from "../api";
import userStore from "./userStore";
import { Alert } from "react-native";

const pitNamePrompt = (pit)=> Alert.prompt("Pit Name", "Please give your pit a name", [
  {
    text: "Cancel",
    onPress: () => {},
    style: "cancel",
  },
  {
    text: "OK",
    onPress: (name) => {
      const updatedPit = { ...pit, name };
      pitAPI.updatePit(updatedPit).then(() => pitAPI.saveAsMyPit(updatedPit));
    },
  },
]);


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

  isUserPit(pitID) {
    return this.userPits.some((item) => item.id == pitID);
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
    } catch (e) {}
  });

  toggleSavePit = flow(function* (pit) {
    try {
      if (this.isUserPit(pit.id)) {
        const removePit = yield pitAPI
          .updatePit({ ...pit, name: null })
          .then(() => pitAPI.removeFromMyPit(pit.id));
      } else {
        if (!pit.name) {
         pitNamePrompt(pit);
        } else {
          const savePit = yield pitAPI.saveAsMyPit(pit);
        }
      }
    } catch (e) {}
  });
}

const pitStore = new PitStore();

export default pitStore;
