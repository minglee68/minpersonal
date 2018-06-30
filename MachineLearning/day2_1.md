Recurrent Neural Networks
==========================

Introduction to RNN
--------------------
* Time series data를 처리하기 위해서 나왔다.
* ex)주가
	* 같은 높이여도 올라가는 주가와 내려가는 주가가 있다.
	* 전 데이터와 다음 데이터가 연관성이 있다.
* 시간 별로 x가 있다.
	* x는 하나하나가 벡터들이다.
* 중간에 있는 노드에서 자기 자신으로 돌아가는 선이 있다.
* xt-1이전 xt현재 xt+1다음
* x에서 U라는 weight state를 곱해서 s라는 state로 간다
	* 이전의 hidden state인 st-1에서 w라는 weight를 곱하면 현재의 hidden state이 s로 간다.
	* U,V,W는 시간에 관계없이 다 같은 matrix다.

### RNN State vs Automata
* Automata
	* 처음부터 n개의 state가 있고, 거기에서 작업이 시작된다.
	* 정해진 숫자의 state
* RNN
	* hidden state에서 continuous한 무한히 많은 state에 있어서 transition한다


### RNN vs Flip-Flop
* 현재 state가 있을 때에 다시 자기 자신으로 들어가는 recurrent connection이 있다.
* 메모리의 역할을 할 수 있다.


### State Transition Without Input
* 어떤 state s가 있고, t가 time이고, 각각 t에서 어떤 function f라고 하는 고정된 함수를 사용해서 과거에서 미래로 갈 수 있다고 한다.
* s(2) = f(s(1); theta)이면, s(3) = f(s(2); theta)이기 때문에 s(3) = f(f(s(1);theta);theta)라고 할 수 있다.

### State Transition With Input
* 입력으로 x라는 벡터가 function에 들어간다.
* 어떤 hidden state를 h라고 한다. s하고 다를 바 없다.
* h(t) = f(h(t-1), x(t);theta)
* h는 지금까지의 영향을 반영한 summary vector이다.
	* 모든 정보가 보존되지는 않는다.
	* 그래도 지금까지 있었던 일을 잘 summary 해놓은 vector
* g를 현재까지의 입력으로 h를 찾아내는 어떤 함수라고 한다.
* h(t) = g(t)(x(t), x(t-1), x(t-2) ... x(2), x(1)) = f(h(t-1),x(t);theta)
	* g(1)(x(1))
	* g(2)(x(2), x(1))
* h(t-1)에 지금까지의 x값이 반영되어 있다고 보기 때문에 x(1)부터 x(t-1)까지의 값이 h(t-1)에 반영되어있다고 가정하고 x(t)만 더해서 함수에 사용한다.
* g(t)는 시간별로 다 만들어야 되지만, f(t)는 시간에 무관하기 때문에 그냥 하나만 가지고 적용할 수 있다.
* 길이가 아무리 길더라도 parameter 하나로 작업할 수 있다.
* 단점:
	* matrix 하나가 모든 요소를 반영되어 있어야 되기 때문에 학습하는 데에 어려움이 있다.


### Parameter Sharing in RNN
* Traditional FFN: Sharing이라는게 없다. 모든 position에서 독립적인 값이 있다.
* CNN: 공간적으로 sharing이 있다.
* RNN: 시간적으로 sharing이 있다.
* 'In 2009'이 앞이나 뒤나 동시에 나올 수 있다.


### Recurrent Networks(Elman net)
* x(vector)에 U weight(matrix)를 곱하면 h가 나오고, h에서 W가 곱해지면 자신으로 돌아온다. h에 V라는 matrix를 곱해서 o가 나온다.
* y라는 정답으로 주고, o와 y를 비교해서 L(Loss)를 찾아낸다.
* 시간축에서 모든 L(t)(Loss)를 다 더해서 하나의 Loss로 다룬다.


### Recurrent Networks with Single Output
* 입력은 계속 들어오는데 누적하다가 마지막 한번만 출력을 내는 것.
* 입력이 쌓이다 보면 sequence가 생기는데, 그것을 마지막에 한번 출력을 내면 지금까지를 모두 summary한 vector가 나타난다.
* Encoder형식이다.


### RNN의 동작법
* x가 들어오면 U라는 weight matrix가 곱해진다.
* 과거의 hidden state h(t-1)에 W라는 recurrent weight를 곱하고 위의 결과와 더한다.
* hidden의 bias를 더한다. 그러면 a(t)이다.(net value)
* net value는 현재의 입력 정보, 전의 hidden state 정보, 그리고 hidden state의 bias를 더한 값이다.
* h(t)는 tanh(a(t)) 이다.
* o(t)(output)은 c + Vh(t-1)인데, c는 output을 계산하기 위한 bias이다.
* ^y(t)는 softmax(o(t))이다.
* hyperbolic tangent를 사용하는데, sigboid와 비슷하지만 다른 점은 sigmoid는 가장 작은 값이 0이고 모든 값이 양수를 갖고 최대가 1이다. 하지만 tanh는 가장 작은 값이 -1이고 가장 큰 값이 1이다.
	* 만일 양수값만 사용하고 싶으면 sigmoid, 양수 음수 둘 다 사용하고 싶으면 tanh이다.
	* sigmoid의 neutral은 0.5, tanh의 neutral은 0이다.
* RNN에서는 ReLU를 많이 안 쓴다.
	* 음수가 나오면 0으로 없애버리는데, 이러면 과거와의 연결이 끊어져버린다.
* output의 dimension이 word의 개수이고, 각 output은 각 word가 사용하기에 적합한 정도를 나타낸다.


### RNN은 Turing-complete하다.
* 하나의 input에서 하나의 output -> vector에서 vector로의 mapping
* 하나의 input에서 많은 output -> vector에서 sequence로의 mapping
	* 어떤 개념을 입력시키고 self loop을 통해서 그거를 설명할 수 있는 단어들을 출력시킨다.
* 많은 input에서 하나의 output -> sequence에서 vector로의 mapping
* 많은 input에서 입력이 끝난 다음부터 많은 output을 보내는 것 -> sequence에서 sequence
	* 입력받는 부분의 hidden state를 encoder, 출력하는 부분의 hidden state를 decoder
	* encoder/decoder 구조라고도 한다.
* 많은 input에서 동시에 많은 output을 보내는 것


### 변형된 RNN
* Bidirectional RNN
	* 표준은 과거에서 현재로, 현재에서 미래로 시간축을 따라서 간다.
	* 하지만 문장을 해석할 때 뒤에있는 단어의 뜻을 이해하기 위해서 전에 나온 단어의 정보가 필요하다
	* 따라서 미래에서 현재로, 현재에서 과거로도 영향을 줄 수 있는 형식이 좋다.
	* hidden node는 각 layer에 2개씩 생긴다. 하나는 과거에서 미래로 가는 노드, 하나는 미래에서 과거로 가는 노드이다.
	* 과거부터 미래까지 모든 정보를 가지고 있다는 전제 하에 사용될 수 있다.
	* prediction을 위한 방법으론 사용 될 수 없다.
* Deep RNN
	* 여러 hidden layer가 있는 것
* CBHG Module
	* RNN을 multi layer로 쌓아올리기 보다는 RNN 하나를 도중에 사용하는 것.
	* Convolution bank와, highway network와,  GRU(RNN의 일종)를 통과 시켜서 encoder 역할을 해서 output이 하나의 벡터로 나오게 한다.


### Encoder/Decoder Model
* 입력이 sequence로 들어올 때에 전체의 sequence를 하나의 context vector로 요약해서 보낸다.
* decoder는 context vector 하나를 받아서 sequence를 만든다.
	* context vector, 이전의 hidden state, 이전의 output이 들어간다.
	* 번역 할 때에 이전에 나온 단어를 통해 다음에 나올 단어를 유추해낼 수 있기 때문에.
* 입력되는 sequence와 출력되는 sequence는 같지 않다.


### Attention Model
* 영상인식에서 나왔다가, 번역 영역에서 더 큰 성공을 거두었다.
* x라고 하는 sequence (입력 sequence)가 있고, 첫 time부터 마지막 하나 전 time까지의 모든 출력 (y1, .., yi-1)을 통해서 마지막 단어를 유추해내는 모델이다.
* RNN에서는 yi-1을 하나를 보고, si가 y1, ....yi-2까지의 영향이 있는 hidden state이고, ci는 출력할 각 타임에 context vector를 각 time마다 입력된 sequence에서 어디에 중점을 두는지를 다 따로 둬서 계산한다.
* hidden state si = f(si-1, yi-1, ci)
* ci = sigma(aij * hj) (h = encoder의 hidden state, s = output의 hidden state)
* aij = hidden state에 곱해지는 weight인데, 각 time마다 각 h에 곱해지는 weight가 다르다.
* a = attention
	* eij = a(si-1, hj)
		* a() = neural network
		* eij = encoder의 hidden state가 decoder의 hidden state에 반영되는 정도의 value
	* eij를 사용해서 normalize를 해서 aij에 넣는다.



Training RNN
-------------
매우 복잡하다.

### Loss of RNN
* x(1),...,x(t)를 입력으로 받았을 때에 y(t)가 나올 확률
* pmodel = RNN이 주는 확률
* y(t) = t번째 time에서의 정답이다.
* log함수는 단조 증가 함수이다.
* 확률을 높이는 거나, 확률의 단조 증가 함수를 높이는 거나 같다.
* log가 있으면 곱셈이 덧셈이 되고, exp()가 없어지기 때문에, 확률을 maximize하는 과정이 단순해진다.
* Loss 함수는 줄여야되는 값이다.
* 각 time에서 각 정답을 가질 확률을 높이겠다는 것.
* 각 time에 나오는 likelihood 값을 높인다.
* Total Loss for a Sequence
	* 모든 time의 loss를 더한 값이다.
	* 확률적으로 봤을 때엔 모든 확률을 곱해야하지만, 로그 함수를 씌웠기 때문에 다 더하면 된다.
* 이것을 Gradient Escent Algorithm에 적용시키면 된다.


### BPTT (Back-propagation through time)
* y(t)는 정답이고, ^y(t)는 실제로 나온 output이다.
* y(t)는 one hot vector이다.
* E(t)(y(t), ^y(t)) = -y(t) log(^y(t))
	* 정답에 대한 값만 남고 나머지는 다 0이 될 것이다.
	* true class의 값만 의미있게 하고 나머지는 무시한다.
* 전체 sequence에 대한 Error function은:
	* E(y, ^y) = sigma E(t)(y(t), ^y(t))
* z = net value = 이미지의 o와 같다.
* E3를 W로 미분하기 위해선 E3을 ^y3으로 미분하고, ^y3를 s3로 미분하고, 그리고 s3를 s2로 미분한것과, 앞에는 똑같고 s3를 s2로 미분한것과 s2를 s1으로 미분한 것의 곱과, 또 앞에는 똑같고 s3를 s2로 미분한것과 s2를 s1으로 미분한 것과 s1을 s0으로 미분한 것을 곱한 값을 다 더한다.
* softmax의 미분은 yj를 oi로 미분한 값은 yj(1ij - yi)인데, 1ij는 ij가 같을 때에 1인 diagnol matrix이다. 
* 전체 loss를 해당 time에 대한 o로 미분을 하면 ^y(t)j - 1ij이다.
* 전체 loss를 해당 time에 대한 h(hidden state)로 미분을 하려면 미래의 h를 현재의 h로 미분하고, 그것을 미래로부터 받은 미래의 h로 전체 loss를 미분한 값과 곱하고(미래가 없으면 이 부분 자체가 없어니면 된다.), 그것을 현재의 o을 현재의 h로 미분한 것을 전체의 loss를 현재의 o로 미분한 것과 곱한 것과 더한다.
	* a = net value
* 전체 loss를 bias로 미분하는 것은:
	* bias c는 현재의 o를 c로 미분한 값(1)을 전체 loss를 현재 o로 미분한 것과 곱한 것을 모든 time으로 한 값을 더하면 된다.
	* bias b는 현재의 h를 b로 미분한 값을 전체 loss를 현재 h로 미분한 것과 곱한 것을 모든 time으로 한 값을 더하면 된다.
* 전체 loss를 connection weight로 미분하는 것은: (가장 중요하다)
	* connection weight V는 전체 loss를 현재 o로 미분한 값을 현재의 h로 곱하는 것을 모든 time으로 한 값을 더한다.
	* connection weight W는 전체 loss를 각 time의 각 h로 미분한 값을 각 time의 각 h를 각 time의 W로 미분한 값과 곱하는 것을 모든 i에 대해서 나온 값을 더하고 그것이 모든 time에서 나온 값을 더한다.
	* connection weight U는 전체 loss를 


Long Short-Term Memory Network
-------------------------------
* RNN에 있어서 수학적인 문제
	* 시간축으로 연산이 진행이 되는데, 그걸 오랫동안 연산을 하면 Depth가 너무 깊어져서 vanishing gradient problem이 생길 수 있다.
	* Long term dependency를 학습하는 데에 어렵다.
		* 어떤 입력이 들어오는 시간하고 어떤 출력이 나오는 시간이 서로 매우 긴 시간의 차이로 있다면 서로의 연관성을 찾는 것이 매우 어렵다.
		* h(t) = h(0)*W^t를 한다.
		* 오랫동안 W가 쌓이면 1보다 크면 지나치게 커져서 폭발하고, 1보다 작으면 0에 가까워져서 vanishing이 된다.
		* 그러면 W를 1에 가까운 값으로 주면 어떻냐?
			* 어느 정도는 vanish/explode를 막을 수 있지만, 두가지 문제가 발생한다.
			* Input weight conflict: 중요한 factor와 중요하지 않은 factor의 구분이 거의 안 된다.
			* Output weight conflict: Gradient를 찾을 때에도 구분이 거의 안 된다.
* 이 문제들을 해결하기 위해서 LSTM (Long Short-Term Memory)가 나왔다.
* 3개의 gate가 있는데, 이 gate의 값은 neural network를 사용해서 값을 찾는다.(sigmoid를 사용해서 0~1값을 찾음)
* gate의 값이 0이면 gate가 닫혀서 입력된 데이터를 무시하는 것이고,
* gate의 값이 1이면 gate가 열려서 100% 입력된 데이터를 활용하는 것이다.
* gate가 입력을 차단할지 안 할지, 차단을 안 했을 때에 얼마나 쓸지, 어떤 값을 곱할지를 판단할 수 있다.
* 정보가 순수한 상태로 다른 필요없는 정보에 섞이지 않고 더 멀리 갈 수 있다.


### LSTM Networks
* Input gate, Output gate, Forget gate(hidden to hidden)
* Long term dependency문제는 시간이 길어지면 길어질 수록 심해진다.
* 줄이는 방법 중 하나는 100시간에서 100번을 업데이트 하는것 보단 100시간에서 10번을 해서 시간 resolution을 줄이는 방법이다.
* 또 한가지 방법은 Leaky Unit을 사용하는 것이다.
* v(t)라는 값이 들어올 때에, 과거에서부터 계속 평균값을 받아와서, 그것을 평균에 섞어서 다음으로 넘겨주는 것이다.
* Forget Gate는 Self loop를 위한 gate이다.


### Gated Recurrent Units (GRU)
* Forget gate하고 input gate를 하나로 통합했다. -> update gate
* Reset gate (Forget gate)하고 비슷한 개념
* 둘 다 비슷하다.


Successful Application
-----------------------

### Machine Translation
* LSTM을 8개를 쌓아서 encoder를 만들고, 또 8개를 쌓아서 decoder를 만든 것.
* 구글 번역기


### Question Answering
* 'x'가 문단의 어느 부분에 있는가를 attention으로 encoder/decoder를 통해서 찾아내는 것


### 음성인식 (Neural Speech Recognition)
* 음성인식을 연산이 복잡하기 때문에 RNN을 계속 돌리면 시간이 오래 걸린다.
* 해결 방법은 RNN을 쌓아 올리면서 Resolution을 점점 줄이는 것이다. (Pyramid RNN)
* Encoder/Decoder/Attention model로 만들어 져있고, sequence to sequence model을 사용한다.


### Automatic Image Captioning
* 오브젝트 단위로 잘라진 영역과 그 영역으로 찾아낸 feature를 받아서, 그것에서 RNN을 사용해서 attention을 찾아서 해당하는 단어를 찾아내고 반환한다.





