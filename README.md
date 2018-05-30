# Node Workshop
An app to control smart home appliance:
 - Add/remove devices
 - Switch them on/off
 - Gather devices into groups and control them as a whole

## Usage
To use the app you should firstly install all the dependencies for server part as well as for frontend, i.e. run:
```
npm install
```
in both root and frontend directories.

Then you should start MongoDB:
```
mongod --dbpath=[your_database_location]
```
After all, you are ready to start the app. Run:
```
npm start
```
in both root and frontend directories in that order exactly to start firstly the server and then the React app which connects to it.