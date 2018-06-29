Deep Learning Overview
=======================

Introduction to Deep Learning
-----------------------------
* Neural Network의 확장
* Layer를 매우 많이 쓴다.
* Layer를 거치면 거칠수록 더 high level한 information이 나온다. -> 더욱더 구분이 잘 된다.
* Why Deep learning?
	* 딥러닝은 high-level feature를 준다.
	* Capacity가 크다. -> 더 크고, 복잡한 정보도 얻을 수 있다.
* 딥러닝의 이론적으로 어려운 점
	* Back-propagation을 그냥 적용하면 잘 안 된다.
	* Local Minimum, saddle point의 단점
	* overfitting
	* unknown reasons
	* Depth가 커지면 커질수록 학습하기도 더 어려워진다.


### Vanishing Gradient Problem
* 사람들의 의견을 많이 모아서 더하면 더할 수록 Neutral 해지듯이, Gradient를 섞으면 섞을 수록 Neutral 해진다.
* Gradient에 1보다 작은 값을 계속 곱하면 0에 무한히 가까워지기 때문에 값이 계속 줄어든다.
* ReLU를 사용했을 때의 장점 : Gradient가 정상적이면 계속 1이 나온다. -> 위의 문제가 없어진다.



### Local Minima, Saddle Point
* Local Minima나 Saddle Point에서도 gradient가 0이 나온다. -> 더 밑이 있는데 밑으로 못간다.


### Deep Learning Approaches
* 위의 단점들을 극복하는 방법:
	* pre-training - 요즘에는 많이 안 쓴다.
	* CNN(Convolutional Neural Network)같은 위와 같은 단점을 잘 안 일어나는 구조를 사용한다.
	* RNN중에서도 LSTM, GRU를사용


### Main Deep Learning Architectures
* Deep Neural Networks(DNN)
* CNN
	* 영상에서 가장 강력한 힘을 보이는 구조
* Recurrent Neural Networks(RNN)
	* Time Series Data를 사용한다
		* 음성신호, 주가 등등
	* Recurrent connection이 있다.
		* 어떤 노드에서 자기 자신으로 돌아가는 connection이 있다.
		* 일종의 메모리 역할을 한다. (Self loop)
	* LSTM(Long shot-term memory)
		* 성능은 이게 더 좋다
	* GRU(Gated recurrent unit)
		* 가성비는 이게 더 좋다
* Hybrid models / combined models
	* CNN + RNN이나 다른것과 병합해서 만든 것도 있다.
* Deep Generative Models
	* GAN, VAE, ...
	* Generative Adversarial Networks(GAN)
		* 현재 대세
		* GAN이 출력해주는 이미지가 가장 뭘리티가 좋다.
		* 진짜 영상과 가짜 영상을 구분하는 Discriminator가 있다.
		* Generator가 만든 가짜 영상과 실제 영상을 Discriminator에서 서로의 차이를 찾는다.
		* Generator는 Discriminator가 찾은 차이점을 없애려고 노력한다.
	* Variatinal auto-encoders(VAE)
* Detection, segmentation models
	* 전체영상을 보여주면 오브젝트 단위로 잘라내서 잘라낸 것들을 분석하는 것
* Attention models
	* 특징들 중에서 어느 특정 지점만 집중하는 것
* Explicit memory models
	* 순간순간에 나온 데이터를 다 저장해 놓고 그것을 필요할 때 사용하는 것
	* Neural Turing Machine(NTM) 




Practical Issues
-----------------
* Training data가 부족하면?
	* 항상 부족하다.
* 계산량이 매우 많다.
	* GPU 사용
* 딥러닝이 복잡하다.
	* 오픈소스 프레임워크를 쓴다. (TensorFlow 등등)


### Regularization
* Overfitting을 해결하기 위해서 모델을 단순화 시키는것
	* 인위적으로 불필요한 제한을 가한다.
	* 그 제한을 극복하기 위해서 더 효율적인 학습을 한다.
	* weight shrinking -> 로스를 줄이기 위해서 w를 더하는데 w의 길이에 제한을 주는 것이다.
* ReLU Activation Function
	* Rectified Linear Unit
	* sigmoid나 다른 방법보다 빠르다.
		* if문 하나면 된다.
	* network activation을 sparse하게 한다.
		* input으로부터 어떤 특징을 추출했을 때에 강하게 주장하는 특징들과 약한 특징들이 있다. 그러면 약한 것들을 0으로 만들어 버리고 강한 것만 찾아서 sparse coding을 하면 된다.
	* 일부 노드는 죽어있고 일부 노드는 살아있다.
	* 살아있는 노드만 사용해서 overfitting도 방지하고 정보가 잘 구분되도록 진행할 수 있다.
	* 이론적으로는 같은 capacity를 위해서는 Training Sample이 더 많아야 한다.
* GPU 사용
* 디버깅이 어려운 것을 오픈소스를 사용하면 된다.
	* Caffe, Caffe2
	* TensorFlow
	* PyTorch
	* Theano
	* WICWIU - Handong
