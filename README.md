# NgTranslation

NgTranslation is an internationalization and localization package for
Angular applications.

See documentation: [NgTranslation](https://ngt.logikum.hu/)

### Usage

Run this commands to use the localization library:
```
npm install @logikum/ng-translation --save
npm install @logikum/ngt-formatter --save     // for NgT message format
npm install @logikum/icu-formatter --save     // for ICU message format
npm install @logikum/ngt-models --save        // optional
```
### Install

Run these commands to get the sources of the localization library:
```
git clone https://github.com/logikum/ng-translation.git
npm install
```
### Build the package

Run these commands to generate the default localization messages:
```
npm run i18n:nts    // NgT test site
npm run i18n:its    // ICU test site
```

Run these commands to build the localization package:
```
npm run build:ngc    // common library
npm run build:ngf    // NgT formatter library
npm run build:icu    // ICU formatter library
npm run build:ngt    // localization library
npm run build:ngm    // model library for localizable UI elements
npm run build:nts    // NgT test site
npm run build:its    // ICU test site
```
or
```
npm run build
```
### Test

Run these commands to start the test sites in development mode:
```
npm run serve:nts    // NgT test site
npm run serve:its    // ICU test site
```
