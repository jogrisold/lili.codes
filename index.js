
// const express = require("express");
import express from "express";

// require('@babel/register')({
//   extensions: ['.js', '.jsx'],
//   presets: ['@babel/preset-react']
// });

import register from '@babel/register';

register({
  extensions: ['.js', '.jsx'],
  presets: ['@babel/preset-react']
  });

// const bp = require( 'body-parser');
const path = require( "node:path");
const __dirname = path.resolve();
// const ejs = require( 'ejs');
// //const Error = require( './client/src/components/Error';
// const React = require( 'react');
// const ReactDOMServer = require( 'react-dom/server');
// const Login = require( './client/src/components/authentication/Login.js');

// Base dependencies
import bp from  'body-parser';
// import path from  "node:path";
import process from 'process';
// import __dirname from '__dirname'
import ejs from  'ejs';
//import Error from  './client/src/components/Error';
import React from  'react';
import ReactDOMServer from  'react-dom/server';

// import {sendResponse} from './db/utils';


// const { getGBFS, getStationStatus } = require( "../db/gbfs-handlers.js");
// const { requestPositionFromAddress } = require( "../db/location-handlers.js");

// const { handleLogIn, 
//   handleSignUp, 
//   updateUserProfile, 
//   getUserProfile, 
//   updateUserRoutes, 
//   updateUserSettings } = require( "../db/user-handlers.js");

// Components
import Login from  './components/authentication/Login.js';

// Handlers
import { getGBFS, getStationStatus } from  "./db/gbfs-handlers.js";
import { requestPositionFromAddress } from  "./db/location-handlers.js";
import { handleLogIn, 
        handleSignUp, 
        updateUserProfile, 
        getUserProfile, 
        updateUserRoutes, 
        updateUserSettings
    } from './db/user-handlers.js';

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
app.use(express.static(path.join(process.cwd(), 'client/build')));





// Configure view engine
app.set('view engine', ejs);
app.set('views', path.join(__dirname, 'views'));


// Use webpack to serve the react app
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

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

// Webpack endpoints
app.get('/login', (req, res) => {
  const loginPage = ReactDOMServer.renderToString(<Login />);
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>BTB GPT Login</title>
        <link rel="stylesheet" href="/static/css/main.8b7d59dd.chunk.css">
      </head>
      <body>
        <div id="root">${loginPage}</div>
        <script src="/static/js/main.1cf17333.chunk.js"></script>
      </body>
    </html>
  `);
});

// app.get("*", (req, res) => {
//   sendResponse(res, 404, "no data", message = "Server endpoint does not exist.");
//   //res.status(404).sendFile(path.join(__dirname, 'client/build', 'index.html'))
// });
  
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});