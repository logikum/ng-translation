# NgTranslation

NgTranslation is a localization support package for Angular 6 applications.

## Installation

First you need to install the npm module:
```
npm install @logikum/ng-translation --save
```
## Setup

#### Root module

To use ng-translation you have to import the NgTranslationModule.forRoot()
in the root module of your Angular application:
```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgTranslationModule } from '@logikum/ng-translation';

@NgModule({
  imports: [
    BrowserModule,
    NgTranslationModule.forRoot( configuration )
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
```
The forRoot method requires a configuration object, see later.

#### Feature modules or shared module

In feature modules you have to use the NgTranslationModule.forChild()
method, or if you use a shared module that you import in multiple other
feature modules, you can export the NgTranslationModule to make sure you
don't have to import it in every module.
```typescript
@NgModule({
  exports: [
    CommonModule,
    NgTranslationModule.forChild()
  ]
})
export class SharedModule { }
```
#### Lazy loaded modules

For lazy loaded modules yuo have to use the LoadTranslationsGuard in the
route definitions to load the translations before loading the modules:
```typescript
import { RouterModule, Routes } from '@angular/router';
import { NgTranslationModule, LoadTranslationsGuard } from '@logikum/ng-translation';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'lazy',
    loadChildren: './lazy/lazy.module#LazyModule',
    canLoad: [ LoadTranslationsGuard ]
  },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot( routes ),
    NgTranslationModule.forRoot( configuration )
  ]
})
export class AppModule { }
```
The translations belonging to the lazy loaded modules are identified by the
path. To avoid path conflicts you can use an alternative way to identify the
proper translation. Add a data object having a section prefix property to
the route definition:
```typescript
const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'lazy',
    loadChildren: './lazy/lazy.module#LazyModule',
    canLoad: [ LoadTranslationsGuard ],
    data: { sectionPrefix: 'laggard' }
  },
  { path: '**', redirectTo: 'home' }
];
```

## Configuration

An example configuration object looks like that:
```typescript
{
  translationUrl: '/assets/i18n/{ language }/{ section }.json',
  sections: [ 'app', 'common', 'lazy:feature', 'lazy:texts' ],
  defaultLanguage: 'en'
}
```
The configuration object has the following properties:

#### translationUrl: _string_

The property defines the URL where NgTranslation will download the translation
files from. The property value is a template string that has to contain 2
named parameters surrounded by curly brackets:

<dl>
  <dt>language</dt>
  <dd>The code of the current or the requested language, e.g. 'en', 'en-GB',
    'en-US', 'es', 'fr' etc.</dd>
  <dt>section</dt>
  <dd>The name of a partial translation file without the file extension, see
    the following property.</dd>
</dl>

In the case of the above example the following files will be downloaded:
```
/assets
       /i18n
            /en
               /app.json
               /common.json
            /hu
               /app.json
               /common.json
```
When you use this template:
```typescript
translationUrl: '/translations/{ section }.{ language }.json'
```
Then the following translation files will be downloaded:
```
/translations
             /app.en.json
             /app.hu.json
             /common.en.json
             /common.hu.json
```
All the other translation files will bo downloaded when they are needed,
i.e. the user changes language or request a lazy loaded module.

#### sections: _Array&lt;string>_

All translations can be stored in a big file, however, it is easier to maintain
them when they are divided into several smaller files. The basis of the
distribution can be - for example - that each Angular module has its own
translation file. Even a bigger module can have more translation files. Another
possibility is to collect the texts used application wide into one or more shared
file. Or you can use your own strategy.
  
The sections are the names of this divided translation files without the file
extension. In case of lazy loaded modules the path of the module has to
precede the file name, separated by a colon. For that the translation service
could download the necessary translation files for the lazy loaded module,
the path is used to filter the needed sections. The download is initiated by
the LoadTranslationsGuard.

As an example, if you define the following route:
```typescript
const routes: Routes = [
  {
    path: 'shakespeare',
    loadChildren: './dramas/shakespeare.module#ShakespeareModule',
    canLoad: [ LoadTranslationsGuard ]
  }
];
```
Then you can use the following sections:
```typescript
sections: [ 'shakespeare:tragedies', 'shakespeare:histories', 'shakespeare:comedies' ]
```
If you apply the section prefix on the route definition like that:
```typescript
const routes: Routes = [
  {
    path: 'shakespeare',
    loadChildren: './dramas/shakespeare.module#ShakespeareModule',
    canLoad: [ LoadTranslationsGuard ],
    data: { sectionPrefix: 'dramas' },
  }
];
```
Then the corresponding sections will be:
```typescript
sections: [ 'dramas:tragedies', 'dramas:histories', 'dramas:comedies' ]
```

#### defaultLanguage: _string_

The code of the default language. The translations of the eager loaded modules
in the default language are downloaded at the start of the application.

## Usage

#### Define translations

The translation texts are stored in JSON files:
```json
// app.en.json
{
  "version": "1.0.0",
  "title": "Application Name",
  "welcome": "Welcome, {{ name }}!"
}
```
The translation texts are referred in the Angular app by their keys. The key
consists of the name of the translation file and the name of the JSON property
separated by a dot. The texts in the above example can be referred by the
following keys:
```
'app.version', 'app.title', 'app.welcome'
```
The JSON objects can be nested:
```json
// app.en.json
{
  "version": "1.0.0",
  "home": {
    "title": "Application Name",
    "welcome": "Welcome, {{ name }}!"
  }
}
```
In this case the keys will be:
```typescript
'app.version', 'app.home.title', 'app.home.welcome'
```
You can use an extended translation file names in similar way:
```json
// app.auth.en.json
{
  "userid": "User name",
  "pwd": "Password",
  "errors": {
    "failed": "The credentials are wrong!"
  }
}
```
Then the keys will be: 
```typescript
'app.auth.userid', 'app.auth.pwd', 'app.auth.errors.failed'
```
The section prefixes of lazy loaded modules will not part of the keys.

#### Use pipe in views

You can use the TranslatePipe to get your translation values:
```html
<div>{{ 'key' | translate:parameters }}</div>
```
The parameters are optional. For example: 
```html
<div>{{ 'app.home.title' | translate }}</div>
```
Or with parameters:
```html
<div>{{ 'app.home.welcome' | translate:{ name: 'John' } }}</div>
```
You can also specify the paramater in the component:
```typescript
const profile = {
  name: 'John',
  age: 37
};
```
```html
<div>{{ 'app.home.welcome' | translate:profile }}</div>
```
When you use HTML tags in the translation text:
```json
{
  "version": "Application Name<br><strong>Version 1.0.0</strong>"
}
```
It can be displayed using the innerHTML attribute:
```html
<div [innerHTML]="'app.version' | translate"></div>
```

## Use service in components

Instantiate the translation service in the component:
```typescript
constructor(
  private translate: TranslationService
) { }
```
Then you can get the translation texts:
```typescript
ngOnInit() {
  const title = this.translate.get( 'app.home.title' );
  const promo = this.translate.get(
    'app.promotions.daily',
    { product: 'CPG34500', discount: 15 }
  );
}
```
You must get the translation texts again after the current language has changed.
Another solution is to use the TranslatableTextList or TranslatableOptionList
classes to manage the translations because they update their texts automatically.

#### Parameter interpolation

If the parameter is an object, the translation service searches the names its
properties surrounded by double curly brackets. When it finds one, it will be
replaced by the value of the given property, e.g.:
```
// app.en.json
{
  "welcome": "Welcome, {{ name }}!"
}

// app.compoonent.html
<div>{{ 'app.welcome' | translate:{ name: 'John' } }}</div>

// Output: Wlecome, John!
```
When the parameter is an array, the translation service searches the indeces
of the array items surrounded by double curly brackets:
```
// app.en.json
{
  "welcome": "Welcome, {{ 0 }}!"
}

// app.compoonent.html
<div>{{ 'app.welcome' | translate:[ 'John' ] }}</div>

// Output: Wlecome, John!
```
In case of the parameter being a string, number or Boolean, the search phrase
is always &#123;<span></span>&#123;0}}:
```
// app.en.json
{
  "welcome": "Welcome, {{ 0 }}!"
}

// app.compoonent.html
<div>{{ 'app.welcome' | translate:'John' }}</div>

// Output: Wlecome, John!
```

## Selection Lists

The localization of the texts of a selection list is a frequent task. The
TranslatableOptionList class provides a way to do that easily. Let us assume
that we want to create a list of fruits. Tha names of the fruits are stored
in JSON files:
```json
// app.hu.json
{
  ...
  "fruits": {
    "apple": "alma",
    "peach": "barack",
    "cherry": "cseresznye",
    "plum": "szilva"
  },
  ...
}
```
The TranslatableOptionList class provides the list items in the following way:
```typescript
@Component({ ... })
export class FruitComponent implements OnDestroy {

  private fruitList: TranslatableOptionList;

  get fruits(): Array<TranslatableOption> { return this.fruitList.items; }

  constructor(
    private translate: TranslationService
  ) {
    this.fruitList = new TranslatableOptionList( translate, 'app.fruits' );
  }
  ...
  ngOnDestroy() {
    this.fruitList.destroy();
  }
}
```
Thereafter the fruits can be used in the view: 
```html
<select>
  <option *ngFor="let fruit of fruits"
          value="{{ fruit.value }}"
          selected="{{ fruit.selected ? 'selected' : '' }}">
    {{ fruit.text }}
  </option>
</select>
```
The TranslatableOptionList object wil load the appropriate translation texts
when the user changes the current language.

## Text Lists

The TranslatableTextList class makes easy to handle several text items in
the controller code. For example you want to use these texts:
```json
// app.json
{
  ...
  "shop": {
    "offer": "Offer of the day: buy {{ buy }} pay {{ pay }}!",
    "special": "Every {{0}} film is {{1}}% off!",
    "sale": "The sale still lasts for {{0}} days."
  },
  ...
}
```
You can do it like that:
```typescript
@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit, OnDestroy {

  private texts: TranslatableTextList;

  get dailyOffer(): string {
    return this.texts.get( 'offer', { buy: 3, pay: 2 } );
  }
  get specialOffer(): string {
    return this.texts.get( 'special', [ 'Jackie Chan', 20 ] );
  }
  get specialLasts(): string {
    return this.texts.get( 'lasts', 4 );
  }

  constructor(
    private translate: TranslationService
  ) {
    this.texts = new TranslatableTextList(
      this.translate,
      {
        'app.shop.offer': 'offer',
        'app.shop.special': 'special',
        'app.shop.sale': 'lasts'
      }
    );
  }

  ngOnInit() { }

  ngOnDestroy() {
    this.texts.destroy();
  }
}
```
