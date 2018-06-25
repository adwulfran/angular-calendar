

## Demo

http://51.254.58.224:8000/#/selectable-period

## Table of contents

* [About](#about)
* [Getting started](#getting-started)
* [FAQ](#faq)
* [Development](#development)


## About
Calendrier Angular 6.0+ 


## Getting started

First install through npm:

```bash
npm install --save angular-calendar
```

Next include the CSS file in the global (not component scoped) styles of your app:

```
/* angular-cli file: src/styles.css */
@import "../node_modules/angular-calendar/css/angular-calendar.css";
```

Finally import the calendar module into your apps module:

```typescript
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule } from 'angular-calendar';

@NgModule({
  imports: [BrowserAnimationsModule, CalendarModule.forRoot()]
})
export class MyModule {}
```






### Prepare your environment

* Install [Node.js](http://nodejs.org/) and NPM (should come with)
* Install local dev dependencies: `npm install` while current directory is this repo

### Development server

Run `npm start` to start a development server on port 8000 with auto reload + tests.

### Testing

Run `npm test` to run tests once or `npm run test:watch` to continually run tests.


