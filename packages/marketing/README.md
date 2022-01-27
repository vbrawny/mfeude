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

41- Added routing using a new base App.js file and rendered it inside the bootstrap.js file.
