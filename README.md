# spellcheck-dictionary-configurer

# Building for a production
```
npm install
npm run prodAll
```

# Dependencies updating
```$xslt
npm update
```
Look at **browserlist** that rule by polyfills
```$xslt
npx browserslist
```
Add all browser to an ignore except the latest Firefox version.

# Known issues
1. It can break CSS that depends on changed attributes like `[lang="en-US"]{...}`.
See for example about [lang](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)
2. It can break a JavaScript that depends on a `lang` attribute value.
3. `main.ts` file has a dirty hack to disable `console.debug`,
It needs to be replaced by **angular builders** in `angular.json`

# Warning, it can break some sites and web applications
The extension modifies attributes' values on web pages.
The scripts and CSS styles on these pages can depends on these attributes' values
and changes their behaviour accordingly.
If there is no an awaited attribute value then a page can be broken.

**List of risky sites and web applications**
1. Text editors, online document viewers
2. Sites' language, internationalization, localization etc
3. Sites that observe changes of attributes that are changed by the extensions.
It can create infinity loop, the extensions changes an attribute value,
site gets back the attribute value and it repeats endlessly.