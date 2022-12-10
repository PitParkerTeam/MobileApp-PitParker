import moment from "moment";

const formatTime = (time) => moment(time).format("YYYY-MM-DD MM:SS");
const timeDiff = (time1, time2) => moment(time1).diff(moment(time2))


export { formatTime, timeDiff };
