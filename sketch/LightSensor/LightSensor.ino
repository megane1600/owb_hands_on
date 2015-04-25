// 
const int pinLight = A0;               // センサーのピン番号

void setup() 
{ 
  Serial.begin(9600);      // シリアルの初期化
} 
 
void loop() 
{ 
  int sensorValue = analogRead(pinLight);   //アナログ0(A0)からセンサーの値を取得
   
  Serial.println(sensorValue);  //取得した値をシリアルに送信
      
  delay(1000); // 1秒間のウェイト
} 

