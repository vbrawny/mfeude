[Reference Github Url](https://github.com/vbrawny/mfeude)

```sh
npm install --global windows-build-tools

npm config set python c:\python27\python.exe
```

If we donot set the environment variable we can try this.

# Summary

We identify 3 distinct areas of functionality and we handle by 3 different teams accordingly.

So 3 MFE for these and 1 container application to hold them.

### Container

To hold the MFEs

### MFE

Marketing ( marketing team will be incharge ) (React Application)

- HomePage
- Pricing Page

Authentication ( infra team will be incharge ) (React Application)

- SignIn Page
- SignUp Page

Dashboard ( charts team will be incharge ) (Vue Application)

- DashboardPage

## Architectural Decisions

Here are the hard requirements for implementing this application.

#### Some blog inferences

- Share state between apps with redux.
- The container must be written with webcomponents.
- Each Microfrontend can be a React component that is directly used by another application.
- Only communicate between apps using XYZ system.

The above requirements will be different based on our requirements. So it is individualstic.

#### Our Requirements to implement our overall MFE Architecture.

- We must have ZERO coupling between MFEs/child projects.
- No importing of functions/classes/Objects etc between MFEs/child projects.
- No sharing of reducers,store,context can be shared between MFEs/child projects. No Shared state.
- Its ok to share library between MFEs/Child Projects
- Anything that is getting repeated between two MFE should be taken to a library.
- CSS from one project shouldn't effect other, if anything is getting repeated, please push it to library.
- version control should not impact the project.
- we can have monorepo or separate repos.
- Container should be able to decide to always use the latest version of a MFE or a specific version of MFE
- container will always use the latest version of child app(doesn't require a redeploy of container)
- container can specify exactly what verion of a child it wants to use (requires a redeploy to change).

- Near ZERO coupling between container and child apps.

  Container shouldn't assume that a child is using a particular framework
  Any necessary communication done with callbacks or simple events.

---

We are not using directly cli apps as they donot support webpack 5 like "react-scripts" package that get generated with "create-react-app"

50

create github repo named mfeud

For creating new github reference to local system

[Generating a new ssh key and adding it to ssh agent.](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)

[Adding ssh agent's ssh key to github.](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account)

```sh
ls -al ~/.ssh

ssh-keygen -t ed25519 -C "<your github mailid>"

eval "$(ssh-agent -s)"

ssh-add ~/.ssh/id_ed25519

clip < ~/.ssh/id_ed25519.pub
```

now the key is copied to clipboard.
navigate to settings->ssh-gkpsettings
Click Add sshkey button
Paste the key

Now from the gitbash terminal

```sh
git remote add origin git@github.com:vbrawny/mfeude.git
git push origin master
```

Provide the phrase if asked

### 51

Production webpack config for container

In production we will merge common and production webpack config files

refer to webpack.prod.js file,webpack.common.js and package.json

```js
//webpack.common.js
const HtmlWebpackPlugin = require("html-webpack-plugin");
...

    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),
    ]

```

```js
//webpack.prod.js
//webpack merge to merge webpack.common.js and webpack.prod.js files together into one single file.
const { merge } = require("webpack-merge");
//Module federation Plugin
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
//get common webpack config reference for common refs
const commonConfig = require("./webpack.common");
// get package json reference for shared modules
const packageJson = require("../package.json");

//ENVIRONMENT VARIABLE WE GET THROUGH CI CD PIPELINE
const domain = process.env.PRODUCTION_DOMAIN; //SETUP THIS PRODUCTION_DOMAIN variable in CI,CD pipeline

const prodConfig = {
  // will cause webpack run differently like optmization and more performant(minimizing)
  mode: "production",
  output: {
    // cache buster naming convention. to avoid cache issues on js file in browser
    filename: "[name].[contenthash].js",
  },
  //plugins
  plugins: [
    new ModuleFederationPlugin({
      name: "container",
      remotes: {
        marketing: `marketing@${domain}/marketing/remoteEntry.js`,
      },
      shared: packageJson.dependencies,
    }),
  ],
};

module.exports = merge(commonConfig, prodConfig);
```

```json
 "scripts": {
    "build": "webpack --config config/webpack.prod.js"
  },
```

Run

```sh
npm run build
```

The build should happen successfully and a dist folder with all necessary files should be created inside container folder.

### 52

Follow the above steps for marketing application.

### 53

We use github actions to implement CI CD pipelines.
Any event occured in github repo

Run all worklows associated to this events

Workflow

We use four workflows 1.Container 2.Marketing 3.Dashboard and 4.Auth

1.Container

- Whenever code is pushed to the master/main branch and this commit contains a change to the 'container' folder.

- Then "change into container folder".

- Then "Install Dependencies".

- Then "Create a production build using webpack".

- Then "Upload the result to AWS S3"

  2.Marketing

- Whenever code is pushed to the master/main branch and this commit contains a change to the 'marketing' folder.

- Then "change into marketing folder".

- Then "Install Dependencies".

- Then "Create a production build using webpack".

- Then "Upload the result to AWS S3"

  3.Dashboard

- Whenever code is pushed to the master/main branch and this commit contains a change to the 'dashboard' folder.

- Then "change into dashboard folder".

- Then "Install Dependencies".

- Then "Create a production build using webpack".

- Then "Upload the result to AWS S3"

  4.Auth

- Whenever code is pushed to the master/main branch and this commit contains a change to the 'auth' folder.

- Then "change into auth folder".

- Then "Install Dependencies".

- Then "Create a production build using webpack".

- Then "Upload the result to AWS S3"

This should be continuous process.
