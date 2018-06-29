CNN
====

Introduction to CNN
--------------------
* 영상의 최강의 Deep Learning Architecture
* 음성인식등에도 많이 사용된다.
* 처음에 나왔을 때에는 적절한 학습방법이 없어서 사용하기 어려웠다.
* LeNet이 나오고나서부터 사용하기 좋아짐


### CNN의 구성
* Layer들이 서로 다른 것들이 조합되서 만들어진다.
* 4차원 구조를 받는다.
	* 가로와 세로가 있는 feature map이 여러장이 있어서 하나의 layer를 갖춘다. -> 3차원
	* 여기에 batch dimension이 더해져서 4차원이 된다
* Batch란?
	* GPU는 병렬성이 클수록 효과가 크다.
	* 엄청나게 많은 일을 동시에 처리하면 더 좋다.
	* 샘플 하나 넣고 하나 학습하는게 아니라 수십~수백개를 한번에 넣어서 한번에 계산을 하게 한다.
	* 일종의 sample dimension
* 가끔은 시간층을 더해서 5차원으로도 사용한다.
* 다양한 layer들이 결합되어서 만들어진다.
* Convolution layer, pooling layer, fully-connected layer를 많이 쓰인다.

#### Convolution Layer
* 뒤쪽에 있는게 입력의 feature map
* 앞쪽에 있는게 출력
* mask는 그 feature에 곱하는 weight
* 출력은 그 분야의 weighted sum
* mask가 동일한 mask를 동일한 feature에다가 다 쓴다.
* position-invarian local feature을 extract한다.
* Convolution Operation
	* Weighed sum of local region and filters
	* 어떤 값을 weight로 주느냐에 따라서 출력이 달라진다.
	* filter의 값에 따라서 달라진다.
	* 내가 원하는 filter를 지정하고 그것으로 출력을 내는 방식
	* filter으로 weighed sum을 찾아내는 것과 Neural Network에서 weighed sum을 찾아내는 것이 비슷하다
	* filter는 입력과 출력의 connection rate
		* 학습할 수 있다는 뜻
* Filter를 학습시킬 수 있다.
* position independent 한 local feature를 추출한다.
* convolution mask로 커버가 되는 area만큼 커버할 수 있다.
* Multi-Channel Convolution
	* 다양한 filter들이 추출해낸 다양한 feature를 combine해서 학습할 수 있다.


#### Max-Pooling Layer
* 입력과 추출 feature map이 1:1 관계를 갖는다.
* 입력 feature map이 주어졌을 때에 2x2로 나누고 각 영역에서 가장 큰 값만 다음으로 넘겨서 4x4를 2x2를 만든다.
	* feature map의 dimension을 줄인다. (4x4 - 16 dimension => 2x2 - 4 dimension)
* feature map의 각 숫자는 그 부분의 
	* position에 약간의 변화가 주어진다고 해도 작업하는 데에 출력에 변화는 없다.
	* 변이가 있는 것들에 잘 적응할 수 있다.
* 단점:
	* Position variation을 흡수한다 -> Position 정보를 없애버린다.
	* Position 정보가 필요하면 convolution을 쓴다.



#### Fully-connected Layer
* Convolution하고 Max-pooling을 교차적으로 사용한다
* 특징을 추출하고, 그 특징의 dimension을 낮추고, 이걸 반복한다.
* 뒤로 가면 갈수록 좋은 High-level feature가 나온다.
	* Classification, regression에 유용하게 쓰인다.
* Multi-layer perceptron하고 완전히 같다.
* 단점:
	* Parameter가 굉장히 많다.
		* 입력 곱하기 출력 dimension
		* Overfitting이 많이 생긴다.
	* Convolution은 여러 좌표에 동일한 mask가 사용된다.
		* Parameter가 적다



### CNN in PyTorch
* LeNet과 비슷하지만, LeNet은 흑백의 1채널을 받고 이것은 RGB의 3채널을 받는다.
* CNN 속에 저런 layer의 오브젝트가 만들어진다.
* F.relu() = ReLU Activation function
* 첫번째 convolution을 통과 시키고, Max-pool을 한번 한다.
* 위의 결과를 가지고 convolution을 통과 시키고, 같은 Max-pool을 한번 한다.
* Activation function은 순서를 바꾸지 않기 때문에, Activation function을 사용하고 나서의 Max값이나, 사용 안 한것의 Max값은 같다.
* 여기에는 Forward Propagation만 있다. 그럼 back-propagation은?
	* PyTorch나 TensorFlow같은 operator는 Forward propagation만 정의를 해놓으면 자기가 혼자서 반대 방향으로 계산을 해서 학습을 시킨다.
	* Layer들을 미분하는 루틴이 다 이미 정의되어있기 때문이다.
	* 따라서 따로 Back propagation을 위해서 고민할 필요가 없다.
* 입력 feature map과 출력 feature map의 개수는 각 layer에서 필요한 정보를 얻기 위해 가장 좋은 개수로 지정한다.
	* 이론적으로 알아내기 어렵기 때문에 프로그래머의 감각적인 것을 따른다.
	* 가장 좋은 방법은 비슷한 연구를 한 논문에서 쓴 숫자를 따라서 하고 그것을 늘리고 줄여서 자신이 원하는 출력이 나오도록 한다.
* 학습을 어떻게 하느냐?
	* 학습을 하기 위해선 학습의 목표가 되는 Loss function을 지정하는 것으로 시작된다.
	* Loss function은 여러 종류가 있다.
	* 이번의 경우 criterion이라는 변수 안에 Cross Entropy Loss로 지정한다.
		* Softmax를 통과 시켜서 확률의 성질을 갖게 한 다음 작업한다.
	* delta W는 현재에서 어느 방향으로 옮기는 지에 대한 벡터
	* 이전의 벡터를 어느정도 인정해주고 다음 벡터를 어느정도 그 벡터의 방향도 영향을 준다 -> Momentum(m delta W t-1)
		* m은 1보다 작은 값을 써야한다.
		* 대체적으로 0.9를 사용한다.
	* Optimizer는 Stochastic gradient descent를 사용한다.
		* lr = learning rate
		* m = momentum
	* lr을 얼마나 줘야되나 고민하면, 먼저 0.001로 주고 너무 느리다 싶으면 조금 늘려보고, 좋은 값이 안 나온다 싶으면 줄여본다.
		* 1이나 0.1은 절대로 쓰지 말아라.
	* epoch
		* input = 영상, label = 정답
		* outputs = net(inputs) -> forward propagation을 실행.
		* loss = criterion(outputs, labels) -> loss를 corss entropy로 찾아낸다.
			* 처음에는 loss값이 매우 크지만, 그것이 돌리면 돌릴수록 줄어든다.
		* loss.backward() -> backward propagation이 실행된다.
		* optimizer.step() -> weight을 update한다.
		* 밑에 부분은 loss가 어느정도인지 찍어주는 것
		* PyTorch사이트에 가보면 좋은 튜토리얼이 있다.



### CNN Learning
* back propagation algorithm과 많이 안 다르다.
* desired output과 input X0가 주어지고, minimal w를 찾는 것이 목적
* back propagation algorithm은 전 layer와 다음 layer가 다른 종류더라도 현재 layer는 같기 때문에 사용할 수 있다.




### CNN이 왜 잘하는가?
* Layer를 많이 쌓아 올렸을 때에 영상의 특징을 가장 잘 추출해내기 때문이다.
* 2차원 성분의 특징을 뽑아 내는 거를 잘한다.
* 비슷한 것들도 잘 구분해낸다.
* 일반 Neural network는 학습이 잘 안된다는 단점이 있는데, Convolution은 layer가 많이 쌓여도 학습이 잘 된다.
	* input을 작은 영역으로 제한하기 때문에 신호가 섞이는 것도 적기 때문에 Neutral해질 가능성도 줄어든다.
	* Filter가 동일한 feature mapd의 여러 좌표에서 공유되기 때문에.
	* Convolution Layer는 overfitting이 잘 안 생긴다.




Recent Advances of CNN
-----------------------
* 현재 제일 좋다고 알려진 네트워크는 Dense Convolutional networks와 NAS(Network Architecture Search) net (ProgressiveNAS, EfficientNAS).
* Learning Algorithm에서는 Batch Normalization을 꼭 알아야 한다.
* Detection & Classification에서는 YOLO의 Darknet과 SSD이다.



### MLPconv Layer
* "Network in Network"
	* Convolution은 linear한 연산이다.
	* Linear한 feature만 뽑을 수 있다.
	* Convolution으로 뽑은 linear한 feature에다가 뒤에다가 MLP를 두개를 붙인다.
	* CCCP Cascaded Cross Channel Pooling
		* Convolution 뒤에다가 1x1 convolution을 두개 더 추가하면 MLPconv와 같다.


### Global Average Pooling
* feature map에 있는 전체 값들의 평균값을 낸
* overfitting이 줄어든다 <- Parameter가 적기 때문에
* 중요한 특징의 위치가 바뀌어도 평균값을 내서 하는 것이기 때문에 상관 없다.



### VGG Net
* 내가 뽑아야 되는 특징보다 너무 크거나 너무 작으면 안 된다.
* 하지만 feature map은 다양할 수 있다.
	* 5x5 하나가 커버하는 field를 3x3 두개를 사용하는게 더 좋다
	* 7x7 하나보다 3x3 세개를 사용하는게 더 좋다


### GoogLeNet
* 입력에서 출력으로 갈 때에 세가지의 convolution을 동시에 쓴다.


### Residual Learning
* 중요하다!
* 전에는 layer가 최대 39개 밖에 못썼다.
	* 그 이상은 Training data에 대해서도 학습이 어려워지기 때문에 성능이 떨어진다 -> Not overfitting
* 극복한 방식이 이것이다.
* 학습하려는 function H(x)가 있고, 이것은 F(x) + x 로 나눴다.
	* x는 H(x)로 들어가는 입력값
	* F(x)가 뭔지 모르겠다 -> 0에 가까운 값을 대충 준다.
		* 그러면 H(x)와 x가 비슷해진다.
* 100개 이상의 layer를 사용할 수 있다.
* 왜 좋은 성능을 내는가?
	* Shallow한 Network들을 병렬적으로 연결하는 것과 같기 때문이다.
	* 학습할 수 있는 path가 다양해진다.
	* Layer의 학습은 대체적으로 짧은 path에서 한다.
* 1000개를 넘어서면 이상한 일이 발생한다.
	* Activation Scaling을 0.1~0.3으로 곱해서 하면 해결된다.


### Dense Net
* 모든 Layer들이 연결되어있다.
* 장점:
	1. Gradient path를 다양하게 만들 수 있다.
	2. Low level feature가 high level feature까지 한번에 연결될 수 있다.
		* 이미 한번 추출된 중복된 feature는 단번에 추출한다.



### Batch Normalization
* 위쪽에 있는 layer가 학습을 할 때에 밑에서 오는 데이터가 어떤 조건에 맞는 것이 올라온다고 가정하고 작업을 한다.
* 하지만 밑에서 올라오는 layer의 정보가 바뀌기 때문에 입력 패턴이 바뀐다.
* 위를 해결하기 위한 것이 이것이다.
* Normalize는 layer별로 한다.
* 하지만 실제로는 그것을 바꿔주는 것이 아니라 optimization landscape를 smoothe하게 만들어 주는 것이다.
* Loss의 편차를 줄여줘서 Gradient Descent를 도와준다



### Mobile Net
* 먼저 feature map dimension으로 계산을 하지 않고, 그 단계에서 convolution을 수평적으로 한 후에 Feature map dimension으로 convolution을 다시 한다.
* 성능은 조금 떨어지지만, 그것보다 계산량과 메모리가 훨씬 줄어든다.



Detection/Segmentation Models
------------------------------
* 전체 영상으로부터 object의 부분을 찾아서 그것을 인식하는 것.


### R-CNN
* 초기에는 모든 후보 영역들에 다 CNN을 집어넣어서 특징추출을 해서 classify regions로 이게 뭐인지를 판별한다. 그래서 판별이 되면 의미가 있는 영역이고, 안되면 의미가 없는 영역이다.
	* 시간이 엄청나게 걸린다.
	* detection이 매우 느리다.


### Fast R-CNN
* CNN feature를 공유한다.
* 전체 영상을 CNN에다가 다 집어 넣는다. 그러고 나서 거기에서 의미있는 영역별로 쪼갠다.


### Faster R-CNN
* RPN (Region proposal network)


### Mask R-CNN
* Faster R-CNN에다가 오브젝트영역이 무슨무슨 픽셀인지를 찾아내는 것이 같이 들어간 것.
* 사람의 중요한 부분을 찾아내서 포즈를 찾아낸다.


### YOLO
* C = 내가 찾으려고 하는 오브젝트의 수


### SSD
* Feature map올 쪼개고 오브젝트를 인식하는 layer가 각각 다르다.





