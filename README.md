# babel-plugin-j6x [![CircleCI](https://img.shields.io/circleci/project/hrgdavor/babel-plugin-j6x.svg?maxAge=2592006)](https://circleci.com/gh/hrgdavor/babel-plugin-j6x)

> Babel plugin for JSX to JS transformation in j6x JavaScript library

Based on [babel-plugin-jsx-simple](https://github.com/hrgdavor/babel-plugin-jsx-simple)

Can be combined with [babel-plugin-jsx-inject](https://github.com/hrgdavor/babel-plugin-jsx-inject)

Used in [j6x](https://github.com/hrgdavor/j6x) library.

### What is JSX all about(the basic idea)

You want to write code that combines HTML and JS and do it sometimes inside a JS file too.

``` js
// state: {name:'Somebody', city: 'Mordor'}

proto.initTemplate = function(h,t,state){
  return <template><div>
    <div class="name"><b>Name: </b>{state.name}</div>
    <div class="city"><b>City: </b>{state.city}</div>
    <button x-click="showDetails">{'details'}</button>
  </div></template>
}

```

The JSX is tranformed to function calls and then the code looks like this:

``` js

proto.initTemplate = function(h,t,state){
  return h('div', null, null,
    h('div', {'class':'name'}, null, h('b', null, 'Name: '), ()=>person.name),
    h('div', {'class':'city'}, null, h('b', null, 'City: '), ()=>person.city),
    h('button', null, {x:{click:'showDetails'}}, t('details'))
  )
}

```

unlike basic transformation done by  [babel-plugin-jsx-simple](https://github.com/hrgdavor/babel-plugin-jsx-simple) some other transformations are done as well. 
 - before children, instead of 2 parameters : `tag`,`attributes`  extra parameter `directive` is calculated too (you can see in example above that third parameter is null when there are no directives in the tag)
 - attributes that have `-` in name will be separated into separate object used for `directive`
 - `on*` is handled the same as `on-*` to simplify `directive` usage for event handling
 - static string literals solo in JSX expression `{'translationCode'}` will be converted to  `{t('translationCode')}`  for cleaner translation expressions inside the templates. This is direct copy of processing from [babel-plugin-jsx-translate](https://github.com/hrgdavor/babel-plugin-jsx-translate)
 - JSX expressions

the function `h` is implemented in such way that these calls to `h` result in `def` being: 

```js
{
  "tag": "div",
  "attr": null,
  "children": [
    {
      "tag": "div",
      "attr": { "class": "name" },
      "children": [
        { "tag": "b", "attr": null,  "children": [ "Name: " ] },
        ()=>person.name
      ]
    },
    {
      "tag": "div",
      "attr": { "class": "city" },
      "children": [
        { "tag": "b", "attr": null,  "children": [ "City: " ] },
        ()=>person.city
      ]
    }
  ]
}
```

the library will use returned structure and call `j6x.insertHtml` function to generate(eventually) HTML based on data structured like that
so the final result in HTML is:

```html
<div>
  <div class="name"><b>Name: </b>Somebody</div>
  <div class="city"><b>City: </b>Mordor</div>
</div>
```

quick explanation: the JS expressions are wrapped in arrow function so they can be reevaluated later when state changes
(for more details check the explanation in the library).



### Dynamic translations using "t" function

To call the translations dynamically in the generated code (instead of rendering translation directly into template) change the plugin definition from

```
"j6x"
```

to

```
["j6x", {dynamicTranslation:true}],
```

this will cause calls to function `t` to also be wrapped into arrow function that can be re-evalueated

