Neural Network
=======================

Single-layer Perceptron
------------------------
* 사람의 머리에 있는 뉴런과 같이 만든 수학적인 모델
* 삼각형 하나가 뉴련.
* 입력이 x1, x2... xn, 벡터 형식이다
* 각 입력의 가중치를 찾아내서 weighted sum (w1, w2.... wn)을 곱해서 combine한다.
* function (activation function)으로 수학적으로 그 입력을 가지고 계산을 한다.
* 쎄타는 bias라고 주로 부르는데
* 입력 Layer, hidden layers, 출력 layer.
* Neural Network가 Mapping을 학습한다.
	* 어떤 벡터가 주어졌을 때에 다른 벡터로 가는 과정이 mapping.
	* input vector -> mapping(hidden layers) -> output vector
	* vector가 아니라 sequence를 사용할 수도 있다.
	* vector는 dimension이 지정되어 있는 정보
	* sequence는 길이가 지정되어 있지 않는 정보.
* 사람 얼굴 하나를 200x200을 받는다
	* 40000 dimension vector
	* RGB로 받으면 120000 dimension vector
	* 이것의 distribution을 학습하면 사람의 얼굴을 학습하는 것이다.
* distribution(확률 분포)을 학습을 시키면, Sampling으로 비슷한 얼굴을 만들어 낼 수 있다.
* Restoration / Transform
	* Noisy한 사진을 주고 깨끗한 사진을 만들라고 하면?
	* 이미 내가 배운 사진들이 있으면 주어진 정보가 부족해도 이미 가지고 있는 정보들을 활용해서 예측하고 그려낼 수 있다.
* 컬러영상 -> 흑백영상 = 쉽다
* 흑백영상 -> 컬러영상 = 어렵다.
	* 지금까지 가지고 있었던 정보들을 활용해서 색을 예측하고 만들어 낼 수 있다.
	* 어떤 패턴을 보고 그 distribution을 학습한 상태이면 할 수 있다

### Perceptron Neuron
* 입력이 벡터로 들어오고, 가중치와 각각 곱한다.
* bias를 입력의 일부로 표현을 해서 w를 1로 주고 같이 더한다.
* 어떤 쎄타가 있어서 0보다 크면 1로, 작으면 -1로 보낸다.
* 왜 필요하나
	* Weighted sum이라는 것은 근본적으로 linear하다
	* Hard Limit은 linear gkwl dksgek.
	* Sigmoid라는 function은 0을 기준으로 0일 때에 0.5이고, 마이너스로 가면 0으로 수렴하고, 플러스로 가면 1로 수렴한다
		* 부드러운 곡선이기 때문에 미분이 가능하다.
		* 딥러닝이 나오고나선 많이 안 사용한다.
	* ReLU
		* 입력값이 양수이면 입력값 그대로 출력하고, 음수이면 0을 출력한다.
		* 현재는 이게 많이 쓰인다.
* Example
	* 입력이 두개이고 출력이 하나인 perceptron
	* 입력이 2차원 벡터, 출력이 하나. bias도 없다.
	* 두가지 class를 구문하는 classifier를 만들고 싶다.
	* o(X)가 양수이면 class1, 음수이면 class2로 보낸다.
	* 문제를 정의하고, w를 잘 조정해서 내가 원하는 결과가 나오도록 학습시킨다.
	* 두가지 sample -> X1 = (2, 1), X2 = (1, 2)
		* X1 = class1(label), X2 = class2(label)
		* o(X1) > 0, o(X2) < 0
	* 위와 같이 학습이 되었다 치자. 그러면 o(X)가 0이면 어떻게 하나?
		* boundary이다. 
		* o(X) = 0이 되는 선이 우리가 찾는 decision boundary이다.
	* function이 음수는 음수, 양수는 양수로 보내는 함수라고 생각하자.
		* o(X)는 직선의 방정식이 주어진다.
		* bias가 없기 때문에 원점을 지나는 직선이 된다.
		* w1하고 w2를 잘 지정해서 x1하고 x2의 사이를 잘 지나가는 원점을 지나가는 직선을 찾으면 된다.
		* 그 직선을 기준으로 한 쪽이 class1, 다른 곳이 class2라고 하면 된다.

* Limitation of Perceptron
	* XOR 문제
	* 1,1 | 0,0 = 0 / 1,0 | 0,1 = 1
	* 직선 하나가지고 class를 구분할 수 없다.
	* Perceptron으로 풀 수 없다?
		* 풀 수 있다.
		* perceptron 위에 또 다른 perceptron을 올리는 것 -> multi-layer perceptron


### Perceptron Training
* 목적은 weight을 찾아내는 것.
* single layer perceptron 학습방법중 Gradient Descent를 많이 사용한다.


### Gradient Descent
* o = neural network가 준 output
* d = 원하는 output
* 내가 원하는 값과 실제 output의 차이 o - d
* o-d가 마이너스가 될 수 있기 때문에 제곱을 한다.
* 수학적인 이유로 1/2를 붙인다.
* E = 에러
* w를 조정을 해서 E를 최소화 시킨다.

### Neural Network Classifier
* 7의 이미지를 받으면 숫자 7을 반환
* 에러가 있다.
* node가 하나이면 그것만 쓰면 되고, node가 여러개이면 그 node들의 평균을 주면 된다.
* E를 최소화 하는 w는 gradient로 찾는다.
* d는 상수, o는 입력과 w의 함수 -> 입력도 상수
* 한마디로 E는 w에 대응하는 함수
* w가 여러개가 있는데, 그것을 하나로 쭉 나열해 놓은 것이 weight vector이다.
* 원래 w vector가 4차원이면 gradient w vector도 4차원이다.
* gradient는 E를 가장 빠르게 증가시키는 결과.
* gradient를 더하면 E가 증가한다. 따라서 에러를 가장 빠르게 줄이기 위해선 gradient를 빼면 된다.
* gradient descent란 현재 위치에서 gradient를 계산하고 그 gradient만큼 줄이면 에러가 줄어든다.
* 그러면 gradient를 어떻게 계산하는가?
	* 현재 어떤값이 있으면 그 주변의 gradient를 구하고 그만큼 마이너스하고, 또 거기에서 gradient를 구하고 또 마이너스하고 계속 해서 minimum에 가까운 값으로 내려가서 gradient가 0에 가까운 값이 나올 때 까지 내려간다. 그러면 학습이 끝난다.
* Gradient를 어떻게 계산하냐? - chain rule!
	* 에러를 output으로 미분하고, output을 w로 미분한다.


### Gradient Descent
* net value = function을 지나지 않은 argument. (wixi)
* w-> net -> o -> E
	1. sigma(wixi) => net
	2. f(net) => o
	3. E(o) => 에러
* 따라서 E를 o로 미분을 하고, o를 net으로 미분을 한 값을 곱하고, net을 w로 미분을 한 값을 곱하면 E를 w를 미분한 값이다.
	* (o-d)o(1-o) = gradient값
	* eta: learning rate
		* gradient의 방향으로 얼만큼 갈거인지에 대한 상수


### Learning Rate
* eta를 작게 잡아서 천천히 가면 minimum으로 가는데까지 느리게 간다. 그리고 만약에 더 큰 minimum이 있는데 +되는게 있어서 못나가면 local minimum 에 빠진다.
* eta를 크게 잡으면 local minimum에서 빠져나올 수 있다. 하지만 너무 많이 가면 왔다갔다 하느라 천천히 가게 되거나, 너무 커서 튕기면서 minimum에서 멀어질 수도 있다.
* 경험에 의해서 결정해야 한다.
	* 대부분은 learning rate을 먼저 크게 잡고 점점 줄여보는 것이다.



### Training Algorithm
* learning rate를 크게 잡고
* 허용할 수 있는 E값을 정하고 (E max)
* W를 랜덤한 숫자로 초기화 시킨다.
* 계산을 해서 E가 E max보다 작아질 때 까지 gradient로 learning rate만큼 줄인다.
* ReLU 함수를 사용하면 음수를 받으면 계속 0을 받아서 학습이 안되기 때문에 학습에서 제외된다.
	* 해결하는 방법은 훨씬 더 많은 숫자의 node를 받아서 충분한 node를 받을 수 있도록 한다.


Multi-layer Perceptron
----------------------
* 직선 하나로 구분이 잘 안될때에 사용한다.
* 1번공과 3번공은 class2이고 2번공은 class1이라면 직선 하나로 표현되지 않는다.
* 라인 하나를 표현할 때에는 perceptron하나를 사용하면 된다.
* 두개의 선을 그어서 H1, H2로 한다.
* H1 = y1, H2 = y2일 때에 class1 = y1<0 && y2>0, class2 = (y1>0 && y2>0) | (y1<0 && y2<0)
* 위의 사항을 y1대 y2평면으로 나타낸다
	* 그러면 y평면상에서는 직선으로 나타낼 수 있다.
	* 원래는 직선으로 표현이 안됬지만, Neural Network를 한 계층 더하는 것으로 직선으로 표현이 된다.
* One Perceptron -> 직선만 그을 수 있다.
* Two layer perceptron -> 도현을 그릴 수 있다.
* Three layer perceptron -> 복잡한 틀을 표현할 수 있다.



### 2-layer perceptron (MLP)
* input layer에 weighted sum을 더해서 hidden layer를 계산하고, hidden layer로부터 weighted sum을 더해서 output layer를 계산해낸다.
* 요즘에는 몇십개~몇백개의 layer를 사용한다.
* 만약에 layer가 많아도 nonlinear function이 없으면 하나의 layer가 있는거나 마찬가지이다


Back-propagation
-----------------
* Multi-layer perceptron의 학습 방식
* MLP Learning
* 입력 데이터를 X0라고 하고, 다음 hidden layer를 X1, X2... 최종 output layer를 XN이라고 한다.
* dc = one hot vector -> 정답하나만 1이고 나머지는 다 0인 벡터
* Cross Entropy의 식이 많이 사용된다.
	* softmax activation을 하면 확률이 나온다.
	* 모든 값들은 0과 1사이의 수이고, 모든 값을 더하면 1이다.
	* 따라서 확률과 성질이 같다.
	* dc가 곱해졌기 때문에 정답인 node하나만 보고 다른 값들은 관심이 없다. 다 0이 된다.
* 왜 'back' propagation인가?
	* 원래는 입력에서 낮은 layer에서 높은 layer로 가면서 최종 결과값으로 변환된다.  Forward Propagation
	* Gradient는 output에 대해서 정의된 Error로 계산을 시작한다.
	* layer를 반대로 가면서 조금씩 조금씩 gradient로 움직이면서 에러를 줄인다.


### Matrix Notation
* Propagation으로 계산하는 방법이 있찌만, 복잡하기 때문에 vector로 계산하는 방법이 있다.
* Multi path chain rule
	* x에서 z로 가는 path가 여러개 있으면, 각 path에 대한 chain rule로 미분한 값을 다 더하면 된다.
* Gradient & Jacobian
	* 스칼라를 벡터로 미분하면 벡터가 나오지만, 벡터를 벡터로 미분하면 행렬이 나온다.
* 일반적인 back-propagation식
	* 입력이 들어오고, connection weight(벡터)이 있다.
	* Layer로 계산을 해서 출력을 만든다.
	* 출력과 desired 출력의 Loss를 계산한다.
	* Loss를 출력으로 미분하고, 그걸 사용해서 Loss를 weight으로 미분하고 (학습할 때에 사용되는 gradient값), 그리고 Loss를 출력으로 미분한 것과 출력을 입력으로 미분한 것으로 Loss를 입력으로 미분을 한다.
	* XN = output vector, XN-1 = input vector
	* 이 gradient들을 모았다가 주기적으로 가장 좋은 gradient값을 update한다.

### Back-Propagation on MLP
* Mean square error (MSE)를 사용한다고 치자.
* 다음 W를 구하기 위해서 현재 W에다가 delta W를 더한다.
* 다음 V를 구하기 위해서 현재 V에다가 delta V를 더한다.

#### Training of 2nd layer
* 2nd layer에서는 y가 입력, w가 가중치, o가 출력.
* Gradient for weight update : Error를 W로 미분한다.
	* E를 output으로 미분하고, output을 net value로 미분하고 곱하고, net value를 w로 미분하고 곱한다.
	* output을 net value로 미분하면 diagnal matrix가 나온다.
* Gradient for back-propagation : Error를 Y로 미분한다.
	* E를 output으로 미분하고, output을 net value로 미분하고 곱하고, net value를 y로 미분하고 곱한다.
	* 앞의 두 단계는 전과 완전히 같다.
	* 다른점은 net value를 y로 미분한다는 점이다. (출력을 입력으로 미분한다.)

#### Training of 1st layer
* 1st layer에서는 x가 입력, v가 가중치, y가 출력(hidden layer)
* Gradient for weight update : Error를 V로 미분한다.
	* E를 Y로 미분하고, Y를 net value로 미분하고 곱하고, net value를 v로 미분하고 곱한다.
	* E를 Y로 미분한 값은 2nd layer에서 Gradient for back-propagation에서 받은 값을 사용한다.
	* net을 weight으로 미분하면 입력이 나오고, net을 입력으로 미분하면 weight이 나온다.
	* 첫번째 layer로 왔기 때문에, 따로 back-propagation을 위한 계산은 필요 없다.




