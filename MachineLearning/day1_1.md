Introduction to AI
===================

* AI > Machine Learning > Deep Learning
* AI vs SW
	* SW = 알고리즘을 실행시켜서 출력을 받는 것
	* AI = 알고리즘을 실행시켜서 동작시키지만 다양한 복잡한 일들을 해낼 수 있다
	     = 환경의 변화에 적응해 나아간다
	     = 불확실성이 있는 상황에서도 판단을 내리는 것

* Strong AI vs Weak AI
	* Strong: AI속에 진짜 지능이 있을 때에. 진짜 생각을 할 때에. General하다(한가지를 여러가지에 쓸 수 있다).
	* Weak: 진짜 생각이 있는지 없는지에 관계 없이 주어진 입력에 대해서 출력을 만들어내는 것

* AI 구현방법
	* 사람머리 속에 있는 지식을 이용해서 연산을 하는 것 = Knowledge-base Approaches(Symbolic AI)
		* Symbol과 Symbol, symbol과 rule간의 비교
	* 지식을 주는 게 아니라 Data를 주고 방법을 찾아내라는 것 = Machine Learning
		* 어떤 입력이 들어왔을 때에 가운데의 Parameter나 Structure를 바꿔서 맞는 출력으로 만들어 내는 것
		* Training Samples를 통해서 배운다.
		* Deep Learning은 머신러닝에 사용되는 수많은 방법중 하나

* 숫자 인식 문제 : Digit Recognition using Neural network
	* 이미지를 하나의 벡터로 표현한다.
		* 검정색 = 1, 흰색 = 0
	* Neural network를 하나 배치한다.
		* 벡터를 입력받고 내가 원하는 출력을 받는 것
		* 출력 = 0~9
		* 예시의 경우 '7'에 1에 가까운 값을 준다.
	* input = 12개 노드
	* output = 10개 노드 (0~9)
	* Data 수집 (정답과 함께 수집)
	* 이미지를 Feature Vector로 바꾸고 Neural Network에 집어 넣고 가동 시킨 뒤 나온 output하고 정답하고 비교를 해서 차이를 lost function으로 Training Algorithm에 돌려주고, 이 lost function이 가장 적은 모델을 찾는 과정을 Training이라고 한다.


Machine Learning
-----------------

### Supervised learning

* Training Data가 Label(정답)을 가지고 있다고 생각한다.
* X = 입력 데이터 , Y = 입력에 대한 올바른 출력
* 특정 입력에 원하는 출력을 찾는 가장 좋은 모델을 찾는다
* 무조건 입력과 Label이 있어야 한다.


### unsupervised learning

* Data만 주고 Label은 안 준다.
* Data만 잔뜩 주면 비슷한 것끼리  모아서(clustering) 본다.
	* 데이터를 분석할 때에 사용한다.
	* 소비자의 패턴에 따라서 구분을 지으려고 하면, 특정 패턴에 대한 정의가 없기 때문에 비슷한 유형의 패턴을 모아서 임의로 지정해주면 된다.
* auto-encoder (reproduction)
	* 그림을 잘 기억했다가 그것과 비슷한 그림을 다시 그려라
* latent variable models
	* 숨겨진 어떤 factor를 찾는 것 (hidden factor analysis)
	* 데이트할 때에 어느 한 쪽에서 '내가 왜 화났는지 몰라?' 그러면 상대방이 맞춰야 된다.
	* 내 친구의 심리상태가 어땠을 때에 이런 반응을 보일 것인가를 예상을 해보면 어느정도 맞출 수 있다.
	* 가슴에 통증이 있다, 조금만 뛰면 숨이 찬다.
		* 심장이 아플 때에 그런다. 왜 아픈가?
			* 담배를 핀다거나, 운동을 안 한다거나, 유전적인 문제가 있거나.
	* 직접적으로 관찰되지 않는 현상을 찾아낸다.



### Semi-supervised learning

* Supervised Learning에서 데이터는 모으기 쉽지만 Label을 찾기는 어렵다.(수작업으로 해야한다.)
* Labeled Data와 Unlabeled Data가 있다.
	* Label이 되어 있는 것은 소수, Unlabeled는 다수
	* Label이 소수이면 Supervised는 정확하지 않는 결과를 출력해낸다.
	* Label과 Unlabel이 같이 있을 때에 어떤 패턴을 찾아서 사용하는 것.



### Reinforcement learning (강화 학습)

* 어떤 Agent(인공지능)이 있고, 이것이 Environment에 어떤 Action을 취하면 환경에 변화가 주어지고 그 변화가 state로 주어진다.
* 현재 state가 있을 떼에, 어떤 action을 취해주면 결과로 다음 state로 가게 된다.
* 결과적으로 Feedback이 Environment에서부터 agent로 주어진다.
	* 바둑이면 이기고 지는 것
* 어떤 action이 가장 좋은 Feedback을 받는가.

#### 기능
* 최종 목적은 가장 좋은 피드백
* Policy: 현재 state가 주어졌을 때에 그 state에 가장 좋은 action이 무엇인가.
* 어떤 state의 value(그 state로부터 주어질 예상 결과)
	* 바둑에서는 현재의 바둑판 상태를 봤을 때에 누가 이길 확률
* 현재 state에서 어떤 action을 주어졌을 때에 주어지는 예상 결과
	* 내가 이 state에서 이 action을 했을 때의 이길 확률은?





Recognition System(인식 시스템)
-------------------------------

* 문제를 풀 때에 딥러닝 만으로 풀리진 않는다.
* 딥러닝/머신러닝으로 무엇을 할 수 있나?
	* Classification을 할 수 있다.
		* 주어진 Data set을 Categorize 시킬 수 있다.
		* 입력이 어떤 category안에 속한다고 예상하고 그것을 맞추는 것
	* Regression을 할 수 있다.
		* 어떤 학생이 이번 학기에 받을 성적을 예측
		* 여러가지 input을 받는다. (입력 정보)
		* 그 입력 정보에 의해서 어떤 결과가 나올 수 있는지를 예상한다.
		* 어떤 회사가 있을 때에 그 회사가 얼마나 Survive할 수 있는 지의 확률
		* 입력에 대해서 Output의 function을 학습하는 것
		* 학습시간을 주고 학점을 예측해라
		* X = 입력 value, Y = 출력 value, 쎄타 = Parameter
			* 입력으로 인해서 출력을 받기위해서 Parameter 쎄타를 계속 바꾼다.
		* Linear regression = 단순한 작업밖에 못한다.
		* Nonlinear regression = 복잡한 곡선도 학습할 수 있다.
		* logistic regression = True/False
			* Discrete한 Output이 있을 때에 사용된다.


### Recognition System
* Sensing = 현실세계에 있는 정보를 인식하여 입력으로 받는 것.
	* camera, mic, etc...
	* 입력을 받으면 작업하기 좋은 데이터로 받지 못한다.
* Preprocessing/Detection/Segmentation = 작업하기 좋은 형태로 입력을 바꾸는 것
* Feature Extraction = Feature를 구분하는 것
* Classification  
* Deep learning은 feature extraction과 classification을 동시에 한다.
* 어떤 Model Parameter와 비교한다.



### Feature Vector

* 왜 Vector인가?
	* 대부분의 머신러닝 툴이 Vector를 사용한다.
	* 입력 패턴에 있는 수많은 정보중에서 도움이 되는 정보와 안되는 정보가 있는데, 도움이 되는 정보만 캐치해서 사용하는 게 더 효율적이다. 이것을 하는 것이 Feature Extraction이다.
	* 불필요한 정보를 제거함으로서 훨씬 더 Efficient하게 사용할 수 있다.


### Pattern Boundary
* 물고기를 잡은 다음에 salmon과 sea bass를 구분한다.
	* width와 lightness를 측정한다.
	* 한마리마다 2차원 좌표가 나타난다.
	* 모두 한 좌표평면상에 찍어 놓는다.
	* 모두 어느 생선인지 알려준다.
	* 분포를 수학적으로 모델링을 하고 그 경계선을 나누는 것.


### 복잡도
* 주어지는 어떤 classification문제가 있는데, 간단한 모델과 복잡한 모델이 있다고 하면, 어느것이 좋은지는 상황에 따라 다르다.
* 복잡한 모델을 학습하기 위해선 Training Data가 많이 필요하다.
* Neural Network가 크다면, 우리가 찾아야 되는 미지수가 많다는 것이다.
	* 그만큼 방정식이 많아야 된다.
	* Training Data하나가 방정식 하나를 준다.
* 방정식은 부족한데(training data가 적다) 맞춰야 되는 미지수가 많으면?
	* Over fitting
* simple model
	* 빨간색은 Sea bass가 salmon영역에 있다.
	* 빨간색은 예외니깐 무시하자
* Complex model
	* 더 복잡한 경계선을 만들고, 정확하게 구분해낼 수 있다.
	* 예외도 무조건 따라가자.
* Simple model이 좋다.
	* 맞추는 것 자체가 바람직하지 않을수도 있는 예외까지도 맞춰서 모델을 복잡하게 만드는 것이 Overfitting이다.'



### Overfitting
* y-axis는 에러
* x-axis는 학습시간.
* 학습시간이 길어질 수록 에러는 줄어든다.
* 빨간색 => Test Data(학습할 때에 처리하지 않응 데이터)에 대한 에러
	* Training Data에 있는 Data에 대해서만 overfitting을 해버리면 응용을 하기 어렵다.
* 파란색 => Training Data에 대한 Error
	* 공부를 하면 할수록 에러가 줄어든다.
* 파란색은 계속 떨어지지만 빨간색은 도중에 올라가기 시작한다.
	* 올라가기 시작하는 지점이 Overfitting이 시작된다.
	* Training data가 많으면 복잡한 모델을 사용해도 되지만, 적으면 복잡한 모델을 사용하면 overfitting이 될 가능성이 매우 높다.
	* 따라서 Training Data가 적으면 Simple한 모델을 사용하는 게 낫다.
	* 올라가는 지점에서 멈추고 그 모델을 사용하는 것도 좋다.
	* 아니면 overfitting을 극복할 수 있는 방법을 찾아내서 보완 방법을 사용하는 것도 한가지의 방법이다.
* Overfitting은 거의 대부분의 모델에 존재한다.
	* 일종의 감기같은 것

#### Training Data와 형식이 다른 test data가 들어오면 어떻게 하나?
* Training Data에 있는 형식의 정보를 사용해서 모델을 만드는 것이기 때문에 잘못된 출력을 내보낼 가능성이 많다.
* Training Data, Evaluation Data, Test Data
	* TraDa = 공부 문제
	* EvaDA = 모의고사 문제
	* TestDA = 수능 문제
* Test와 evaluation을 비교해서 먼저 valid한 데이터인지 확인한다.
* 특정 영역의 데이터를 모아서 뽑아내기 보단 랜덤한 데이터를 사용한다.

### 모델의 초기모델은 어떻게 지정하는가?
* 가우션 예측으로 Random number generator로 만든다.


Bayes'  Decision Theory
------------------------
* 어떤 정보를 가지고 입력 패턴을 맞추려고 한다.
	* 어떤 사람의 키가 있는데 그 사람의 성별을 맞추려고 한다.
* 분류하려는 class는 남자, 여자 = 오메가
* X = 사람의 키
* 사람의 키를 못받으면 50%/50%의 확률로 성별을 맞춘다.
* 175이면 남자일 확률이 늘어난다.
* P(남자 | 175) > 0.5 = 175가 남자일 확률
* P(여자 | 175) < 0.5 = 175가 여자일 확률
* 오인식이 너무 많다.
* 그렇다면 남자의 키의 분포를 찾고, 여자의 키의 분포를 찾는다.
* 175인데 남자일 확률을 구하긴 어렵지만, 남자인데 175일 확률은 구하기 쉽다.
* 남자일 때 175일 확률을 거꾸로 사용해서 175가 남자일 확률을 찾는 것이다.

* P(175가 남자일 확률) <= Posterior probability
* P( 남자이면서 175일 확률)/P (175가 나올 확률) =
* likelihood => P(남자가 175일 확률)P(남자일 확률) <= prior probability(X를 관찰하기 전의 확률, 선행확률) / P(175가 나올 확률)

* 내가 X를 관찰했을 때에 오메가일 확률이 가장 높은 것을 선택하자.
	* = 위에서 찾은 식
	* P(X)는 남자나 여자나 상관이 없다. 따라서 필요가 없다.
	* argmax(omega)P(X|Omega)P(omega)

### Prior Probability P(omega)
* 실제로 측정해보는 방법
* 
* 적당히 가정을 해서 추정하는 방법

### Discriminative models estimate P(omega|X) directly


### Gaussian Classifier
* 가장 익숙한 Gaussian Distribution
* P(omega)가 모든 omega에 대하여 같다고 가정하면 P(X|omega)P(omega)에서 P(omega)를 빼도 아무 지장이 없다.
* 평균과 표준편차를 추정함으로서 likelihood를 추정한다.



