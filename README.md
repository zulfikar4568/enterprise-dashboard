# json-api
Notes: This project use mendix version `9.24.21`

## Install Clasp CLI
If you don't have Clasp install first on your machine
```
npm install @google/clasp -g
```

## Connect with your Google
```
clasp login
```

## Setting Script Id or your Project ID to source folder
```
clasp clone <Your Script ID> --rootDir src
```

## Install Google Apps Script in you project
In this repository already add this script, so this is (optional)
```
npm i --save @types/google-apps-script
```

Copy your manifes `appsscript.json` in google editor into `src/appsscript.json` for example
```
{
  "timeZone": "Asia/Jakarta",
  "dependencies": {},
  "exceptionLogging": "STACKDRIVER",
  "runtimeVersion": "V8",
  "webapp": {
    "executeAs": "USER_DEPLOYING",
    "access": "ANYONE_ANONYMOUS"
  }
}
```

## Make sure your account activate the Google apps Script Settings
https://script.google.com/home/usersettings (Activate this)


## Deployment
Push your code to the your Google App Script, your code will be appears in Editor Google
- clasp push
