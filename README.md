# MMM-Fantastical

A MagicMirror² module for displaying iCal calendar events in a clean, customizable format. (NOTE: I use Fantastical and iCloud Calendar. Because they both sync together with Fantastical, this method takes your iCloud share link ["https://support.apple.com/guide/icloud/share-a-calendar-mm6b1a9479/icloud"] due to Fantastical not having a share calendar link button currently.)

## Features
- Displays upcoming events from iCal calendars
- Customizable update intervals
- Shows event times, locations, and dates
- Configurable look-ahead period
- Clean, minimal design

## Known Issues

The module initially shows npm security vulnerabilities from dependencies. Running the following command during installation fixes these issues:

```
npm audit fix --force

## Installation

1. Navigate to your MagicMirror modules directory:
```
cd ~/MagicMirror/modules
```

2. Clone this repository:
```
git clone https://github.com/devdugz/MMM-Fantastical.git
```

3. Install dependencies:
```
cd MMM-Fantastical
npm install
```

## Configuration

Add this configuration to your `config/config.js` file:

```javascript
{
    module: "MMM-Fantastical",
    position: "top_left",
    config: {
        icalUrl: "YOUR_CALENDAR_URL", // REPLACE "YOUR_CALENDAR_URL" WITH YOUR ICAL LINK
        updateInterval: 300000, // 5 minutes
        maxEvents: 10,
        showLocation: true,
        dateFormat: "MMM Do YY",
        timeFormat: "h:mm a",
        lookAhead: 60 // Number of days to look ahead
    }
}
```

### Configuration Options

| Option | Description | Default |
|--------|-------------|---------|
| `icalUrl` | Your iCal calendar URL | Required |
| `updateInterval` | How often to refresh calendar (in ms) | 300000 |
| `maxEvents` | Maximum number of events to display | 10 |
| `showLocation` | Whether to show event locations | true |
| `dateFormat` | Format for displaying dates | "MMM Do YY" |
| `timeFormat` | Format for displaying times | "h:mm a" |
| `lookAhead` | Number of days to look ahead | 60 |

## Styling

The module uses the following CSS classes that you can customize in your custom.css:
- `.mmm-fantastical`
- `.event-time`
- `.event-title`
- `.event-location`
- `.event-date`

## Dependencies
- [node-ical](https://github.com/jens-maus/node-ical)

## Contributing
1. Fork the repository
2. Create a new branch (`git checkout -b feature/improvement`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/improvement`)
5. Create a Pull Request

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Support
If you find this module helpful, please consider starring the repository on GitHub.