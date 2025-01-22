# assets files

## 1. apps.json
json file that containes all the data about the sites build, in that patern:
```
[
  {
    "route": "/app1",
    "buildPath": "/path/to/app1/build"
  },
  {
    "route": "/app2",
    "buildPath": "/path/to/app2/build"
  }
]
```

## 2. 404.html
html file that will served in case of wrong  url parameters. 


## 3. homaPage.html
html file that will served in case that no url parametrs transferred.