import moment from "moment";

const formatTime = (time) => moment(time).format("YYYY-MM-DD HH:mm");
const formatTimestamp = (timestamp) => {
  return formatTime(timestamp.toDate());
}
const timeDiff = (time1, time2) => moment(time1).diff(moment(time2));

const deg2rad = (deg) => {
  return deg * (Math.PI / 180);
};

const calculateDistance = (coord1, coord2) => {
  const R = 6731;
  const dLat = deg2rad(coord1.latitude - coord2.latitude);
  const dLon = deg2rad(coord1.longitude - coord2.longitude);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(coord1.latitude)) *
      Math.cos(deg2rad(coord2.latitude)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = Math.round(R * c * 1000);
  return distance;
};

const getDistanceString = (coord1, coord2) => {
  const dist = calculateDistance(coord1, coord2);
  if (dist > 1000) return `${Math.round(dist/1000)} km`
  return `${dist} m`
}

export {
  formatTime,
  timeDiff,
  formatTimestamp,
  getDistanceString,
};
