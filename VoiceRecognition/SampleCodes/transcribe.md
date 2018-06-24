두번째 예제: transcribe.py
===========================

두번째 예제는 command를 적을 때 argument로 지정하고 싶은 파일의 path를 건내줘서 해당 파일을 음성인식하는 것이다.   
ex) `$ python transcribe.py resources/audio.raw`  
`$ python transcribe.py gs://cloud-samples-tests/speech/brooklyn.flac`

~~~
import argparse    //command의 argument, option, sub-command를 위한 parser
import io

// argument로 파일의 path를 받았을 경우
def transcribe_file(speech_file):
    from google.cloud import speech
    from google.cloud.speech import enums
    from google.cloud.speech import types
    client = speech.SpeechClient()

    // speech_file은 함수를 부를 때 받아진 argument로, 오디오 파일의 path가 들어있다.
    with io.open(speech_file, 'rb') as audio_file:
        content = audio_file.read()

    // 오디오 파일을 읽어내고 음성인식 설정을 한다
    audio = types.RecognitionAudio(content=content)
    config = types.RecognitionConfig(
        encoding=enums.RecognitionConfig.AudioEncoding.LINEAR16,
        sample_rate_hertz=16000,
        language_code='en-US')

    response = client.recognize(config, audio)
    for result in response.results:
        print(u'Transcript: {}'.format(result.alternatives[0].transcript))


// argument로 gcs-uri를 받았을 경우
def transcribe_gcs(gcs_uri):
    from google.cloud import speech
    from google.cloud.speech import enums
    from google.cloud.speech import types
    client = speech.SpeechClient()

    audio = types.RecognitionAudio(uri=gcs_uri)
    config = types.RecognitionConfig(
        encoding=enums.RecognitionConfig.AudioEncoding.FLAC,
        sample_rate_hertz=16000,
        language_code='en-US')

    response = client.recognize(config, audio)
    for result in response.results:
        print(u'Transcript: {}'.format(result.alternatives[0].transcript))


// argparse모듈을 이용해서 argument로 주어진 path를 받아서 transcribe_file() 또는 transcribe_gcs()함수로 보낸다.
if __name__ == '__main__':
    parser = argparse.ArgumentParser(
        description=__doc__,
        formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument(
        'path', help='File or GCS path for audio file to be recognized')
    args = parser.parse_args()
    if args.path.startswith('gs://'):
        transcribe_gcs(args.path)
    else:
        transcribe_file(args.path)
~~~
