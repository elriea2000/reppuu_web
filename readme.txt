制空値最適化ツール“烈風拳であります！”ブラウザ版 v0.4


＊概要
C++版をブラウザ版に移植し，インタフェース周りを強化しました．
ブラウザ上で動きますが，javascriptで動いているのでオフラインで動きます．
また，通常の制空値計算機としても機能します．

以下，引用．
> 艦これの制空値の最適化が面倒なので作ってみました．
> 目標の制空値に届くような烈風の載せ方のパターンを提案します．
> 艦載機の機種は混ざられません．ほぼ烈風専用です．
> ＃実装したい気持ちは無くはない．でも面倒臭い．
> 烈風改で染める，なんてこともできますが，今の艦これの実装ではムリですね（笑）夢を見たい人はどうぞ．やりようによれば瑞雲計算機にもなります．瑞雲教の方はどうぞ．

v0.4より，手動なら機種を調整することが可能になりました．


＊使い方
1. 数字の横のチェックボックスにチェックを入れます．
2. 名前を一番上のテキスト入力に記入します．
3. 各スロットの艦載数を記入します．
　プルダウンメニューから選択することで，1～3までをやってくれます．
4. 1～3を，全ての艦娘のスロットでやります．
5. “Do it!”ボタンを押します．
6. 下に結果のリストが表示されます．また，各スロットの横に，　載せる艦載機の対空値（+10とか）　がつきます．また，“Do it!”ボタンの上に制空値が表示されます．
7. “next”ボタンを繰り返し押すと，最大listnum分だけ別の候補を表示できます．

＊制空値計算機としての使い方
i) 上の3までやります．
ii) 各スロットの行のボタンを押してみます．対空値が増えたり減ったりします．
iii) “Do it!”ボタンの上に制空値が表示されています．


＊結果表示の読み方
・“Do it!！”ボタンの上
制空値合計，使ったスロット数，残りの表示候補数 が表示されます．

・上の方
各スロットの制空値換算した値が表示されます．

・下の方
結果のリストです．一番下がおそらく最適．
使うスロット数が少ないほど正義．次に制空値が高い方が正義．

> ABCDEF G HHH

ABCDEF : それぞれの艦の搭載状況が16進数でビット表示されています．
例えば a20 と表示された場合，
一番目の艦の搭載状況は a = 1010 ，すなわち第1スロットと第3スロットに烈風を搭載した状態になります．
以下，
二番目の艦 2 = 0010 第3スロットのみ
三番目の艦 0 = 0000 搭載なし
念のため対応表は別節に記載しておきます．
電卓を起動して，表示＞プログラマにして，16進数にして，表示を打ち込めば分かりやすいかも．

G : 使う総スロット数．

HHH : 総制空値．


＊パラメータの説明
大体分かると思います．

・数字入力のところでの半角数字以外の入力は仕様外です．全角文字とか．
・marginrate: 道中撃墜を考慮した，実際に目標とする制空値を設定するためのマージンです．
　実際の目標値 = target*marginrate (小数点以下切り捨て) になります．
・maxmargin: 計算高速化用です．floor(target*maxmargin)を超えるパターンの計算は途中でやめます．
　調整すると速くなるかもしれませんが，2.0で十分だと思います．
　当然，marginrateより大きくないと意味ないです．

かなり手を抜いたので，ソース読める人は穴をついてもらって結構です(笑)


＊（たぶん）便利な使い方
・チェックを外したところは計算に入れません．
　このスロットは艦攻に使いたい，という時に，チェックを外すと便利です．
・encodeを押すと状態をコード化します．decodeを押すと逆にコードから復元します．
・ページ下のコードで一括指定できます．フォーマットは冗長性無い仕様です．あしからず．


＊Tips
・marginrateいらねーよ，って時には1.0に設定して，targetをお好きに設定するといいかんじです．


＊FAQ
・なんか動かない
＞たぶんエラーが起きています．
　バグかもしれません．

・使いづらい
＞あいすまぬ．

・艦数を増やすと遅いんだけど
＞あいすまぬ．誰か高速化して．


＊16進数→2進数
0 -> 0000
1 -> 0001
2 -> 0010
3 -> 0011
4 -> 0100
5 -> 0101
6 -> 0110
7 -> 0111
8 -> 1000
9 -> 1001
a -> 1010
b -> 1011
c -> 1100
d -> 1101
e -> 1110
f -> 1111


＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊

＊動作環境
以下の環境で動作確認．
OS : Windows7
CPU : intel core i5
メモリ : 8 GB
ブラウザ : Google Chrome 50.0.2661.94 m


＊更新履歴
v0.2 - 2016.05.10
とりあえず公開．

v0.3 - 2016.05.11
プルダウンメニューから艦を選択できるようにUI改良．
細かいバグも修正．

v0.4 - 2016.05.11
通常の制空値計算機としても機能するようにUI改変．
手動なら機種まぜまぜできるよ！

＊ライセンス
BSDで配布します．
即ち，これを使ったり改変したところで何かがあっても保障しません．それでもよければご自由に．

This source and related resources are available under BSD License. 

--
Copyright (c) 2016-, suzuryo
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:
* Redistributions of source code must retain the above copyright notice, 
  this list of conditions and the following disclaimer.
* Redistributions in binary form must reproduce the above copyright notice, 
  this list of conditions and the following disclaimer in the documentation 
  and/or other materials provided with the distribution.
* Neither the name of the <organization> nor the names of its contributors 
  may be used to endorse or promote products derived from this software 
  without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
