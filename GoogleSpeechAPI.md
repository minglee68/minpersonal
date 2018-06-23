Google Speech API를 사용하는 방법
=================================

Setup.md를 하고, https://cloud.google.com/speech 에 가입을 다 해놨다는 가정하에 시작한다.

1. 상단 메뉴의 프로젝트 리스트를 확대한다. 없으면 콘솔 보기(View Console)을 클릭하고 한다.
2. 새 프로젝트를 만든다.
	* 이름은 마음대로!
3. 생성된 프로젝트로 이동하고, <탐색메뉴>의 <API 및 서비스>를 선택한다.
4. <API 및 서비스 사용 설정>에서 Cloud Speech API를 찾아서 사용 설정을 한다.
5. <사용자 인증 정보 만들기>를 누른다.
6. <OAuth client ID 만들기>를 해서 이름을 마음대로 주고 저장한다. ( 역할은 소유자)
7. 애플리케이션 유형은 자유롭게 정한다.(웹 애플리케이션이나 기타)
8. SSH로 이동, `mkdir GoogleCloudSDK`로 새로운 디렉토리를 만든 뒤 거기에 들어간다.
9. `$ export CLOUD_SDK_REPO="cloud-sdk-$(lsb_release -c -s)"`로 환경변수를 하나 만든다.
10. `$ echo "deb http://packages.cloud.google.com/apt $CLOUD_SDK_REPO main" | sudo tee -a /etc/apt/sources.list.d/google-cloud-sdk.list`를 해서 apt list에 google cloud sdk를 넣는다.
11. `$ curl http://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key add -`로 google cloud sdk를 받는다.
12. `$ sudo apt-get update && sudo apt-get install google-cloud-sdk`로 설치를 한다.
13. gcloud init을 해서 `You must login to continue. Would you like to log in (Y/n)?`이 나오면 'y'를 하고, 주어진 링크로 들어가서 로그인을 하고 코드를 복사해서 붙인다.
14. `Pick cloud project to use:` 다음에 나오는 클라우드 리스트에서 아까 만든 클라우드를 고른다.
	* 끝나면 제대로 됬는지 `$ gcloud auth list`와 `$ gcloud config list`로 확인한다.
15. 서비스 계정 키를 만든다
	* <사용자 인증 정보 만들기>에서 <서비스 계정 키>를 고른다
	* <새 서비스 계정>을 고르고 서비스계정 이름을 준다.
	* JSON유형을 선택하고 <생성>을 눌러서 json파일을 다운받는다.
	* 라즈베리파이로 json파일을 보낸다 (WinSCP, Filezilla 등 사용)
16. `$ export GOOGLE_APPLICATION_CREDENTIALS=YYY/XXX`로 환경변수를 만든다.
	* XXX는 다운받은 json파일의 이름(확장자 포함), 그리고 YYY는 그 파일이 있는 path이다.
17. `$ gcloud auth activate-service-account --key-file="$GOOGLE_APPLICATION_CREDENTIALS"`로 해당 계정을 활성화시킨다.
18. 계정이 활성화 되어있는지 확인하기 위해 아래와 같은 JSON파일을 만든다.
~~~
{
    "config": {
        "encoding":"FLAC",
        "sampleRateHertz": 16000,
        "languageCode": "en-US"
    },
    "audio": {
        "uri":"gs://cloud-samples-tests/speech/brooklyn.flac"
    }
}
~~~
19. `$ gcloud auth application-default print-access-token`으로 엑세스 토큰을 받는다
20. 위에서 받은 엑세스 토큰을 복사해서 아래의 command 안의 ACCESS\_TOKEN부분과 바꾼다. 결과적으로 아래와 같은 결과가 나오면 된다.
`curl -s -H "Content-Type: application/json" -H "Authorization: Bearer ACCESS_TOKEN" https://speech.googleapis.com/v1/speech:recognize \ -d @sync-request.json`
~~~
{
	"results": {
	{
	  "alternatives": {
	  {
	     "transcript": "how old is the Brooklyn Bridge",
	     "confidence": 0.98360395
	  }
	}
      }
    }
}
~~~
21. `$ sudo apt-get install portaudio19-dev`로 PortAudio19을 설치한다.
22. `$ git clone https://github.com/GoogleCloudPlatform/python-docs-samples.git`으로 git에서 샘플코드를 받아온다.
23. `$ pip install virtualenv`로 가상환경을 설치한다.
	* 만일 이걸로 설치가 안 된다면 `$ sudo apt install virtualenv`로 설치한다
24. `$ cd python-docs-samples/speech/cloud-client`로 들어간다.
25. `$ virtualenv env`로 env라는 가상환경을 만든다.
26. `$ source env/bin/activate`로 가상환경을 시작한다.
	* 이 다음부턴 command가 `(env) $`같이 보여야 한다.
	* 나중에 가상환경을 끄고싶을 땐 `deactivate`라고 치면 된다.
27. `(env) $ pip install -r requirements.txt`로 패키지를 설치한다.
28. `(env) $ python quickstart.py`를 적어서 `Transcript: how old is the Brooklyn Bridge`라는 출력이 나오면 모든 설정에 성공한 것이다.

이제 비로소 Google Speech API를 사용하기 위한 준비가 끝났다.  
참고로 apt-get은 Raspberry Pi를 위한 것이고, pip는 Python 2를 위한 것이다.  
현재 Google Speech API는 Python 2만 지원하기 때문에, Python 3을 사용해선 안 된다.
