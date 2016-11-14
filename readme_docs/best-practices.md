# ES2015 Best Practices
This style guide combines the best practices from the [Johnpapa Angular 1 Style Guide](https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md) with [AirBnb's ES2015 JavaScript Style Guide](https://github.com/airbnb/javascript/blob/master/README.md). These best practices are actively enforced with ESLint where applicable, with violations that are likely to result in bugs being marked as **error**, and less serious style issues marked as **warning**.

# Table of Contents
* [Variables](#variables)
  * [Prefer ```const```](#prefer-const)
  * [Use ```let``` instead of ```var```](#use-let-instead-of-var)
* [Objects](#objects)
  * [Use the literal syntax for object creation](#use-the-literal-syntax-for-object-creation)
  * [Use computed property names when creating objects with dynamic property names](#use-computed-property-names-when-creating-objects-with-dynamic-property-names)
  * [Use object method shorthand](#use-object-method-shorthand)
  * [Use property value shorthand](#use-property-value-shorthand)
  * [Group shorthand properties at the beginning](#group-shorthand-properties-at-the-beginning)
  * [Only quote invalid identifiers](#only-quote-invalid-identifiers)
  * [Do not call `Object.prototype` methods directly](#do-not-call-objectprototype-methods-directly)
  * [Prefer the object spread operator over `Object.assign`](#prefer-the-object-spread-operator-over-objectassign)
  
# JavaScript ES6 / ES2015

### Variables
#### Prefer ```const```

  >Why?  Ensures you cannot reassign your references, which can lead to unexpected bugs.  By using ```const``` everywhere a variable isn't reassigned, it makes it very obvious when a variable *will* be reassigned.
  
  ```javascript
  // bad
  var a = 1;
  var b = 2;

  // good
  const a = 1;
  const b = 2;

  // I immediately know this variable will be reassigned later without having look at any more code
  let c = 1;
  ```
  
  
#### Use ```let``` instead of ```var```

  >Why? ```let``` and ```const``` are block scoped but ```var``` is function scoped (or global if not declared inside a function).  Not using block scoped variables can lead to unexpected behavior and bugs.

  ```javascript
  function varTest() {
    var x = 1;
    if (true) {
      var x = 2;  // same variable!
      console.log(x);  // 2
    }
    console.log(x);  // 2
  }

  function letTest() {
    let x = 1;
    if (true) {
      let x = 2;  // different variable
      console.log(x);  // 2
    }
    console.log(x);  // 1
  }
  ```
  
### Objects
#### Use the literal syntax for object creation

  > Why? Keeps consistent syntax when creating whether you're creating an empty object or an object with properties.  Easier to read.
  
  ```javascript
  // bad
  const item = new Object();

  // good
  const item = {};
  ```
#### Use computed property names when creating objects with dynamic property names

    > Why? They allow you to define all the properties of an object in one place.

    ```javascript

    function getKey(k) {
      return `a key named ${k}`;
    }

    // bad
    const obj = {
      id: 5,
      name: 'San Francisco',
    };
    obj[getKey('enabled')] = true;

    // good
    const obj = {
      id: 5,
      name: 'San Francisco',
      [getKey('enabled')]: true,
    };
    ```
#### Use object method shorthand

    > Why? It is shorter to write and descriptive.
    
    ```javascript
    // bad
    const atom = {
      value: 1,

      addValue: function (value) {
        return atom.value + value;
      },
    };

    // good
    const atom = {
      value: 1,

      addValue(value) {
        return atom.value + value;
      },
    };
    ```
    
#### Use property value shorthand

    > Why? It is shorter to write and descriptive.

    ```javascript
    const lukeSkywalker = 'Luke Skywalker';

    // bad
    const obj = {
      lukeSkywalker: lukeSkywalker,
    };

    // good
    const obj = {
      lukeSkywalker,
    };
    ```
    
#### Group shorthand properties at the beginning

    > Why? It's easier to tell which properties are using the shorthand.

    ```javascript
    const anakinSkywalker = 'Anakin Skywalker';
    const lukeSkywalker = 'Luke Skywalker';

    // bad
    const obj = {
      episodeOne: 1,
      twoJediWalkIntoACantina: 2,
      lukeSkywalker,
      episodeThree: 3,
      mayTheFourth: 4,
      anakinSkywalker,
    };

    // good
    const obj = {
      lukeSkywalker,
      anakinSkywalker,
      episodeOne: 1,
      twoJediWalkIntoACantina: 2,
      episodeThree: 3,
      mayTheFourth: 4,
    };
    ```
    
#### Only quote invalid identifiers

  > Why? In general we consider it subjectively easier to read. It improves syntax highlighting, and is also more easily optimized by many JS engines.

  ```javascript
  // bad
  const bad = {
    'foo': 3,
    'bar': 4,
    'data-blah': 5,
  };

  // good
  const good = {
    foo: 3,
    bar: 4,
    'data-blah': 5,
  };
  ```
  
#### Do not call `Object.prototype` methods directly

  > Why? These methods may be shadowed by properties on the object in question - consider `{ hasOwnProperty: false }` - or, the object may be a null object (`Object.create(null)`).

  ```javascript
  // bad
  console.log(object.hasOwnProperty(key));

  // good
  console.log(Object.prototype.hasOwnProperty.call(object, key));

  // best
  const has = Object.prototype.hasOwnProperty; // cache the lookup once, in module scope.
  ```
  
#### Prefer the object spread operator over `Object.assign`
  
  > Why? Easier to read, more descriptive of what's happening
  
  ```javascript
  // very bad
  const original = { a: 1, b: 2 };
  const copy = Object.assign(original, { c: 3 }); // this mutates `original` ಠ_ಠ
  delete copy.a; // so does this

  // bad
  const original = { a: 1, b: 2 };
  const copy = Object.assign({}, original, { c: 3 }); // copy => { a: 1, b: 2, c: 3 }

  // good
  const original = { a: 1, b: 2 };
  const copy = { ...original, c: 3 }; // copy => { a: 1, b: 2, c: 3 }

  const { a, ...noA } = copy; // noA => { b: 2, c: 3 }
  
  // or for Angular specifically
  const copy = angular.copy(original);
  ```
