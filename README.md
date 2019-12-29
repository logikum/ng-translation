# NgTranslation

NgTranslation is a localization support package for Angular 6 applications.

See documentation: [NgTranslation](https://ngt.logikum.hu/)

### Usage

Run this command to use the localization library:
```
npm install @logikum/ng-translation --save
```
### Install

Run these commands to get the sources of the localization library:
```
git clone https://github.com/logikum/ng-translation.git
npm install
```
### Build the package

Run these commands to build the localization package:
```
npm run build
npm run postbuild
```
### Documentation

Run this command to start the documentation site in development mode:
```
ng serve doc-web-site
```
Run this command to build the documentation site:
```
ng build --prod doc-web-site
```
Run this command to start the documentation site in production mode:
```
NODE_ENV=production PORT=3000 node dist/doc-web-site
```
### Test

Run this command to start the test site in development mode:
```
ng serve test-web-site
```
