// DOMContentLoaded is fired once the document has been loaded and parsed,
// but without waiting for other external resources to load (css/images/etc)
// That makes the app more responsive and perceived as faster.
// https://developer.mozilla.org/Web/Reference/Events/DOMContentLoaded
window.addEventListener('DOMContentLoaded', function() {

  // We'll ask the browser to use strict code to help us catch errors earlier.
  // https://developer.mozilla.org/Web/JavaScript/Reference/Functions_and_function_scope/Strict_mode
  'use strict';

  var translate = navigator.mozL10n.get;

  // We want to wait until the localisations library has loaded all the strings.
  // So we'll tell it to let us know once it's ready.
  navigator.mozL10n.once(start);

  // ---

  function start() {
    var mySerial = new TCPSerial();	//	オブジェクトの生成
    mySerial.setParams( "ttyUSB0", 115200 );	//	接続デバイスとbitrateの指定
    mySerial.onread = function(msg) {		//	キャラクタ受信時の処理
	    message.textContent = msg;
    };
    mySerial.connect( "127.0.0.1", 9943 );	//	serialdへの接続

  }

});
