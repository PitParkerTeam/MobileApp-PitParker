import axios from "axios";
import { mapApiKey } from "@env";

const baseUrl = "https://maps.googleapis.com/maps/api/place/nearbysearch";

export const getNearbyParking = async ({ latitude, longitude, radius }) => {
  const url = `${baseUrl}/json?location=${latitude},${longitude}&radius=${
    radius || 350
  }&type=parking&key=${mapApiKey}`;

  const res = await axios.get(url);
  return res.data;
};
