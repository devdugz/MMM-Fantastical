// MMM-Fantastical/MMM-Fantastical.js
Module.register("MMM-Fantastical", {
    defaults: {
        icalUrl: "{YOUR_ICAL_URL}",
        updateInterval: 300000, // 5 minutes
        maxEvents: 10,
        showLocation: true,
        dateFormat: "MMM Do YY",
        timeFormat: "h:mm a",
        lookAhead: 60 // Number of days to look ahead
    },
    getStyles: function() {
        return ["MMM-Fantastical.css"];
    },
    start: function() {
        Log.info("Starting module: " + this.name);
        this.events = [];
        this.loaded = false;
        this.getEvents();
        this.scheduleUpdate();
    },

    getHeader: function() {
        return "Upcoming Events";
    },
    
    getDom: function() {
        const wrapper = document.createElement("div");
        wrapper.className = "mmm-fantastical";

        if (!this.loaded) {
            wrapper.innerHTML = "Loading...";
            return wrapper;
        }

        const eventList = document.createElement("ul");
        
        this.events.forEach(event => {
            const eventItem = document.createElement("li");
            const time = moment(event.start).format(this.config.timeFormat);
            const date = moment(event.start).format(this.config.dateFormat);
            
            eventItem.innerHTML = `
                <div class="event-time">${time}</div>
                <div class="event-title">${event.title}</div>
                ${event.location ? `<div class="event-location">${event.location}</div>` : ''}
                <div class="event-date">${date}</div>
            `;
            eventList.appendChild(eventItem);
        });

        wrapper.appendChild(eventList);
        return wrapper;
    },

    getEvents: function() {
        this.sendSocketNotification("GET_EVENTS", this.config);
    },

    scheduleUpdate: function() {
        setInterval(() => {
            this.getEvents();
        }, this.config.updateInterval);
    },

    socketNotificationReceived: function(notification, payload) {
        if (notification === "EVENTS_RESULT") {
            this.events = payload;
            this.loaded = true;
            this.updateDom();
        }
    }
});