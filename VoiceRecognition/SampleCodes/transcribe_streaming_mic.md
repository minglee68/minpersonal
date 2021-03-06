세번째 예제: transcribe\_streaming\_mic.py
=========================================

세번째 예제는 실제로 마이크로 입력 받은 음성을 리얼타임으로 음성인식을 해서 텍스트로 보여주는 것이다.  
이것을 사용하기 위해선 pyaudio가 필요하다.  
`$ pip install pyaudio`

~~~
from __future__ import division

import re    # Regular Expression을 위한 모듈
import sys   # 파이썬의 interpreter의 변수들을 만질수 있는 모듈

from google.cloud import speech
from google.cloud.speech import enums
from google.cloud.speech import types
import pyaudio
from six.moves import queue

# 오디오 recording을 위한 변수들
RATE = 16000
CHUNK = int(RATE / 10)  # 100ms


class MicrophoneStream(object):
    # 오디오를 recording하는 stream을 시작한다.
    def __init__(self, rate, chunk):
        self._rate = rate
        self._chunk = chunk

        self._buff = queue.Queue()
        self.closed = True

    def __enter__(self):
        self._audio_interface = pyaudio.PyAudio()
        self._audio_stream = self._audio_interface.open(
            format=pyaudio.paInt16,
            channels=1, rate=self._rate,
            input=True, frames_per_buffer=self._chunk,
            stream_callback=self._fill_buffer,
        )

        self.closed = False

        return self

    def __exit__(self, type, value, traceback):
        self._audio_stream.stop_stream()
        self._audio_stream.close()
        self.closed = True
        self._buff.put(None)
        self._audio_interface.terminate()

    def _fill_buffer(self, in_data, frame_count, time_info, status_flags):
        self._buff.put(in_data)
        return None, pyaudio.paContinue

    def generator(self):
        while not self.closed:
            chunk = self._buff.get()
            if chunk is None:
                return
            data = [chunk]

            while True:
                try:
                    chunk = self._buff.get(block=False)
                    if chunk is None:
                        return
                    data.append(chunk)
                except queue.Empty:
                    break

            yield b''.join(data)


def listen_print_loop(responses):
    '''
    responses는 서버에서 음성인식을 해서 돌려준 결과이다. 
    다음 response는 지금 함수를 사용하고 있는 response에 의해서 밀린다. 
    그리고 지금 함수를 사용하고 있는 response가 함수 사용이 끝나면 다음 response가 함수를 시작한다.
    
    각 response는 여러 개의 결과를 가지고 있을 수 있고, 
    한 개의 결과가 여러 개의 대안을 가지고 있을 수도 있다. 
    여기선 제일 좋은 결과의 제일 좋은 대안만 사용한다.

    이 함수에서는 단어뿐만이 아니라 문장으로서 가장 맞는 단어를 사용하기 위해 
    한 문장이 끝날 때까지 음성 입력을 받으면서 맞는 단어로 계속 바뀐다. 
    실제로 실행해보면 단어가 지속적으로 바뀌는 것을 볼 수 있을 것이다. 
    또한 문장이 끝난 것을 인지하면 다음 라인으로 옮긴다.
    '''
    num_chars_printed = 0
    for response in responses:
        if not response.results:
            continue

        result = response.results[0]
        if not result.alternatives:
            continue

        transcript = result.alternatives[0].transcript

        overwrite_chars = ' ' * (num_chars_printed - len(transcript))

        if not result.is_final:
            sys.stdout.write(transcript + overwrite_chars + '\r')
            sys.stdout.flush()

            num_chars_printed = len(transcript)

        else:
            print(transcript + overwrite_chars)

            if re.search(r'\b(exit|quit)\b', transcript, re.I):
                print('Exiting..')
                break

            num_chars_printed = 0


def main():
    # http://g.co/cloud/speech/docs/languages를 보면 사용할 수 있는 언어들을 볼 수 있다.
    language_code = 'en-US'  # 한국어는 ko-KR

    client = speech.SpeechClient()
    config = types.RecognitionConfig(
        encoding=enums.RecognitionConfig.AudioEncoding.LINEAR16,
        sample_rate_hertz=RATE,
        language_code=language_code)
    streaming_config = types.StreamingRecognitionConfig(
        config=config,
        interim_results=True)

    with MicrophoneStream(RATE, CHUNK) as stream:
        audio_generator = stream.generator()
        requests = (types.StreamingRecognizeRequest(audio_content=content)
                    for content in audio_generator)

        responses = client.streaming_recognize(streaming_config, requests)

        listen_print_loop(responses)


if __name__ == '__main__':
    main()
~~~
