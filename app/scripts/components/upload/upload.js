'use strict';

/**
 * @ngdoc component
 * @name cloudWebApp.component:upload
 * @description
 * # upload
 */
angular.module('cloudWebApp')
  .component('upload', {
    templateUrl: 'scripts/components/upload/upload.html',
    controller: 'uploadCtrl'
  })
  .controller('uploadCtrl', [
      'AccessTokens',
      '$scope',
      '$http',
    function(
      AccessTokens,
      $scope,
      $http
    ) {
      var $ctrl = this;
      $ctrl.http = $http;
      var FOLDER_ID = '0B8qFJJCJxA49Wkx6NEdFWUVoTU0';
      var CLIENT_ID = '316928910175-i7sbkirprkkg068l0ec8q85lbq21duat.apps.googleusercontent.com';
      var SCOPES = 'https://www.googleapis.com/auth/drive';
      var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"];
      var ACCESS_TOKEN = '';
      var UPLOAD_URI = 'https://www.googleapis.com/upload/drive/v3/files?uploadType=resumable';

      function initClient() {
        gapi.client.init({
          discoveryDocs: DISCOVERY_DOCS,
          clientId: CLIENT_ID,
          scope: SCOPES
        }).then(function () {
          gapi.auth.setToken({
           access_token: ACCESS_TOKEN
          });
        });
      }

      function updateProgress (oEvent) {
        if (oEvent.lengthComputable) {
          $ctrl.progress = Math.ceil((oEvent.loaded / oEvent.total) * 100);
          $scope.$apply('$ctrl.progress');
        }
      }

      function loadEnd(e) {
        $ctrl.isUploading = false;
        $ctrl.finished = true;
        $scope.$apply('$ctrl.isUploading');
      }

      $ctrl.handleClientLoad = function() {
        $ctrl.progress = 0;
        AccessTokens.get().then(function(response) {
          ACCESS_TOKEN = response.access_token;
          gapi.load('client:auth2', initClient);
          console.log(ACCESS_TOKEN);
        });
      };

      $ctrl.uploadVideo = function(file) {
        var metadata = {
          'name': file.name,
          'kind': 'drive#file',
          'description': 'Uploaded CloudKH',
          'mimeType': file.type || 'application/octet-stream',
          'parents': [FOLDER_ID]
        };

        var dataURI = file.data;
        var byteCharacters = atob(dataURI.split(',')[1]);
        var byteNumbers = new Array(byteCharacters.length);
        for (var i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        var byteArray = new Uint8Array(byteNumbers);
        var content = new Blob([byteArray], {type: file.type});
        var url = UPLOAD_URI;
        var xhr = new XMLHttpRequest();

        xhr.open('POST', url, true);
        xhr.setRequestHeader('Authorization', 'Bearer ' + ACCESS_TOKEN);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('X-Upload-Content-Length', content.size);
        xhr.setRequestHeader('X-Upload-Content-Type', file.type);

        xhr.onload = function (e) {
          if (e.target.status < 400) {
            var location = e.target.getResponseHeader('Location');
            url = location;
            var xhr = new XMLHttpRequest();
            xhr.open('PUT', url, true);
            xhr.setRequestHeader('Content-Type', file.type);
            xhr.setRequestHeader('X-Upload-Content-Type', file.type);
            xhr.setRequestHeader('Content-Range', "bytes 0-"
              + (content.size -1) + "/" + content.size);
            if (xhr.upload) { xhr.upload.onprogress = updateProgress; }
            $ctrl.isUploading = true;
            xhr.addEventListener("loadend", loadEnd);
            xhr.send(content);
          } else {
            console.log('err');
          }
        } .bind(this);
        xhr.send(JSON.stringify(metadata));
     };
  }]);
