Raspberry Pi
============

* 라즈베리 파이는 일종의 서버 컴퓨터이다.
* 내장 하드디스크는 없는 대신, 전원이나 SD카드를 장착시켜서 사용할 수 있는, "원 보드 마이크로 컴퓨터"라 불리는 하드웨어이다.
* 라즈베리 파이 재단이 교육용 싱글보드 컴퓨터로 개발한 것이다.
* HDMI츨력, USB포트, LAN포트 등을 통해서 주변기기와 연결시킬 수 있다.
* micro-SD를 통해서 OS를 사용할 수 있다. -> 이번 연습에서는 "NOOBS"를 다운받아서 사용한다.

준비사항:
---------

### RPi(Raspberry Pi)에 소프트웨어 설치 ###
1. micro SD 카드에 소프트웨어 설치
	1. SD Formatter를 PC에 설치한 후 사용할 micro SD 카드를 포맷팅한다.
	2. 사전에 다운로드를 해놓은 NOOBS의 zip파일의 압축을 풀어서 micro SD 카드에 넣는다.
2. 키보드와 마우스, HDMI 모니터를 RPi와 연결을 해서 설치한다.
	1. 설치가 끝나면 Preferences > Raspberry Pi Configuration 메뉴를 사용하여 시스템 설정을 한다.
		* System메뉴: hostname과 password를 바꾼다.
		* Interfaces메뉴: SSH와 VNC를 enable시킨다.
		* Localisation메뉴:
			* Locale Language는 'en', Country는 'US'로 설정
			* TimeZone은 Asia/Seoul로 설정
			* 키보드는 US/US International로 설정
			* WiFi Country는 'JP'로 설정
3. WiFi 연결
	* `$ sudo nano /etc/wpa_supplicant/wpa_supplicant.conf`를 해서 연다.
	* 자신이 사용할 WiFi의 ssid와 password를 아래와 같이 적어 놓는다.
~~~
network={
	ssid="testing"
	psk="testingPassword"
}
~~~
	* IP주소를 확인한다.
		* `$ ifconfig`를 해서 `wlan0`라고 적혀있는 곳의 `inet addr:`에 있는 부분이 IP주소이다.
4. 고정IP 지정
	* `$ sudo nano /etc/dhcpcd.conf`를 해서 연다.
	* `# Example static IP configuration:`이라고 나와있는 부분을 그대로 따라서 적는다.
	* `static ip_address`를 우리가 쓰는 IP주소로 바꾸고, 뒤에 `/24`는 그대로 놔둔다.
	* `sudo reboot`를 하고 주소를 확인한다.
5. VNC나 Putty를 이용해서 연결을 한다.
	* 처음 user의 이름은 `pi`, 패스워드는 System설정시 바꾼 패스워드이다.
