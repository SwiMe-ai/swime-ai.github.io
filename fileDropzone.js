'use strict';


angular.module('dashboardApp').directive('fileDropzone', ['driveUtil', function(driveUtil) {
  return {
    restrict: 'A',
    scope: false,
    link: function(scope, element, attrs) {
      // console.log('triggered');
      var isTypeValid, processDragOverOrEnter, validMimeTypes;
      processDragOverOrEnter = function(event) {
        if (event !== null) {
          event.preventDefault();
        }
        // console.log(event);
        event.dataTransfer.effectAllowed = 'copy';

        return false;
      };
      validMimeTypes = attrs.fileDropzone;

      isTypeValid = function(type) {
        if ((validMimeTypes === (void 0) || validMimeTypes === '') || validMimeTypes.indexOf(type) > -1) {
          return true;
        } else {
          alert("Invalid file type.  File must be one of following types " + validMimeTypes);
          return false;
        }
      };
      element.bind('dragover', processDragOverOrEnter);
      element.bind('dragenter', processDragOverOrEnter);
      // scope.$apply();
      var uploadFile = function(content, scope) {
        var uploader = new MediaUploader({
          file: content,
          token: accessToken,
          onComplete: function(data) {
            console.log('upload complete');
            driveUtil.listFiles();

          },
          onProgress: function(data) {
            var percentComplete = data.loaded * 100 / data.total;

            scope.value = Math.round(percentComplete);
            scope.$apply();

          }
        });
        uploader.upload();
      };

      return element.bind('drop', function(event) {
        var file, name, reader, size, type;
        if (event !== null) {
          event.preventDefault();
        }
        reader = new FileReader();
        reader.onload = function(evt) {
          // if (checkSize(size) && isTypeValid(type)) {
          return scope.$apply(function() {
            scope.file = evt.target.result;
            if (angular.isString(scope.fileName)) {
              scope.fileName = name;
              return name;
            }
          });
          // }
        };
        file = event.dataTransfer.files[0];
        name = file.name;
        type = file.type;
        size = file.size;
        reader.readAsDataURL(file);
        uploadFile(file, scope);

        return false;
      });
    }
  };
}]);