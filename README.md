# Lightning Web Components
A Blazing Fast, Enterprise-Grade Web Components Foundation
To install Lightning Web Components and create an app, use the lwr tool:


    $ npm init lwr
    $ npm install
    $ npm run start


Follow the instructions in your terminal:

- For "Select a type of project", choose "Single Page App"
- For "Choose a variant", choose "LWC"

For more information, see [Get Started with LWC](https://developer.salesforce.com/docs/platform/lwr/guide/lwr-intro.html)




# Why this LWC Boilerplate
It is time consuming and a tedious process to work on LWC components inside Salesforce. We have to write code locally, deploy it in salesforce and then test.
So, this setup will run on your local machine and your development and debugging time will be 5x faster at least.

Salesforce extention pack for VS Code have a preview option, but it also takes time and the output window is not beautiful to see.
Though, there are some limitations here in the local setup.
- no support for navigationMixin
- no support for Lightning Message Channel
- 



The **LWC Boilerplate** example contains the minimum code needed to get a simple Single Page Application (SPA) on LWR running.

## Project Setup

The directory structure looks like this:

```
src/
  ├── assets/           // static assets
  │   └── recipes-logo.png
  └── modules/          // lwc modules
      └── c/
          └── app/
              ├── app.css
              ├── app.html
              └── app.js
lwr.config.json         // lwr configuration
package.json            // npm packaging configuration
```

## Configuration

The LWR server is configured in `lwr.config.json`, at the root of the project. The **LWC Boilerplate** example has one LWC module and one server-side route.

```json
// lwr.config.json
{
    "lwc": { "modules": [{ "dir": "$rootDir/src/modules" }] },
    "routes": [
        {
            "id": "app",
            "path": "/",
            "rootComponent": "c/app"
        }
    ]
}
```

## Server-Side Routing Properties 

Each server-side routes object in an `lwr.config.json` file includes some of these properties:

- `id`: The unique identifier for the route. Required.
- `path`: The unique URI path from which the route is served. Required.
- `layoutTemplate`: The path to a static template that renders the page layout.
- `either`:
  - `contentTemplate`: The path to a static template that renders the page content.
  - `rootComponent`: The top-level Lightning web component that LWR bootstraps into the HTML output for the route. Each route must have either a rootComponent or a contentTemplate, but not both. (If you do use a rootComponent, LWR applies a default contentTemplate to render it.)
- `properties`: A JSON object that can be passed to the templates as context.
- `routeHandler`: A path to a route handler function configured for the route.
- `cache`: The cache settings for the routing, including:
   - `ttl`: A number, in seconds, or a time string to use as the max-age on the Cache-Control header.
- `bootstrap`: The bootstrap object contains client options that determine how an application page is loaded.
- `syntheticShadow`: Set to true to turn on LWC synthetic shadow, default is false.
- `services`: An array of LWC modules to run on page load.

Here’s an example of an `lwr.config.json` file that includes several routing properties:

```{
    "routes": [
        {
            "id": "example",
            "path": "/",
            "rootComponent": "example/app",
            "layoutTemplate": "$layoutsDir/main.html",
            "properties": { "staticParam": "This is the Home page" },
            "cache": { "ttl": 60 }
            "bootstrap": {
                "syntheticShadow": true,
                "services": ["example/service", "example/loaderHooks"]
            }
        },
        {
            "id": "docs",
            "path": "/help",
            "contentTemplate": "$contentDir/readme.md",
            "routeHandler": "$rootDir/src/routeHandlers/docs.js",
            "cache": { "ttl": "7d" }
        }
    ]
}
```

## Error Routing
You can set up routes that LWR serves if a 404 or 500 error is encountered during the bootstrap of a route. Error routes take a status code value, instead of a path value.

```// lwr.config.json
{
    "errorRoutes": [
        {
            "id": "not_found",
            "status": 404,
            "rootComponent": "example/notFound"
        },
        {
            "id": "server_error",
            "status": 500,
            "contentTemplate": "$contentDir/not-found.html"
        }
    ]
}
```

## Limitations

Coming soon

## Client-Side Routing

See details [here](https://developer.salesforce.com/docs/platform/lwr/guide/lwr-routing-client.html)

## Running the Project

```bash
yarn install
-----------------
yarn start 
OR 
yarn dev
-----------------
```

Open the site at [http://localhost:3000](http://localhost:3000)

To start the project in a different mode:

-   dev: `yarn dev`
-   compat: `yarn start:compat`
-   prod-compat: `yarn start:prod-compat`


