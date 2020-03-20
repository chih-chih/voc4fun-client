var controller_rank = function ($scope) {

    var _ctl = {};

    var _log_file = "controller_rank.js";

    // ------------------------------

    var _var = {};
    _ctl.var = _var;
    _var.user_set_target = {
        "target":0,
        "done":0
    };

    _var.user_done = {
        "learn_flashcard":0,
        "take_note":0,
        "test_select":0
    };
    _var.yesterday_target_data = {
        "learn_flashcard":{
            "target":0,
            "done":0
        },
        "take_note":{
            "target":0,
            "done":0
        },
        "test_select":{
            "target":0,
            "done":0
        }
    }
	_var.totalscore={
		"uuid":1,
		"uuidname":1,
		"totalscore":0
	}

	_var.maxtarget={
		"max_target_learn_flashcard":0,
		"max_target_take_note":0,
		"max_target_test_select":0
	}
  var _status= {
    yesterday_score:0,
    yesterday_target:0,
    day:0,
    yesterday_done_learn_flashcard:0,
    yesterday_done_take_note:0,
    yesterday_done_test_select:0,
    yesterday_max_target:0,
    rate_learn_flashcard:0,
    rate_take_note:0,
    rate_test_select:0,
    hard_target:0,

  };
  _ctl.status = _status;
    var yesterdayscore=0;
   _ctl.yesterday=yesterdayscore;



    // ----------------------------------------

    var _init_status = function () {

        return this;
    };
    _init_status();

    // --------------------


   /* _ctl.enter = function (_callback) {
        console.log(_var.totalscore)
        $scope.ctl_target.get_yesterday_target_data(function (_target_data) {
			$.get($scope.CONFIG.server_url + 'model/total.php',function (_total_data){
                                    console.log(_total_data);
                                    _var.totalscore.uuid = _total_data[0].uuid;
                                    _var.totalscore.totalscore = _total_data[0].total;
                                    /*_var.yesterday_hard_rate.learn_flashcard.rate_learn_flashcard = _hard_rate[0].rate_learn_flashcard;
                                    _var.yesterday_hard_rate.take_note.rate_take_note = _hard_rate[0].rate_take_note;
                                    _var.yesterday_hard_rate.test_select.rate_test_select = _hard_rate[0].rate_test_select;
                                    _var.yesterday_target_data = _target_data;
                          console.log(_total_data);
                                    app.navi.replacePage("rank.html", {
                                                "animation": "none",
                                                "onTransitionEnd": _callback
                                                    });


                    });


        });

        var bbb='<br>昨日得分:'+_var.yesterday_target_data.learn_flashcard.target +'<br>';
        var aaa='<br>昨日得分:'+_var.yesterday_target_data.learn_flashcard.done +'<br>';
        var yyy = bbb + aaa;
        $('#showtext').html(yyy);
    };*/

    _ctl.enter = function (_callback){
     $scope.ctl_target.get_yesterday_target_data(function (_target_data) {
		 $.get($scope.CONFIG.server_url + 'model/max_target.php',function (_max_target_data){
                  console.log(_max_target_data);
                  _status.yesterday_max_target = _max_target_data[0].max_target_learn_flashcard;
									//_var.maxtarget.max_target_take_note = _max_target_data[0].max_target_take_note;
									//_var.maxtarget.max_target_test_select = _max_target_data[0].max_target_test_select;

									 console.log(_max_target_data);



          if(_target_data == undefined){

          }else {
            _status.yesterday_max_target = _target_data;
            console.log(_status.yesterday_max_target);
          }
          console.log($scope.ctl_target.day+":"+$scope.ctl_target.countinity);
      	  app.navi.replacePage("rank.html",{
      	       "animation":"none",
      	       "onTransitionEnd":function(){
                 if($scope.ctl_target.day==1 && $scope.ctl_target.countinity==false){
                   var _dayscore=0;
                 }else if($scope.ctl_target.day==2){
                   var _dayscore=1/7*1;
                 }else if($scope.ctl_target.day==3){
                   var _dayscore=2/7*2;
                 }else if($scope.ctl_target.day==4){
                   var _dayscore=3/7*3;
                 }else if($scope.ctl_target.day==5){
                   var _dayscore=4/7*5;
                 }else if($scope.ctl_target.day==6){
                   var _dayscore=5/7*8;
                 }else if($scope.ctl_target.day==7){
                   var _dayscore=6/7*13;
                 }else if($scope.ctl_target.day==1 && $scope.ctl_target.countinity==true){
                   var _dayscore=21;
                 }else{

                 }
                 console.log($scope.ctl_target.day+":"+$scope.ctl_target.countinity);
                 console.log(_dayscore);



      	             

                    var _settarget=_status.yesterday_target;
                    //var showsettarget='<br>昨日設定目標:'+ settarget +'<br>';

                    var _day=$scope.ctl_target.day-1;
                    //var showday ='<br>截至昨日的連續學習天數:'+ day +'<br>';

                    var _learndone=_status.yesterday_done_learn_flashcard;
                    //var showlearndone='<br>完成學習單字:'+ learndone +'<br>';
                    var _notedone=_status.yesterday_done_take_note;
                    //var shownotedone='<br>完成筆記數:'+ notedone +'<br>';
                    var _testdone=_status.yesterday_done_test_select;
                    //var showtestdone='<br>完成測驗量:'+ testdone +'<br>';
                    
                    if(_learndone == 0 && _settarget == 0){
                      _status.rate_learn_flashcard = 0;
                    }else{
                      _status.rate_learn_flashcard= Math.round(_learndone/_settarget*100) ;
                    }

                    if(_notedone == 0 && _settarget == 0){
                      _status.rate_take_note = 0;
                    }else{
                      _status.rate_take_note=Math.round(_notedone/_settarget*100);
                    }

                    if(_testdone == 0 && _settarget == 0){
                      _status.rate_test_select = 0;
                    }else{
                      _status.rate_test_select=Math.round(_testdone/_settarget*100);
                    }

					          var _maxtarget= _status.yesterday_max_target;
                    _status.hard_target = _settarget/_maxtarget;

                    if(_testdone == 0 && _notedone == 0 && _testdone == 0 && _settarget == 0){
                      _status.yesterday_score = 0;
                    }else{
                      _status.yesterday_score= Math.round((((_learndone/_settarget*(_settarget/_maxtarget)*0.2+_notedone/_settarget*(_settarget/_maxtarget)*0.3+_testdone/_settarget*(_settarget/_maxtarget)*0.5))*100+_dayscore));
                    
                    }
					          //var showmaxtarget_learn_flashcard='<br>昨日所有學習者中最大設定目標:'+ maxtarget_learn_flashcard +'<br>';
					//var maxtarget_take_note= _var.maxtarget.max_target_take_note;
					//var showmaxtarget_take_note='<br>昨日最大單字筆記設定目標::'+ testdone +'<br>';
					//var maxtarget_test_select= _var.maxtarget.max_target_test_select;
					//var showmaxtarget_test_select='<br>昨日最大單字測驗設定目標::'+ testdone +'<br>';

                    //var all = showyesterday + showlearnrate + shownoterate + showtestrate + showsettarget + showlearndone + shownotedone + showtestdone + showday + showmaxtarget_learn_flashcard;
				//	$('#scoreall').html(all);
					}
      	       });
			   });
          	});


      	};

_ctl.total = function (_callback){
      	$.get($scope.CONFIG .server_url + 'model/total.php', function (_total_data){
      	  console.log(_total_data)
      	  var showrank = '';
      	  for(var i=0;i<5;i++){

      	    var _totalscore_uuid = _total_data[i].uuid;
      	    var _totalscore_name = _total_data[i].name;
            var _totalscore_totalscore = _total_data[i].total;

            //showrank = showrank + '<p id="rank_'+i+'">'+'第'+(i+1)+'名&nbsp;&nbsp;'+'名稱:'+_totalscore_name+'&nbsp;&nbsp;總分:'+_totalscore_totalscore+'</p>' + '<br>'
          }

      	  //console.log(_var.totalscore.uuid)
      	  app.navi.replacePage("rank.html",{
      	       "animation":"none",
      	       "onTransitionEnd":function(){
                   /* var uuid=_var.totalscore.uuid;
                    var showuuid='<br>uuid:'+uuid +'&nbsp;&nbsp;';
                    var totalscore=_var.totalscore.totalscore;
                    var showtotalscore='得分:'+ totalscore +'<br>';
                    var totalname = showuuid + showtotalscore;
                   */
        //$('#scoreall').html(showrank);
      	       }
      	       });
          	});


      	};
    _ctl.display = function(){
        return ;
    }
    //-----------------

    $scope.ctl_rank = _ctl;
};
