// ===================================================
// 🥚 Webのたまご - アプリケーションロジック
// ===================================================

// 状態管理
const state = {
  currentWorld: 1,
  currentStage: 0,
  currentQuestion: 0,
  totalPoints: 0,
  correctCount: 0,
  stagePoints: 0,
  dialogueIndex: 0,
  discoveryIndex: 0,
  answers: {},
  stages: WORLD1_STAGES
};

// キャラクター進化の閾値
const EVOLUTION = [
  { min: 0, emoji: '🥚', name: 'たまご' },
  { min: 16, emoji: '🐣', name: 'ひよこ' },
  { min: 36, emoji: '🐥', name: 'こっこ' },
  { min: 56, emoji: '🐓', name: 'にわとり' }
];

// DOM要素のキャッシュ
const elements = {};

// 初期化
function init() {
  cacheElements();
  loadProgress();
  setupEventListeners();
  updateUI();
}

// DOM要素をキャッシュ
function cacheElements() {
  elements.character = document.getElementById('character');
  elements.worldStage = document.getElementById('world-stage');
  elements.progressFill = document.getElementById('progress-fill');
  elements.progressText = document.getElementById('progress-text');
  elements.totalPoints = document.getElementById('total-points');
  elements.footerCharacter = document.getElementById('footer-character');
  elements.btnStart = document.getElementById('btn-start');
  elements.btnContinue = document.getElementById('btn-continue');
  elements.btnStoryNext = document.getElementById('btn-story-next');
  elements.btnDiscoveryNext = document.getElementById('btn-discovery-next');
  elements.btnStartGame = document.getElementById('btn-start-game');
  elements.btnNextQuestion = document.getElementById('btn-next-question');
  elements.btnNextStage = document.getElementById('btn-next-stage');
  elements.btnNextWorld = document.getElementById('btn-next-world');
  elements.storyContent = document.getElementById('story-content');
  elements.discoveryContent = document.getElementById('discovery-content');
  elements.gameIntroContent = document.getElementById('game-intro-content');
  elements.quizNumber = document.getElementById('quiz-number');
  elements.quizPoints = document.getElementById('quiz-points');
  elements.quizQuestion = document.getElementById('quiz-question');
  elements.quizCode = document.getElementById('quiz-code');
  elements.quizChoices = document.getElementById('quiz-choices');
  elements.resultIcon = document.getElementById('result-icon');
  elements.resultTitle = document.getElementById('result-title');
  elements.resultComment = document.getElementById('result-comment');
  elements.resultMdnLink = document.getElementById('result-mdn-link');
  elements.clearComment = document.getElementById('clear-comment');
  elements.clearPoints = document.getElementById('clear-points');
  elements.worldClearCharacter = document.getElementById('world-clear-character');
  elements.worldClearMessage = document.getElementById('world-clear-message');
  elements.worldClearComment = document.getElementById('world-clear-comment');
  elements.confettiContainer = document.getElementById('confetti-container');
}

// イベントリスナー設定
function setupEventListeners() {
  elements.btnStart.addEventListener('click', startGame);
  elements.btnContinue.addEventListener('click', continueGame);
  elements.btnStoryNext.addEventListener('click', nextDialogue);
  elements.btnDiscoveryNext.addEventListener('click', nextDiscovery);
  elements.btnStartGame.addEventListener('click', startQuiz);
  elements.btnNextQuestion.addEventListener('click', nextQuestion);
  elements.btnNextStage.addEventListener('click', nextStage);
  elements.btnNextWorld.addEventListener('click', nextWorld);
}

// 進捗をロード
function loadProgress() {
  const saved = localStorage.getItem('webtamago_progress');
  if (saved) {
    const data = JSON.parse(saved);
    state.currentWorld = data.currentWorld || 1;
    state.currentStage = data.currentStage || 0;
    state.totalPoints = data.totalPoints || 0;
    state.correctCount = data.correctCount || 0;
    state.answers = data.answers || {};

    if (state.currentStage > 0 || state.totalPoints > 0) {
      elements.btnContinue.style.display = 'block';
    }
  }
}

// 進捗を保存
function saveProgress() {
  const data = {
    currentWorld: state.currentWorld,
    currentStage: state.currentStage,
    totalPoints: state.totalPoints,
    correctCount: state.correctCount,
    answers: state.answers
  };
  localStorage.setItem('webtamago_progress', JSON.stringify(data));
}

// UI更新
function updateUI() {
  const stage = state.stages[state.currentStage];
  if (stage) {
    elements.worldStage.textContent = `ワールド${state.currentWorld} - ステージ${stage.stage}`;
  }

  // プログレスバー
  const totalQuestions = state.stages.reduce((sum, s) => sum + s.questions.length, 0);
  let completedQuestions = 0;
  for (let i = 0; i < state.currentStage; i++) {
    completedQuestions += state.stages[i].questions.length;
  }
  completedQuestions += state.currentQuestion;
  const progress = Math.round((completedQuestions / totalQuestions) * 100);
  elements.progressFill.style.width = progress + '%';
  elements.progressText.textContent = progress + '%';

  // ポイント
  elements.totalPoints.textContent = '💰 ' + state.totalPoints + 'pt';

  // キャラクター
  const character = getCharacter();
  elements.character.textContent = character.emoji;
  elements.footerCharacter.textContent = character.emoji;
}

// キャラクター取得
function getCharacter() {
  let result = EVOLUTION[0];
  for (const e of EVOLUTION) {
    if (state.correctCount >= e.min) {
      result = e;
    }
  }
  return result;
}

// 画面切り替え
function showScreen(screenId) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById('screen-' + screenId).classList.add('active');
}

// ゲーム開始
function startGame() {
  state.currentStage = 0;
  state.currentQuestion = 0;
  state.stagePoints = 0;
  state.dialogueIndex = 0;
  state.discoveryIndex = 0;
  startStage();
}

// 続きから
function continueGame() {
  state.currentQuestion = 0;
  state.stagePoints = 0;
  state.dialogueIndex = 0;
  state.discoveryIndex = 0;
  startStage();
}

// ステージ開始
function startStage() {
  const stage = state.stages[state.currentStage];
  state.dialogueIndex = 0;
  state.discoveryIndex = 0;
  state.stagePoints = 0;
  updateUI();

  // ストーリー画面へ
  elements.storyContent.innerHTML = '';
  showScreen('story');
  showDialogue(stage.opening);
}

// 会話を表示
function showDialogue(dialogues) {
  if (state.dialogueIndex < dialogues.length) {
    const d = dialogues[state.dialogueIndex];
    const char = CHARACTERS[d.c];

    const dialogueEl = document.createElement('div');
    dialogueEl.className = 'dialogue';
    dialogueEl.innerHTML = `
      <div class="dialogue-character">${char.emoji}</div>
      <div class="dialogue-bubble">
        <div class="dialogue-name">${char.name}</div>
        <div class="dialogue-text">${escapeHtml(d.text)}</div>
      </div>
    `;
    elements.storyContent.appendChild(dialogueEl);

    // スクロール
    dialogueEl.scrollIntoView({ behavior: 'smooth', block: 'end' });

    state.dialogueIndex++;

    if (state.dialogueIndex >= dialogues.length) {
      elements.btnStoryNext.textContent = '次へ進む';
    }
  }
}

// 次の会話
function nextDialogue() {
  const stage = state.stages[state.currentStage];

  if (state.dialogueIndex < stage.opening.length) {
    showDialogue(stage.opening);
  } else {
    // 発見パートへ
    state.discoveryIndex = 0;
    elements.discoveryContent.innerHTML = '';
    showScreen('discovery');
    showDiscovery(stage.discovery);
  }
}

// 発見パートを表示
function showDiscovery(discoveries) {
  if (state.discoveryIndex < discoveries.length) {
    const d = discoveries[state.discoveryIndex];
    let el;

    if (d.type === 'code') {
      el = document.createElement('div');
      el.className = 'code-block';
      el.textContent = d.content;
    } else if (d.type === 'point') {
      el = document.createElement('div');
      el.className = 'discovery-point';
      el.innerHTML = `
        <div class="discovery-point-title">💡 ${escapeHtml(d.title)}</div>
        <div class="discovery-point-content">${escapeHtml(d.content)}</div>
      `;
    } else if (d.type === 'image') {
      el = document.createElement('div');
      el.className = 'discovery-point';
      el.innerHTML = `<div class="discovery-point-content">${escapeHtml(d.description)}</div>`;
    } else if (d.speaker) {
      const char = CHARACTERS[d.speaker];
      el = document.createElement('div');
      el.className = 'dialogue';
      el.innerHTML = `
        <div class="dialogue-character">${char.emoji}</div>
        <div class="dialogue-bubble">
          <div class="dialogue-name">${char.name}</div>
          <div class="dialogue-text">${escapeHtml(d.text)}</div>
        </div>
      `;
    }

    if (el) {
      elements.discoveryContent.appendChild(el);
      el.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }

    state.discoveryIndex++;

    if (state.discoveryIndex >= discoveries.length) {
      elements.btnDiscoveryNext.textContent = 'ゲームに進む';
    }
  }
}

// 次の発見
function nextDiscovery() {
  const stage = state.stages[state.currentStage];

  if (state.discoveryIndex < stage.discovery.length) {
    showDiscovery(stage.discovery);
  } else {
    // ゲーム導入へ
    state.dialogueIndex = 0;
    elements.gameIntroContent.innerHTML = '';
    showScreen('game-intro');

    // ゲーム導入の会話を一気に表示
    for (const d of stage.gameIntro) {
      const char = CHARACTERS[d.c];
      const dialogueEl = document.createElement('div');
      dialogueEl.className = 'dialogue';
      dialogueEl.innerHTML = `
        <div class="dialogue-character">${char.emoji}</div>
        <div class="dialogue-bubble">
          <div class="dialogue-name">${char.name}</div>
          <div class="dialogue-text">${escapeHtml(d.text)}</div>
        </div>
      `;
      elements.gameIntroContent.appendChild(dialogueEl);
    }
  }
}

// クイズ開始
function startQuiz() {
  state.currentQuestion = 0;
  showQuestion();
}

// 問題を表示
function showQuestion() {
  const stage = state.stages[state.currentStage];
  const question = stage.questions[state.currentQuestion];

  elements.quizNumber.textContent = `Q${state.currentQuestion + 1}`;
  elements.quizPoints.textContent = `+${question.points}pt`;
  elements.quizQuestion.textContent = question.question;

  // コードブロック
  if (question.code) {
    elements.quizCode.textContent = question.code;
    elements.quizCode.style.display = 'block';
  } else {
    elements.quizCode.style.display = 'none';
  }

  // 選択肢エリアをクリア
  elements.quizChoices.innerHTML = '';

  // 問題タイプに応じてUI生成
  switch (question.type) {
    case 'choice':
    case 'predict':
      renderChoiceQuestion(question);
      break;
    case 'fill':
      renderFillQuestion(question);
      break;
    case 'sort':
      renderSortQuestion(question);
      break;
    case 'match':
      renderMatchQuestion(question);
      break;
  }

  showScreen('quiz');
  updateUI();
}

// 選択問題のUI
function renderChoiceQuestion(question) {
  question.choices.forEach((choice, index) => {
    const btn = document.createElement('button');
    btn.className = 'choice-btn';
    btn.textContent = choice.text;
    btn.addEventListener('click', () => checkChoiceAnswer(index, question));
    elements.quizChoices.appendChild(btn);
  });
}

// 選択問題の判定
function checkChoiceAnswer(index, question) {
  const buttons = elements.quizChoices.querySelectorAll('.choice-btn');
  const isCorrect = question.choices[index].correct;

  // すべてのボタンを無効化
  buttons.forEach((btn, i) => {
    btn.disabled = true;
    if (question.choices[i].correct) {
      btn.classList.add('correct');
    } else if (i === index) {
      btn.classList.add('wrong');
    }
  });

  // 結果を表示
  setTimeout(() => showResult(isCorrect, question), 800);
}

// 穴埋め問題のUI
function renderFillQuestion(question) {
  const container = document.createElement('div');
  container.innerHTML = `
    <input type="text" class="fill-input" placeholder="答えを入力してね" autocomplete="off">
    <button class="btn btn-primary fill-submit">回答する</button>
  `;

  const input = container.querySelector('.fill-input');
  const btn = container.querySelector('.fill-submit');

  btn.addEventListener('click', () => {
    const answer = input.value.trim().toLowerCase();
    const isCorrect = question.acceptableAnswers.some(a => a.toLowerCase() === answer);
    input.disabled = true;
    btn.disabled = true;

    if (isCorrect) {
      input.style.borderColor = 'var(--correct)';
      input.style.background = 'var(--correct-light)';
    } else {
      input.style.borderColor = 'var(--wrong)';
      input.style.background = 'var(--wrong-light)';
    }

    setTimeout(() => showResult(isCorrect, question), 800);
  });

  // Enterキーで回答
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      btn.click();
    }
  });

  elements.quizChoices.appendChild(container);
}

// 並べ替え問題のUI
function renderSortQuestion(question) {
  const container = document.createElement('div');
  container.className = 'sort-items';

  // シャッフルした配列を作成
  const shuffled = [...question.items].sort(() => Math.random() - 0.5);

  shuffled.forEach((item, index) => {
    const itemEl = document.createElement('div');
    itemEl.className = 'sort-item';
    itemEl.draggable = true;
    itemEl.dataset.id = item.id;
    itemEl.innerHTML = `
      <span class="sort-item-number">${index + 1}</span>
      <span class="sort-item-text">${escapeHtml(item.text)}</span>
    `;

    // ドラッグ&ドロップ
    itemEl.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('text/plain', item.id);
      itemEl.classList.add('dragging');
    });

    itemEl.addEventListener('dragend', () => {
      itemEl.classList.remove('dragging');
    });

    itemEl.addEventListener('dragover', (e) => {
      e.preventDefault();
    });

    itemEl.addEventListener('drop', (e) => {
      e.preventDefault();
      const draggedId = e.dataTransfer.getData('text/plain');
      const draggedEl = container.querySelector(`[data-id="${draggedId}"]`);
      const dropTarget = itemEl;

      if (draggedEl && dropTarget && draggedEl !== dropTarget) {
        const allItems = [...container.querySelectorAll('.sort-item')];
        const draggedIndex = allItems.indexOf(draggedEl);
        const dropIndex = allItems.indexOf(dropTarget);

        if (draggedIndex < dropIndex) {
          dropTarget.after(draggedEl);
        } else {
          dropTarget.before(draggedEl);
        }

        // 番号を更新
        updateSortNumbers(container);
      }
    });

    // タッチ対応（簡易版：タップで選択→別のアイテムタップで入れ替え）
    itemEl.addEventListener('click', () => {
      const selected = container.querySelector('.sort-item.selected');
      if (selected && selected !== itemEl) {
        // 入れ替え
        const parent = container;
        const items = [...parent.querySelectorAll('.sort-item')];
        const idx1 = items.indexOf(selected);
        const idx2 = items.indexOf(itemEl);

        if (idx1 < idx2) {
          itemEl.after(selected);
        } else {
          itemEl.before(selected);
        }

        selected.classList.remove('selected');
        updateSortNumbers(container);
      } else {
        container.querySelectorAll('.sort-item').forEach(i => i.classList.remove('selected'));
        itemEl.classList.add('selected');
      }
    });

    container.appendChild(itemEl);
  });

  const submitBtn = document.createElement('button');
  submitBtn.className = 'btn btn-primary sort-submit';
  submitBtn.textContent = '回答する';
  submitBtn.addEventListener('click', () => {
    const items = container.querySelectorAll('.sort-item');
    const userOrder = [...items].map(i => i.dataset.id);
    const isCorrect = JSON.stringify(userOrder) === JSON.stringify(question.correctOrder);

    submitBtn.disabled = true;
    items.forEach(i => {
      i.draggable = false;
      i.style.cursor = 'default';
    });

    setTimeout(() => showResult(isCorrect, question), 500);
  });

  elements.quizChoices.appendChild(container);
  elements.quizChoices.appendChild(submitBtn);
}

// 並べ替えの番号更新
function updateSortNumbers(container) {
  const items = container.querySelectorAll('.sort-item');
  items.forEach((item, index) => {
    item.querySelector('.sort-item-number').textContent = index + 1;
  });
}

// マッチング問題のUI
function renderMatchQuestion(question) {
  const container = document.createElement('div');
  container.className = 'match-container';

  question.pairs.forEach((pair, index) => {
    const itemEl = document.createElement('div');
    itemEl.className = 'match-item';

    const select = document.createElement('select');
    select.className = 'match-select';
    select.dataset.index = index;
    select.innerHTML = `<option value="">選んでね</option>`;
    question.categories.forEach(cat => {
      select.innerHTML += `<option value="${cat}">${cat}</option>`;
    });

    itemEl.innerHTML = `<span class="match-item-text">${escapeHtml(pair.item)}</span>`;
    itemEl.appendChild(select);
    container.appendChild(itemEl);
  });

  const submitBtn = document.createElement('button');
  submitBtn.className = 'btn btn-primary match-submit';
  submitBtn.textContent = '回答する';
  submitBtn.addEventListener('click', () => {
    const selects = container.querySelectorAll('.match-select');
    let allCorrect = true;

    selects.forEach((select, index) => {
      const isCorrect = select.value === question.pairs[index].match;
      select.disabled = true;

      if (isCorrect) {
        select.style.borderColor = 'var(--correct)';
        select.style.background = 'var(--correct-light)';
      } else {
        select.style.borderColor = 'var(--wrong)';
        select.style.background = 'var(--wrong-light)';
        allCorrect = false;
      }
    });

    submitBtn.disabled = true;
    setTimeout(() => showResult(allCorrect, question), 800);
  });

  elements.quizChoices.appendChild(container);
  elements.quizChoices.appendChild(submitBtn);
}

// 結果を表示
function showResult(isCorrect, question) {
  const stage = state.stages[state.currentStage];

  if (isCorrect) {
    state.correctCount++;
    state.totalPoints += question.points;
    state.stagePoints += question.points;

    elements.resultIcon.textContent = '🎉';
    elements.resultTitle.textContent = '正解！';
    elements.resultTitle.className = 'result-title correct';

    renderComments(elements.resultComment, question.correctComment);

    // 紙吹雪
    createConfetti();
  } else {
    elements.resultIcon.textContent = '😊';
    elements.resultTitle.textContent = 'おしい！';
    elements.resultTitle.className = 'result-title wrong';

    renderComments(elements.resultComment, question.wrongComment);
  }

  // MDNリンク
  if (stage.mdnUrl) {
    elements.resultMdnLink.href = stage.mdnUrl;
    elements.resultMdnLink.textContent = `📖 ${stage.mdnTitle}`;
    elements.resultMdnLink.style.display = 'inline-block';
  } else {
    elements.resultMdnLink.style.display = 'none';
  }

  saveProgress();
  updateUI();
  showScreen('result');
}

// コメントを描画
function renderComments(container, comments) {
  container.innerHTML = '';
  comments.forEach(c => {
    const char = CHARACTERS[c.c];
    const dialogueEl = document.createElement('div');
    dialogueEl.className = 'dialogue';
    dialogueEl.innerHTML = `
      <div class="dialogue-character">${char.emoji}</div>
      <div class="dialogue-bubble">
        <div class="dialogue-name">${char.name}</div>
        <div class="dialogue-text">${escapeHtml(c.text)}</div>
      </div>
    `;
    container.appendChild(dialogueEl);
  });
}

// 次の問題
function nextQuestion() {
  const stage = state.stages[state.currentStage];
  state.currentQuestion++;

  if (state.currentQuestion >= stage.questions.length) {
    // ステージクリア
    showStageClear();
  } else {
    showQuestion();
  }
}

// ステージクリア画面
function showStageClear() {
  const stage = state.stages[state.currentStage];

  renderComments(elements.clearComment, stage.clearComment);
  elements.clearPoints.textContent = `+${state.stagePoints}pt 獲得！`;

  // 最後のステージかどうか
  if (state.currentStage >= state.stages.length - 1) {
    elements.btnNextStage.textContent = 'ワールドクリア！';
  } else {
    elements.btnNextStage.textContent = '次のステージへ';
  }

  createConfetti();
  showScreen('stage-clear');
}

// 次のステージ
function nextStage() {
  state.currentStage++;

  if (state.currentStage >= state.stages.length) {
    // ワールドクリア
    showWorldClear();
  } else {
    state.currentQuestion = 0;
    state.stagePoints = 0;
    state.dialogueIndex = 0;
    state.discoveryIndex = 0;
    elements.btnDiscoveryNext.textContent = '次へ';
    elements.btnStoryNext.textContent = '次へ';
    saveProgress();
    startStage();
  }
}

// ワールドクリア画面
function showWorldClear() {
  const newChar = getCharacter();
  const prevChar = EVOLUTION.find(e => e.min < newChar.min) || EVOLUTION[0];

  elements.worldClearCharacter.textContent = newChar.emoji;

  if (newChar.emoji !== prevChar.emoji) {
    elements.worldClearMessage.textContent = `${prevChar.name}が${newChar.name}に進化した！`;
  } else {
    elements.worldClearMessage.textContent = `ワールド${state.currentWorld}クリア！`;
  }

  // クリアコメント
  const lastStage = state.stages[state.stages.length - 1];
  renderComments(elements.worldClearComment, lastStage.clearComment);

  // 次のワールドがあるか（今はワールド1のみ）
  elements.btnNextWorld.textContent = '最初に戻る';

  createConfetti();
  createConfetti();
  showScreen('world-clear');
}

// 次のワールド（今はリセット）
function nextWorld() {
  // ワールド1しかないので最初に戻る
  state.currentStage = 0;
  state.currentQuestion = 0;
  saveProgress();
  showScreen('title');
}

// 紙吹雪エフェクト
function createConfetti() {
  const colors = ['#FF9B50', '#7BC74D', '#FFD93D', '#87CEEB', '#FF8B94', '#BB8FCE'];

  for (let i = 0; i < 50; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.left = Math.random() * 100 + '%';
    confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.animationDelay = Math.random() * 0.5 + 's';
    confetti.style.animationDuration = (2 + Math.random() * 2) + 's';
    elements.confettiContainer.appendChild(confetti);

    // 削除
    setTimeout(() => confetti.remove(), 4000);
  }
}

// HTMLエスケープ
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// 初期化実行
document.addEventListener('DOMContentLoaded', init);
