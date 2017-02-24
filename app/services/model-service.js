/**
 * Created by souza on 23/02/17.
 */
(function () {
    angular
        .module('xyInc')
        .service('ModelService', ['$http', '_env', function ($http, _env) {
            'use strict';
            return {
                get: function (model) {
                    var promise = $http({
                        method: 'GET',
                        url:_env.expressUrl + '/' + model.name + '/' + model._id,
                        data: model
                    }).then(function successCallback(response) {
                        return response;
                    }, function errorCallback(response) {
                        return response.status;
                    });
                    return promise;
                },
                list: function (name) {
                    var promise = $http({
                        method: 'GET',
                        url:_env.expressUrl + '/' + name
                    }).then(function successCallback(response) {
                        return response;
                    }, function errorCallback(response) {
                        return response.status;
                    });
                    return promise;
                },
                post: function (model) {
                    var promise = $http({
                        method: 'POST',
                        url:_env.expressUrl + '/' + model.name,
                        data: model
                    }).then(function successCallback(response) {
                        return response;
                    }, function errorCallback(response) {
                        return response.status;
                    });
                    return promise;
                },
                put: function (model) {
                    var promise = $http({
                        method: 'PUT',
                        url:_env.expressUrl + '/' + model.name + '/' + model._id,
                        data: model
                    }).then(function successCallback(response) {
                        return response;
                    }, function errorCallback(response) {
                        return response.status;
                    });
                    return promise;
                },
                delete: function (model) {
                    var promise = $http({
                        method: 'DELETE',
                        url:_env.expressUrl + '/' + model.name + '/' + model._id,
                        data: model
                    }).then(function successCallback(response) {
                        return response;
                    }, function errorCallback(response) {
                        return response.status;
                    });
                    return promise;
                }
            }
        }]);
})();