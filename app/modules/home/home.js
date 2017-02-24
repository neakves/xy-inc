/**
 * Created by souza on 23/02/17.
 */
(function () {
    angular
        .module('xyInc')
        .controller('HomeController', ['$scope', '$rootScope','$state', 'toastr', 'ModelService',
            function ($scope, $rootScope, $state, toastr,  ModelService) {
                'use strict';

                if($rootScope.model) {
                    $scope.name = $rootScope.model.name;
                    $scope.description = $rootScope.model.description;
                    $scope.category = $rootScope.model.category;
                    $scope.price = $rootScope.model.price;
                } else {
                    $scope.name = null;
                    $scope.description = null;
                    $scope.category = null;
                    $scope.price = null;
                };

                $scope.sendModel = function () {

                    if($rootScope.model) {

                        $rootScope.model.name = $scope.name;
                        $rootScope.model.description = $scope.description;
                        $rootScope.model.category = $scope.category;
                        $rootScope.model.price = $scope.price;

                        ModelService
                            .put($rootScope.model)
                            .then(function(promise) {
                                if(promise && promise.status && promise.status == 200) {
                                    toastr.success('Modelo atualizado.');
                                    $rootScope.model = null;
                                    $state.go('main.home-list');
                                } else {
                                    toastr.error('Erro ao cadastrar atualizar.');
                                }
                            }, function(err) {
                                toastr.error('Erro ao cadastrar atualizar.');
                            });
                    }else {
                        var model = {};

                        model['name'] = $scope.name;
                        model['description'] = $scope.description;
                        model['category'] = $scope.category;
                        model['price'] = $scope.price;

                        ModelService
                            .post(model)
                            .then(function(promise) {
                                if(promise && promise.status && promise.status == 201) {
                                    toastr.success('Modelo cadastrado.');
                                    $state.go('main.home-list');
                                } else {
                                    toastr.error('Erro ao cadastrar modelo.');
                                }
                            }, function(err) {
                                toastr.error('Erro ao cadastrar modelo.');
                            });
                    };

                };
            }])
        .controller('HomeListController', ['$scope', '$state', '$rootScope', 'toastr', 'ModelService',
            function($scope, $state, $rootScope, toastr, ModelService) {
                'use strict';

                $scope.models = [];
                $scope.name = null;

                $scope.list = function () {
                    $scope.models = [];
                    ModelService
                        .list($scope.name)
                        .then(function (promise) {
                            if(promise.status == 200) {
                                if(promise.data && promise.data.length > 0) {
                                    $scope.models = promise.data;
                                } else {
                                    toastr.warning('Modelo não encontrado.');
                                }
                            }
                        }, function(err) {
                            toastr.error('Erro ao buscar os dados do modelo.');
                        });
                };

                $scope.editModel = function (row) {
                    $rootScope.model = row;
                    $state.go('main.home');
                };

                $scope.deleteModel = function (row) {
                    ModelService
                        .delete(row)
                        .then(function (promise) {
                            if(promise.status == 200) {
                                toastr.success('Modelo excluido.');
                                removeModel(row);
                            }
                        }, function(err) {
                            toastr.error('Erro ao exluir modelo.');
                        });
                };

                function removeModel(document) {
                    var found = $scope.models.indexOf(document);
                    if(found != -1) {
                        $scope.models.splice(found, 1);
                    }
                };

            }]);
})();