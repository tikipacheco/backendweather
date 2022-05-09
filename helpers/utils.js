module.exports = {    
    responseJson: function (status, message, data) {
        return {
            status: status,
            message: message,
            data: data
        }
    },
    getDateXDaysAgo: function (numOfDays, date) {
        const daysAgo = new Date(date.getTime());
        daysAgo.setDate(date.getDate() - numOfDays);
        return daysAgo;
    }
}