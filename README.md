# spellcheck-dictionary-configurer

# Building for a production
Install node.js then go to the cloned project directory and run following commands
```
npm run installAll
npm run prodAll
```

# Dependencies updating
After updating install all needed dependencies from a console output if needed.
```
npm run updateAll
```
Look at **browserlist** that rule by polyfills
```
npx browserslist
```
Add all browser to an ignore except the latest Firefox version.

# Known issues
1. It can break CSS that depends on changed attributes like `[lang="en-US"]{...}`.
See for example about [lang](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)
2. It can break a JavaScript that depends on a `lang` attribute value.
3. `main.ts` file has a dirty hack to disable `console.debug`,
It needs to be replaced by **angular builders** in `angular.json`
4. Such JavaScript plugins as **CodeMirror** create many separated tags with pieces of a text inside them.
These pieces are not text fields that is why it is impossible to recognize them and switch on a spell checking.
As an example you can look at various programming code online editors.
5. Sometimes if there are local site iframes which does not load from remote sites it can happen that the script does not work for such iframes. It is possible to fix it because it is just a bug. I investigate it.

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
