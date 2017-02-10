## Recipes

## Table of Contents

* [Introduction](#introduction)
* [Creating a new module (feature)](#creating-a-new-module-feature)
    * [Module Definition](#module-definition)
    * [Include your module as a dependency where needed](#include-your-module-as-a-dependency-where-needed)
    * [Add routes to your module](#module-routes)
* [Adding a controller to a module](#adding-a-controller-to-a-module)
* [Adding a service to a module](#adding-a-service-to-a-module)
* [Adding a directive to a module](#adding-a-directive-to-a-module)
* [Adding sass to a module](#adding-sass-to-a-module)
* [Maintaining and refactoring a module](#maintaining-and-refactoring-a-module)


## Introduction

The recipes section walks through the standard development workflow when building an app with Voyage.  As an example for the recipes we'll imagine we're building out a simple user admin feature.

## Creating a new module (feature)

### Module Definition

Each feature area of the app should be it's own module, and with our folder-by-feature approach each feature area should be in it's own folder.  Start by creating a new folder "user-admin" in the src/app directory.

In that folder create a new file "user-admin.module.js" and declare your new module and it's dependencies.

```javascript
(function () {
  'use strict';

  angular
    .module('voyage.userAdmin', [
      'voyage.core'
    ]);
}());

```

The module, like all of our JavaScript files, is wrapped in an IIFE and uses strict mode.  The module itself is prefixed with "voyage", your module may likely be prefixed with the name of the app you are building, but for this example we stick with "voyage".

We include the core module which contains common dependencies that will be needed by most modules like ui.router and the router helper, ngCookies, and our environment specific constants like the API URL.

### Include your module as a dependency where needed

Now that you've declared your module, you'll want to make sure it's used.  In our case as in many, we simply add the module to the app's dependencies.

```javascript
(function () {
  'use strict';

  angular
    .module('voyage.app', [
      'voyage.mainNavigation',
      'voyage.dashboard',
      'voyage.layout',
      'voyage.core',
      'voyage.authentication',
      'voyage.userAdmin'
    ]);
}());

```

Our user admin module is now wired up and ready to be built out.

### Add routes to your module

If your module will have full pages your users will navigate to you'll need to register your routes in a new file in teh user-admin folder called user-admin.routes.js.

```javascript
(function () {
  'use strict';

  angular
    .module('voyage.userAdmin')
    .run(appRun);

  appRun.$inject = ['routerHelper'];

  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'main.userList',
        config: {
          url: '/userAdmin/userList',
          templateUrl: 'app/user-admin/user-list.html',
          controller: 'UserListController',
          controllerAs: 'vm'
        }
      },

      {
        state: 'main.singleUser',
        config: {
          url: '/userAdmin/singleUser',
          templateUrl: 'app/user-admin/single-user.html',
          controller: 'SingleUserController',
          controllerAs: 'vm'
        }
      }
    ];
  }
}());
```

The routes are registered on app run using the router helper (part of voyage.core), and is explicitly injected info the appRun function.  The states are registered via the getStates function that returns an array of state objects.  This pattern is universal to all our modules that include routes.

The top navigation bar and left side menu are both part of the "main" abstract state, so if you want your page to have the navbar and menu, make your states child states of main using dot notation "main.userList".

Notice the url of the page matches closely with the path to the template, this is important for the 'L' in our _LIFT_ coding principle "**L**ocate code easily".  Having the urls match the folder structure makes locating code easy.

The templates and controllers listed here have not been created yet, but we'll be doing that next...

### Adding a controller to a module

When we planned out our routes in the previous step, we already named our controllers and templates, so let's create those now.  Create the files user-list.html, single-user.html, user-list.controller.js, and single-user.controller.js.

Below is an example of the user list controller.  To keep this a self contained recipe the controller below is fully developed, and makes use of the data service declared later in the [Adding a service to a module](#adding-a-service-to-a-module) section.

```javascript
(function () {
  'use strict';

  angular
    .module('voyage.userAdmin')
    .controller('UserListController', UserListController);

  UserListController.$inject = ['userDataService'];

  function UserListController(userDataService) {
    const vm = this;
    vm.deleteUser = deleteUser;
    
    activate();
    
    function activate() {
      listUsers();
    }
    
    function deleteUser(user) {
      const isDeletionConfirmed = confirm(`Are you sure you want to delete user ${user.username}`);
      
      if (isDeletionConfirmed) {
        userDataService.deleteUser(user.id)
          .then(userDeletionSuccess)
          .catch(userDeletionFailure);
      }
    }
    
    function listUsers() {
      userDataService.listUsers()
        .then(users => vm.users = users);
    }
    
    function userDeletionSuccess() {
      alert('User deleted successfully');
      listUsers();
    }
    
    function userDeletionFailure(error) {
      alert('User deletion failed');
      console.log(error.message);
    }

  }

}());
```

First the userDataService is injected into the controller to make data calls back to the API.  All data access should be encapsulated into a data service for easy testing, see [Adding a service to a module](#adding-a-service-to-a-module) for information on creating the service.

The first line of every controller is captures `this` into a variable `vm` (standing for ViewModel).  Any bindable members should then be put on vm up top in alphabetical order, here the deleteUser function is set on the vm so it can be called from the template.

Any code that needs run on page load should go in an activate function which is called next.  In this case we call the `listUsers` function, which calls the API and places a list of users on the vm.

The remaining code handles user deletion, asking the user to confirm the delete, then taking actions based on the response from the API.

Each controller will have a matching template, so let's look at user-list.html.

```html
<h2>User Admin</h2>

<table class="table">
    <thead>
        <tr>
            <th>ID</th>
            <th>User Name</th>
            <th>Email</th>
        </tr>
    </thead>
    <tbody>
        <tr ng-repeat="user in vm.users">
            <td>
              {{user.id}}
            </td>
            <td>
              <user-active user="user"></user-active>
            </td>
            <td>
              {{user.email}}
            </td>
        </tr>
    </tbody>
</table>

```

We're making use of our user-active directive here, which we'll cover in the adding a directive section.  We simply use the Bootstrap default style for the table so no Sass is required, but if you need additional styles see the [Adding sass to a module](#adding-sass-to-a-module) section.

## Adding a service to a module

All data access should take place in a data service, and business logic should also be placed into services separately.  Here we declare a data service to communicate with the api, user-data.service.js.

```javascript
(function () {
  'use strict';

  angular
    .module('voyage.userAdmin')
    .factory('userDataService', userDataService);
    
  userDataService.$inject = ['$http', 'API_URL'];

  function userDataService($http, API_URL) {

    return {
      listUsers,
      getUser,
      createUser,
      updateUser,
      deleteUser
    };

    function listUsers() {
      return $http.get(`${ API_URL }/users`);
    }
    
    function getUser(userId) {
      return $http.get(`${ API_URL }/users/${ userId }`);
    }
    
    function createUser(user) {
      return $http.put(`${ API_URL }/users/${ user.id }`, user);
    }
    
    function updateUser(user) {
      return $http.put(`${ API_URL }/users/${ user.id }`, user);
    }
    
    function deleteUser(userId) {
      return $http.delete(`${ API_URL }/users/${ userId }`);
    }
  }

}());
```

## Adding a directive to a module

For DOM manipulation, or simply reusable pieces of UI code, add a directive to your module.  Here we create a simple directive that shows the user's name with different formatting based on their status.

```javascript
(function () {
  'use strict';

  angular.module('voyage.userAdmin')
    .directive("userActive", userActive);

  function userActive() {
    return {
      restrict: 'E',
      templateUrl: 'app/user-admin/user-active.directive.html',
      scope: {
        user: '=',
      },
      link(scope) {
        scope.isExpired = scope.user.isAccountExpired || scope.user.isCredentialsExpired;
        scope.isLocked = scope.user.isAccountLocked;
        scope.isDeleted = scope.user.isDeleted;
      }
    };
  }
}());

```

The directive takes different statuses from the user and sets them directly on scope based on the logic it defines.  Then in the html template we use this variable to apply a different class tot he user's name based on this status.

```html
<div ng-class="{strike: isDeleted, 'grayed-out': isExpired, 'italicize': isLocked}">{{user.firstName}} {{user.lastName}}</div>
```

This will apply the different classes to the user name div.  However, just applying the class alone won't change the style, we will need new Sass for that, which we'll add int he next section.

## Adding sass to a module

Here we'll add some new Sass for our user-active directive.  We create a matching .scss partial _user-active.directive.scss:

```sass
user-active {
  .strike {
    text-decoration: line-through;
  }
  
  .grayed-out {
    color: #ccc;
  }
  
  .italicize {
    font-style: italic;
  }
}
```

Notice the first line here we wrap all these classes inside the element selector for our directive.  This means all these styles will only apply to our directive, and that is purposeful, but always be ready to refactor if you decide you want to use these classes in other places.  If you find you want similar classes elsewhere considering refactoring these out of here and into app.scss or a different general partial like _text-decorators.scss.

Remember to import your partial at the bottom of app.scss:

```sass
@import '../app/user-admin/user-admin.directive.scss';
```

## Maintaining and refactoring a module

As you work with your module be mindful of the folder structure and number of files.  Part of our _LI**F**T_ coding principal is keeping our structure **F**lat, but when you start having around 7 files, consider creating sub folders.

Currently our folder and file structure is

```
/user-admin
  user-admin.module.js
  user-admin.routes.js
  user-list.html 
  single-user.html
  user-list.controller.js
  single-user.controller.js
  user-data.service.js
  user-active.directive.js
  user-active.directive.html
  _user-active.directive.scss
```

When the file count starts growing to this level, start separating your sub-features into different folders.  One suggestion would be:

```
/user-admin
  /single-user
    single-user.html
    single-user.controller.js
  
  /user-list
    user-list.html
    user-list.controller.js
    
  /user-active
    user-active.directive.js
    user-active.directive.html
    _user-active.directive.scss
    
  user-admin.module.js
  user-admin.routes.js
  user-data.service.js
```

