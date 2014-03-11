
function ListingCreateCtrl($scope, ListingFactory, $filter, $q, ListingManager) {
    $scope.form = {};
    $scope.files = [];
    $scope.cover = null;
    $scope.reference = {};

    var reference;

    $scope.setCategory = function (id, value) {

        $scope.reference.categoryType = [];

        $scope.selected_type = value;

        angular.forEach($filter('filter')(reference, { ParentID: id.toString() }, true), function (val, key) {
            angular.forEach($scope.reference.tags, function (v, k) {
                if (v.ParentID === val.KeyString) {
                    $scope.reference.categoryType.push(v);
                }
            })
            
        })
        console.log($scope.reference.categoryType);
        $('a[href="#detail"]').tab('show');

        $scope.form.SaleType = id;
    }

    $scope.getClass = function (id) {
        if (id === $scope.form.SaleType) {
            return "category active";
        } else {
            return "category";
        }
    }


    $('#imageuploader').attr('src', '/listing/uploader?id=' + $scope.id);

    $q.all([ListingManager.referenceDefer()]).then(function (results) {
        //var form = results[0];
        reference = results[0];
        $scope.reference.saleType = $filter('filter')(reference, { Type: $scope.Enum.ReferenceType.SaleType.toString() }, true);
        $scope.reference.tags = $filter('filter')(reference, { Type: $scope.Enum.ReferenceType.Tag.toString() }, true);

        //$scope.form.id = form.id;
        //$scope.form.CreateDate = $filter('date')(form.CreateDate, 'dd/MM/yyyy');
        //$scope.form.Title = form.Title;
        //$scope.form.Description = form.Description;
        //$scope.form.Price = form.Price;
        //$scope.form.isWarrently = form.WarrentyDesc === null ? false : true;
        //$scope.form.WarrentyDesc = form.WarrentyDesc;
        //$scope.form.COD = form.COD;
        //$scope.form.OnPay = form.OnPay;
        //$scope.form.PaymentDescription = form.PaymentDescription;

    });

    $scope.presubmit = function () {
        $('#CategoryID').val($scope.form.CategoryID);
    }

    $scope.save = function () {
        ListingFactory.edit($scope.form)
            .success(function (data, status) {
                //$('a[href="#successtab"]').tab('show');
                console.log('success');
            })
            .error(function (data, status) {
                if (status === 400) {
                    $scope.warning(data.Message);
                } else {
                    $scope.error();
                }
            });
    }

}


function ImageController($scope, $q, ListingManager, imageFactory, $filter) {
    $scope.files = [];

    $scope.cover = null;

    $scope.form = {};

    $scope.mode = 'add';

    //$q.all([ListingManager.formDefer()]).then(function (results) {

    //    var form = results[0];
    //    $scope.form.id = form.id;
    //    $scope.form.CreateDate = $filter('date')(form.CreateDate, 'dd/MM/yyyy');

    //    var file;
    //    angular.forEach(form.Image, function (v, k) {
    //        file = {
    //            id: v.id,
    //            Src: v.Src.replace("####size####", "s1"),
    //            IsCover: v.IsCover
    //        }

    //        if (file.is_cover) {
    //            $scope.cover = file;
    //        }

    //        $scope.files.push(file);

    //    });

    //    if ($scope.cover === null) {
    //        $scope.cover = $scope.files[0];
    //    }

    //});

    //Do something when image is successfully upload
    $scope.$on('uploadCallback', function (e, call) {
        if (call._response.result !== null) {
            var data = JSON.parse(call._response.result);
            var file = {
                id: data.id,
                Src: data.Src.replace("####size####", "s1"),
                IsCover: data.IsCover
            }

            //Set Cover
            if ($scope.files.length === 0) {
                $scope.cover = file;
            }

            $scope.files.push(file);
        }
        $scope.$apply();
    });


    $scope.edit = function () {
        $scope.mode = 'edit';
    }

    $scope.delete = function () {
        var file;
        var arrIndex = [];
        $scope.file_deleted = [];
        angular.forEach($scope.files, function (v, k) {
            if (v.checked) {
                file = {
                    id: v.id,
                    Src: v.Src,
                    IsCover: v.IsCover,
                    IsDeleted: true
                }
                arrIndex.push(k);
                $scope.file_deleted.push(file);
            }
        });
        imageFactory.delete($scope.file_deleted)
            .success(function (data, status) {
                for (var i = 0; i < $scope.files.length; i++) {
                    if ($scope.files[i].checked) {
                        $scope.files.splice(i, 1);
                        i--;
                    }
                }

            })
            .error(function (data, status) {
                if (status === 400) {
                    $scope.warning(data.Message);
                } else {
                    $scope.error();
                }
            });

    }

    $scope.done = function () {
        $scope.mode = 'add';
    }

}


shopApp.controller("ListingDetailCtrl", ['$scope', 'userFactory', '$route', 'referenceFactory', '$filter',
    function ($scope, userFactory, $route, referenceFactory, $filter) {

        //default option
        //$scope.form.isWarrently = '0';

        //init validation
        var isValid = false;
        var validate = jQuery("#form").validationEngine({
            prettySelect: true,
            onValidationComplete: function (form, status) {
                isValid = status;
            }
        });

        $scope.next = function () {
            $('a[href="#contact"]').tab('show');
            validate.validationEngine('validate');
            if (isValid === false) {
                return;
            }
        }

    }]);

shopApp.controller("ListingContactCtrl", ['$scope', 'userFactory', '$route', 'referenceFactory', '$filter',
    function ($scope, userFactory, $route, referenceFactory, $filter) {


    }]);

