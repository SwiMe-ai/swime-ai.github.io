'use strict';

var dashboardModule = angular.module('dashboardApp');

dashboardModule.factory('driveUtil', ['$rootScope', function($rootScope){

  return {
    listFiles: function ()
    {

        // var request = gapi.client.drive.files.list({
        //     'pageSize': 10,
        //     'fields': 'nextPageToken, items'
        // });

        // request.execute(function(resp) {           

        //     $rootScope.files = resp.files;
        //     $rootScope.$apply();
        //     return;
        // });

        var retrievePageOfFiles = function(request, result) {
            request.execute(function(resp) {
                console.dir(resp.items);
                $rootScope.files = resp.items;
                $rootScope.$apply();
        });
        }
        var initialRequest = gapi.client.drive.files.list({
            'maxResults' : 10,
            'orderBy' : 'createdDate desc',
            'fields' : 'items'

        });
        retrievePageOfFiles(initialRequest, []);

    }
};
}]);