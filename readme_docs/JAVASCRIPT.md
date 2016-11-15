## ES2015 Best Practices
Work in progress best practices for writing ES6 / ES2015 JavaScript

## References
AirBnb ES6 Style Guide

## Table of Contents
* [Variables](#variables)
  * [Prefer ```const```](#prefer-const)
  * [Use ```let``` instead of ```var```](#use-let-instead-of-var)
  * [Use one `const` or `let` declaration per variable](#use-one-const-or-let-declaration-per-variable)
  * [Group all your `const`s and then group all your `let`s](#group-all-your-consts-and-then-group-all-your-lets)
  * [Assign variables where you need them, but place them in a reasonable place](#assign-variables-where-you-need-them-but-place-them-in-a-reasonable-place)
  * [Don't chain variable assignments](#dont-chain-variable-assignments)
* [Objects](#objects)
  * [Use the literal syntax for object creation](#use-the-literal-syntax-for-object-creation)
  * [Use computed property names when creating objects with dynamic property names](#use-computed-property-names-when-creating-objects-with-dynamic-property-names)
  * [Use object method shorthand](#use-object-method-shorthand)
  * [Use property value shorthand](#use-property-value-shorthand)
  * [Group shorthand properties at the beginning](#group-shorthand-properties-at-the-beginning)
  * [Only quote invalid identifiers](#only-quote-invalid-identifiers)
  * [Do not call `Object.prototype` methods directly](#do-not-call-objectprototype-methods-directly)
  * [Prefer the object spread operator over `Object.assign`](#prefer-the-object-spread-operator-over-objectassign)
* [Arrays](#arrays)
  * [Use the literal syntax for creation](#use-the-literal-syntax-for-creation)
  * [Use push instead of direct assignment to add items](#use-push-instead-of-direct-assignment-to-add-items)
  * [Use array spreads `...` to copy arrays](#use-array-spreads-to-copy-arrays)
  * [Use Array.from to convert an array-like object to an array](#use-arrayfrom-to-convert-an-array-like-object-to-an-array)
  * [Use return statements in multi-line array method callbacks](#use-return-statements-in-multi-line-array-method-callbacks)
* [Destructuring](#destructuring)
  * [Use object destructuring when accessing multiple properties](#use-object-destructuring-when-accessing-multiple-properties)
  * [Use array destructuring](#use-array-destructuring)
  * [Use object destructuring for multiple return values](#use-object-destructuring-for-multiple-return-values)
* [Strings](#strings)
  *  [Use single quotes `''`](#use-single-quotes)
  *  [Avoid concatenating long strings](#avoid-concatenating-long-strings)
  *  [Use template strings instead of concatenation](#use-template-strings-instead-of-concatenation)
  *  [Never use `eval()` on a string](#never-use-eval-on-a-string)
  *  [Do not unnecessarily escape characters](#do-not-unnecessarily-escape-characters)
* [Functions](#functions)
  * [Wrap immediately invoked function expressions in parentheses](#wrap-immediately-invoked-function-expressions-in-parentheses)
  * [Never declare a function in a non-function block](#never-declare-a-function-in-a-non-function-block)
  * [Never name a parameter `arguments'](#never-name-a-parameter-arguments)
  * [Never use `arguments`, use rest syntax `...` instead](#never-use-arguments-use-rest-syntax-instead)
  * [Use default parameter syntax](#use-default-parameter-syntax)
  * [Avoid side effects with default parameters](#avoid-side-effects-with-default-parameters)
  * [Put default parameters last](#put-default-parameters-last)
  * [Never use the Function constructor](#never-use-the-function-constructor)
  * [Use consistent spacing in signiature](#use-consistent-spacing-in-signiature)
  * [Never mutate parameters](#never-mutate-parameters)
  * [Never reassign parameters](#never-reassign-parameters)
  * [Prefer spread operator `...` to call variadic functions](#prefer-spread-operator-to-call-variadic-functions)
* [Arrow Functions](#arrow-functions)
  * [Use arrow functions for simple function expressions](#use-arrow-functions-for-simple-function-expressions)
  * [Omit braces and use implicit return for single line functions](#omit-braces-and-use-implicit-return-for-single-line-functions)
  * [Omit the parentheses for single argument](#omit-the-parentheses-for-single-argument)
  * [Avoid arrow function syntax (`=>`) with comparison operators (`<=`, `>=`)](#avoid-arrow-function-syntax-with-comparison-operators)
* [Iterators and Generators](#iterators-and-generators)
  * [Don't use iterators](#dont-use-iterators)
  * [If you must use generators, use proper spacing](#if-you-must-use-generators-use-proper-spacing)
* [Properties](#properties)
  * [Use dot notation](#use-dot-notation)
  * [Use brackets `[]` when accessing properties with a variable](#use-brackets-when-accessing-properties-with-a-variable)
* [Comparison Operators & Equality](#comparison-operators-equality)
  * [Use `===` and `!==` over `==` and `!=`](#use-and-over-and)
  * [Truthiness](#truthiness)
  * [Use shortcuts for booleans, but explicit comparisons for strings and numbers](#use-shortcuts-for-booleans-but-explicit-comparisons-for-strings-and-numbers)
  * [Use braces to create blocks in `case` and `default` clauses that contain lexical declarations](#use-braces-to-create-blocks-in-case-and-default-clauses-that-contain-lexical-declarations)
  * [Ternaries should not be nested and generally be single line expressions](#ternaries-should-not-be-nested-and-generally-be-single-line-expressions)
  * [Avoid unneeded ternary statements](#avoid-unneeded-ternary-statements)
* [Blocks](#blocks)
  * [Use braces with all multi-line blocks](#use-braces-with-all-multi-line-blocks)
  * [Put `else` on the same line as your `if` block's closing brace](#put-else-on-the-same-line-as-your-if-blocks-closing-brace)
* [Comments](#comments)
  * [Use `/** ... */` for multi-line comments](#use-for-multi-line-comments)  
  * [Use `//` for single line comments](#use-for-single-line-comments)
  * [Start all comments with a space](#start-all-comments-with-a-space)
  * [Use FIXME and TODO correctly](#use-fixme-and-todo-correctly)
* [Whitespace](#whitespace)
  * [Use soft tabs set to 2 spaces](#use-soft-tabs-set-to-2-spaces)
  * [Place 1 space before the leading brace](#place-1-space-before-the-leading-brace)
  * [Place 1 space before the opening parenthesis in control statements](#place-1-space-before-the-opening-parenthesis-in-control-statements)
  * [Set off operators with spaces](#set-off-operators-with-spaces)
  * [End files with a single newline character](#end-files-with-a-single-newline-character)
  * [Use indentation when making long method chains](#use-indentation-when-making-long-method-chains)
  * [Leave a blank line after blocks and before the next statement](#leave-a-blank-line-after-blocks-and-before-the-next-statement)
  * [Use indentation when making long method chains](#use-indentation-when-making-long-method-chains)
  * [Leave a blank line after blocks and before the next statement](#leave-a-blank-line-after-blocks-and-before-the-next-statement)
  * [Do not pad your blocks with blank lines](#do-not-pad-your-blocks-with-blank-lines)
  * [Do not add spaces inside parentheses](#do-not-add-spaces-inside-parentheses)
  * [Do not add spaces inside brackets](#do-not-add-spaces-inside-brackets)
  * [Add spaces inside curly braces](#add-spaces-inside-curly-braces)
  * [Avoid having lines of code that are longer than 100 characters](#avoid-having-lines-of-code-that-are-longer-than-100-characters)

## Variables
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
  
#### Use one `const` or `let` declaration per variable

  > Why? It's easier to add new variable declarations this way, and you never have to worry about swapping out a `;` for a `,` or introducing punctuation-only diffs. You can also step through each declaration with the debugger, instead of jumping through all of them at once.

    ```javascript
    // bad
    const items = getItems(),
        goSportsTeam = true,
        dragonball = 'z';

    // bad
    // (compare to above, and try to spot the mistake)
    const items = getItems(),
        goSportsTeam = true;
        dragonball = 'z';

    // good
    const items = getItems();
    const goSportsTeam = true;
    const dragonball = 'z';
    ```
  
#### Group all your `const`s and then group all your `let`s

  > Why? This is helpful when later on you might need to assign a variable depending on one of the previous assigned variables.

    ```javascript
    // bad
    let i, len, dragonball,
        items = getItems(),
        goSportsTeam = true;

    // bad
    let i;
    const items = getItems();
    let dragonball;
    const goSportsTeam = true;
    let len;

    // good
    const goSportsTeam = true;
    const items = getItems();
    let dragonball;
    let i;
    let length;
    ```
    
#### Assign variables where you need them, but place them in a reasonable place

  > Why? `let` and `const` are block scoped and not function scoped.

    ```javascript
    // bad - unnecessary function call
    function checkName(hasName) {
      const name = getName();

      if (hasName === 'test') {
        return false;
      }

      if (name === 'test') {
        this.setName('');
        return false;
      }

      return name;
    }

    // good
    function checkName(hasName) {
      if (hasName === 'test') {
        return false;
      }

      const name = getName();

      if (name === 'test') {
        this.setName('');
        return false;
      }

      return name;
    }
    ```
    
#### Don't chain variable assignments

  > Why? Chaining variable assignments creates implicit global variables.

    ```javascript
    // bad
    (function example() {
      // JavaScript interprets this as
      // let a = ( b = ( c = 1 ) );
      // The let keyword only applies to variable a; variables b and c become
      // global variables.
      let a = b = c = 1;
    }());

    console.log(a); // undefined
    console.log(b); // 1
    console.log(c); // 1

    // good
    (function example() {
      let a = 1;
      let b = a;
      let c = a;
    }());

    console.log(a); // undefined
    console.log(b); // undefined
    console.log(c); // undefined

    // the same applies for `const`
    ```
  
## Objects
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
  
## Arrays

#### Use the literal syntax for creation

  > Why? Keeps consistent syntax when creating whether you're creating an empty array or an array with items in it.  Easier to read.

    ```javascript
    // bad
    const items = new Array();

    // good
    const items = [];
    ```
    
#### Use push instead of direct assignment to add items

    ```javascript
    const someStack = [];

    // bad
    someStack[someStack.length] = 'abracadabra';

    // good
    someStack.push('abracadabra');
    ```
    
#### Use array spreads `...` to copy arrays

  >Why? It is shorter to write and descriptive.

    ```javascript
    // bad
    const len = items.length;
    const itemsCopy = [];
    let i;

    for (i = 0; i < len; i++) {
      itemsCopy[i] = items[i];
    }

    // good
    const itemsCopy = [...items];
    ```

#### Use Array.from to convert an array-like object to an array

    ```javascript
    const foo = document.querySelectorAll('.foo');
    const nodes = Array.from(foo);
    ```
    
#### Use return statements in multi-line array method callbacks

  > Why? Array callbacks expect a return method, not doing so could lead to strange bugs and confusing code.  When using single line arrow function the return is implicit so is not needed. 

    ```javascript
    // good
    [1, 2, 3].map(x => {
      const y = x + 1;
      return x * y;
    });

    // good
    [1, 2, 3].map(x => x + 1);

    // bad
    const flat = {};
    [[0, 1], [2, 3], [4, 5]].reduce((memo, item, index) => {
      const flatten = memo.concat(item);
      flat[index] = flatten;
    });

    // good
    const flat = {};
    [[0, 1], [2, 3], [4, 5]].reduce((memo, item, index) => {
      const flatten = memo.concat(item);
      flat[index] = flatten;
      return flatten;
    });

    // bad
    inbox.filter((msg) => {
      const { subject, author } = msg;
      if (subject === 'Mockingbird') {
        return author === 'Harper Lee';
      } else {
        return false;
      }
    });

    // good
    inbox.filter(msg => {
      const { subject, author } = msg;
      if (subject === 'Mockingbird') {
        return author === 'Harper Lee';
      }

      return false;
    });
    ```
    
## Destructuring

#### Use object destructuring when accessing multiple properties

  > Why? Destructuring saves you from creating temporary references for those properties.

    ```javascript
    // bad
    function getFullName(user) {
      const firstName = user.firstName;
      const lastName = user.lastName;

      return `${firstName} ${lastName}`;
    }

    // good
    function getFullName(user) {
      const { firstName, lastName } = user;
      return `${firstName} ${lastName}`;
    }

    // best
    function getFullName({ firstName, lastName }) {
      return `${firstName} ${lastName}`;
    }
    ```
    
#### Use array destructuring

    ```javascript
    const arr = [1, 2, 3, 4];

    // bad
    const first = arr[0];
    const second = arr[1];

    // good
    const [first, second] = arr;
    ```
    
#### Use object destructuring for multiple return values

  > Why? You can add new properties over time or change the order of things without breaking call sites.

    ```javascript
    // bad
    function processInput(input) {
      // then a miracle occurs
      return [left, right, top, bottom];
    }

    // the caller needs to think about the order of return data
    const [left, __, top] = processInput(input);

    // good
    function processInput(input) {
      // then a miracle occurs
      return { left, right, top, bottom };
    }

    // the caller selects only the data they need
    const { left, top } = processInput(input);
    ```
    
## Strings

#### Use single quotes `''`

    ```javascript
    // bad
    const name = "Capt. Janeway";

    // bad - template literals should contain interpolation or newlines
    const name = `Capt. Janeway`;

    // good
    const name = 'Capt. Janeway';
    ```

#### Avoid concatenating long strings

  > Why? Broken strings are painful to work with and make code less searchable.

    ```javascript
    // bad
    const errorMessage = 'This is a super long error that was thrown because \
    of Batman. When you stop to think about how Batman had anything to do \
    with this, you would get nowhere \
    fast.';

    // bad
    const errorMessage = 'This is a super long error that was thrown because ' +
      'of Batman. When you stop to think about how Batman had anything to do ' +
      'with this, you would get nowhere fast.';

    // good
    const errorMessage = 'This is a super long error that was thrown because of Batman. When you stop to think about how Batman had anything to do with this, you would get nowhere fast.';
    ```

#### Use template strings instead of concatenation

  > Why? Template strings give you a readable, concise syntax with proper newlines and string interpolation features.

    ```javascript
    // bad
    function sayHi(name) {
      return 'How are you, ' + name + '?';
    }

    // bad
    function sayHi(name) {
      return ['How are you, ', name, '?'].join();
    }

    // bad
    function sayHi(name) {
      return `How are you, ${ name }?`;
    }

    // good
    function sayHi(name) {
      return `How are you, ${name}?`;
    }
    ```

#### Never use `eval()` on a string

  > Why? It opens to many vulnerabilities.

#### Do not unnecessarily escape characters

  > Why? Backslashes harm readability, thus they should only be present when necessary.

    ```javascript
    // bad
    const foo = '\'this\' \i\s \"quoted\"';

    // good
    const foo = '\'this\' is "quoted"';
    const foo = `'this' is "quoted"`;
    ```
    
## Functions
#### Wrap immediately invoked function expressions in parentheses

  > Why? An immediately invoked function expression is a single unit - wrapping both it, and its invocation parens, in parens, cleanly expresses this. Note that in a world with modules everywhere, you almost never need an IIFE.

    ```javascript
    // immediately-invoked function expression (IIFE)
    (function () {
      console.log('Welcome to the Internet. Please follow me.');
    }());
    ```

#### Never declare a function in a non-function block

  > Assign the function to a variable instead. Browsers will allow you to do it, but they all interpret it differently, which is bad news bears.

Note: ECMA-262 defines a `block` as a list of statements. A function declaration is not a statement. [Read ECMA-262's note on this issue](http://www.ecma-international.org/publications/files/ECMA-ST/Ecma-262.pdf#page=97).

    ```javascript
    // bad
    if (currentUser) {
      function test() {
        console.log('Nope.');
      }
    }

    // less bad
    let test;
    if (currentUser) {
      test = () => {
        console.log('Yup.');
      };
    }
    
    // best
    let test;
    if (currentUser) {
      test = logYup;
    }
    
    function logYup() {
      console.log('Yup.');
    }
    ```

#### Never name a parameter `arguments'
  
  > This will take precedence over the `arguments` object that is given to every function scope.

    ```javascript
    // bad
    function nope(name, options, arguments) {
      // ...stuff...
    }

    // good
    function yup(name, options, args) {
      // ...stuff...
    }
    ```

#### Never use `arguments`, use rest syntax `...` instead

  > Why? `...` is explicit about which arguments you want pulled. Plus, rest arguments are a real Array, and not merely Array-like like `arguments`.

    ```javascript
    // bad
    function concatenateAll() {
      const args = Array.prototype.slice.call(arguments);
      return args.join('');
    }

    // good
    function concatenateAll(...args) {
      return args.join('');
    }
    ```

#### Use default parameter syntax

    ```javascript
    // really bad
    function handleThings(opts) {
      // No! We shouldn't mutate function arguments.
      // Double bad: if opts is falsy it'll be set to an object which may
      // be what you want but it can introduce subtle bugs.
      opts = opts || {};
      // ...
    }

    // still bad
    function handleThings(opts) {
      if (opts === void 0) {
        opts = {};
      }
      // ...
    }

    // good
    function handleThings(opts = {}) {
      // ...
    }
    ```

#### Avoid side effects with default parameters

  > Why? They are confusing to reason about.

    ```javascript
    var b = 1;
    // bad
    function count(a = b++) {
      console.log(a);
    }
    count();  // 1
    count();  // 2
    count(3); // 3
    count();  // 3
    ```

#### Put default parameters last

    ```javascript
    // bad
    function handleThings(opts = {}, name) {
      // ...
    }

    // good
    function handleThings(name, opts = {}) {
      // ...
    }
    ```

#### Never use the Function constructor

  > Why? Creating a function in this way evaluates a string similarly to eval(), which opens vulnerabilities.

    ```javascript
    // bad
    var add = new Function('a', 'b', 'return a + b');

    // still bad
    var subtract = Function('a', 'b', 'return a - b');
    ```

#### Use consistent spacing in signiature

  > Why? Consistency is good, and you shouldn’t have to add or remove a space when adding or removing a name.

    ```javascript
    // bad
    const f = function(){};
    const g = function (){};
    const h = function() {};

    // good
    const x = function () {};
    const y = function a() {};
    ```

#### Never mutate parameters

  > Why? Manipulating objects passed in as parameters can cause unwanted variable side effects in the original caller.

    ```javascript
    // bad
    function f1(obj) {
      obj.key = 1;
    };

    // good
    function f2(obj) {
      const key = Object.prototype.hasOwnProperty.call(obj, 'key') ? obj.key : 1;
    };
    ```

#### Never reassign parameters

  > Why? Reassigning parameters can lead to unexpected behavior, especially when accessing the `arguments` object. It can also cause optimization issues, especially in V8.

    ```javascript
    // bad
    function f1(a) {
      a = 1;
    }

    function f2(a) {
      if (!a) { a = 1; }
    }

    // good
    function f3(a) {
      const b = a || 1;
    }

    function f4(a = 1) {
    }
    ```

#### Prefer spread operator `...` to call variadic functions

  > Why? It's cleaner, you don't need to supply a context, and you can not easily compose `new` with `apply`.

    ```javascript
    // bad
    const x = [1, 2, 3, 4, 5];
    console.log.apply(console, x);

    // good
    const x = [1, 2, 3, 4, 5];
    console.log(...x);

    // bad
    new (Function.prototype.bind.apply(Date, [null, 2016, 08, 05]));

    // good
    new Date(...[2016, 08, 05]);
    ```

## Arrow Functions

#### Use arrow functions for simple function expressions

Note: If your function is longer than one line, consider moving the logic to a named function

  > Why? It creates a version of the function that executes in the context of `this`, which is usually what you want, and is a more concise syntax.

  > Why not? If you have a fairly complicated function, move the logic into it's own function provides better readability

    ```javascript
    // bad
    [1, 2, 3].map(function (item) {
      const itemPlusOne = item + 1;
      return item * itemPlusOne;
    });

    // good
    [1, 2, 3].map(item => {
      const itemPlusOne = item + 1;
      return item * itemPlusOne;
    });
    
    // good
    [1, 2, 3].map(timesItselfPlusOne);
    
    function timesItselfPlusOne(item) {
      const itemPlusOne = item + 1;
      return item * itemPlusOne;
    }
    ```

#### Omit braces and use implicit return for single line functions

  > Why? Syntactic sugar. It reads well when multiple functions are chained together.

    ```javascript
    // bad
    [1, 2, 3].map(number => {
      const nextNumber = number + 1;
      `A string containing the ${nextNumber}.`;
    });

    // good
    [1, 2, 3].map(number => `A string containing the ${number}.`);

    // good
    [1, 2, 3].map((number) => {
      const nextNumber = number + 1;
      return `A string containing the ${nextNumber}.`;
    });

    // good
    [1, 2, 3].map((number, index) => ({
      [index]: number
    }));
    ```

#### Omit the parentheses for single argument

  > Why? Less visual clutter.

    ```js
    // bad
    [1, 2, 3].map((x) => x * x);

    // good
    [1, 2, 3].map(x => x * x);

    // good
    [1, 2, 3].map(number => (
      `A long string with the ${number}. It’s so long that we don’t want it to take up space on the .map line!`
    ));

    // good
    [1, 2, 3].map(x => {
      const y = x + 1;
      return x * y;
    });
    ```

#### Avoid arrow function syntax (`=>`) with comparison operators (`<=`, `>=`)

  > Why? Placing the arrow function and a comparision operator on the same line is difficult to read.

    ```js
    // bad
    const itemHeight = item => item.height > 256 ? item.largeSize : item.smallSize;

    // bad
    const itemHeight = (item) => item.height > 256 ? item.largeSize : item.smallSize;

    // good
    const itemHeight = item => (item.height > 256 ? item.largeSize : item.smallSize);

    // good
    const itemHeight = (item) => {
      const { height, largeSize, smallSize } = item;
      return height > 256 ? largeSize : smallSize;
    };
    ```
    
## Iterators and Generators

#### Don't use iterators

  > Why? This enforces our immutable rule. Dealing with pure functions that return values is easier to reason about than side effects.

  > Use `map()` / `every()` / `filter()` / `find()` / `findIndex()` / `reduce()` / `some()` / ... to iterate over arrays, and `Object.keys()` / `Object.values()` / `Object.entries()` to produce arrays so you can iterate over objects.

    ```javascript
    const numbers = [1, 2, 3, 4, 5];

    // bad
    let sum = 0;
    for (let num of numbers) {
      sum += num;
    }

    sum === 15;

    // good
    let sum = 0;
    numbers.forEach(num => sum += num);
    sum === 15;

    // best (use the functional force)
    const sum = numbers.reduce((total, num) => total + num, 0);
    sum === 15;
    ```

#### If you must use generators use proper spacing

  > Why? `function` and `*` are part of the same conceptual keyword - `*` is not a modifier for `function`, `function*` is a unique construct, different from `function`.

    ```js
    // bad
    function * foo() {
    }

    const bar = function * () {
    }

    const baz = function *() {
    }

    const quux = function*() {
    }

    function*foo() {
    }

    function *foo() {
    }

    // very bad
    function
    *
    foo() {
    }

    const wat = function
    *
    () {
    }

    // good
    function* foo() {
    }

    const foo = function* () {
    }
    ```
    
## Properties

#### Use dot notation

    ```javascript
    const luke = {
      jedi: true,
      age: 28,
    };

    // bad
    const isJedi = luke['jedi'];

    // good
    const isJedi = luke.jedi;
    ```

#### Use brackets `[]` when accessing properties with a variable

    ```javascript
    const luke = {
      jedi: true,
      age: 28,
    };

    function getProp(prop) {
      return luke[prop];
    }

    const isJedi = getProp('jedi');
    ```

## Comparison Operators & Equality
    
#### Use `===` and `!==` over `==` and `!=`

#### Truthiness

  > Conditional statements such as the `if` statement evaluate their expression using coercion with the `ToBoolean` abstract method and always follow these simple rules:

    + **Objects** evaluate to **true**
    + **Undefined** evaluates to **false**
    + **Null** evaluates to **false**
    + **Booleans** evaluate to **the value of the boolean**
    + **Numbers** evaluate to **false** if **+0, -0, or NaN**, otherwise **true**
    + **Strings** evaluate to **false** if an empty string `''`, otherwise **true**

    ```javascript
    if ([0] && []) {
      // true
      // an array (even an empty one) is an object, objects will evaluate to true
    }
    ```

#### Use shortcuts for booleans, but explicit comparisons for strings and numbers

    ```javascript
    // bad
    if (isValid === true) {
      // ...stuff...
    }

    // good
    if (isValid) {
      // ...stuff...
    }

    // bad
    if (name) {
      // ...stuff...
    }

    // good
    if (name !== '') {
      // ...stuff...
    }

    // bad
    if (collection.length) {
      // ...stuff...
    }

    // good
    if (collection.length > 0) {
      // ...stuff...
    }
    ```

- For more information see [Truth Equality and JavaScript](https://javascriptweblog.wordpress.com/2011/02/07/truth-equality-and-javascript/#more-2108) by Angus Croll.

#### Use braces to create blocks in `case` and `default` clauses that contain lexical declarations

  > Why? Lexical declarations are visible in the entire `switch` block but only get initialized when assigned, which only happens when its `case` is reached. This causes problems when multiple `case` clauses attempt to define the same thing.

    ```javascript
    // bad
    switch (foo) {
      case 1:
        let x = 1;
        break;
      case 2:
        const y = 2;
        break;
      case 3:
        function f() {}
        break;
      default:
        class C {}
    }

    // good
    switch (foo) {
      case 1: {
        let x = 1;
        break;
      }
      case 2: {
        const y = 2;
        break;
      }
      case 3: {
        function f() {}
        break;
      }
      case 4:
        bar();
        break;
      default: {
        class C {}
      }
    }
    ```

#### Ternaries should not be nested and generally be single line expressions

    ```javascript
    // bad
    const foo = maybe1 > maybe2
      ? "bar"
      : value1 > value2 ? "baz" : null;

    // better
    const maybeNull = value1 > value2 ? 'baz' : null;

    const foo = maybe1 > maybe2
      ? 'bar'
      : maybeNull;

    // best
    const maybeNull = value1 > value2 ? 'baz' : null;

    const foo = maybe1 > maybe2 ? 'bar' : maybeNull;
    ```

#### Avoid unneeded ternary statements

    ```javascript
    // bad
    const foo = a ? a : b;
    const bar = c ? true : false;
    const baz = c ? false : true;

    // good
    const foo = a || b;
    const bar = !!c;
    const baz = !c;
    ```
    
## Blocks

#### Use braces with all multi-line blocks

    ```javascript
    // bad
    if (test)
      return false;

    // good
    if (test) return false;

    // good
    if (test) {
      return false;
    }

    // bad
    function foo() { return false; }

    // good
    function bar() {
      return false;
    }
    ```

#### Put `else` on the same line as your `if` block's closing brace

    ```javascript
    // bad
    if (test) {
      thing1();
      thing2();
    }
    else {
      thing3();
    }

    // good
    if (test) {
      thing1();
      thing2();
    } else {
      thing3();
    }
    ```
    
## Comments

#### Use `/** ... */` for multi-line comments

    ```javascript
    // bad
    // make() returns a new element
    // based on the passed in tag name
    //
    // @param {String} tag
    // @return {Element} element
    function make(tag) {

      // ...stuff...

      return element;
    }

    // good
    /**
     * make() returns a new element
     * based on the passed-in tag name
     */
    function make(tag) {

      // ...stuff...

      return element;
    }
    ```

#### Use `//` for single line comments

  > Place single line comments on a newline above the subject of the comment. Put an empty line before the comment unless it's on the first line of a block.

    ```javascript
    // bad
    const active = true;  // is current tab

    // good
    // is current tab
    const active = true;

    // bad
    function getType() {
      console.log('fetching type...');
      // set the default type to 'no type'
      const type = this._type || 'no type';

      return type;
    }

    // good
    function getType() {
      console.log('fetching type...');

      // set the default type to 'no type'
      const type = this._type || 'no type';

      return type;
    }

    // also good
    function getType() {
      // set the default type to 'no type'
      const type = this._type || 'no type';

      return type;
    }
    ```

#### Start all comments with a space

  > Why? Makes comments easier to read

    ```javascript
    // bad
    //is current tab
    const active = true;

    // good
    // is current tab
    const active = true;

    // bad
    /**
     *make() returns a new element
     *based on the passed-in tag name
     */
    function make(tag) {

      // ...stuff...

      return element;
    }

    // good
    /**
     * make() returns a new element
     * based on the passed-in tag name
     */
    function make(tag) {

      // ...stuff...

      return element;
    }
    ```

#### Use FIXME and TODO correctly

  > Prefixing your comments with `FIXME` or `TODO` helps other developers quickly understand if you're pointing out a problem that needs to be revisited, or if you're suggesting a solution to the problem that needs to be implemented. These are different than regular comments because they are actionable. The actions are `FIXME: -- need to figure this out` or `TODO: -- need to implement`.
  
## Whitespace

#### Use soft tabs set to 2 spaces

    ```javascript
    // bad
    function foo() {
    ∙∙∙∙const name;
    }

    // bad
    function bar() {
    ∙const name;
    }

    // good
    function baz() {
    ∙∙const name;
    }
    ```

#### Place 1 space before the leading brace

    ```javascript
    // bad
    function test(){
      console.log('test');
    }

    // good
    function test() {
      console.log('test');
    }

    // bad
    dog.set('attr',{
      age: '1 year',
      breed: 'Bernese Mountain Dog',
    });

    // good
    dog.set('attr', {
      age: '1 year',
      breed: 'Bernese Mountain Dog',
    });
    ```

#### Place 1 space before the opening parenthesis in control statements

  > Place no space between the argument list and the function name in function calls and declarations

    ```javascript
    // bad
    if(isJedi) {
      fight ();
    }

    // good
    if (isJedi) {
      fight();
    }

    // bad
    function fight () {
      console.log ('Swooosh!');
    }

    // good
    function fight() {
      console.log('Swooosh!');
    }
    ```

#### Set off operators with spaces

    ```javascript
    // bad
    const x=y+5;

    // good
    const x = y + 5;
    ```

#### End files with a single newline character

    ```javascript
    // bad
    import { es6 } from './AirbnbStyleGuide';
      // ...
    export default es6;
    ```

    ```javascript
    // bad
    import { es6 } from './AirbnbStyleGuide';
      // ...
    export default es6;↵
    ↵
    ```

    ```javascript
    // good
    import { es6 } from './AirbnbStyleGuide';
      // ...
    export default es6;↵
    ```

#### Use indentation when making long method chains

  > Use when more than 2 method chains. Use a leading dot, which emphasizes that the line is a method call, not a new statement

    ```javascript
    // bad
    $('#items').find('.selected').highlight().end().find('.open').updateCount();

    // bad
    $('#items').
      find('.selected').
        highlight().
        end().
      find('.open').
        updateCount();

    // good
    $('#items')
      .find('.selected')
        .highlight()
        .end()
      .find('.open')
        .updateCount();

    // bad
    const leds = stage.selectAll('.led').data(data).enter().append('svg:svg').classed('led', true)
        .attr('width', (radius + margin) * 2).append('svg:g')
        .attr('transform', 'translate(' + (radius + margin) + ',' + (radius + margin) + ')')
        .call(tron.led);

    // good
    const leds = stage.selectAll('.led')
        .data(data)
      .enter().append('svg:svg')
        .classed('led', true)
        .attr('width', (radius + margin) * 2)
      .append('svg:g')
        .attr('transform', 'translate(' + (radius + margin) + ',' + (radius + margin) + ')')
        .call(tron.led);

    // good
    const leds = stage.selectAll('.led').data(data);
    ```

#### Leave a blank line after blocks and before the next statement

    ```javascript
    // bad
    if (foo) {
      return bar;
    }
    return baz;

    // good
    if (foo) {
      return bar;
    }

    return baz;

    // bad
    const obj = {
      foo() {
      },
      bar() {
      },
    };
    return obj;

    // good
    const obj = {
      foo() {
      },

      bar() {
      },
    };

    return obj;

    // bad
    const arr = [
      function foo() {
      },
      function bar() {
      },
    ];
    return arr;

    // good
    const arr = [
      function foo() {
      },

      function bar() {
      },
    ];

    return arr;
    ```

#### Do not pad your blocks with blank lines

    ```javascript
    // bad
    function bar() {

      console.log(foo);

    }

    // also bad
    if (baz) {

      console.log(qux);
    } else {
      console.log(foo);

    }

    // good
    function bar() {
      console.log(foo);
    }

    // good
    if (baz) {
      console.log(qux);
    } else {
      console.log(foo);
    }
    ```

#### Do not add spaces inside parentheses

    ```javascript
    // bad
    function bar( foo ) {
      return foo;
    }

    // good
    function bar(foo) {
      return foo;
    }

    // bad
    if ( foo ) {
      console.log(foo);
    }

    // good
    if (foo) {
      console.log(foo);
    }
    ```

#### Do not add spaces inside brackets

    ```javascript
    // bad
    const foo = [ 1, 2, 3 ];
    console.log(foo[ 0 ]);

    // good
    const foo = [1, 2, 3];
    console.log(foo[0]);
    ```

#### Add spaces inside curly braces

    ```javascript
    // bad
    const foo = {clark: 'kent'};

    // good
    const foo = { clark: 'kent' };
    ```

#### Avoid having lines of code that are longer than 100 characters

Note: long strings are exempt from this rule, and should not be broken up

  > Why? This ensures readability and maintainability.

    ```javascript
    // bad
    const foo = jsonData && jsonData.foo && jsonData.foo.bar && jsonData.foo.bar.baz && jsonData.foo.bar.baz.quux && jsonData.foo.bar.baz.quux.xyzzy;

    // bad
    $.ajax({ method: 'POST', url: 'https://airbnb.com/', data: { name: 'John' } }).done(() => console.log('Congratulations!')).fail(() => console.log('You have failed this city.'));

    // good
    const foo = jsonData
      && jsonData.foo
      && jsonData.foo.bar
      && jsonData.foo.bar.baz
      && jsonData.foo.bar.baz.quux
      && jsonData.foo.bar.baz.quux.xyzzy;

    // good
    $.ajax({
      method: 'POST',
      url: 'https://airbnb.com/',
      data: { name: 'John' },
    })
      .done(() => console.log('Congratulations!'))
      .fail(() => console.log('You have failed this city.'));
    ```

