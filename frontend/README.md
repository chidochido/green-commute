# To run:

Create a ".env" file in the root dir, and add "REACT_APP_GMAPS_JS_API_KEY=YOUR KEY"
Then run npm start from the root dir.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any errors in the browser console.

### `npm run build`

Run before serving the frontend. (Not required while developing.)
Builds the app for production to the `build` folder.\
Your app is ready to be deployed!

## Tips
1) Please ensure that your `Google Maps JavaScript API` is enabled. Go to `API Manager`, click on `Overview`, search `Google Maps JavaScript API` (under `Google Maps API`), and click on `Enable API`.
2) Ensure that your `.env` file is located in the `frontend` directory.
3) Ensure that the `Routes API` is enabled.
4) Ensure that the `Places API` is enabled.

## Pushing
1) git add .
2) git commit -a -m "commit_msg"
3) git push
4) Use the `launch_easy_push` script by executing `./launch_easy_push 'my_msg'` to push to the repo fast and conveniently... The only argument that it takes is a commit message (MUST be in quotes).
