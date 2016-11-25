(function () {
  'use strict';

  angular
    .module('launchpadApp.user')
    .factory('userService', userService);

  userService.$inject = ['$http', 'API_URL', '$q'];

  function userService($http, API_URL, $q) {

    return  {
      list,
      save,
      deleteUser
    };

    function list() {
      return $http.get(`${API_URL}/v1/users`)
        .then(response => response.data);
    }

    function save(user) {
      return $http.post(`${API_URL}/v1/users`, user)
        .then(response => response.data)
        .catch(failure => $q.reject(failure.data));
    }

    function deleteUser(userId) {
      console.log(userId)
      return $http.delete(`${API_URL}/v1/users/${userId}`)
        .then(response => response.data)
        .catch(failure => $q.reject(failure.data));
    }


  }
}());
