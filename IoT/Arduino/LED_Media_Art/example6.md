Example6 - 불을 공이 튀기는 것처럼 점멸시키기
=============================================

9개의 LED를 연결시킨 뒤 하나씩 켰다가 하나씩 끄는 연습.  
D0부터 D8까지 켰다가 (10 + i\*20)delay를 주고 다시 끄는 것을 하나씩 진행한다.  
뒤로 가면 갈수록 점멸이 느려지고, 돌아오면 돌아올수록 점멸이 빨라지도록 한다.  
이것을 무한 반복한다.  

~~~
// 연결한 9개의 전구의 GPIO를 array에 넣는다
int D[9] = {D0, D1, D2, D3, D4, D5, D6, D7, D8};


// D0~8까지 모든 핀을 출력으로 설정한다
void setup() {
	for (int i=0; i<9; i++){
		pinMode(D[i], OUTPUT);
	}
}


// 불을 키는 함수
void on(int port) {
	digitalWrite(port, HIGH);
}


// 불을 끄는 함수
void off(int port) {
	digitalWrite(port, LOW);
}


// 빛이 하나씩 빠르게느리게 왔다갔다하게 하기
void loop() {
	int i = 0;
	int temp = 0;

	while(1){
		on(D[i]);
		delay(10 + i*20);
		off(D[i]);

		if (i == 0){
			temp = 1;
		}
		else if (i == 8){
			temp = -1;
		}

		i += temp;
	}
}
~~~
