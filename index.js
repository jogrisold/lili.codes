
const express = require("express");
const bp = require('body-parser');
const path = require("node:path");
const ejs = require('ejs');
const Error = require('./client/src/components/Error')

const {sendResponse} = require('./db/utils');

const { getGBFS, getStationStatus } = require("./db/gbfs-handlers");
const { requestPositionFromAddress } = require("./db/location-handlers");
const { handleLogIn, 
        handleSignUp, 
        updateUserProfile, 
        getUserProfile, 
        updateUserRoutes, 
        updateUserSettings
    } = require("./db/user-handlers");

const PORT = process.env.PORT || 5001;

const app = express();

/** Setting up server to accept cross-origin browser requests */
app.use((req, res, next)=> { //allow cross origin requests
  res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
  
  // !!! Replace with https://btb.ltd once certificate is obtained
  res.setHeader("Access-Control-Allow-Origin", "*"); 
  // !!! Otherwise this is not secure

  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

app.use(bp.json());
app.use(bp.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'client/build')));



// Configure view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Custom Error page
// app.use(function(req, res, next) {
//   res.status(404);
//   res.render('Error', {
//     title: 'Page not found',
//     message: 'Sorry, the requested page could not be found.'
//   });
// });

// Create an endpoint to request bike station data
app.get("/stations", getGBFS)
app.get("/station-status", getStationStatus)

// Create an endpoint that will return the lon/lat
// based on a user address input in the form
app.get("/get-position/:address", requestPositionFromAddress)

// Create an endpoint to add a user in the database on sign up
app.post("/api/signup", handleSignUp)

// Create an endpoint to retrieve user data based on user ID
// when they sign in
app.post("/api/login", handleLogIn)

// Create an endpoint to retrieve user data to store in state
// based on user id
app.get("/api/users/:_id", getUserProfile)

// Create an endpoint to modify user information when user 
// submits the preferences form in /profile
app.patch("/api/update-profile", updateUserProfile)

// Create an endpoint to modify user information when user 
// submits the settings form in /profile
app.patch("/api/update-settings", updateUserSettings)

// Create an endpoint to add previous routes to user profile
app.patch("/api/add-route-to-profile", updateUserRoutes)

// Catch all endpoint


app.get("*", (req, res) => {
  sendResponse(res, 404, "no data", message = "Server endpoint does not exist.");
  //res.status(404).sendFile(path.join(__dirname, 'client/build', 'index.html'))
});
  
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});