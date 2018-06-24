첫번째 예제: quickstart.py
===========================

먼저 첫번째 예제로 Google Speech API의 기본적인 프로그램을 이해해본다.  
quickstart.py는 resources 디렉토리 안에 있는 audio.raw파일을 읽어 들여서 음성인식을 하는 프로그램이다.

~~~
def run_quickstart():
    import io	# io모듈은 Python 2에서 Stream Handling에 주로 사용되는 모듈이다.
    import os	# os모듈은 여기선 디렉토리를 움직이거나 파일의 path 이름을 저장할 때 쓴다.

    # Google Cloud client library를 부르기 위한 것이다.
    # 만일 에러가 이 라이브러리를 못 찾는 것이면, 다시 한 번 $ pip install -r requirements.txt를 해보면 된다.
    from google.cloud import speech
    from google.cloud.speech import enums
    from google.cloud.speech import types

    client = speech.SpeechClient()   # Speech Client 인스턴스를 만든다.

    # 읽어들일 음성파일의 path를 지정해주는 것이다.
    file_name = os.path.join(
        os.path.dirname(__file__),
        'resources',
        'audio.raw')

    # 해당 음성파일을 읽어들인다.
    with io.open(file_name, 'rb') as audio_file:
        content = audio_file.read()
        audio = types.RecognitionAudio(content=content)

    # 음성인식을 할 설정을 지정해준다.
    config = types.RecognitionConfig(
        encoding=enums.RecognitionConfig.AudioEncoding.LINEAR16,
        sample_rate_hertz=16000,	# 1초에 16000개가 샘플링이 되어 있다는 뜻.
        language_code='en-US')

    # 지정한 음성파일을 지정한 설정으로 음성인식을 한다.
    response = client.recognize(config, audio)

    # 음성 파일 전체를 출력할 때 까지 한 줄씩 받아서 출력한다.
    for result in response.results:
    	# 첫번째 alternatives가 가장 일치율(confidence)가 높은 문장이다
        print('Transcript: {}'.format(result.alternatives[0].transcript))


if __name__ == '__main__':
    run_quickstart()
~~~
