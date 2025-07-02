# About ![NgTranslation](/images/ng-translation-40.png "NgTranslation")

NgTranslation is an internationalization and localization library for
Angular applications.

For example you provide these texts in English and Hungarian languages in
JSON files:

```json
// text.en.json
{
  "title": "About NgTranslation",
  "description": "NgTranslation is an internationalization and localization library for Angular applications."
}
```

```json
// text.hu.json
{
  "title": "Névjegy",
  "description": "Az NgTranslation egy többnyelvűvé tételt és honosítást támogató könyvtár Angular alkalmazásokhoz."
}
```

The following component view will display the texts in the selected language:

```html
<!-- home.component.html -->
<ng-container *translate="let t">
  <h1>{{ t( 'text.title' ) }}</h1>
  <p>{{ t( 'text.description' ) }}</p>
</ng-container>
```

Source: [github.com/logikum/ng-translation](https://github.com/logikum/ng-translation "|_blank")
