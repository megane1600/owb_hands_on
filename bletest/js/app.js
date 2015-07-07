'use strict';

const TAG = "BluetoothGatt";
var REGISTER_UUID = "";

var searchTimer = undefined;
var scaning = false;
var client_if;
var regist_uuid;
  
var bluetoothManager = navigator.mozBluetooth;
var bleManager = navigator.owbBle;

var defaultAdapter = null;
var req = bluetoothManager.getDefaultAdapter(); // アダプタを取得
req.onsuccess = function bt_getAdapterSuccess() {  
  defaultAdapter = req.result;  //	成功するとアダプタを取得できる
  if (defaultAdapter != null) {
    console.log("defaultAdapter:" + defaultAdapter.name);
    defaultAdapter.onregisterclient = onRegisterClient;
    defaultAdapter.onscanresult = onScanResult;
  
    if (bleManager) {			// BLEとしてアプリを登録する。結果は上記のコールバック関数に
      bleManager.registerClient(REGISTER_UUID);
    }
  } else {
    console.log('bluetooth adapter is null');
  }
};

req.onerror = function bt_getAdapterFailed() {
  console.log('Can not get bluetooth adapter!');
};

function onRegisterClient(event) {
  console.log("register status:" + event.status);
  console.log("register client_if:" + event.client_if);
  console.log("register uuid:" + event.uuid);
  if (event.status == 0) {
    regist_uuid = event.uuid;
    client_if = event.client_if;
    // 登録成功！
    scanDevices();
  }
}

function scanDevices() {
  console.log("scanDevices() ...");
  if (scaning) {
    return;
  }
  
  showSearching(true);
  $("#device_list li").remove();
  scaning = true;
  bleManager.scanLEDevice(client_if, true); // スキャン開始
  searchTimer = setTimeout(function () {
    bleManager.scanLEDevice(client_if, false); // スキャン停止
    clearTimeout(searchTimer);
    searchTimer = undefined;
    scaning = false;
    showSearching(false);
  }, 10000); //  10秒後にスキャンを止める
}

function onScanResult(event) {
  console.log("onScanResult:" + event.bda);
  var device = {
    name : event.adv_data,
    address : event.bda,
    rssi : event.rssi,
    type : event.device_type
  };
  addDevice(device);
}
    
function addDevice(device) {
  var item = $("<li><a href='#'>" + device.name + "</a></li>");
  $("#device_list").append(item).find("li:last").hide();
  $('ul').listview('refresh');
  $("#device_list").find("li:last").slideDown(300)
   .click(function () {
   });
}

function showSearching(searching) {
  if (searching) {
    $("#search").html('searching');
    $("#search").attr('disabled',true);
  } else {
    $("#search").html('search');
    $("#search").attr('disabled',false);
  }
}

$("#search").on("click", function () {
    if (!defaultAdapter) {
       alert("Bluetooth should be opened");
       return;
    }
    scanDevices();
});