머신러닝과 음성인식
===================
From 한동대학교 음성인식 캠프   
- by ETRI 지능정보연구본부 음성지능연구그룹 전형배 박사

음성인식
--------

### 역사 ###
* * *

* 1950년도부터 소개되어 많은 시도가 있었지만, 음성인식은 계산량이 상당히 많기 때문에 초기에는 많은 발전이 일어나지 못했다.
* 1997년부터 'Dragon Dictation'이라는 말하면 그대로 Text로 Output이 나오는 프로그램을 시작으로 더욱 더 고차원의 음성인식이 많이 나왔다.
* 최근에는 음성을 인식하는 것 뿐만이 아니라 머신러닝을 통해서 음성인식의 정확도를 높이고 더욱더 많은 프로그램을 사용할 수 있게 되었다.

### 음성인식의 구조 ###
* * *
1. 음성이 입력된다
2. 입력된 음성을 음파로 변환한다
3. 음파에서 음소를 특정시킨다
4. 나열된 음소를 음소 모델과 비교해서 단어로 변환한다
5. 변환된 문장을 출력한다

위의 순서는 대략적인 순서인데, 차례대로 구체적으로 설명하겠다.

### 음성이란? ###
* * *
가장 쉬운 것부터 얘기하자면, 음성이란 음성기관, 또는 발성기관을 통해서 만들어진 말소리이다. 이런 음성은 눈으로는 보이지 않지만, '음파'라는 파장으로 표현된다. 음성인식에서는 이 음파로부터 소리의 최소단위인 '음소'를 찾아내고, 그것을 텍스트화시키는 것이다.

### 음소란? ###
* * *
음소란 단어를 말할 때에 뜻의 차이를 가져오는 최소 단위를 말한다. 예를 들자면 숫자 '1, 2, 3, 4'를 발음 할 때에 우리는 '일, 이, 삼, 사'라고 발음을 하는데, 여기서 '이'는 'i', '일'을 'i'와 'l'을 더한 것, '사'는 's'와 'a'를 더한 것, '삼'은 's'와 'a'와 'm'을 더한 것이다. 이랬을 때에 'i', 'l', 's', 'a', 'm'은 각각 하나의 '음소'이다. 

### 어떻게 음파에서 음소를 구분하는가? ###
* * * 
먼저 음파에서 음소를 특정시키는 것을 음향분석이라고 부른다. 입력으로 받은 음파를 기존에 있던 '음향 모델'과 비교를 해서 분별하는 단계이다. 구체적으로 나열하자면:  
1. 음성 입력
2. 음성을 음파로 출력
3. 음파를 프레임으로 나누기(Frame Blocking)
3. 각 프레임의 음파를 주파수로 분석
4. 특징추출(Feature Extraction) - 음소모델과 비교하여 음소를 구분한다
5. 음소들을 결합해서 사전에 있는 단어를 만든다
6. 만들어진 문장을 언어모델과 비교해서 맞는 문장인지 확인한다.
	* 안 맞으면 단어를 바꾼다
7. 문장 출력

음성인식에서의 머신러닝
-----------------------
음성인식(입력)과 결과적으로 나타난 문장(출력)를 분석하여 나중에는 입력이 주어지면 더 빨리 알맞는 출력을 찾아낼 수 있는 능력을 만들 때에 쓰인다.

준비사항
--------

### Hardware ###
* Raspberry Pi 3
* 마이크

### Software ###
* git
* Raspberry Pi OS Image (NOOBS)
* Putty와 같은 SSH를 사용할 수 있는 프로그램
