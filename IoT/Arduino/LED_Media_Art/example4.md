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


// 빛이 왔다갔다하게 하기
void loop() {
	for(int i=0; i<9; i++){
		on(D[i]);
		delay(100);
	}

	for(int i=8; i>=0; i--){
		off(D[i]);
		delay(100);
	}
}
~~~
