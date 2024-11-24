// MMM-Fantastical/node_helper.js
const NodeHelper = require("node_helper");
const ical = require("node-ical");

module.exports = NodeHelper.create({
    start: function() {
        console.log("Starting node helper for: " + this.name);
    },

    socketNotificationReceived: function(notification, payload) {
        if (notification === "GET_EVENTS") {
            this.fetchEvents(payload);
        }
    },

    fetchEvents: function(config) {
        const url = config.icalUrl.replace('webcal://', 'https://');
        
        ical.fromURL(url, {}, (err, data) => {
            if (err) {
                console.error("Error fetching calendar:", err);
                return;
            }

            const now = new Date();
            const future = new Date();
            future.setDate(future.getDate() + config.lookAhead);

            let events = [];
            for (let k in data) {
                if (data[k].type === 'VEVENT') {
                    const event = {
                        title: data[k].summary,
                        start: data[k].start,
                        end: data[k].end,
                        location: data[k].location || ""
                    };
                    
                    if (event.start >= now && event.start <= future) {
                        events.push(event);
                    }
                }
            }

            events.sort((a, b) => a.start - b.start);
            this.sendSocketNotification("EVENTS_RESULT", events.slice(0, config.maxEvents));
        });
    }
});
