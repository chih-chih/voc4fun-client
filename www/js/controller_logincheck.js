var controller_logincheck = function ($scope) {
    
    var _ctl = {};
    
    var _log_file = "controller_logincheck.js";
	 

    _ctl.init = function (_callback) {

        $.trigger_callback(_callback);
    };

    //----------------------
    _ctl.enter = function (_callback) {
    // 讓選單保持在選取的狀態
        $scope.ons_view.active_menu(1);

        _ctl.init(function () {
            //$.console_trace("enter");
            app.navi.replacePage("logincheck.html", {
                    "animation": "none"
                });
            
        });

    };


    // ---------------------
    
    $scope.ctl_logincheck = _ctl;
};