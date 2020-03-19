var controller_personal = function ($scope) {

    var _ctl = {};

    var _log_file = "controller_personal.js";

    // ------------------------------

    var _var = {};
    _ctl.var = _var;

    var _status = {
        name:'default',
        yesterdayscore:0,
        loginday:0,
        target:0,
        learnflashcard:0,
        learnflashcardrate:0,
        takenote:0,
        takenoterate:0,
        testselect:0,
        testselectrate:0
    };
    _ctl.status = _status;
    // ----------------------------------------

    var _init_status = function () {

        return this;
    };
    _init_status();

    // --------------------

    _ctl.enter = function (_callback){
        var  _name = $scope.ctl_profile.status.name;
        //var showname ='<br>名稱:'+_name+'<br>';
        _status.name = _name;
        
        var  _yesterday_score = $scope.ctl_rank.yesterday;
        //var showyesterdayscore = '<br>昨日分數:'+_yesterday_score+'<br>';
        _status.yesterdayscore = _yesterday_score;

        var loginday=$scope.ctl_target.day;
        //var showloginday='<br>連續登入天數:'+loginday+'<br>';
        _status.loginday = loginday;

        var  _learn_flashcard_target = $scope.ctl_target.status.learn_flashcard.target;
        //var showtarget ='<br>今日設定目標:'+_learn_flashcard_target+'<br>';
        _status.target = _learn_flashcard_target;

        var  _learn_flashcard_done = $scope.ctl_target.status.learn_flashcard.done;
        //var showlearnflashcard='<br>今日單字學習數:'+_learn_flashcard_done+'/'+_learn_flashcard_target+'<br>';
        _status.learnflashcard = (_learn_flashcard_done+'/'+_learn_flashcard_target);
        _status.learnflashcardrate = (_learn_flashcard_done/_learn_flashcard_target).toFixed(2) * 100;
        
        var  _take_note_done = $scope.ctl_target.status.take_note.done;
        var  _take_note_target = $scope.ctl_target.status.take_note.target;
        //var showtakenote='<br>今日單字筆記數:'+_take_note_done+'/'+_take_note_target+'<br>';
        _status.takenote = (_take_note_done+'/'+_take_note_target);
        _status.takenoterate = (_take_note_done/_take_note_target).toFixed(2) * 100;

        var  _test_select_done = $scope.ctl_target.status.test_select.done;
        var  _test_select_target = $scope.ctl_target.status.test_select.target;
        //var showtestselect = '<br>今日單字測驗數:'+_test_select_done+'/'+_test_select_target+'<br>';
        _status.testselect = (_test_select_done+'/'+_test_select_target);
        _status.testselectrate = (_take_note_done/_take_note_target).toFixed(2) * 100;

        //var showall=showname+showyesterdayscore+showloginday+showtarget+showlearnflashcard+showtakenote+showtestselect;
		//console.log(_learn_flashcard_done+":"+_learn_flashcard_target);
        //console.log(_take_note_done+":"+_take_note_target);
        //console.log(_test_select_done+":"+_test_select_target);
		app.navi.replacePage("personal.html", {
                        "animation": "none",
                        "onTransitionEnd":function(){
                        //$('#personalall').html(showall);
                    }
                  });

      	};

    _ctl.display = function(){
        return ;
    }
    //-----------------

    $scope.ctl_personal = _ctl;
};
