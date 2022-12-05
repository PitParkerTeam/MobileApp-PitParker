import moment from "moment";

const formatTime = (time) => moment(time).format("YYYY-MM-DD MM:SS");


export {formatTime}