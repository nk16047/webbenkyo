// ===================================================
// 🥚 Webのたまご - 問題データ
// ===================================================

// キャラクター定義と専門分野
// タマちゃん: 主人公、オノマトペのみで話す（わくわく、どきどき、きゅぴーん✨など）
// ピヨちゃん: ナビゲーター、進行役・質問係、語尾「〜だよ！」「〜ね！」
// コッコちゃん: CSS担当（ワールド2-3で活躍）、おしゃれ好き、語尾「〜だわ」
// ニワオ: JavaScript担当（ワールド4-5で活躍）、「〜だぜ」「〜だな」
// フクロウさん: HTML担当＋全体の先生、「〜じゃ」「〜のう」、ことわざを使う
const CHARACTERS = {
  tama: { name: 'タマちゃん', emoji: '🥚', role: 'あなた（オノマトペだけで話す）' },
  piyo: { name: 'ピヨちゃん', emoji: '🐣', role: 'ナビゲーター' },
  cocco: { name: 'コッコちゃん', emoji: '🐥', role: 'CSSの達人' },
  niwao: { name: 'ニワオ', emoji: '🐓', role: 'JavaScriptの達人' },
  fukurou: { name: 'フクロウさん', emoji: '🦉', role: 'HTMLの先生' }
};

// ワールド定義
const WORLDS = [
  {
    id: 1,
    title: 'HTMLで関わってみよう',
    subtitle: 'Webページの骨組みを作る！',
    emoji: '🥚',
    color: '#FFB347'
  },
  {
    id: 2,
    title: 'CSSでかわいくしよう',
    subtitle: '色や形を変えて楽しく！',
    emoji: '🐣',
    color: '#87CEEB'
  },
  {
    id: 3,
    title: 'CSSでレイアウト',
    subtitle: 'いい感じに並べよう！',
    emoji: '🐥',
    color: '#98D8C8'
  },
  {
    id: 4,
    title: 'JavaScriptで動かそう',
    subtitle: 'ボタンを押したら何か起きる！',
    emoji: '🐓',
    color: '#F7DC6F'
  },
  {
    id: 5,
    title: 'jQueryを読んでみよう',
    subtitle: '現場のコードに挑戦！',
    emoji: '🏆',
    color: '#BB8FCE'
  }
];

// ===================================================
// 🥚 ワールド1：HTML編
// ===================================================

const WORLD1_STAGES = [
  // -------------------------------------------------
  // ステージ 1-1: HTMLの基本構文
  // -------------------------------------------------
  {
    world: 1,
    stage: 1,
    title: 'HTMLってなあに？',
    mdnUrl: 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Basic_HTML_syntax',
    mdnTitle: 'Basic HTML syntax',

    // オープニング会話
    opening: [
      { c: 'piyo', text: 'たいへんたいへーん！' },
      { c: 'piyo', text: '村のホームページ作ることになったんだけど、誰も作り方知らないの！' },
      { c: 'tama', text: 'おろおろ...' },
      { c: 'fukurou', text: 'ホッホッホ。HTMLというものを使うのじゃ' },
      { c: 'fukurou', text: '千里の道も一歩から。やってみればわかるさ' },
      { c: 'piyo', text: 'タマちゃん、一緒にがんばろ！' }
    ],

    // 発見パート
    discovery: [
      {
        speaker: 'fukurou',
        text: 'まずはHTMLの基本を見せてやろう'
      },
      {
        type: 'code',
        content: '<p>こんにちは</p>'
      },
      {
        speaker: 'piyo',
        text: 'サンドイッチみたい🥪 パンで具を挟んでる感じ？'
      },
      {
        speaker: 'fukurou',
        text: 'いい例えじゃな！<p>と</p>で「こんにちは」を挟んでおる'
      },
      {
        speaker: 'piyo',
        text: '終わりの方に / がついてるね'
      },
      {
        speaker: 'fukurou',
        text: 'それが「終了タグ」じゃ。これがないと困るぞ'
      },
      {
        speaker: 'piyo',
        text: 'どう困るの？'
      },
      {
        speaker: 'fukurou',
        text: '2つの段落を書きたいとき、こう書くと...'
      },
      {
        type: 'code',
        content: '<p>おはよう\nこんにちは'
      },
      {
        speaker: 'fukurou',
        text: '全部くっついて1つになってしまう'
      },
      {
        speaker: 'piyo',
        text: 'あ、ほんとだ！分かれてない！'
      },
      {
        speaker: 'fukurou',
        text: 'ちゃんと閉じて、新しく開くと...'
      },
      {
        type: 'code',
        content: '<p>おはよう</p>\n<p>こんにちは</p>'
      },
      {
        speaker: 'piyo',
        text: 'わ！ちゃんと2つに分かれた！'
      },
      {
        type: 'point',
        title: 'タグのきほん',
        content: '<開始タグ>中身</終了タグ>\n終了タグには / がつく！'
      },
      {
        speaker: 'fukurou',
        text: 'ちなみに p は paragraph（段落）の略じゃ'
      },
      {
        speaker: 'fukurou',
        text: 'タグには「属性」をつけて追加情報を与えることもできるぞ'
      },
      {
        type: 'code',
        content: '<a href="https://example.com">リンク</a>'
      },
      {
        speaker: 'piyo',
        text: 'href="..."ってのが属性？'
      },
      {
        speaker: 'fukurou',
        text: 'その通り。属性名="値" の形で、タグに情報を追加するのじゃ'
      },
      {
        type: 'point',
        title: '属性（ぞくせい）',
        content: '<タグ 属性名="値">中身</タグ>\n例: href="..." はリンク先を指定する属性'
      },
      {
        speaker: 'piyo',
        text: 'ところでさ、ページ全体ってどうなってるの？'
      },
      {
        speaker: 'fukurou',
        text: 'よい質問じゃ。HTMLページには決まった形があるのじゃ'
      },
      {
        type: 'code',
        content: '<!DOCTYPE html>\n<html>\n  <head>設定</head>\n  <body>ページの中身</body>\n</html>'
      },
      {
        speaker: 'fukurou',
        text: '<!DOCTYPE html>は「これはHTMLだよ」という宣言じゃ'
      },
      {
        speaker: 'fukurou',
        text: '<head>は裏方の設定、<body>は画面に出る部分じゃな'
      },
      {
        type: 'point',
        title: 'HTMLページの骨組み',
        content: '<!DOCTYPE html> → HTMLだよ宣言\n<html> → 全体を囲む\n  <head> → 裏方の設定\n  <body> → 画面に出る部分'
      },
      {
        speaker: 'piyo',
        text: '頭(head)が先で、体(body)が後！覚えやすい！'
      }
    ],

    // ゲーム導入
    gameIntro: [
      { c: 'piyo', text: 'よーし、クイズいくよ〜！' }
    ],

    // 問題
    questions: [
      {
        id: 'w1s1q1',
        type: 'choice',
        question: '正しく書けてるのど〜れだ？',
        choices: [
          { text: '<p>こんにちは</p>', correct: true },
          { text: '<p>こんにちは<p>', correct: false },
          { text: '<p>こんにちは', correct: false },
          { text: 'p>こんにちは</p>', correct: false }
        ],
        correctComment: [
          { c: 'piyo', text: '正解！🎉 終了タグの / がポイントだね' }
        ],
        wrongComment: [
          { c: 'piyo', text: 'あれれ？' },
          { c: 'fukurou', text: 'サンドイッチみたいに挟むのじゃ。終了タグには / が必要じゃぞ' }
        ],
        points: 10
      },
      {
        id: 'w1s1q2',
        type: 'choice',
        question: 'このHTMLを見て！「属性」ってどの部分？',
        code: '<a href="https://example.com">リンク</a>',
        choices: [
          { text: '<a>', correct: false },
          { text: 'href="https://example.com"', correct: true },
          { text: 'リンク', correct: false },
          { text: '</a>', correct: false }
        ],
        correctComment: [
          { c: 'piyo', text: '正解！🎉' },
          { c: 'fukurou', text: '属性名="値" の形、バッチリじゃ' }
        ],
        wrongComment: [
          { c: 'fukurou', text: '<a>はタグ、「リンク」は中身じゃ' },
          { c: 'fukurou', text: '属性は href="..." の部分じゃよ' }
        ],
        points: 10
      },
      {
        id: 'w1s1q3',
        type: 'sort',
        question: 'HTMLページの骨組み、正しい順番に並べてみて！',
        items: [
          { id: 'a', text: '</html>' },
          { id: 'b', text: '<body>ページの中身</body>' },
          { id: 'c', text: '<!DOCTYPE html>' },
          { id: 'd', text: '<html>' },
          { id: 'e', text: '<head>設定</head>' }
        ],
        correctOrder: ['c', 'd', 'e', 'b', 'a'],
        correctComment: [
          { c: 'piyo', text: '完璧！🎉' },
          { c: 'fukurou', text: '頭(head)が先で、体(body)が後。よく覚えておったのう' }
        ],
        wrongComment: [
          { c: 'fukurou', text: '最初は <!DOCTYPE html> で「私はHTMLです」と宣言するのじゃ' },
          { c: 'piyo', text: 'そのあと頭(head)→体(body)の順だね！' }
        ],
        points: 15
      }
    ],

    // クリア時
    clearComment: [
      { c: 'piyo', text: 'ステージクリア〜！🎉' },
      { c: 'fukurou', text: 'HTMLの基本、バッチリじゃな' }
    ]
  },

  // -------------------------------------------------
  // ステージ 1-2: メタデータ
  // -------------------------------------------------
  {
    world: 1,
    stage: 2,
    title: 'ページの設定をしよう',
    mdnUrl: 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Webpage_metadata',
    mdnTitle: 'Webpage metadata',

    opening: [
      { c: 'piyo', text: 'ねえねえ、さっき出てきた <head> ってなんだろ？' },
      { c: 'fukurou', text: 'あれはページの「裏方さん」じゃな' },
      { c: 'piyo', text: '裏方さん...？' },
      { c: 'fukurou', text: 'ブラウザのタブに出る名前とか、文字化け防止とか' },
      { c: 'fukurou', text: '画面には見えないけど大事な設定を書くところじゃ' },
      { c: 'piyo', text: 'へ〜！見えないところで頑張ってるんだね' }
    ],

    discovery: [
      {
        speaker: 'fukurou',
        text: 'headの中にはこういうのを書くのじゃ'
      },
      {
        type: 'code',
        content: '<head>\n  <meta charset="UTF-8">\n  <title>たまご村</title>\n</head>'
      },
      {
        speaker: 'piyo',
        text: '<title>ってなに？'
      },
      {
        speaker: 'fukurou',
        text: 'ブラウザのタブに出る名前じゃ'
      },
      {
        type: 'image',
        description: 'ブラウザタブのイメージ: 🐔 たまご村 ✕'
      },
      {
        speaker: 'piyo',
        text: 'あ〜！上のちっちゃいとこに出るやつね！'
      },
      {
        speaker: 'fukurou',
        text: '<meta charset="UTF-8"> は文字化け防止のおまじない✨じゃ'
      },
      {
        type: 'point',
        title: 'headとbodyの違い',
        content: 'head = 裏方の設定（画面に見えない）\nbody = 表舞台（画面に見える）'
      },
      {
        speaker: 'piyo',
        text: 'headは舞台裏、bodyは舞台の上ってことだね！'
      }
    ],

    gameIntro: [
      { c: 'piyo', text: 'よし！わかったかゲームいくよ〜' }
    ],

    questions: [
      {
        id: 'w1s2q1',
        type: 'choice',
        question: 'ブラウザのタブに出るタイトルを設定するタグは？',
        choices: [
          { text: '<header>', correct: false },
          { text: '<title>', correct: true },
          { text: '<h1>', correct: false },
          { text: '<name>', correct: false }
        ],
        correctComment: [
          { c: 'piyo', text: 'ピンポーン！🎉' },
          { c: 'fukurou', text: '<h1>は画面に出る見出し、<title>はタブに出る名前じゃ' }
        ],
        wrongComment: [
          { c: 'fukurou', text: 'おっと、違うのう' },
          { c: 'fukurou', text: '<title>がタブに出る名前じゃ。<header>はまた別のものじゃよ' }
        ],
        points: 10
      },
      {
        id: 'w1s2q2',
        type: 'match',
        question: 'headに入る？bodyに入る？分けてみよう！',
        pairs: [
          { item: '<title>ページ名</title>', match: 'head' },
          { item: '<p>本文だよ</p>', match: 'body' },
          { item: '<meta charset="UTF-8">', match: 'head' },
          { item: '<h1>見出し</h1>', match: 'body' }
        ],
        categories: ['head', 'body'],
        correctComment: [
          { c: 'piyo', text: 'やった〜！全部合ってる！🎉' },
          { c: 'fukurou', text: '裏方(head)と表舞台(body)、バッチリじゃな' }
        ],
        wrongComment: [
          { c: 'piyo', text: 'あれれ？ちょっと混ざっちゃったかな' },
          { c: 'fukurou', text: '画面に見えるやつはbody、見えない設定はheadじゃ' }
        ],
        points: 15
      }
    ],

    clearComment: [
      { c: 'piyo', text: 'headとbody、もう完璧だね！' },
      { c: 'fukurou', text: '次は画面に見える部分を詳しくやるぞ' }
    ]
  },

  // -------------------------------------------------
  // ステージ 1-3: 見出しと段落
  // -------------------------------------------------
  {
    world: 1,
    stage: 3,
    title: '見出しをつけよう',
    mdnUrl: 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Headings_and_paragraphs',
    mdnTitle: 'Headings and paragraphs',

    opening: [
      { c: 'piyo', text: 'ねえ、村のページにタイトルつけたいな〜' },
      { c: 'piyo', text: '「たまご村へようこそ！」みたいな、大きい文字でドーンって！' },
      { c: 'fukurou', text: 'それには「見出し」タグを使うのじゃ' }
    ],

    discovery: [
      {
        speaker: 'fukurou',
        text: '見出しは <h1> から <h6> まであるんじゃ'
      },
      {
        type: 'code',
        content: '<h1>たまご村へようこそ</h1>\n<h2>村の紹介</h2>\n<h3>住んでる仲間たち</h3>'
      },
      {
        speaker: 'piyo',
        text: 'hって何の略？'
      },
      {
        speaker: 'fukurou',
        text: 'heading（見出し）のhじゃ'
      },
      {
        speaker: 'piyo',
        text: '数字が小さいほど大きいんだね！'
      },
      {
        type: 'point',
        title: '見出しの大きさ',
        content: 'h1 = 一番でっかい（大見出し）\nh2 = 中くらい\nh3 = もうちょっと小さい\n...\nh6 = 一番ちっちゃい'
      },
      {
        speaker: 'fukurou',
        text: '大事なルールがあるぞ'
      },
      {
        speaker: 'fukurou',
        text: 'h1 → h2 → h3 の順番で使うのじゃ'
      },
      {
        speaker: 'piyo',
        text: 'いきなりh3とか使っちゃダメってこと？'
      },
      {
        speaker: 'fukurou',
        text: 'その通り。本の章立てと同じじゃな'
      },
      {
        speaker: 'piyo',
        text: '第1章の次は第2章、いきなり第3章にならないもんね！'
      }
    ],

    gameIntro: [
      { c: 'piyo', text: '見出しゲームいくよ〜！' }
    ],

    questions: [
      {
        id: 'w1s3q1',
        type: 'choice',
        question: '一番大きい見出しを表すタグはど〜れだ？',
        choices: [
          { text: '<h6>', correct: false },
          { text: '<h1>', correct: true },
          { text: '<heading>', correct: false },
          { text: '<title>', correct: false }
        ],
        correctComment: [
          { c: 'piyo', text: '正解！🎉 h1が一番でっかいやつ！' },
          { c: 'fukurou', text: '数字が小さいほど大きいのじゃ' }
        ],
        wrongComment: [
          { c: 'piyo', text: 'ちがうよ〜！' },
          { c: 'fukurou', text: 'h1が一番大きくて、h6が一番小さいのじゃ' }
        ],
        points: 10
      },
      {
        id: 'w1s3q2',
        type: 'choice',
        question: 'この見出し、一番の問題点は？',
        code: '<h1>ニュース</h1>\n<h3>今日の天気</h3>',
        choices: [
          { text: '問題ないよ', correct: false },
          { text: 'h2を飛ばしてh3を使ってる', correct: true },
          { text: 'h1が最初なのがダメ', correct: false },
          { text: 'h3は使っちゃダメ', correct: false }
        ],
        correctComment: [
          { c: 'piyo', text: 'さすが〜！よく見てるね！🎉' },
          { c: 'fukurou', text: 'h1の次はh2、その次がh3の順番じゃな' }
        ],
        wrongComment: [
          { c: 'fukurou', text: 'よく見てみるのじゃ' },
          { c: 'fukurou', text: 'h1 → h3 と、h2を飛ばしておるな' }
        ],
        points: 10
      },
      {
        id: 'w1s3q3',
        type: 'predict',
        question: 'このHTMLをブラウザで見ると、どうなる？',
        code: '<h2>お知らせ</h2>\n<p>明日は休みです。</p>\n<p>よろしくね！</p>',
        choices: [
          { text: '3行が全部同じ大きさで出る', correct: false },
          { text: '「お知らせ」が大きく、下に2つの段落', correct: true },
          { text: '全部1行につながって出る', correct: false },
          { text: 'エラーになっちゃう', correct: false }
        ],
        correctComment: [
          { c: 'piyo', text: 'あったり〜！🎉' },
          { c: 'fukurou', text: 'h2は見出しだから大きく、pは段落だから普通サイズじゃ' }
        ],
        wrongComment: [
          { c: 'piyo', text: 'う〜ん、そうじゃないんだ〜' },
          { c: 'fukurou', text: '<h2>は見出しだから大きく表示されるのじゃ' }
        ],
        points: 10
      }
    ],

    clearComment: [
      { c: 'piyo', text: '見出しマスターだね！' },
      { c: 'fukurou', text: '村のページ、かっこよくなりそうじゃな' }
    ]
  },

  // -------------------------------------------------
  // ステージ 1-4: 強調と重要性
  // -------------------------------------------------
  {
    world: 1,
    stage: 4,
    title: '大事なとこを目立たせよう',
    mdnUrl: 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Emphasis_and_importance',
    mdnTitle: 'Emphasis and importance',

    opening: [
      { c: 'piyo', text: 'ねえ、「期間限定！」とか目立たせたいな〜' },
      { c: 'tama', text: 'ふむふむ？' },
      { c: 'fukurou', text: 'それにはいくつか方法があるのじゃ' }
    ],

    discovery: [
      {
        speaker: 'fukurou',
        text: '「これ大事！」って意味を込めるなら <strong> を使う'
      },
      {
        type: 'code',
        content: '<p>この商品は<strong>期間限定</strong>です！</p>'
      },
      {
        speaker: 'piyo',
        text: 'strong...強いってこと？'
      },
      {
        speaker: 'fukurou',
        text: 'そう！「ここ大事だよ！」って意味になるのじゃ'
      },
      {
        speaker: 'piyo',
        text: '他にもあるの？'
      },
      {
        speaker: 'fukurou',
        text: '「強調したい」ときは <em> じゃな'
      },
      {
        type: 'code',
        content: '<p>ここは<em>本当に</em>おいしいよ！</p>'
      },
      {
        speaker: 'piyo',
        text: 'em...？'
      },
      {
        speaker: 'fukurou',
        text: 'emphasis（強調）の略じゃ'
      },
      {
        type: 'point',
        title: '意味のあるタグ vs 見た目だけのタグ',
        content: '<strong> = 「これ大事！」重要な情報（太字になる）\n<em> = 「ここ強めに読んで！」強調（斜体になる）\n\n<b> = ただ太字にするだけ\n<i> = ただ斜体にするだけ'
      },
      {
        speaker: 'piyo',
        text: '見た目は同じでも意味が違うんだね〜'
      },
      {
        speaker: 'fukurou',
        text: 'ちなみにstrongは「強い」じゃなくて「重大」って意味じゃ'
      },
      {
        speaker: 'piyo',
        text: '強調の「強」に惑わされないようにしなきゃ！'
      },
      {
        speaker: 'fukurou',
        text: '音声読み上げソフトは <strong> を強く読んでくれたりするのじゃ'
      },
      {
        speaker: 'piyo',
        text: 'へ〜！目が見えない人にも伝わるんだ！' }
    ],

    gameIntro: [
      { c: 'piyo', text: 'よーし！違いがわかるかな？' }
    ],

    questions: [
      {
        id: 'w1s4q1',
        type: 'choice',
        question: '「意味的に重要」を表すタグはど〜れ？',
        choices: [
          { text: '<b>（太字）', correct: false },
          { text: '<i>（斜体）', correct: false },
          { text: '<strong>', correct: true },
          { text: '<big>', correct: false }
        ],
        correctComment: [
          { c: 'piyo', text: '正解！🎉' },
          { c: 'fukurou', text: '<strong>は「重要」って意味があるのじゃ。<b>はただ太くするだけじゃ' }
        ],
        wrongComment: [
          { c: 'fukurou', text: 'おっと〜' },
          { c: 'fukurou', text: '<b>は見た目を太くするだけ。「意味」を込めたいなら<strong>じゃ' }
        ],
        points: 10
      },
      {
        id: 'w1s4q2',
        type: 'choice',
        question: '<em>と<i>、見た目は同じ斜体だけど違いは？',
        code: '<p>これは<em>期間限定</em>です</p>\n<p>これは<i>期間限定</i>です</p>',
        choices: [
          { text: '違いはない、同じもの', correct: false },
          { text: '<em>は強調の意味があり、<i>は見た目だけ', correct: true },
          { text: '<i>の方が意味がある', correct: false },
          { text: '<em>は古い書き方', correct: false }
        ],
        correctComment: [
          { c: 'piyo', text: 'すご〜い！わかってる！🎉' },
          { c: 'fukurou', text: '<em>はemphasis、強調の意味があるのじゃ' }
        ],
        wrongComment: [
          { c: 'piyo', text: 'う〜ん、ちょっと違うかも' },
          { c: 'fukurou', text: '<em>は「強調」って意味がある。<i>はただ斜体にするだけじゃ' }
        ],
        points: 10
      }
    ],

    clearComment: [
      { c: 'piyo', text: '意味と見た目の違い、わかったね！' },
      { c: 'fukurou', text: 'HTMLは奥が深いのう' }
    ]
  },

  // -------------------------------------------------
  // ステージ 1-5: リスト
  // -------------------------------------------------
  {
    world: 1,
    stage: 5,
    title: 'リストを作ろう',
    mdnUrl: 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Lists',
    mdnTitle: 'Lists',

    opening: [
      { c: 'piyo', text: '買い物メモをページに書きたいな〜' },
      { c: 'piyo', text: '・たまご ・牛乳 ・パン みたいな箇条書き！' },
      { c: 'fukurou', text: 'それは「リスト」タグを使うのじゃ' }
    ],

    discovery: [
      {
        speaker: 'fukurou',
        text: 'リストには2種類あるんじゃ'
      },
      {
        type: 'point',
        title: '2種類のリスト',
        content: '<ul> = 順序なしリスト（・で始まる）\n<ol> = 順序ありリスト（1. 2. 3.で始まる）'
      },
      {
        speaker: 'fukurou',
        text: '買い物リストは順番関係ないから <ul> じゃな'
      },
      {
        type: 'code',
        content: '<ul>\n  <li>たまご</li>\n  <li>牛乳</li>\n  <li>パン</li>\n</ul>'
      },
      {
        speaker: 'piyo',
        text: '<li>ってなに？'
      },
      {
        speaker: 'fukurou',
        text: 'list item（リストの項目）の略じゃ'
      },
      {
        speaker: 'piyo',
        text: 'じゃあ順番が大事なやつは？'
      },
      {
        speaker: 'fukurou',
        text: 'レシピの手順とかは <ol> を使うのじゃ'
      },
      {
        type: 'code',
        content: '<ol>\n  <li>卵を割る</li>\n  <li>混ぜる</li>\n  <li>焼く</li>\n</ol>'
      },
      {
        speaker: 'piyo',
        text: 'こっちは1. 2. 3.って番号がつくんだね！'
      },
      {
        speaker: 'fukurou',
        text: 'ul = unordered（順序なし）、ol = ordered（順序あり）じゃ'
      }
    ],

    gameIntro: [
      { c: 'piyo', text: 'リストクイズいくよ〜！' }
    ],

    questions: [
      {
        id: 'w1s5q1',
        type: 'choice',
        question: '買い物リストを作るのにぴったりなタグの組み合わせは？',
        choices: [
          { text: '<ul>と<li>', correct: true },
          { text: '<ol>と<li>', correct: false },
          { text: '<list>と<item>', correct: false },
          { text: '<ul>と<item>', correct: false }
        ],
        correctComment: [
          { c: 'piyo', text: '正解！🎉' },
          { c: 'fukurou', text: '順番関係ない買い物リストは<ul>、中身は<li>で囲むのじゃ' }
        ],
        wrongComment: [
          { c: 'fukurou', text: 'おっと〜' },
          { c: 'fukurou', text: '順番がないリストは<ul>、中身は<li>で囲むのじゃ' }
        ],
        points: 10
      },
      {
        id: 'w1s5q2',
        type: 'choice',
        question: 'レシピの「手順」を書くのに適切なのは？',
        choices: [
          { text: '<ul>（順序なしリスト）', correct: false },
          { text: '<ol>（順序ありリスト）', correct: true },
          { text: '<p>（段落）', correct: false },
          { text: '<menu>', correct: false }
        ],
        correctComment: [
          { c: 'piyo', text: 'ピンポーン！🎉 手順は順番が大事だもんね〜' },
          { c: 'fukurou', text: 'ol = ordered（順序あり）じゃ！' }
        ],
        wrongComment: [
          { c: 'piyo', text: 'う〜ん、レシピの手順は順番が大事だよね？' },
          { c: 'fukurou', text: '順番ありは <ol> を使うのじゃ' }
        ],
        points: 10
      },
      {
        id: 'w1s5q3',
        type: 'sort',
        question: 'リストのHTMLを正しい順番に並べてみて！',
        items: [
          { id: 'a', text: '</ul>' },
          { id: 'b', text: '<li>りんご</li>' },
          { id: 'c', text: '<ul>' },
          { id: 'd', text: '<li>みかん</li>' }
        ],
        correctOrder: ['c', 'b', 'd', 'a'],
        correctComment: [
          { c: 'piyo', text: 'かんぺき！🎉' },
          { c: 'fukurou', text: '<ul>で始まって、<li>が中にあって、</ul>で終わるのじゃ' }
        ],
        wrongComment: [
          { c: 'piyo', text: 'あれれ？' },
          { c: 'fukurou', text: '<ul>で始まって、中に<li>を入れて、</ul>で閉じるのじゃ' }
        ],
        points: 15
      }
    ],

    clearComment: [
      { c: 'piyo', text: 'リストもバッチリだね！' },
      { c: 'fukurou', text: 'お買い物メモが作れるようになったのう' }
    ]
  },

  // -------------------------------------------------
  // ステージ 1-6: 文書構造
  // -------------------------------------------------
  {
    world: 1,
    stage: 6,
    title: 'ページを区切ろう',
    mdnUrl: 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Structuring_documents',
    mdnTitle: 'Structuring documents',

    opening: [
      { c: 'piyo', text: 'ページが長くなってきたね〜' },
      { c: 'fukurou', text: 'ページを意味のある部分に分けるタグがあるぞ' }
    ],

    discovery: [
      {
        speaker: 'fukurou',
        text: 'Webページは「お店」みたいなものじゃ'
      },
      {
        type: 'point',
        title: 'お店に例えると...',
        content: '🏪 お店 = Webページ全体\n\n🚪 入口の看板 = <header>（ロゴ、タイトル）\n📋 メニュー表 = <nav>（ナビゲーション）\n🛒 売り場 = <main>（メインコンテンツ）\n📰 チラシ置き場 = <aside>（サイドバー）\n🚪 レジ横の案内 = <footer>（著作権など）'
      },
      {
        speaker: 'piyo',
        text: 'なるほど！場所によって役割が決まってるんだ'
      },
      {
        speaker: 'fukurou',
        text: 'これを「セマンティック（意味のある）タグ」というのじゃ'
      },
      {
        speaker: 'fukurou',
        text: '見た目は同じでも、意味を伝えることが大事なんじゃ'
      },
      {
        type: 'point',
        title: 'なぜ意味が大事？',
        content: '・目が見えない人の読み上げソフトが「ここはメニューです」と教えてくれる\n・検索エンジンが「ここが本文だな」と理解できる\n・コードを読む人が「ここはヘッダーか」とすぐわかる'
      },
      {
        speaker: 'piyo',
        text: 'じゃあ<div>ってなに？よく見るけど'
      },
      {
        speaker: 'fukurou',
        text: '<div>は「ただの段ボール箱」じゃな'
      },
      {
        speaker: 'fukurou',
        text: '中身が何かわからない。でも、とりあえずまとめたい時に使う'
      },
      {
        type: 'code',
        content: '<header>\n  <h1>たまご村</h1>\n  <nav>\n    <a href="#about">紹介</a>\n  </nav>\n</header>\n<main>\n  <p>ようこそ！</p>\n</main>\n<footer>\n  <p>© たまご村</p>\n</footer>'
      },
      {
        speaker: 'piyo',
        text: 'わ〜、ちゃんと分かれてて見やすい！'
      }
    ],

    gameIntro: [
      { c: 'fukurou', text: 'では、構造クイズじゃ' }
    ],

    questions: [
      {
        id: 'w1s6q1',
        type: 'choice',
        question: 'ナビゲーションメニューを囲むのにぴったりなタグは？',
        choices: [
          { text: '<navigation>', correct: false },
          { text: '<nav>', correct: true },
          { text: '<menu>', correct: false },
          { text: '<header>', correct: false }
        ],
        correctComment: [
          { c: 'piyo', text: '正解！🎉' },
          { c: 'fukurou', text: '<nav>はnavigationの略じゃな' }
        ],
        wrongComment: [
          { c: 'fukurou', text: 'ナビゲーションは<nav>じゃ' },
          { c: 'piyo', text: '<navigation>じゃなくて短く<nav>なんだね！' }
        ],
        points: 10
      },
      {
        id: 'w1s6q2',
        type: 'choice',
        question: '<div>はどんなときに使う？',
        choices: [
          { text: 'ヘッダーを作るとき', correct: false },
          { text: 'ナビを作るとき', correct: false },
          { text: '特別な意味はないけどグループ化したいとき', correct: true },
          { text: 'フッターを作るとき', correct: false }
        ],
        correctComment: [
          { c: 'fukurou', text: 'その通り！🎉' },
          { c: 'fukurou', text: '<div>は「ただの段ボール箱」。意味があるならちゃんとしたタグを使うのじゃ' }
        ],
        wrongComment: [
          { c: 'fukurou', text: '<div>は意味のない「ただの箱」じゃ' },
          { c: 'fukurou', text: 'ヘッダーなら<header>、ナビなら<nav>を使うのじゃ' }
        ],
        points: 10
      },
      {
        id: 'w1s6q3',
        type: 'match',
        question: 'タグと役割を結びつけよう！',
        pairs: [
          { item: '<header>', match: 'ページ上部' },
          { item: '<footer>', match: 'ページ下部' },
          { item: '<main>', match: 'メインコンテンツ' },
          { item: '<nav>', match: 'ナビゲーション' }
        ],
        categories: ['ページ上部', 'ページ下部', 'メインコンテンツ', 'ナビゲーション'],
        correctComment: [
          { c: 'piyo', text: 'パーフェクト！🎉' },
          { c: 'fukurou', text: 'ページの構造、バッチリじゃな' }
        ],
        wrongComment: [
          { c: 'piyo', text: 'あれれ？' },
          { c: 'fukurou', text: 'header=上、footer=下、nav=メニュー、main=中身じゃ' }
        ],
        points: 15
      }
    ],

    clearComment: [
      { c: 'piyo', text: 'ページの構造がわかってきた！' },
      { c: 'fukurou', text: '意味のあるタグを使うと、みんなに優しいページになるぞ' }
    ]
  },

  // -------------------------------------------------
  // ステージ 1-7: リンク
  // -------------------------------------------------
  {
    world: 1,
    stage: 7,
    title: 'リンクを作ろう',
    mdnUrl: 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Creating_links',
    mdnTitle: 'Creating links',

    opening: [
      { c: 'piyo', text: '他のページにジャンプするやつ作りたい！' },
      { c: 'piyo', text: 'クリックしたら飛ぶやつ！' },
      { c: 'fukurou', text: 'それは「リンク」というものじゃ' }
    ],

    discovery: [
      {
        speaker: 'fukurou',
        text: 'リンクは <a> タグで作るのじゃ'
      },
      {
        type: 'code',
        content: '<a href="https://example.com">こちらをクリック</a>'
      },
      {
        speaker: 'piyo',
        text: 'aって何の略？'
      },
      {
        speaker: 'fukurou',
        text: 'anchor（アンカー、錨）の略じゃな'
      },
      {
        speaker: 'piyo',
        text: 'hrefってのは？'
      },
      {
        speaker: 'fukurou',
        text: 'hypertext reference、つまり「どこに飛ぶか」の指定じゃ'
      },
      {
        type: 'point',
        title: 'リンクの書き方',
        content: '<a href="飛び先のURL">表示される文字</a>'
      },
      {
        speaker: 'piyo',
        text: '同じページの中でジャンプとかできる？'
      },
      {
        speaker: 'fukurou',
        text: 'できるぞ！#を使うのじゃ'
      },
      {
        type: 'code',
        content: '<!-- ジャンプ先 -->\n<h2 id="about">たまご村について</h2>\n\n<!-- リンク -->\n<a href="#about">紹介を見る</a>'
      },
      {
        speaker: 'piyo',
        text: 'idをつけたところに#で飛べるんだ！'
      },
      {
        speaker: 'fukurou',
        text: 'そうじゃ！ページ内リンクというものじゃな'
      }
    ],

    gameIntro: [
      { c: 'piyo', text: 'リンククイズ！どこに飛ぶかな〜？' }
    ],

    questions: [
      {
        id: 'w1s7q1',
        type: 'choice',
        question: 'リンクを作るときに使うタグは？',
        choices: [
          { text: '<link>', correct: false },
          { text: '<a>', correct: true },
          { text: '<href>', correct: false },
          { text: '<url>', correct: false }
        ],
        correctComment: [
          { c: 'piyo', text: '正解！🎉' },
          { c: 'fukurou', text: 'aはanchor（アンカー）の略じゃ' },
          { c: 'piyo', text: '<link>じゃないの意外だよね〜' }
        ],
        wrongComment: [
          { c: 'fukurou', text: 'おっと、リンクは<a>タグじゃ' },
          { c: 'piyo', text: '<link>は別の用途で使うんだって！' }
        ],
        points: 10
      },
      {
        id: 'w1s7q2',
        type: 'predict',
        question: 'このリンクをクリックしたら何が起きる？',
        code: '<a href="#contact">お問い合わせ</a>\n...\n<h2 id="contact">お問い合わせ</h2>',
        choices: [
          { text: '新しいページが開く', correct: false },
          { text: '同じページの「お問い合わせ」のとこにジャンプ', correct: true },
          { text: 'エラーになる', correct: false },
          { text: '何も起きない', correct: false }
        ],
        correctComment: [
          { c: 'piyo', text: 'すごーい！🎉' },
          { c: 'fukurou', text: '#をつけるとページ内の同じidのところに飛ぶのじゃ' }
        ],
        wrongComment: [
          { c: 'fukurou', text: '#から始まるのはページ内リンクじゃ' },
          { c: 'piyo', text: 'id="contact"のところにジャンプするんだね！' }
        ],
        points: 10
      },
      {
        id: 'w1s7q3',
        type: 'fill',
        question: '空欄を埋めてリンクを完成させよう！',
        code: '<a ____="https://example.com">サイトへ</a>',
        answer: 'href',
        acceptableAnswers: ['href'],
        correctComment: [
          { c: 'piyo', text: 'かんぺき！🎉' },
          { c: 'fukurou', text: 'href（hypertext reference）でリンク先を指定するのじゃ' }
        ],
        wrongComment: [
          { c: 'piyo', text: 'ちがうよ〜' },
          { c: 'fukurou', text: 'リンク先を指定するのは href じゃ' }
        ],
        points: 15
      }
    ],

    clearComment: [
      { c: 'piyo', text: 'リンクも作れるようになった！' },
      { c: 'fukurou', text: '村のページから色んなとこに飛べるようになったのう' }
    ]
  },

  // -------------------------------------------------
  // ステージ 1-8: 画像
  // -------------------------------------------------
  {
    world: 1,
    stage: 8,
    title: '画像を表示しよう',
    mdnUrl: 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/HTML_images',
    mdnTitle: 'Images in HTML',

    opening: [
      { c: 'piyo', text: 'ページに写真を載せたいな〜' },
      { c: 'piyo', text: 'みんなの写真とか！かわいいやつ！' },
      { c: 'fukurou', text: '画像は <img> タグで表示できるのじゃ' }
    ],

    discovery: [
      {
        speaker: 'fukurou',
        text: '画像はこうやって書くのじゃ'
      },
      {
        type: 'code',
        content: '<img src="photo.jpg" alt="たまご村の写真">'
      },
      {
        speaker: 'piyo',
        text: 'あれ？終了タグがない！'
      },
      {
        speaker: 'fukurou',
        text: '<img>は中身がないから終了タグがいらないのじゃ'
      },
      {
        speaker: 'fukurou',
        text: 'こういうのを「自己閉じタグ」と言う'
      },
      {
        type: 'point',
        title: 'imgタグの属性',
        content: 'src = 画像ファイルの場所\nalt = 画像が表示できないときの代わりの文字'
      },
      {
        speaker: 'piyo',
        text: 'altって絶対いるの？'
      },
      {
        speaker: 'fukurou',
        text: '目が見えない人は読み上げソフトでaltを聞くのじゃ'
      },
      {
        speaker: 'fukurou',
        text: 'とても大事な属性じゃぞ'
      },
      {
        speaker: 'piyo',
        text: 'みんなに優しいページを作りたいね！'
      }
    ],

    gameIntro: [
      { c: 'piyo', text: '画像タグ、わかるかな〜？' }
    ],

    questions: [
      {
        id: 'w1s8q1',
        type: 'fill',
        question: '空欄を埋めて画像を表示しよう！',
        code: '<___ src="cat.jpg" alt="ねこの写真">',
        answer: 'img',
        acceptableAnswers: ['img'],
        correctComment: [
          { c: 'piyo', text: 'やった〜！🎉' },
          { c: 'fukurou', text: 'img = image（画像）の略じゃな' }
        ],
        wrongComment: [
          { c: 'fukurou', text: '画像は <img> タグじゃ' },
          { c: 'piyo', text: 'imageの略でimgなんだって！' }
        ],
        points: 10
      },
      {
        id: 'w1s8q2',
        type: 'choice',
        question: 'alt属性はなんのためにある？',
        choices: [
          { text: '画像を大きくするため', correct: false },
          { text: '画像が表示できないとき用の説明文', correct: true },
          { text: '画像の場所を指定するため', correct: false },
          { text: '画像をリンクにするため', correct: false }
        ],
        correctComment: [
          { c: 'fukurou', text: 'その通りじゃ！🎉' },
          { c: 'fukurou', text: '読み上げソフトにも使われる大事な属性じゃ' },
          { c: 'piyo', text: 'みんなに優しいページになるね！' }
        ],
        wrongComment: [
          { c: 'fukurou', text: 'altは「代替テキスト」というものじゃ' },
          { c: 'piyo', text: '画像が見れない人のための説明文なんだね' }
        ],
        points: 10
      }
    ],

    clearComment: [
      { c: 'piyo', text: '画像も表示できるようになった〜！' },
      { c: 'fukurou', text: '村のかわいい写真を載せるといいのう' }
    ]
  },

  // -------------------------------------------------
  // ステージ 1-9: フォーム
  // -------------------------------------------------
  {
    world: 1,
    stage: 9,
    title: 'フォームを作ろう',
    mdnUrl: 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/HTML_forms',
    mdnTitle: 'Web forms',

    opening: [
      { c: 'piyo', text: 'お問い合わせフォーム作りたいな！' },
      { c: 'piyo', text: '名前とかメール入れるやつ！' },
      { c: 'fukurou', text: 'ちょっと複雑じゃが、基本を覚えれば大丈夫じゃ' }
    ],

    discovery: [
      {
        speaker: 'fukurou',
        text: 'フォームはこんな感じで書くのじゃ'
      },
      {
        type: 'code',
        content: '<form>\n  <label for="name">名前</label>\n  <input type="text" id="name">\n  \n  <label for="email">メール</label>\n  <input type="email" id="email">\n  \n  <button type="submit">送信</button>\n</form>'
      },
      {
        speaker: 'piyo',
        text: 'labelとinputがセットになってる？'
      },
      {
        speaker: 'fukurou',
        text: 'いいとこに気づいたのう！'
      },
      {
        type: 'point',
        title: 'labelとinputの紐づけ',
        content: 'labelのfor属性 と inputのid属性 を同じにする！\n\n<label for="email">  ←┐\n<input id="email">   ←┘ 同じ！'
      },
      {
        speaker: 'piyo',
        text: 'なんで紐づけるの？'
      },
      {
        speaker: 'fukurou',
        text: 'ラベルをクリックしたら入力欄にフォーカスが当たるのじゃ'
      },
      {
        speaker: 'fukurou',
        text: 'これも読み上げソフトで大事な役割をするぞ'
      },
      {
        speaker: 'fukurou',
        text: 'ちなみにfor属性はidを参照する。classじゃないぞ'
      },
      {
        speaker: 'piyo',
        text: 'for → id！覚えた！'
      }
    ],

    gameIntro: [
      { c: 'fukurou', text: 'フォームクイズじゃ、ちょっと難しいぞ！' }
    ],

    questions: [
      {
        id: 'w1s9q1',
        type: 'choice',
        question: '<label for="email"> に紐づく <input> はどれ？',
        code: '<label for="email">メールアドレス</label>\n\nA: <input type="text" class="email">\nB: <input type="email" id="email">\nC: <input type="email" name="email">\nD: <input type="email" for="email">',
        choices: [
          { text: 'A: class="email"', correct: false },
          { text: 'B: id="email"', correct: true },
          { text: 'C: name="email"', correct: false },
          { text: 'D: for="email"', correct: false }
        ],
        correctComment: [
          { c: 'piyo', text: 'おお、正解！🎉' },
          { c: 'fukurou', text: 'forはidを参照するのじゃ。classやnameじゃないぞ' },
          { c: 'piyo', text: 'for → id の組み合わせ！' }
        ],
        wrongComment: [
          { c: 'fukurou', text: 'おっと、for属性はidを参照するのじゃ' },
          { c: 'piyo', text: 'classでもnameでもなくて、idなんだね！' }
        ],
        points: 10
      },
      {
        id: 'w1s9q2',
        type: 'choice',
        question: 'for属性はclassとidのどっちを参照する？',
        choices: [
          { text: 'class', correct: false },
          { text: 'id', correct: true },
          { text: 'name', correct: false },
          { text: 'どれでもいい', correct: false }
        ],
        correctComment: [
          { c: 'piyo', text: 'バッチリ！🎉' },
          { c: 'fukurou', text: 'for → id の組み合わせを覚えておくとよいぞ' }
        ],
        wrongComment: [
          { c: 'fukurou', text: 'for属性はidを参照するのじゃ' },
          { c: 'piyo', text: 'これ大事だから覚えよう！' }
        ],
        points: 10
      },
      {
        id: 'w1s9q3',
        type: 'predict',
        question: 'type="email" の入力欄に「あいうえお」と入れて送信ボタンを押すと？',
        choices: [
          { text: '普通に送信される', correct: false },
          { text: 'メールアドレスの形式じゃないとエラーになる', correct: true },
          { text: '自動的にメールが送られる', correct: false },
          { text: '何も起きない', correct: false }
        ],
        correctComment: [
          { c: 'piyo', text: 'すご〜い！🎉' },
          { c: 'fukurou', text: 'type="email"は@が含まれてないとエラーになるのじゃ' },
          { c: 'piyo', text: 'ブラウザがチェックしてくれるんだね！' }
        ],
        wrongComment: [
          { c: 'fukurou', text: 'type="email"は入力チェック機能があるのじゃ' },
          { c: 'piyo', text: '@がないとエラーになるよ！' }
        ],
        points: 10
      }
    ],

    clearComment: [
      { c: 'fukurou', text: 'フォームもクリアか、やるのう！' },
      { c: 'piyo', text: 'お問い合わせページが作れるね！' }
    ]
  },

  // -------------------------------------------------
  // ステージ 1-10: まとめチャレンジ
  // -------------------------------------------------
  {
    world: 1,
    stage: 10,
    title: 'HTMLまとめチャレンジ！',
    mdnUrl: 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content',
    mdnTitle: 'Structuring content with HTML',

    opening: [
      { c: 'piyo', text: 'HTML編、最後のチャレンジだよ！' },
      { c: 'tama', text: 'どきどき...' },
      { c: 'fukurou', text: 'ここまでよく頑張ったのう。自信を持っていくのじゃ' }
    ],

    discovery: [
      {
        speaker: 'fukurou',
        text: 'ここまで学んだことを振り返ってみよう'
      },
      {
        type: 'point',
        title: 'HTML編で学んだこと',
        content: '✅ タグで挟む、終了タグには/\n✅ head=裏方、body=表舞台\n✅ h1〜h6の見出し、pで段落\n✅ strong/emで意味のある強調\n✅ ul/olでリスト、liが中身\n✅ header/nav/main/footerで構造化\n✅ aでリンク、hrefで飛び先\n✅ imgで画像、altは代替テキスト\n✅ formでフォーム、for→idで紐づけ'
      },
      {
        speaker: 'piyo',
        text: 'いっぱい覚えたね〜！'
      },
      {
        speaker: 'fukurou',
        text: '最後のチャレンジ、頑張るのじゃ！'
      }
    ],

    gameIntro: [
      { c: 'piyo', text: '最終問題！実際のページを読み解こう！' }
    ],

    questions: [
      {
        id: 'w1s10q1',
        type: 'predict',
        question: 'このHTMLで、「お知らせ」のセクションに飛ぶリンクはどれ？',
        code: '<nav>\n  <a href="#news">お知らせ</a>\n  <a href="#about">紹介</a>\n</nav>\n<main>\n  <section id="news">\n    <h2>お知らせ</h2>\n    <p>明日はお休みです</p>\n  </section>\n  <section id="about">\n    <h2>紹介</h2>\n    <p>たまご村です</p>\n  </section>\n</main>',
        choices: [
          { text: '<a href="#news">お知らせ</a>', correct: true },
          { text: '<a href="#about">紹介</a>', correct: false },
          { text: '<section id="news">', correct: false },
          { text: '<h2>お知らせ</h2>', correct: false }
        ],
        correctComment: [
          { c: 'piyo', text: '大正解！🎉🎉🎉' },
          { c: 'fukurou', text: 'href="#news"が、id="news"のところに飛ぶのじゃ。ページ内リンク、バッチリじゃ！' }
        ],
        wrongComment: [
          { c: 'piyo', text: 'おしい！' },
          { c: 'fukurou', text: '#news は id="news" のところに飛ぶリンクじゃ。aタグのhref="#news"が答えじゃよ' }
        ],
        points: 20
      }
    ],

    clearComment: [
      { c: 'piyo', text: 'やった〜〜〜！！！ HTML編クリアだよ〜！🎉🎉🎉' },
      { c: 'tama', text: 'きらきら〜✨' },
      { c: 'fukurou', text: '「継続は力なり」じゃ。よくぞここまで頑張ったのう' },
      { c: 'piyo', text: '次はCSSで素敵にデコレーションするよ〜！' }
    ]
  }
];

// エクスポート
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { CHARACTERS, WORLDS, WORLD1_STAGES };
}
