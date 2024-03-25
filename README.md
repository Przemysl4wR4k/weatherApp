Orignal requirements:

Creating a widget in TS (optionally in JS):

Any framework of your choice
Display temperature information for 3 randomly selected cities (chosen from Łódź, Warsaw, Berlin, New York, London)
Include temperature (in Celsius), a textual description (e.g., cloudy), and optionally a weather icon
Use the API from https://openweathermap.org/api
Clicking on the widget should open a new tab at https://openweathermap.org/city/3337493 for the selected city
Weather data should be refreshed every 10 seconds
Every minute, 3 new cities from the specified 5 should be randomly selected
The page must have its own styling without using CSS libraries
The code should be uploaded to a repository using git (optionally hg)

I was not sure whether using one interval would be better, so I decided to stick to two intervals solution.
The styles are not bad, of course they could have been better. Some smooth transitions or other animations could've been added. If you require some more complicated styles, please let me know :)

# WeatherApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.2.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
