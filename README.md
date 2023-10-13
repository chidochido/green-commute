## Green Commute Web Application.

To get started and actually interact with the app, please navigate to the `frontend` directory. Ensure that a `.env` file is located inside of this folder with the contents `REACT_APP_GMAPS_JS_API_KEY=Key`, where `Key` is your key value (must be manually generated when enabling the Maps API for one of your Google Projects). Then perfom the following steps:

1) `npm install`
2) `npm start`

After executing `npm start`, you will then be redirected to your default browser where you can then interact with the Green Commute Web Application.

We are open to additional feedback to improve the user's experience while interacting with our web application. Enjoy!

## Example
1. Login Screen
![login.png](pics%2Flogin.png)


2. Maps Interface
![dash.png](pics%2Fdash.png)


3. Example Carbon Footprint Calculation
![working.png](pics%2Fworking.png)

## Pre-Requisites
- User must have a compatible laptop or PC that can run the latest version of ReactJS and Spring Boot.

## Dependencies
- To use our web application, the user will need access to ReactJS, Maven, Spring Boot, Google Maps JS API, and Carbon Footprint API.

## Download Instructions
- To download this project simply clone the root repository to your local directory using `git clone`.

## Build Instructions
To build this project, do the following (in order):
1. `cd frontend`
2. `npm install`
3. Create a Google Project with `Maps API`, `Places API`, and `Routes API` enabled and generate a corresponding key (save this).

## Installation
- Don't forget to follow the instructions above to properly get your `.env` file inside of the `frontend` repo.

## Run Instructions
- After the software is built, execute `npm start` from inside of the frontend directory to start the application. 

## Troubleshooting
- A common error is that one tends to incorrectly configure their API key inside of `.env`. 
- Another error is that one forgets to enable all the necessary Google APIs including `Maps API`, `Routes API`, and `Places API`. Please ensure that all the necessary APIs are enabled so that the application can correctly function.