# server-router
the main server router. allow to run multiple node express and websites instances simultaneously 

1. apply the preffix url for that app in the React package.json
2. apply the preffix url for that app in the React-Router, BrowserRouter basename property
* it is possible too, to use PUBLIC_URL within the.env files
3. run 'npm run build'.
4. add the full path of the build folder into the assets/apps.json file
5. add the preffix url into the  assets/apps.json file