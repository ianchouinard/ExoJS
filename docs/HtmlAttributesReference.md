## Basic Attributes

### data-exo-component
Unique key used to identify a component. Should only be used on the outermost wrapper of an ExoJS component.
```html
<div data-exo-component="hello-world">...</div>
```

---

### data-model
Defines the text value of an element as as model property for the component. Anything defined with data-model will be available in the component class as this.model[key you defined in data-model].
```html
<div data-model="foo">Bar</div>
```
---

### data-type
Defines the type of the value the content of a data-model element should be. Options are "string" (default), "int", and "bool".
For example...
```html
<div data-model="count" data-type="int">
    5
</div>
```
"5" in this case will be add the the model property and usable in the component class as a number.

---

### data-if
Defines the condition for if an element should be hidden or visible. The value for this attribute should be a boolean property on the components model.
```html
<div data-if="showError">Form is invalid</div>
<div data-if="!showError">Form is valid</div>
```
---

### data-action
Defines an event for interacting with an element. The value for this attribute needs to be a string in two parts separated by a colon ":". "{event name}:{method in component class}". 
For Example...
```html
    <button data-action="onclick:methodInMyComponentClass">...</button>
```
If the element with the data-action attribute is within an item in a list, then the list item, and index of the list item, will be attributes in the event handler. See below for more info on iterable elements.
For example...
```html
<div data-foreach="items">
    <div data-item-for="items">
        <button data-action="onclick:alertItem">Alert item from list</button>
    </div>
</div>
```

```javascript
class ActionInListExample extends ExoJS {

    alertItem(e, item, itemIndex) {
        alert(`${itemIndex}: ${JSON.stringify(item)}`);
    }

}
...
```

---
---

## Attributes For Iterable HTML/Lists

### data-foreach
Defines the start of a list or loop of items. Value should be the key of a property in the component's model that is an array.
```html
    <div data-foreach="items"></div>
```
---

### data-item-for
Defines the following element as an item within a list or loop. The value of this attribute should be the key of the array property it is from in the component's model. For example...

```html
<div data-foreach="items">
    <div data-item-for="items">...</div>
    <div data-item-for="items">...</div>
    <div data-item-for="items">...</div>
</div>
```

---

### data-model-for
Defines the text value of an element as as model property for an item within a list. The value for this attribute needs to be a string in two parts separated by a colon ":". "{property name of list}:{property name of item in list}".

For example...
```html
<div data-foreach="items">
    <div data-item-for="items">
        <span data-model-for="items:itemName">
            My first item.
        </span>
    </div>
</div>
```

---

### data-if-for
Defines the condition for if an element within a list should be hidden or visible. The value for this attribute needs to be a string in two parts separated by a colon ":". "{property name of list}:{property name of item in list}".
