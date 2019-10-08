
# Basics
Setting up a component

HTML
```html
<div data-exo-component="hello-world">

    <div data-model="foo">
        I will be changed to bar
    </div>

</div>
```
JavaScript
```javascript
class HelloWorld extends ExoJS {

    onReady() {
        this.model.foo = 'Bar';
        this.update('foo');
    }

}

const helloWorld = new HelloWorld('hello-world');
helloWorld.attach();
```

## Whats going on in the HTML
```html
<div data-exo-component="hello-world">...</div>
```
The "data-exo-component" attribute is used to identify the component. This gets used as the contructor for the ExoJS class. This identifier must be unique to the HTML document.

---

```html
<div data-model="foo">
    I will be changed to bar
</div>
```
The "data-model" attribute defines a property of the component. The text value of this div will be available in JavaScript as the property "foo" in the model property of the component class. Ex: "this.model.foo".

## Whats going on in the JavaScript
```javascript
class HelloWorld extends ExoJS {...}
```
ExoJS components are normal JavaScript classes. Extending ExoJS gives your component class a model property based on your components markup, and access to lifecycle methods, and utility methods.

---
```javascript
    onReady() {
        this.model.foo = 'Bar';
        this.update('foo');
    }
```
the "onReady" method is a lifecycle event provided to the component class by extending ExoJS. The foo property exists on the model property because it is defined in the HTMl by the data attribute "data-model". The default value for model.foo would be "I will be changed to bar" because that is the text value of this div in the HTML. Finally, the update method is called with the key of the property we want to update. This automatically updates the div in the DOM to contain the current value of the model.foo property.

---
```javascript
const helloWorld = new HelloWorld('hello-world');
helloWorld.attach();
```
To make use of the HelloWorld component class, we need to create an instance of it and attach it to the DOM. To do this, we assign "helloWorld" to be a new instance of "HelloWorld". To attach it to the correct HTML component, we pass the key of the component as the constructor. This should be the string used as the value to the attribute "data-exo-component" in the HTML component. Finally, calling the "attach" method will bind the component events and create the model property for the component class.