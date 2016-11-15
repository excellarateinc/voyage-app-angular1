## ES2015 Best Practices
This guide represents best practices when writing ES6 / ES2015 JavaScript, specifically when working with Angular 1.x.  This guide takes heavily from AirBnb's ES6 Style Guide, but with some parts removed or modified, generally when they conflicted with the Johnpapa Angular 1 Style Guide, which takes priority.  Parts were also added as needed, particularly around using Promises.

Wherever possible these best practices are enforced with ESLint.  Violations that are likely to result in bugs are marked as **errors**, and code style / consistency violations are marked as **warnings**.

## References
[AirBnb ES6 Style Guide](https://github.com/airbnb/javascript/blob/master/README.md#table-of-contents)
[MDN JavaScript Reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference)

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
  * [When passing callbacks don't wrap direct function calls](#when-passing-callbacks-dont-wrap-direct-function-calls)
* [Iterators and Generators](#iterators-and-generators)
  * [Don't use iterators](#dont-use-iterators)
  * [If you must use generators, use proper spacing](#if-you-must-use-generators-use-proper-spacing)
* [Properties](#properties)
  * [Use dot notation](#use-dot-notation)
  * [Use brackets `[]` when accessing properties with a variable](#use-brackets-when-accessing-properties-with-a-variable)
* [Comparison Operators & Equality](#comparison-operators-equality)
  * [Use `===` and `!==` over `==` and `!=`](#use--and--over--and-)
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
* [Commas](#commas)
  * [Leading commas: **Nope.**](#leading-commas-nope)
  * [Additional trailing comma: Yup.](#additional-trailing-comma-yup)
* [Semicolons](#semicolons)
  * [Yup.](#yup)
* [Type Casting & Coercion](#type-casting-coercion)
  * [Perform type coercion at the beginning of the statement](#perform-type-coercion-at-the-beginning-of-the-statement)
* [Naming Conventions](#naming-conventions)
  * [**NEVER** single letter names. **BE DESCRIPTIVE**](#never-single-letter-names-be-descriptive)
  * [Use camelCase when naming objects, functions, and instances](#use-camelcase-when-naming-objects-functions-and-instances)
  * [Do not use trailing or leading underscores](#do-not-use-trailing-or-leading-underscores)
  * [Acronyms should always be all capitalized, or all lowercased](#acronyms-should-always-be-all-capitalized-or-all-lowercased)
* [Events](#events)
  * [When attaching data payloads to events pass a hash instead of a raw value](#when-attaching-data-payloads-to-events-pass-a-hash-instead-of-a-raw-value)
* [Promises](#promises)
  * [Always use Promises for async operations, never callbacks](#always-use-promises-for-async-operations-never-callbacks)
  * [Always use `.then(success)` and `.catch(failure)`, never `.then(success, failure)`](#always-use-thensuccess-and-catchfailure-never-thensuccess-failure)
  * [Always flatten Promise chains, never nest](#always-flatten-promise-chains-never-nest)
  * [Never wrap `.then` return values in a Promise](#never-wrap-then-return-values-in-a-promise)
  * [Try to only `.catch` once where you need it, only rethrow if you can’t recover](#try-to-only-catch-once-where-you-need-it-only-rethrow-if-you-cant-recover)
  * [Prefer Promise chaining and Promise.all()/$q.all(), but use Bluebird if code becomes too complex](#prefer-promise-chaining-and-promiseallqall-but-use-bluebird-if-code-becomes-too-complex)
  * [Using Bluebird with Angular](#using-bluebird-with-angular)

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

**[⬆ back to top](#table-of-contents)**
  
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
    
**[⬆ back to top](#table-of-contents)**
    
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
  
**[⬆ back to top](#table-of-contents)**

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
    
**[⬆ back to top](#table-of-contents)**
    
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
    
**[⬆ back to top](#table-of-contents)**

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
    
#### When passing callbacks don't wrap direct function calls

  > Why?  If you can pass a function in directly, do it, creating an empty wrapper function clutters the code and provides no gain.  Directly passing a well named function greatly increases readability.
  
  ```javascript
  // bad
  items.map(item => {
    return Math.sqrt(item);
  });
  
  // bad
  items.map(item => Math.sqrt(item));
  
  // bad
  getUsernames()
    .then(usernames => {
      processUsernames(usernames);
    });
  
  // bad
  getUsernames()
    .then(usernames => processUsernames(usernames));
  
  // good
  items.map(Math.sqrt);
    
  // good
  getUsernames()
    .then(processUsernames);
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
    
**[⬆ back to top](#table-of-contents)**
    
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
    
**[⬆ back to top](#table-of-contents)**

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

**[⬆ back to top](#table-of-contents)**

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
   
**[⬆ back to top](#table-of-contents)**
   
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
  
**[⬆ back to top](#table-of-contents)**
  
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

**[⬆ back to top](#table-of-contents)**

## Commas

#### Leading commas: **Nope.**

    ```javascript
    // bad
    const story = [
        once
      , upon
      , aTime
    ];

    // good
    const story = [
      once,
      upon,
      aTime,
    ];

    // bad
    const hero = {
        firstName: 'Ada'
      , lastName: 'Lovelace'
      , birthYear: 1815
      , superPower: 'computers'
    };

    // good
    const hero = {
      firstName: 'Ada',
      lastName: 'Lovelace',
      birthYear: 1815,
      superPower: 'computers',
    };
    ```

#### Additional trailing comma: **Yup.**

  > Why? This leads to cleaner git diffs. Also, transpilers like Babel will remove the additional trailing comma in the transpiled code which means you don't have to worry about the trailing comma problem in legacy browsers.

    ```diff
    // bad - git diff without trailing comma
    const hero = {
         firstName: 'Florence',
    -    lastName: 'Nightingale'
    +    lastName: 'Nightingale',
    +    inventorOf: ['coxcomb chart', 'modern nursing']
    };

    // good - git diff with trailing comma
    const hero = {
         firstName: 'Florence',
         lastName: 'Nightingale',
    +    inventorOf: ['coxcomb chart', 'modern nursing'],
    };
    ```

    ```javascript
    // bad
    const hero = {
      firstName: 'Dana',
      lastName: 'Scully'
    };

    const heroes = [
      'Batman',
      'Superman'
    ];

    // good
    const hero = {
      firstName: 'Dana',
      lastName: 'Scully',
    };

    const heroes = [
      'Batman',
      'Superman',
    ];

    // bad
    function createHero(
      firstName,
      lastName,
      inventorOf
    ) {
      // does nothing
    }

    // good
    function createHero(
      firstName,
      lastName,
      inventorOf,
    ) {
      // does nothing
    }

    // good (note that a comma must not appear after a "rest" element)
    function createHero(
      firstName,
      lastName,
      inventorOf,
      ...heroArgs
    ) {
      // does nothing
    }

    // bad
    createHero(
      firstName,
      lastName,
      inventorOf
    );

    // good
    createHero(
      firstName,
      lastName,
      inventorOf,
    );

    // good (note that a comma must not appear after a "rest" element)
    createHero(
      firstName,
      lastName,
      inventorOf,
      ...heroArgs
    )
    ```

**[⬆ back to top](#table-of-contents)**

## Semicolons

**Yup.**

    ```javascript
    // bad
    (function () {
      const name = 'Skywalker'
      return name
    })()

    // good
    (function () {
      const name = 'Skywalker';
      return name;
    }());

    // good, but legacy (guards against the function becoming an argument when two files with IIFEs are concatenated)
    ;(() => {
      const name = 'Skywalker';
      return name;
    }());
    ```

    [Read more](https://stackoverflow.com/questions/7365172/semicolon-before-self-invoking-function/7365214%237365214).

**[⬆ back to top](#table-of-contents)**

## Type Casting & Coercion

#### Perform type coercion at the beginning of the statement

- ##### Strings:

    ```javascript
    // => this.reviewScore = 9;

    // bad
    const totalScore = this.reviewScore + ''; // invokes this.reviewScore.valueOf()

    // bad
    const totalScore = this.reviewScore.toString(); // isn't guaranteed to return a string

    // good
    const totalScore = String(this.reviewScore);
    ```

- ##### Numbers: Use `Number` for type casting and `parseInt` always with a radix

    ```javascript
    const inputValue = '4';

    // bad
    const val = new Number(inputValue);

    // bad
    const val = +inputValue;

    // bad
    const val = inputValue >> 0;

    // bad
    const val = parseInt(inputValue);

    // good
    const val = Number(inputValue);

    // good
    const val = parseInt(inputValue, 10);
    ```


- ##### Booleans:

    ```javascript
    const age = 0;

    // bad
    const hasAge = new Boolean(age);

    // good
    const hasAge = Boolean(age);

    // best
    const hasAge = !!age;
    ```

**[⬆ back to top](#table-of-contents)**


## Naming Conventions

#### **NEVER** single letter names. **BE DESCRIPTIVE**

    ```javascript
    // bad
    function q() {
      // ...stuff...
    }

    // good
    function query() {
      // ..stuff..
    }
    ```

#### Use camelCase when naming objects, functions, and instances

    ```javascript
    // bad
    const OBJEcttsssss = {};
    const this_is_my_object = {};
    function c() {}

    // good
    const thisIsMyObject = {};
    function thisIsMyFunction() {}
    ```

#### Do not use trailing or leading underscores

  > Why? JavaScript does not have the concept of privacy in terms of properties or methods. Although a leading underscore is a common convention to mean “private”, in fact, these properties are fully public, and as such, are part of your public API contract. This convention might lead developers to wrongly think that a change won't count as breaking, or that tests aren't needed. tl;dr: if you want something to be “private”, it must not be observably present.

    ```javascript
    // bad
    this.__firstName__ = 'Panda';
    this.firstName_ = 'Panda';
    this._firstName = 'Panda';

    // good
    this.firstName = 'Panda';
    ```


#### Acronyms should always be all capitalized, or all lowercased

  > Why? Names are for readability, not to appease a computer algorithm.

    ```javascript
    // bad
    import SmsContainer from './containers/SmsContainer';

    // bad
    const HttpRequests = [
      // ...
    ];

    // good
    import SMSContainer from './containers/SMSContainer';

    // good
    const HTTPRequests = [
      // ...
    ];

    // best
    import TextMessageContainer from './containers/TextMessageContainer';

    // best
    const Requests = [
      // ...
    ];
    ```

**[⬆ back to top](#table-of-contents)**

## Events

#### When attaching data payloads to events pass a hash instead of a raw value

  > Why? This allows a subsequent contributor to add more data to the event payload without finding and updating every handler for the event. For example, instead of:

    ```javascript
    // bad
    $(this).trigger('listingUpdated', listing.id);

    ...

    $(this).on('listingUpdated', (e, listingId) => {
      // do something with listingId
    });
    ```

    prefer:

    ```javascript
    // good
    $(this).trigger('listingUpdated', { listingId: listing.id });

    ...

    $(this).on('listingUpdated', (e, data) => {
      // do something with data.listingId
    });
    ```
    
**[⬆ back to top](#table-of-contents)**

## Promises
#### Always use Promises for async operations, never callbacks
  > This shouldn't be an issue in Angular since $http returns a promise

#### Always use `.then(success)` and `.catch(failure)`, never `.then(success, failure)`
  > Why?  Using `.then(success, failure)` is effectively treating a Pomise as a callback.  If you're making an async call in a service but want to catch any errors in a controller or directive to show an error message to the user, how will you do it?  You'll have to resort to ugly hacks like passing in a failure callback (again devolving into callback pattern), or rethrow an error from the `.catch` block.  Less importantly, separate `.catch` and `.then` blocks are easier to read and more explicit about what you're doing.
  
  ```javascript
  // in something like test.service.js...
  
  // very bad
  makeAsyncCall(failureCallback) {
    return $http.get('/test')
      .then(function (success) {
        const processedTestResults = processResults(success.data);
        return processedTestResults;
      },
      failureCallback);
  }
  
  // bad
  makeAsyncCall() {
    return $http.get('/test')
      .then(function (success) {
        const processedTestResults = processResults(success.data);
        return processedTestResults;
      },
      function(failue) {
        $q.reject(failure);
      });
  }

  // Good
  makeAsyncCall() {
    return $http.get('/test')
      .then(success => processResults(success.data))
  }
  
  // Following the good pattern here, we can then later in test.controller.js you can do...
  testService.makeAsyncCall()
    .then(putResultsOnVm)
    .then(showSuccessMessage)
    .catch(showErrorMessage);
  ```
  
#### Try to only `.catch` where you need it, only rethrow if you can't recover

  > Why? Having multiple catches in multiple places in the app can be confusing, and rethrowing an error could obscure the original cause of the issue.  So try to only catch at the end of a promise chain and in one place.  However if you attempt to recover from an error in a catch block but cannot, rethrow.  Remember that `.catch` and `.reject` are just like synchronous `catch` and `throw`.
  
  ```javascript
  // bad, catches only to rethrow, makes no attempt to recover, this is better caught elsewhere
  $http.get('/data')
    .catch(error => $q.reject(error);
    
  // good, attempts to deal with the error, and only rejects again if it can't    
  $http.get('/data')
    .catch(error => {
      // data error, but can I handle it here?
      if (canHandle) {
        // if so I do, and the promise chain can continue
        return doSomethingToRecover();
      }
      // if not I reject, and the catch chain can continue
      $q.reject(error);
    })
  ```
  
#### Always flatten Promise chains, never nest

  > Why? While nesting will work, deep nesting can quickly become difficult to manage if each level has non-trivial logic. Promise chain nesting also requires developers to careful consider how they will manage errors within each of the nested segments, rather than a single catch block in a flat promise chain.
  
  ```javascript
  /*  
  In this example code, each async data call returns a promise, and all methods after the first one take the result of the previous promise as an argument; i.e. getSomeAsyncData() returns a promise, getMoreAsyncData() takes the value resolved from getSomeAsyncData() and makes another async call
  */
  
  // bad, near impossible to read even with no complex logic, have to catch error at each nested level.
  getSomeAsyncData()
    .then(firstAsyncData => {
      getMoreAsyncData(firstAsyncData)
        .then(secondAsyncData => {
          oneMoreAsyncCall(secondAsyncData)
            .then(moreAsyncData => {
              return processResults(moreAsyncData);
            })
            .catch(innerMostError => {
              doSomethingWithError(innerMostError);
            });
        })
        .catch(middleError => {
          doSomethingWithError(innerMostError);
        });
    })
    .catch(outerError => {
      doSomethingWithError(innerMostError);
    });
    
    // good, functionally equivalent to the above code, any errors break the chain and go to a single catch block
    getSomeAsyncData()
      .then(getMoreAsyncData)
      .then(secondAsyncData)
      .then(moreAsyncData)
      .catch(doSomethingWithError);
    
  ```

#### Never wrap `.then` return values in a Promise

  > Why? You can return an asynchronous or synchronous value inside `.then`, either way the promise chain will continue.
  
  ```javascript
  // bad
  $http.get('/data')
    .then(data => {
      var deferred = $q.defer();
      const newValue = data + 1;
      deferred.resolve(newValue);
      return deferred.promise;
    });
    
    // good
    $http.get('/data')
      .then(data => data + 1);
  ```

#### Prefer Promise chaining and `Promise.all()`/`$q.all()`, but use Bluebird if code becomes too complex
  >  Why?  To maintain readability, Bluebird's coroutine method makes asynchronous code easier to work with.  When ES7 is finalized this will most likely be replaced with native Javascript async/await
  
  ```javascript
  // bad, too much complex interdependence between async calls
  
  // first we get the user
  $http.get('/user')  
  
    // then we get the permissions, but we need both the permissions and the user data later
    // so getUserPermissions now must return both
    .then(getUserPermissions)  
    
    // results now contains the user and his permissions, which are then passed to new methods
    .then(results => $q.all([getUserPreferences(results.user), getUsersData(results.user), canUserSeeThisPage(results.permissions)]);
    
    // results now contains the user preferences, additional user data, and if they can see the page, 
    // but not the original user user or permissions
    .then(results => {
      const [preferences, additionalData, canSeePage] = results;
      // can't get the original user data or permissions, they weren't passed into or returned from $q.all
    })
    
  // good, for complex interdependence that makes chaining difficult, use Bluebird coroutine
  Promise.coroutine(function* (val) {
  
    // get any async data with the yield keyword
    const user = yield $http.get('/user');
    const permissions = yield getUserPermissions(user);
    const preferences = yield getUserPreferences(user);
    
    // you can mix in synchronous data no problem, just don't use yield
    const synchronousData = 10;
    
    const newData = getNewData(user, synchronousData);
    const userData = yield getUsersData(user);
    const canSeePage = yield canUserSeeThisPage(permissions);
    
  });
  ```

#### Using Bluebird with Angular
  > If your promise chains have complex interdependence and you need to use Bluebird, you will need to tie it to Angular in your app's run block.  Otherwise Angular will not know when your promise has resolved.
  
  ```javascript
  .run(() => {
    Promise.setScheduler(function (cb) {
      $rootScope.$evalAsync(cb);
    });
  });
  ```

**[⬆ back to top](#table-of-contents)**
