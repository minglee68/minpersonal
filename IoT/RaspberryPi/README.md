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
6. 항상 OS는 최신 상태로 유지해야 한다.
	* `$ sudo apt-get update` apt-get은 RPi를 위한 command
	* `$ sudo apt-get upgrade -y` -y option은 모든 질문에 yes라고 대답하는 것

### RPi에 Node.js 설치 ###
1. `$ curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -`
	* 버전이 10보다 높아지면 그 번호를 적으면 된다. x는 바꿀 필요 없다.
	* ex) Node.js 버전이 11이 나오면: `.../setup_11.x | sudo -E bash -`
2. `$ sudo apt install -y nodejs`를 해서 node.js를 설치한다.
3. `$ node -v`로 설치 됬는지 확인한다. 설치가 성공하면 node.js의 버전넘버가 나타난다.
~~~
$ node -v
v10.4.1
~~~
4. `$ node`라고 적으면 node.js가 시작한다. 그 다음부터 적는 command는 다 node.js로 컴파일되어 실행된다. 따라서 Linux Command가 아니다.

### RPi에 Express 설치 ###
1. `$ mkdir myapp` Node.js가 설치되어있는 상태에서 이것을 사용할 directory를 만든다.
2. `$ cd myapp` 만든 directory로 들어간다.
3. `$ npm init` 해당 directory에 package.json파일을 만든다.
	* 여러 항목이 나올텐데, 일단은 다 엔터키를 쳐서 넘기면 된다.
4. `$ npm install express --save` Express를 설치한다. 그러면 끝난다.

### RPi에 MySQL(MariaDB) 설치 ###
1. `$ sudo apt-get install mysql-server`
2. `$ sudo mysql -u root -p`를 하면 mysql을 열 수 있다.
