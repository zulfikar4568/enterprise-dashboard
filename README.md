# Enterprise Dashboard
You can check how to run the app in [here](./docker/README.md). Access the application on `http://localhost:8080`.
Default User is `Admin` and Password is `@Admin123`

Notes: This project use mendix version `9.24.21`

## Data
The data is maintained in this [Spread Sheet](https://docs.google.com/spreadsheets/d/1e7boDCAm5Rel64GfDueei_vWj71xJRVVwu1wcyHUWz0/edit?usp=sharing)

## Backend API
The Backend API is created using AppScript from Google, which you can find in here: [AppScript Project](https://script.google.com/home/projects/1zd9Jnmg7aEGlJybQ5k3M1EChpQ0G1bEqusoUMxaM7mWDdHqerI7x_pb0/edit)

# How the API is being created
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
