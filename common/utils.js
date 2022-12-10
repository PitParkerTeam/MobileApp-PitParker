import moment from "moment";

const formatTime = (time) => moment(time).format("YYYY-MM-DD MM:SS");
const formatTimestamp = (timestamp) => formatTime(new Date(timestamp.seconds * 1000))

const timeDiff = (time1, time2) => moment(time1).diff(moment(time2))


export { formatTime, timeDiff, formatTimestamp };
