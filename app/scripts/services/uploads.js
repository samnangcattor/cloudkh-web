'use strict';

/*
*
* @ngdoc service
* @name cloudWebApp.Uploads
* @description
* # Uploads
* Service in the cloudWebApp.
*/
angular.module('cloudWebApp')
  .service('Uploads', [
      'TimeConfig',
    function(
      TimeConfig
    ) {
      var URL_UPLOAD = 'https://www.googleapis.com/upload/drive/v3/files/';
      var $ctrl = this;

      $ctrl.interval = 0;
      $ctrl.maxInterval = 0;

      var RetryHandler = function () {
        interval = TimeConfig.INTERVAL; // Start at one second
        maxInterval = TimeConfig.ONE_MINUTE * TimeConfig.INTERVAL; // Don't wait longer than a minute
      };

      RetryHandler.prototype.retry = function (fn) {
        setTimeout(fn, $ctrl.interval);
        $ctrl.interval = $ctrl.nextInterval_();
      };

      /**
      * Reset the counter (e.g. after successful request.)
      */
      RetryHandler.prototype.reset = function () {
        $ctrl.interval = TimeConfig.INTERVAL;
      };

      /**
      * Calculate the next wait time.
      * @return {number} Next wait interval, in milliseconds
      *
      * @private
      */
      RetryHandler.prototype.nextInterval_ = function () {
          var interval = $ctrl.interval * 2 + $ctrl.getRandomInt_(0, TimeConfig.INTERVAL);
          return Math.min(interval, $ctrl.maxInterval);
      };

      /**
      * Get a random int in the range of min to max. Used to add jitter to wait times.
      *
      * @param {number} min Lower bounds
      * @param {number} max Upper bounds
      * @private
      */
      RetryHandler.prototype.getRandomInt_ = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
      };

        /**
        * Helper class for resumable uploads using XHR/CORS. Can upload any Blob-like item, whether
        * files or in-memory constructs.
        *
        * @example
        * var content = new Blob(["Hello world"], {"type": "text/plain"});
        * var uploader = new MediaUploader({
        *   file: content,
        *   token: accessToken,
        *   onComplete: function(data) { ... }
        *   onError: function(data) { ... }
        * });
        * uploader.upload();
        *
        * @constructor
        * @param {object} options Hash of options
        * @param {string} options.token Access token
        * @param {blob} options.file Blob-like item to upload
        * @param {string} [options.fileId] ID of file if replacing
        * @param {object} [options.params] Additional query parameters
        * @param {string} [options.contentType] Content-type, if overriding the type of the blob.
        * @param {object} [options.metadata] File metadata
        * @param {function} [options.onComplete] Callback for when upload is complete
        * @param {function} [options.onProgress] Callback for status for the in-progress upload
        * @param {function} [options.onError] Callback if upload fails
        */
        var MediaUploader = function (options) {
            var noop = function () { };
            $ctrl.file = options.file;
            $ctrl.contentType = options.contentType || $ctrl.file.type || 'application/octet-stream';
            $ctrl.metadata = options.metadata || {
              'title': $ctrl.file.name,
              'mimeType': $ctrl.contentType
            };
            $ctrl.token = options.token;
            $ctrl.onComplete = options.onComplete || noop;
            $ctrl.onProgress = options.onProgress || noop;
            $ctrl.onError = options.onError || noop;
            $ctrl.offset = options.offset || 0;
            $ctrl.chunkSize = options.chunkSize || 0;
            $ctrl.retryHandler = new RetryHandler();

            $ctrl.url = options.url;
            if (!$ctrl.url) {
              var params = options.params || {};
              params.uploadType = 'resumable';
              $ctrl.url = $ctrl.buildUrl_(options.fileId, params, options.baseUrl);
            }
            $ctrl.httpMethod = options.fileId ? 'PUT' : 'POST';
        };

        /**
        * Initiate the upload.
        */
        MediaUploader.prototype.upload = function () {
            var xhr = new XMLHttpRequest();

            xhr.open($ctrl.httpMethod, $ctrl.url, true);
            xhr.setRequestHeader('Authorization', 'Bearer ' + $ctrl.token);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.setRequestHeader('X-Upload-Content-Length', $ctrl.file.size);
            xhr.setRequestHeader('X-Upload-Content-Type', $ctrl.contentType);

            xhr.onload = function (e) {
              if (e.target.status < 400) {
                var location = e.target.getResponseHeader('Location');
                $ctrl.url = location;
                sendFile_();
              } else {
                $ctrl.onUploadError_(e);
              }
            } .bind($ctrl);
            xhr.onerror = $ctrl.onUploadError_.bind($ctrl);
            xhr.send(JSON.stringify($ctrl.metadata));
        };
      }


      /**
      * Send the actual file content.
      *
      * @private
      */


      /**
      * Query for the state of the file for resumption.
      *
      * @private
      */
      MediaUploader.prototype.resume_ = function () {
        var xhr = new XMLHttpRequest();
        xhr.open('PUT', $ctrl.url, true);
        xhr.setRequestHeader('Content-Range', "bytes */" + $ctrl.file.size);
        xhr.setRequestHeader('X-Upload-Content-Type', $ctrl.file.type);
        if (xhr.upload) {
          xhr.upload.addEventListener('progress', $ctrl.onProgress);
        }
        xhr.onload = $ctrl.onContentUploadSuccess_.bind($ctrl);
        xhr.onerror = $ctrl.onContentUploadError_.bind($ctrl);
        xhr.send();
      };

      /**
      * Extract the last saved range if available in the request.
      *
      * @param {XMLHttpRequest} xhr Request object
      */
      MediaUploader.prototype.extractRange_ = function (xhr) {
        var range = xhr.getResponseHeader('Range');
        if (range) {
          $ctrl.offset = parseInt(range.match(/\d+/g).pop(), 10) + 1;
        }
      };

      /**
      * Handle successful responses for uploads. Depending on the context,
      * may continue with uploading the next chunk of the file or, if complete,
      * invokes the caller's callback.
      *
      * @private
      * @param {object} e XHR event
      */
      MediaUploader.prototype.onContentUploadSuccess_ = function (e) {
          if (e.target.status == 200 || e.target.status == 201) {
            $ctrl.onComplete(e.target.response);
          } else if (e.target.status == 308) {
            $ctrl.extractRange_(e.target);
            $ctrl.retryHandler.reset();
            $ctrl.sendFile_();
          }
      };

      /**
      * Handles errors for uploads. Either retries or aborts depending
      * on the error.
      *
      * @private
      * @param {object} e XHR event
      */
      MediaUploader.prototype.onContentUploadError_ = function (e) {
        if (e.target.status && e.target.status < 500) {
          $ctrl.onError(e.target.response);
        } else {
          $ctrl.retryHandler.retry($ctrl.resume_.bind($ctrl));
        }
      };

      /**
      * Handles errors for the initial request.
      *
      * @private
      * @param {object} e XHR event
      */
      MediaUploader.prototype.onUploadError_ = function (e) {
        $ctrl.onError(e.target.response); // TODO - Retries for initial upload
      };

      /**
      * Construct a query string from a hash/object
      *
      * @private
      * @param {object} [params] Key/value pairs for query string
      * @return {string} query string
      */
      MediaUploader.prototype.buildQuery_ = function (params) {
        params = params || {};
        return Object.keys(params).map(function (key) {
          return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
        }).join('&');
      };

      /**
      * Build the drive upload URL
      *
      * @private
      * @param {string} [id] File ID if replacing
      * @param {object} [params] Query parameters
      * @return {string} URL
      */
      MediaUploader.prototype.buildUrl_ = function (id, params, baseUrl) {
        var url = baseUrl || URL_UPLOAD;
        if (id) {
          url += id;
        }
        var query = $ctrl.buildQuery_(params);
        if (query) {
          url += '?' + query;
        }
        return url;
      };

      function showProgressPercentage(percentageValue) {
        console.log(percentageValue.toString() + "%");
      }

      $ctrl.mediaUploader = function(file, accessToken, metadata) {
        var uploader =new MediaUploader({
  				file: file,
  				token: accessToken,
  				metadata: metadata,
  				onError: function(response){
  					var errorResponse = JSON.parse(response);
  				},
  				onComplete: function(response){
  					var errorResponse = JSON.parse(response);
  					if(errorResponse.message != null){
  						console.log("Error: " + errorResponse.error.message);
  					}else{
  						console.log('successful upload');
  					}
  				},
  				onProgress: function(event) {
  					showProgressPercentage(Math.round(((event.loaded/event.total)*100), 0));
  				},
  				params: {
  					convert:false,
  					ocr: false
  				}
  			});
  	   uploader.upload();
     };
  ]);
