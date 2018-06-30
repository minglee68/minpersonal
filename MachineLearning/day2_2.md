Deep Generative Models
======================

Introduction
-------------
* Artificial Neural Network에서 크게 하는 것은 vector/sequences 간의 mapping과 확륜 분포를 학습하는 것.
* Discriminative Model(Pattern의 content를 알아야되는 모델)
	* 샘플이 주어졌을 때에 이 샘플이 뭐인지를 알아내는 것
	* class와 class간의 boundary를 직접적으로 찾아낸다
	* 입력 x가 주어졌을 때에 class y일 가능성?
	* 여러가지를 배우는게 아니라 패턴과 패턴의 차이점만 봄
	* class들을 알고 있어야 되는 경우가 많다.
	* 구분을 잘한다.
* Generative Model
	* 이 샘플이 어떻게 만들어졌는가를 생성 과정을 알아내는 것
	* class들의 분포를 찾아낸다.
	* class들의 확률이 같아지는 지점에 boundary가 만들어진다.
	* 각 class가 있을 때에 class별 확륜 분포
	* 어떤 입력이 나올 가능성
	* 저 패턴이 어떻게 생성이 됬는지를 알아보는 것 -> 더 많은 걸 배우려고 함.
	* Supervised/Unsupervised Learning 둘 다 가능하다.
	* 안정적이다.
		* outlier에 대해서 더 정확한 classify를 한다.
* Explicit model
	* 어떤 확률로 이 class다 라고 딱 알려준다
* Implicit model
	* 입력이 주어졌을 때에 확류을 딱 주진 못하지만 샘플링은 한다.
	* 샘플을 만들어준다.
	* GAN은 여기에 들어간다.


Generative Adversarial Networks (GAN)
-------------------------------------
* Generator와 Discriminator를 서로 싸우게 하는 것으로 궁극적으로 Generator를 학습시키는 모델
	* Discriminator에서 주어지는 차이를 Generator가 줄여나가는 형식이다.
* Generator
	* Random noise vector를 준다.
	* Generator에서 받은 것을 Sample로 만든다.
* Discriminator
	* Generator로부터 받은 sample과 실제 sample을 받아서 비교한다.
	* 진짜인지 가짜인지 판단한다.
	* Loss를 찾아서 Generator에 알려준다.


### Training GAN
* 먼저 Discriminator가 잘 구분할 수 있게 discriminator를 학습시킨다.
	* Discriminator의 Gradient를 통해서 Generator가 학습한다.
	* Discriminator가 높은 점수를 주는 방향으로 Generator의 sample을 옮긴다.
	* 학습이 잘 되면 잘 될수록 discriminator의 점수 차이가 좁아진다.
	* 완전히 학습이 되면 real sample과 generated sample이 같아져서 discriminator는 50%의 확률을 반환한다.
* 일반적으로 discriminator가 5번 학습할 때에 generator가 한번 학습하게 한다.
* discriminator는 gradient를 더해서 maximize하는 쪽으로, generator는 gradient를 빼서 minimize하는 쪽으로 간다.


### Divergence between Distribution
* 분포와 분포의 거리
	* Real Sample의 Distribution하고, Generator Sample의 Distribution의 거리
* KL-Divergence - Not symmetric
	* KL(Pr|Pg)와 KL(Pg|Pr)이 다르다
* Jenson-Shannon divergence
	* JSD(Pr|Pg) = KL(Pr|Pa)/2 + KL(Pg|Pa)/2
	* 학습하면 할 수록 Pg가 Pr에 가까워져야 한다.


### GAN의 장점
* FFN 학습이 매우 쉽게 된다.
* ReLU를 사용할 수 있다.
* D함수나 G함수에 대해서, 아주 다양한 함수를 사용할 수 있다.
* 평균값을 사용하는 것이 아니라 진짜와 가짜의 boundary를 가까이 만들기 위해서 더욱더 sharp하게 만들기 때문에 결과도 sharp하게 만든다.


### GAN의 단점
* 학습이 불안정하다.
	* Mode Collapse
	* Generator와 Discriminator가 수렴하지 않는다.
	* Generator나 Discriminator가 완전히 이겨버리는 경우가 생긴다.(대체적으로 Discriminator가 무조건 이긴다.)
		* 본래 샘플과 만든 샘플이 전혀 겹치지 않으면 discriminator는 왼쪽을 1, 오른쪽을 0, 그리고 수직으로 내려오게 해버린다.
		* 그러면 gradient가 생기지 않게 되고, generator가 학습할 수 없다.


### Deep Convolutional GAN (DCGAN)
* 처음 GAN은 FNN으로 만들어졌었는데, CNN으로 못 만들으려나 싶어서 시도를 해봤으나, GAN과 CNN이 안 맞아서 잘 안 됬었다.
* Facebook에서 처음으로 DCGAN을 만들었다
* GAN의 학습이 불안정한 것을 해결하기 위해서 만들었다.
* Max-pooling layer는 위치정보를 제거하기 때문에 GAN과 안 맞는다.
* Max-pooling layer를 Convolution layer로 바꾼다.
* Convolution을 띄엄띄엄 넣어서 사용한다.(discriminator)
* Fractionally strided convolution (Transposed convolution)(generator)
* 입력 feature map을 한칸씩 띄워서 upsampling convolution으로 더 큰 feature map을 만든다.
* batch normalization을 generator와 discriminator에서 사용한다.
* fully connected hidden layer들을 지워서 더 deep architecture를 만들 수 있게 만든다.
* ReLU를 generator에서 쓴다(출력 layer만 빼고).
* LeakyReLU를 discriminator에 쓴다.
	* LeakyReLU는 q 본래 ReLU는 음수를 다 0에 보내는데에 비해 음수를 받으면 아주 조금씩 음수를 늘려나가는 형식이다.


### Unrolled GAN
* 봉오리가 여러개 있는 패턴을 학습하려고 하면 GAN은 각 봉오리중 하나씩만 학습한다.
* 만약에 Discriminator가 고정되어 있다면 Generator가 못하는 곳에 집중해서 확인한다는 뜻이다.
* 그러면 그 부분을 찾아서 Generator가 그 부분을 집중해서 학습함을 통해서 이겨낼 수 있다는 방식이다.
* Generator가 현재 Discriminator를 이용하는 것이 아닌 미래의 Discriminator를 기준으로 현재의 Generator가 학습한다.


### Wasserstein GAN
* GAN에서의 중요한 것 (상당히 어려움)
* distribution간의 distance measurement를 바꿔야한다! 라는 주장
* JSD를 사용하면 학습이 불안정해진다.
* 그래서 Wasserstein-1 distance를 사용해야한다.
* inf(rough하게 발생되는 minimum한 값)
* gamma = Pr과 Pg간의 matching이라고 생각하면 된다.
* x랑y가 matching될 때에 x와 y간의 거리를 expectation으로 찾는다.
* Earth-Mover Distance
	* A와 B를 흙더미라고 생각할 때, A를 B로 흙더미를 옮기기 위해서 옮기는 거리와 옮긴 흙의 무게를 계산한다는 개념이다.
	* A와 B, 그리고 A와 C의 거리차이만 보면 둘 다 1.02이지만, A에서 C로 옮길 때에 더 많은 흙을 더 길게 옮겨야 되기 때문에 EMD가 더 높아진다.
* 2차원 평면상에서 1차원 분포를 두개를 만들면 두 분포가 안 겹칠 확률이 매우 높다.
* 그렇게 되면 본래 GAN으로는 조금만 겹치는 부분이 없어도 매우 멀다고 인식하기 때문에, 실제로는 가깝지만 겹치지 않기 때문에 아예 멀다고 인식하고 학습을 못하는 경우가 생긴다.
* EMD는 같은 y에 있는 값들의 차이를 거리로 받아들이고, 모든 점에서의 거리를 다 더하고 평균값을 내면 그것이 분포의 거리 차이로 보는 것이다.
* K-Lipshcitz function은 값이 급격하게 변하지 않는 함수이다. 그렇게 하기 위해선 weight를 작은 값이 되도록 범위를 지정해주면 된다.
* critic function 대신에 Gradient가 너무 커지면 gradient penalty를 줘서 Gradient가 어느정도 이상을 넘지 않도록 만든다.


### EBGAN, BEGAN
* BEGAN은 Generator와 Discriminator간의 균형을 잡아주는 방식
* 어느 한쪽이 잘하면 다른 쪽을 더 많이 학습시키는 방식
* Generator의 loss와 discriminator의 loss를 나눴을 때에 값이 1에 가까운 값이 나오도록 유지를 시킨다.
	* 차이가 거의 없도록. 딱 1은 거의 안 나온다.


### ProgressiveGAN
* 처음에 4x4를 만들고, 8x8을 만들고, 점점 키워가서..... 1024x1024가 나오게 학습시킨다.
* 작은 이미지부터 시작해서 generator와 discriminator를 동시에 학습시키면서 점점 이미지 크기를 늘려나간다.
* 해상도가 좋아진다.


### Conditional GAN
* 변형시키는 GAN
* 스케치를 한 다음에 칼라를 더해준다던지, 흑백영상을 컬러영상으로 만든다던지...
* noise + 입력 영상으로 부터 새로운 영상을 만든다.
* 입력과 출력이 pair이여야 된다. 정답이 있어야 한다.


### DiscoGAN
* 금발영상을 흑발영상으로, 흑발영상을 금발영상으로 만드는 generator 두개가 있는데, 두개를 두 입력으로 사용하고, 서로 비교하면서 loss를 찾아서 loss를 줄여간다.
* training data에 두 사진이 서로 pair가 되지 않아도 된다.



Variational Auto-Encoders
---------------------------

### Auto-Encoder
* encoder라는 모듈과 decoder라는 모듈을 합친 것
* 입력 벡터를 feature 벡터로 만드는 과정에서 encoder, feature 벡터에서 reproduction 벡터가 나오는 것이 decoder이다.
* 입력 벡터와 reproduction 벡터의 차이가 거의 없어야지 좋다.
* feature 벡터에 다시 입력 벡터같이 만들기 충분한 데이터가 있어야 한다.
* deep neural network의 pre-training에서도 많이 쓰인다.
* 학습 시키는 방법은, feature를 랜덤하게 준 뒤, 그것을 decoder로 샘플을 만들어서 학습하는 방식이다.
* Latent Space가 discontinuous하기 때문에 분포가 몰려있지 않는 곳은 좋은 sample을 못 만든다.


### VAE
* auto-encoder의 연장선
* continuous latent space를 사용하다.
* hidden variable z(latent variable)로 샘플 x를 만든다.
* z는 어떤 특정 범위를 가정한다. (Gaussian distribution 등을 주로 사용)
* x가 주어졌을 때에 z를 유추할 수 있다.
* x에서 z로, z에서 x로 가는 것을 auto-encoder와 같은 형식으로 이해할 수 있다.
* 우리가 평균을 알고 있고 표준편차를 알고 있으면 Gaussian distribution을 만들 수 있다.
* p(z)는 Gaussian Distribution으로 할 수 있고, p(x|z)는 nueral net를 쓰면 되기 때문에 쉽지만, p(x)나 p(z|x)는 계산이 불가능하다.
* 그래서 p(z|x) 대신에 계산이 가능한 단순한 함수 q(z|x)를 사용한다.
	* q함수는 normal distribution을 사용한다.
* x를 받으면 encoder는 z의 mean하고 standard deviation(표준 편차)를 찾아내면 된다.
* 그러고 나서 z의 분포가 위의 두 값의 normal distribution으로 z를 찾아낸다.
* 그러면 위의 z로 decoder가 학습하면 된다.


### Variational Lower Bound
* p(z|x)는 계산불가능이기 때문에, 마지막 줄의 DKL(q(z|x)||p(z|x))는 계산 불가능하다.
* 하지만 저 값은 두 분포의 거리이기 때문에 0과 같거나 0보다 크다.
* 따라서 앞부분(계산 가능한 부분)을 Maximize시키면 된다.


### Latent Space of VAE
* 공간의 분포가 매우 smoothe하게 되어있다.
* 랜덤한 장소를 써도 좋은 샘플이 나온다.
* 하지만 generalize된 정보이기 때문에 얼굴사진은 안정적이지만 blur한 이미지가 나온다.


### Adversarial VAE (VAE/GAN)
* 처음에 VAE로 베이스를 만들고, 거기에서부터 GAN을 사용해서 sharp하게 만드는 것이다.



Pixel RNN/CNN
--------------
* x라는 n x n의 영상이 있다.
* 각 pixel의 probability를 다 곱해서 x라는 영상의 probability를 낸다.
* probability를 찾는 함수를 CNN으로 만들면 pixel CNN, RNN으로 만들면 pixel RNN이다.
* Depth가 깊은 network를 사용한다.











