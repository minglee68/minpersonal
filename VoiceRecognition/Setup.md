사전 설정 사항
==============

라즈베리파이에 대한 기본적인 설정은 RaspberryPi 디렉토리에 있기 때문에 생략한다.

1. 오디오 출력을 3.5mm로 지정한다
	* `$ sudo raspi-config`
	* Advanced option > Audio > Force 3.5mm
2. 이어폰과 마이크를 라즈베리파이에 연결한 후 연결됬는지 테스트 해본다
	* `$ arecord -l` // 연결된 마이크 목록
	* `$ aplay -l` // 연결된 스피커 목록
3. 라즈베리파이의 오디오와 관련된 파일들을 설치한다
	* `$ sudo apt-get install alsa-utils`
	* `$ sudo apt-get install libasound2-dev`
4. 아래와 같은 파일을 '.asoundrc'라는 이름으로 만든다. 원래 있다면 편집한다.
~~~
pcm.!default {
    type asym
    capture.pcm "mic"
    playback.pcm "speaker"
}

pcm.mic {
    type plug
    slave {
        pcm "hw:1,0"
    }
}

pcm.speaker {
    type plug
    slave {
        pcm "hw:0,0"
    }
}
~~~
5. `$ speaker-test -t wav`로 스피커로 출력이 되는지 확인한다.
6. `$ sudo arecord -D plughw:1,0 test.wav`로 녹음을 해본다. (ctrl+c 로 끝낸다)
7. `$ sudo aplay test.wav`로 플레이가 되는지 확인해본다.
8. 소리가 너무 작거나 클 경우 `$ alsamixer`로 소리크기를 조절하고 ESC키로 나온 뒤 `$ alsactl store`로 변경사항을 저장한다.
9. `$ sudo apt-get install git`, `$ sudo apt-get install python-pip`로 Git과 Python2를 설치한다.
