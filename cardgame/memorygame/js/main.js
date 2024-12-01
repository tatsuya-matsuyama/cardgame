'use strict';
document.addEventListener('DOMContentLoaded',()=>{
  // Cardクラス作成
  class Card {
    constructor(suit, num) {
      this.suit = suit; // スート (s:スペード, d:ダイヤ...)
      this.num = num;   // 数字 (1, 2, ... 13)
      this.front=`${suit}${num < 10 ? '0':''}${num}.gif`; //カードの画像
    }
  }

  // カード配列作成
  const cards = [];
  const suits = ['s', 'd', 'h', 'c']; // スートの種類 (スペード, ダイヤ, ハート, クローバー)

  // 52枚のカードを作成
  suits.forEach(suit => {
    for (let num = 1; num <= 13; num++) {
      cards.push(new Card(suit, num)); // 各カードを生成して配列に追加
    }
  });
  let firstCard=null;//1枚目のカードを保持(引いてない場合はnull)
  let secondCard=null;//2枚目のカードを保持(引いてない場合はnull)
  //クリックした際の関数を定義
  const flip=(eve)=>{
    //クリックされた要素を特定
    const div=eve.target;
    //表面のカードをクリックした場合や、3枚目のカードをクリックした場合はなにもしない
    if(!div.classList.contains('back') || secondCard !== null){
        return;
      }
      div.classList.remove('back');//表面にする
      //もしそれが1枚目だったらfirstCardに代入
      if(firstCard === null){
        firstCard=div;
      }else{
        //2枚目だったらsecondCardに代入
        secondCard=div;
        //２枚のカードの数字が同じだったら
        if(firstCard.num === secondCard.num){
          //正解だった場合fadeoutクラスを付与する
          firstCard.classList.add('fadeout');
          secondCard.classList.add('fadeout');
          //firstCard,secondカードを共にnullに戻す
          [firstCard,secondCard]=[null,null];
        }else{
          //不正回だった場合は1.2秒後に裏面に戻す
          setTimeout(()=>{
            firstCard.classList.add('back');
            secondCard.classList.add('back');
            [firstCard,secondCard]=[null,null];
          },1200);
        }
      }
  };
  // カードグリッドを初期化
  const cardgrid = document.getElementById('cardgrid');
  const initgrid = () => {
    cardgrid.textContent=null; //cardgridに入っている要素をすべて削除
    cards.forEach(card => {
      const div = document.createElement('div'); //div要素作成
      //div.textContent=card.suit+':'+card.num;//divのtextContentを設定
      div.style.backgroundImage=`url(images/${card.front})`; //背景画像に画像を設定
      div.classList.add('card','back');//divにbackクラスも追加
      div.onclick=flip;
      div.num=card.num; //divにnumプロパティを定義して、そこに数字を保存
      cardgrid.appendChild(div); // グリッドにカードを追加
    });
  };
  //カードシャッフル関数(Fisher–Yates shuffle)
  const shuffle=()=>{
    let i=cards.length;
    while(i){
      const index=Math.floor(Math.random()*i--);
      [cards[index],cards[i]]=[cards[i],cards[index]]
    }
  };


  // ゲームスタートボタン
  const startBt = document.getElementById('startBt');
  startBt.addEventListener('click', () => {
    shuffle();
    initgrid();
  });
});