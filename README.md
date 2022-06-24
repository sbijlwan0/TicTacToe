# TicTac

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.4. It is a computer vs player version of tic tac toe. Computer is trying to stop you from winning. Test your skill. Can you beat Computer?

# Game ScreenShots
![image](https://user-images.githubusercontent.com/48445926/175474806-132db242-1a9f-412f-895b-c6fbc57f2077.png)

![image](https://user-images.githubusercontent.com/48445926/175474854-827cf7f0-f5eb-467c-aa9c-50bf77b8b686.png)

# Demo
[Demo](https://sbijlwan0.github.io/TicTacToe/)

## Development server

Run `npm i` to install node-modules first.
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

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

## To Deploy in github

Install this package globally
`npm i -g angular-cli-ghpages`

Then build your project using this command
`ng build --prod --base-href "https://<username>.github.io/<project-name>/"`

Then deploy in github using this command
`ngh --dir dist/<project-name>`