<?php
/**
 * 用來支援同步的功能
 *
 * 傳送參數
 * [$_GET]
 * uuid: FingerPint
 * timestamp: Device Timestamp
 *
 * [$_POST]
 * logs
 */
include_once '../config.php';
include_once '../lib/redbeanphp/rb.config.php';
include_once '../helper/javascript_helper.php';
include_once '../helper/log_helper.php';

$sync_file_name = "db_log.js";
$sync_function_name = "sync_complete()";

//if (isset($_GET) && count($_GET) > 0 && isset($_GET["uuid"])) {
    $uuid = $_GET["uuid"];
    //$name = $_GET["name"];
    //$rate_learn_flashcard = $_GET["rate_learn_flashcard"];
    //$rate_take_note = $_GET["rate_take_note"];
    //$rate_test_select = $_GET["rate_test_select"];
    //$hard_learn_flashcard = $_GET["hard_learn_flashcard"];
    //$hard_take_note = $_GET["hard_take_note"];
    //$hard_test_select = $_GET["hard_test_select"];
    //$score = $_GET["score"];
    //$target = $_GET["score"];
    
    //$sql =
    //$score_yesterday = R::getRow('SELECT uuid, rate_learn_flashcard, rate_take_note, rate_test_select, hard_learn_flashcard, hard_take_note, hard_test_select, score FROM score_signal WHERE rate_learn_flashcard=? AND rate_take_note=? AND rate_test_select=? AND hard_learn_flashcard=? AND hard_take_note=? AND hard_test_select=? AND score=? AND uuid !=?', [$rate_learn_flashcard, $rate_take_note, $rate_test_select, $hard_learn_flashcard, $hard_take_note, $hard_test_select, $score, $uuid]);
    //$score_yesterday = R::getRow('SELECT uuid, rate_learn_flashcard FROM score_signal WHERE rate_learn_flashcard=? AND uuid !=?', [$rate_learn_flashcard, $uuid]);
    $rank = R::getAll("SELECT * FROM score_signal WHERE uuid = '".$uuid."'");
    
    
    
    if (is_null($rank)) {
        $rank = array();
}
    
    
    jsonp_callback($rank);
//}
