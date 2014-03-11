//Tutorial of how to use Angular integrate with Web Form
//http://weblogs.asp.net/dwahlin/archive/2013/08/16/using-an-angularjs-factory-to-interact-with-a-restful-service.aspx

angular.module('shopAPI', [])
    .factory('ListingFact', ['$resource', function ($resource) {
        var api = "/api/listing";

        return $resource(api, {}, {
            get: { url: api + "/get", method: "GET", params: { id: '@id' } },
            save: { url: api + "/save", method: "POST" }
        });

    }])
    .factory('userFactory', ['$http', function ($http) {
        return {
            register: function (data) {
                return $http.post('/api/user/register', data);
            },
            login: function (data) {
                return $http.post('/api/user/login', data);
            },
            logout: function (data) {
                return $http.post('/api/user/logout', data);
            }
        }
    }])
    .factory('ReferenceFactory', ['$http', function ($http) {

        return {
            list: function (data) {
                return $http.get('/reference/get', { params: { ReferenceType: data, json: true } });
            }
        }

    }])
    .factory('ListingFactory', ['$http', function ($http) {
        var api = "/listing";

        return {
            create: function (data) {
                return $http.post(api + '/create', data);
            },
            edit: function (data) {
                return $http.post(api + '/edit', data);
            },
            get: function (id) {
                return $http.get(api + '/get', { params: { id: id } });
            }

        }


    }])
    .factory('imageFactory', ['$http', function ($http) {

        return {
            delete: function (data) {
                //console.log(JSON.stringify(data));
                return $http.post('/api/image/delete', data);
            },
        }

    }]);


