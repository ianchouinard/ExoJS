# ExoJS class API reference

## onRegister()
This method gets called at the end of the constructor. At this point, the class has been instantiated, and the component element has been registered. The model hasn't been created from the component yet and events have not been registered.

Use onRegister to set up base model values or default data.

For example...

```javascript
class MyComponent extends ExoJS {

    onRegister() {
        // Set a default value to the model.
        this.model.foo = 'bar';
    }

}
```
---

## onReady()
This method gets called after the model has been populated from the attributes in the component, and all of the events have been bound.

Use this to execute code that should be run only after the component has been set up.

For example...
```javascript
class MyComponent extends ExoJS {

    onReady() {
        // Log the completed model
        console.log(this.model);
    }

}
```

---

## update(*string: name of model property*)
The update method instructs the component to update the DOM with the current value of the passed model property.

For example...
```javascript
class MyComponent extends ExoJS {

    onReady() {
        this.model.foo = 'bar';

        // Calling update will update the text value of any
        // <div data-model="foo"> in the HTML component to be 'bar'.
        this.model.update('foo');
    }

}
```

---

## attach()
The attach method sets up the component by creating the model based on the document, binding events, etc. Use this to initialize the component and to reset it if needed (Ex: if the component is rendered as a result of a web request).

For example...
```javascript
class MyComponent extends ExoJS {...}
const myComponent = new MyComponent('my-component');

fetch('/content-api')
    .then((res) => {
        // res = <div data-exo-component="my-component">...</div>
        document.getElementById('content').innerHTML = res;

        // Attach the component now, since the html
        // for the component wasn't available on load.
        myComponent.attach();
    });

```

---

## registerIterableTemplate(*string: property name, function (item) => string:template*)
The registerIterableTemplate method allows the developer to define a template to use within a list or loop. This is done because a list may be empty by default, so a way is needed to define a template for a list item.

For example...

```html
<div data-exo-component="my-component">

    <div data-foreach="items"></div>

</div>
```

```javascript
class MyComponent extends ExoJS {

    onRegister() {
        this.model.items = [{
            name: 'My Item'
        }];

        this.registerIterableTemplate('items', (item) => (`
            <div data-item-for="items">
                ${item.name}
            </div>
        `));
    }

}
```