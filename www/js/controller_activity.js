var controller_activity = function ($scope) {

    var _ctl = {};

    var _log_file = "controller_activity.js";

    // --------------------------

    _ctl.enter_from_target = function () {
        //$.console_trace("設定swipeable");
        //$scope.set_swipeable(true);
        //$.console_trace("enter_from_target");

        if ($scope.CONFIG.control_group_version || $scope.ctl_target.is_all_finish()) {
            _ctl.select_enter_by_last_action();
            console.log("是走這邊？？？");
        }
        else {
            //_ctl.select_enter_by_target();
            _ctl.logincheck_enter_by_target();
              console.log("還是走這邊？？？？");
        }

        return this;
    };

    _ctl.enter_from_logincheck = function () {

        //$.console_trace("設定swipeable");
        $scope.set_swipeable(true);
        //$.console_trace("enter_from_target");

        if ($scope.CONFIG.control_group_version || $scope.ctl_target.is_all_finish()) {
            _ctl.select_enter_by_last_action();

        }
        else {
          //$scope.ctl_rank_view.enter_to_target();
          //$scope.ctl_learn_flashcard.enter();
          //原本
          //_ctl.select_enter_by_target();
            console.log("跳單字學習後回到設定目標");
        }

        return this;
    };


    _ctl.select_enter_by_target = function () {
        if ( _ctl.is_learn_enough()
                && _ctl.is_test_enough() === false ) {
            $scope.ctl_test_select.enter(false);
        }
        else {
            //$.console_trace("$scope.ctl_learn_flashcard.enter();");
            //原本
            //$scope.ctl_learn_flashcard.enter();
            $scope.ctl_target.enter_from_profile(false);
            //$scope.ctl_rank_view.enter_to_target();
            console.log("這是跳到單字學習？？？");
        }
        return this;
    };



    _ctl.logincheck_enter_by_target = function () {
        $scope.ctl_logincheck.enter();
        console.log("這邊是連續登入？？？");
        return this;
    };

    _ctl.select_enter_by_last_action = function () {
        // 要記得上次開啟的那一個項目
        // app_factory_ons_view.js
        // menu_click()
        $scope.db_log.get_latest_log({
            "file_name": "app_factory_ons_view.js",
            "function_name": "menu_click()",
            "callback": function (_action) {
                // @TODO 語系
                if (_action === "單字學習") {
                    $scope.ctl_learn_flashcard.enter();
                }
                else if (_action === "筆記列表") {
                    $scope.ctl_note_list.enter();
                }
                else if (_action === "測驗") {
                    $scope.ctl_test_select.enter(false);
                }
                else {
                    $scope.ctl_learn_flashcard.enter();
                }
            }
        });

        return this;
    };

    _ctl.is_learn_enough = function () {
        var _target_data = $scope.ctl_target.status;
        if (typeof(_target_data) === "undefined" || typeof(_target_data.learn_flashcard) === "undefined") {
            return false;
        }
        //$.console_trace("enter_from_target", _target_data);
        return (!(_target_data.learn_flashcard.done < _target_data.learn_flashcard.target)
                || (_target_data.test_select.done > _target_data.test_select.target));
    };

    _ctl.is_test_enough = function () {
        var _target_data = $scope.ctl_target.status;
        if (typeof(_target_data) === "undefined" || typeof(_target_data.test_select) === "undefined") {
            return false;
        }
        //$.console_trace("is_test_enough", _target_data);
        return !(_target_data.test_select.done < _target_data.test_select.target);
    };

    /**
     * 發音
     * @param {String} _text
     */
    _ctl.speak = function (_text, _lang) {
        if ($scope.CONFIG.enable_speak === false) {
            return this;
        }

        //alert("發音：" + _text + "(未完成)");
        $scope.log(_log_file, "speck()", _lang, {
            "text": _text,
            "lang": _lang
        });

        $scope.cordova_text_to_speech.speak(_text, _lang);
    };

    var _window_name = "_blank";
    if (typeof(cordova) === "object") {
        _window_name = "_system";
    }

	/**
	 * 字典搜尋
         * @param {String} _text
	 * https://tw.dictionary.yahoo.com/dictionary?p=diction
	 */
	_ctl.query_dictionary = function ( _text, _dictionary ){
            var _search_url;
            if ( _dictionary === "yahoo"){
                _search_url = 'https://tw.dictionary.yahoo.com/dictionary?p=' + _text
            }
            else if(  _dictionary === "synonym"){
                _search_url = 'https://dictionary.cambridge.org/zht/%E8%A9%9E%E5%85%B8/%E8%8B%B1%E8%AA%9E-%E6%BC%A2%E8%AA%9E-%E7%B9%81%E9%AB%94/'+ _text;
            }
            else if( _dictionary === "radicals"){
                _search_url = 'https://cdict.info/query/'+ _text ;
            }
            window.open( _search_url, _window_name);

            //app.navi.replacePage("dictionary.html");

            //紀錄LOG
            $scope.log(_log_file, "query_dictionary()", _dictionary, _text);
	};

	/**
	* 圖片搜尋
	*
	*/
	 _ctl.search_image = function ( _text ){
		var _search_url = 'https://www.google.com.tw/search?q='+ _text +'&espv=2&tbm=isch&tbo=u&source=univ&sa=X';
		window.open( _search_url, _window_name);

		//紀錄LOG
		$scope.log(_log_file, "search_image()", undefined, _text);
	 };



    // ---------------------

    $scope.ctl_activity = _ctl;
};
