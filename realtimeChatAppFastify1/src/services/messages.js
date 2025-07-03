const moment = require("moment")

const formatMessage = (username,text) => {
    return {
        username,
        text,
        time:moment().format("h:m A")
    }
}

module.exports = {formatMessage}; 