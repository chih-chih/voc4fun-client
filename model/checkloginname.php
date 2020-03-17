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

if (isset($_GET) && count($_GET) > 0 && isset($_GET["name"])) {
    $name = $_GET["name"];
    
    //$sql = 
    $res = R::getAll("SELECT * FROM log WHERE uuid = (SELECT uuid FROM uuid_name WHERE name = '".$name."')");
    
    if (is_null($res)) {
        $res = array();
    }
    
    
    jsonp_callback($res);
}