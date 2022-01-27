we create webpack

- Developement environment (webpack.dev.js)
- Production environment (webpack.prod.js)
- Common (webpack.common.js)

whenever we run webpack we merge
Development Environment - Development webpack config file + common => final webpack file.
Production Environment - Production webpack config file + common => final webpack file.

and use accordingly.

src - will contain all our source codebase

public - html file to render the source codebase

---

42-added basic webpack setup to container app
Added config folder with webpack info - port 8080
Added "start" script inside package.json file
Added App.js file to return some basic code
Rendered App.js component within bootstrap.js through index.js

43-integration of container with marketing
Added the Modulefederation plugin information for both marketing and container app with hosts(nfe) and remotes info(nr).
imported the marketing app into App.js of container.

45-added separate marketing app component or hostapp component to hold the MFE and referenced it within appjs file
Added marketing app file inside component/MarketingApp and utilized
useRef hook to get reference to a destination html tag to host the MFE
useEffect hook to call the mount function of MFE and pass the destination html tag to render the MFE
Pass this marketing app component to App.js and rendered it alongside someother html tags.

46-added shared entries to create only 1 entry
shared:['react','react-dom'] within the webpack.\*.config file.

47-added reference to package json file from webpack config file

```js
//to refer to package json file
const packageJSON = require("../package.json");
new ModuleFederationPlugin({
  ...
  //shared:['react','react-dom']
  shared: packageJSON.dependencies,
});
```

This will allow us to get the latest entries from package json necessary dependencies, so no longer worry about shared module array all the time.
