import axios from "axios";
import { mapApiKey } from "@env";
const baseUrl = "https://maps.googleapis.com/maps/api/place/nearbysearch";

export const getNearbyParking = async ({ latitude, longitude, radius }) => {
  const config = {
    method: "get",
    url: `${baseUrl}/json?location=${latitude},${longitude}&radius=${
      radius || 350
    }&type=parking&key=${mapApiKey}`,
    headers: {},
  };
  const res = await axios(config);
  return res.data;
};
