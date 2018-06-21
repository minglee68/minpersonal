WiFiClient.h의 기본 함수들
==========================

### WiFi.begin(ssid, password) ###

* ssid와 password는 char type의 array이다.
* 해당 ssid에 password를 이용해서 연결한다.
* 연결이 되면 WL\_CONNECTED를, 연결이 안 되면 WL\_IDLE\_STATUS를 보낸다.

### WiFi.disconnect() ###

* 지금 연결되어있는 WiFi와의 연결을 끊는다.

### WiFiClient() class ###

* `WiFiClient client;`로 클라이언트 라이브러리를 생성한다.

### client.connect(host, httpPort) ###

* 지정된 host와 httpPort에 따라서 TCP연결을 한다.
* host는 호스트 이름이나 IP Address를 넣으면 된다.
* httpPort는 해당 사이트의 포트 번호를 넣어주면 된다. 일반적으로 80이 들어간다.
* 연결에 성공하면 true를 반환하고, 실패하면 fail을 반환한다.

### client.connected() ###

* client가 연결되어있는지 없는지 확인하는 함수.
* 연결되어 있으면 true를 반환하고, 안 되어 있으면 false를 반환한다.

### client.println() ###

* 해당 서버에 HTTP Request를 보내는 함수.
