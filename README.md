# Sessions

## Simple fitness tracker dashboard to track your progress

### Description

Personalized fitness tracker dashboard that logs your workouts (run, bike, swim, weights) and tracks your monthly as well as yearly progress (via charting).

Stretch features:

- Add coaches profile vs. athletes profile
- Add connect/friend feature between coaches and athletes
- Add video streaming for coaches and athlete meetings
- Add calendar for tracking coaches and atheletes upcoming meetings
- Add functionality for coaches to add training schedule to athlete calendar
- Add timeline tracking for upcoming events

### Instructions

#### Clone and Install Dependencies

- Git clone repo to local machine
- Run npm install to install dependencies

#### Set up database with ElephantSQL(or other hosting / local service)/PostgreSQL/node-postgres

- Install PostgreSQL on your machine

  - [MacOS & Linux](https://github.com/CodesmithLLC/dev-environment-setup/blob/main/mac-os.md#install-postgresql)
  - [Windows](https://github.com/CodesmithLLC/dev-environment-setup/blob/main/windows-os.md#install-postgresql)

- Go to your terminal and verify that you can run the psql command: `psql --version`
- If the psql command isn't recognized, you'll need to add it to your PATH.
  - Linux and Mac: add the line `export PATH=$PATH:/Library/PostgreSQL/latest/bin` to your `~/.bashrc` or `~/.bash_profile`, respectively, and restart your terminal. The exact path may vary so be sure to confirm the location of the postgresql binaries.
  - Windows (native): go to the advanced system settings to modify the PATH environmental variable to include the `bin` directory within the postgresql install directory.

##### Create an account on ElephantSQL

- Go to [https://www.elephantsql.com/](https://www.elephantsql.com/), create an account, and create a new database instance. Make sure to select the free 'Tiny Turtle' plan. Name your new database.

- Grab the url of your new database so you can access it from the command line in your terminal.

##### Add URI To Model For Database Access

- Create .env file in the root folder
- Add `PG_URI = <url from elephantSQL>`

##### Create the tables and populate them with data

- Invoke `psql -d <url from elephantSQL> -f sessions_postgres_create.sql`. This will open the connection to your database and execute the SQL statements that will create tables in your database and populate them with rows of data.

#### Add Additional ENV Variables for Auth and Auth Redirect

- Add CLIENT_URL = "http://localhost:8080/dashboard" to .env for redirect after sucessful login (in dev mode)
- Set up OAuth in Google dev console https://support.google.com/googleapi/answer/6158849?hl=en
- Add client secret to .env `GOOGLE_CLIENT_SECRET = <client secret>`
- Add client id to .env `GOOGLE_CLIENT_ID = <client id>`
- Create secret for session cookie signature and add to .env `SECRET = <session secret>` (see docs for more information - https://www.npmjs.com/package/express-session)

#### Running Application

- Run `npm run dev` to start your server and bundle the frontend. It will launch the frontend application in a browser window on http://localhost:8080/
