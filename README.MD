# MTG-API
Backend code for an MTG Inventory app being built on stream over on [TWITCH](https://www.twitch.tv/zer0xeon)

## Setup
1.  Download the SQLite Version of the All Printings database from [here](https://mtgjson.com/downloads/all-files/)
2.  Put it in the same folder as the code.
3.  Run `npm install`
4.  Run `npm start` to start the dev server, it will default to port 1999.
5.  Open the server to `127.0.0.1:port/card-by-name:[CARD NAME]` and enter any legal MTG Card with proper capitalization and it should display the name, mana cost, and effect text of the chosen card. Usual test url is `127.0.0.1:1999/card-by-name:Black%20Lotus`

## Notes
To change the port go into `config.ini` and change the port value.
If you wish to disable the high level of verbosity, set debug to false.


HAPPY TRAILS!