
shopApp.directive('fileupload', ['uploadManager', function factory(uploadManager) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {

            $(element).fileupload({
                dataType: 'text',
                sequentialUploads: true,
                //add: function (e, data) {
                //    uploadManager.add(data);
                //},
                submit: function (e, data) {
                    if (undefined === scope.uploadForm) {
                        data.formData = scope.form;
                    } else {
                        data.formData = scope.uploadForm;
                    }
                    console.log(data.formData);
                },
                progressall: function (e, data) {
                    uploadManager.setProgress(data);
                },
                done: function (e, data) {
                    uploadManager.done(data);
                }
            });

        }
    };
}]);

shopApp.directive('chosen', [function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs, controller) {

            var list = attrs['chosen'];

            scope.$watch(list + '', function () {
                element.trigger('chosen:updated');
            });

            element.selectpicker();

        }

    };
}]);

shopApp.directive('ckEditor', [function () {
    return {
        require: '?ngModel',
        restrict: 'CA',
        link: function (scope, elm, attr, ngModel) {
            var CKEDITOR_BASEPATH = '/scripts/js/ckeditor/';
            var ck = CKEDITOR.replace(elm[0]);

            if (!ngModel) return;

            //sometimes $render would call setData before the ckeditor was ready
            ck.on('instanceReady', function () {
                ck.setData(ngModel.$viewValue);
            });

            ck.on('dialogHide', function () {
                //pasteState is not enough to handle because data from upload image is assigned after that
                scope.$apply(function () {
                    ngModel.$setViewValue(ck.getData());
                });
            });

            ck.on('pasteState', function () {
                scope.$apply(function () {
                    ngModel.$setViewValue(ck.getData());
                });
            });

            ngModel.$render = function (value) {
                ck.setData(ngModel.$viewValue);
            };
        }
    };
}]);

shopApp.directive('ckEditorLight', [function () {
    return {
        require: '?ngModel',
        restrict: 'CA',
        link: function (scope, elm, attr, ngModel) {
            var CKEDITOR_BASEPATH = '/scripts/js/ckeditor/';
            var ck = CKEDITOR.replace(elm[0], {
                toolbar: [
                    { name: 'basicstyles', items: ['Bold', 'Italic', 'Underline'] },
                   // { name: 'basicstyles', items: ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'RemoveFormat'] },
                    //{ name: 'paragraph', items: ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', 'CreateDiv', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'BidiLtr', 'BidiRtl'] },
                    { name: 'styles', items: ['TextColor'] },
                    { name: 'document', items: ['Source', '-', 'Link', '-', 'Preview'] }
                ],
                uiColor: '#14B8C4'
            });

            if (!ngModel) return;

            //sometimes $render would call setData before the ckeditor was ready
            ck.on('instanceReady', function () {
                ck.setData(ngModel.$viewValue);
            });

            ck.on('dialogHide', function () {
                //pasteState is not enough to handle because data from upload image is assigned after that
                scope.$apply(function () {
                    ngModel.$setViewValue(ck.getData());
                });
            });

            ck.on('pasteState', function () {
                scope.$apply(function () {
                    ngModel.$setViewValue(ck.getData());
                });
            });

            ngModel.$render = function (value) {
                ck.setData(ngModel.$viewValue);
            };
        }
    };
}]);