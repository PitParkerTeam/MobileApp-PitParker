import axios from "axios";
import { mapApiKey } from "@env";
const baseUrl = "https://maps.googleapis.com/maps/api/place/nearbysearch";

export const getNearbyParking = async (lat, lng) => {
  const config = {
    method: "get",
    url: `${baseUrl}/json?location=${lat},${lng}&radius=1000&type=parking&key=${mapApiKey}`,
    headers: {},
  };
  const res = await axios(config);
  return res;
};
