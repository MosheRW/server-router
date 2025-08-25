# assets files

## 1. apps.json
JSON file that contains all the data about the site builds, following this pattern:

```
[
  {
    "route": "/app2",
    "buildPath": "/home/server/app2/build",
    "description": "name of your app",
    "display": true
  },
  {
    "route": "/app1",
    "buildPath": "/home/server/app1/build",
    "description": "name of your app",
    "display": true
  },
  {
    "route": "/app3",
    "description": "name of your service",
    "display": true
  },
  {
    "route": "/feature-app",
    "buildPath": "/home/server/feature/download-page/פיצ'ער-1.2.3.apk",
    "display": false
  }
  // ... more entries
]
```

Each entry may include:
- `route`: The URL route for the app.
- `buildPath`: The path to the app's build or file (optional for some entries).
- `description`: A short description of the app (optional).
- `display`: Boolean indicating if the app should be displayed in listings.

## 2. details.json
JSON file that contains all the data about the webPage. it will include:
- `title`
- `h1`
- `h2`
- `webName`
- `webPath`
- `github`
- `linkdin`
