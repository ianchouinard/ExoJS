# ExoJS
A tiny & concise DOM manipulation library. Abstracts html blocks as a data model for easy DOM updates & interaction. Currently in Beta, use at your own risk.

## What This Is
ExoJS allows developers to use data attributes and simple javascript to define a block of html as an ExoJS component. ExoJS then creates a javascript object model for the component and provides abstraction for DOM manipulation (events, updating HTML) so developers can quickly add interactive layers on top of their HTML. Rather than manually querying the DOM and updating HTML, all developers need to do is update the component's model and inform the component class to update. ExoJS does not interfere with normal DOM manipulation APIs and can be be used in conjuction with your other javascript.

## What This Is Not
ExoJS is not an full mvm, mvc, spa library or framework. Use ExoJS if you want to quickly and concisely manipulate HTML components with a model format. Do not use ExoJS if you want to make a full blown javascript application such as an SPA.

## Basic Example
```html
<div data-exo-component="counter">
    <div data-model="count" data-type="int">
      1
    </div>

    <button data-action="onclick:increaseCount" title="Increase Count">
      Increase
    </button>
</div>

<script>
  class Counter extends ExoJS {

    increaseCount(e) {
      e.preventDefault();
      this.model.count += 1;
      this.update('count');
    }

  }

  const counter = new Counter('counter');
  counter.attach();
</script>
```
[Edit in Js Fiddle](https://jsfiddle.net/ianchouinard/n5pcgavs/)

## Note On Project Status
Although I've developed this and have been using this in some personal projects, this project is still in beta. I welcome any bug reports. I also welcome suggestions related to syntax, ease of use, performace, etc. I'm not open to the scope of this project increasing. My goal for this project is for the scope to not increase outside of abstracting DOM manipulation.

That being said, here are some current pitfalls...
* Nested ExoJS components are not currently supported. (will look into supporting this for v1.0)
* The "data-if" attribute for conditional rendering simply just sets the element as display none, rather than removing/adding from the DOM. (Would be nice if it did this, currently working on a solution).
* Still working on an effective way of manipulating css classes on  elements in a component.
