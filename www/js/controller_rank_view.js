var controller_rank_view = function ($scope) {

    var _ctl = {};

    var _log_file = "controller_rank_view.js";


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
    uuid:1,
    uuid_name:1,
    totalscore:0,
    show_yesterday_data:true,
    show_total_data:false,
    all_data:[],
    signal_data:[],
    yesterday_uuid:1,
    yesterday_name:1,
    signal_score:0
  };

  //var _show_yesterday ={};
  var _show_total={};
  //_ctl.show_yesterday =_show_yesterday;
  _ctl.show_total =_show_total;

  _ctl.status = _status;
    var yesterdayscore=0;
   _ctl.yesterday=yesterdayscore;

    _ctl.init = function (_callback) {

        $.trigger_callback(_callback);
    };

    //----------------------
    _ctl.enter = function (_callback) {
    // 讓選單保持在選取的狀態
      //  $scope.ons_view.active_menu(1);

        $scope.ctl_target.get_yesterday_target_data(function (_target_data) {
        $.get($scope.CONFIG.server_url + 'model/max_target.php',function (_max_target_data){
        $.get($scope.CONFIG.server_url + 'model/rank.php',function (_score_data){
          console.log(_score_data);
          var _signal_data=[];
          for(var i=0;i<2;i++){
       //[{name:xxx,key:1},{name:xxx,key:2}]
            var _signal_uuid = _score_data[i].uuid;
            _status.yesterday_uuid=_signal_uuid;
            var _signal_name = _score_data[i].name;
            _status.yesterday_name = _signal_name;
            var _signalscore= _score_data[i].score;
            _status.signal_score = _signalscore;
            _signal_data.push(_score_data[i]);
            //_status.all_data = _status.all_data + '第'+(i+1)+'名'+ '名稱:'+_name+'總分:'+_totalscore+'\n';
          }
          _status.signal_data = _signal_data;
           console.log(_status.signal_data);
           console.log(_target_data);
           if(_target_data == undefined){
             var _maxtarget=0;
           }else{
             _maxtarget = _max_target_data[0].max_target_learn_flashcard;
           }
           _status.yesterday_max_target = _maxtarget;
             //_maxtarget = _max_target_data[0].max_target_learn_flashcard;
             /*if(_target_data == undefined){
               //_status.yesterday_max_target = 0;
               console.log(_target_data);

             }else {

               console.log(_status.yesterday_max_target);
             }*/
             _status.show_yesterday_data = true;
             _status.show_total_data = false;
             console.log($scope.ctl_target.day+":"+$scope.ctl_target.countinity);
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

             if(_target_data== undefined){
               _settarget=0;
             }else{
               var _settarget=_target_data.learn_flashcard.target;

             }
               // var _settarget=_target_data.learn_flashcard.target;
                _status.yesterday_target=_settarget;


                var _day=$scope.ctl_target.day-1;
                _status.day= _day;

                if(_target_data== undefined){
                  var _settarget=0;
                  var _learndone=0;
                  var _notedone=0;

                }else{
                  var _settarget=_target_data.learn_flashcard.target;
                  var _learndone = _target_data.learn_flashcard.done;
                  var _notedone=_target_data.take_note.done;
                  var _testdone=_target_data.test_select.done
                }
                //var _learndone = _target_data.learn_flashcard.done;
                _status.yesterday_done_learn_flashcard=_learndone;

                //var _notedone=_target_data.take_note.done;
                _status.yesterday_done_take_note=_notedone;

                //var _testdone=_target_data.test_select.done
                _status.yesterday_done_test_select = _testdone;


                if(_learndone == 0 && _settarget == 0){
                  _status.rate_learn_flashcard = 0;
                }else{
                  _status.rate_learn_flashcard= Math.round(_learndone/_settarget*100);
                  if(_status.rate_learn_flashcard>100)
                  {_status.rate_learn_flashcard=100;
                  }
                }

                if(_notedone == 0 && _settarget == 0){
                  _status.rate_take_note = 0;
                }else{
                  _status.rate_take_note=Math.round(_notedone/_settarget*100);
                  if(_status.rate_take_note>100)
                  {_status.rate_take_note=100;
                  }
                }

                if(_testdone == 0 && _settarget == 0){
                  _status.rate_test_select = 0;
                }else{
                  _status.rate_test_select=Math.round(_testdone/_settarget*100);
                  if(_status.rate_test_select>100)
                  {_status.rate_test_select=100;
                  }
                }



                _status.yesterday_max_target=_maxtarget;

                if(_maxtarget == 0 && _settarget == 0){
                  _status.yesterday_max_target = 0;
                }else{
                  _status.hard_target= Math.round(_settarget/_maxtarget*100) ;
                }
                if(_testdone == 0 && _notedone == 0 && _testdone == 0 && _settarget == 0){
                  _status.yesterday_score = 0;
                }else{
                  _status.yesterday_score= Math.round((((_learndone/_settarget*(_settarget/_maxtarget)*0.2+_notedone/_settarget*(_settarget/_maxtarget)*0.3+_testdone/_settarget*(_settarget/_maxtarget)*0.5))*100+_dayscore));

                }


             app.navi.replacePage("rank_view.html",{
                  "animation":"none",
                  "onTransitionEnd":function(){


             }
                  });


            });
             });
               });


    };
    _ctl.enter_to_target = function(){

      $scope.ctl_target.enter_from_profile();
console.log("controller_rank_view");
    };


    // ---------------------

    $scope.ctl_rank_view = _ctl;
};
