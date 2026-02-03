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
  answers: {},  // { 'w1s1q1': { correct: true, attempts: 1 } }
  stages: WORLD1_STAGES,
  currentScreen: 'title',
  lastQuestion: null,  // 復習用に最後の問題を保存
  lastQuestionCorrect: null
};

// ===================================================
// ポイント・称号システム
// ===================================================
// 現在の仕様: 初回正解時のみポイント加算、ペナルティなし
// 拡張ポイント:
//   - recordAnswer() でポイント計算ロジックを集約
//   - EVOLUTION で称号閾値を定義
//   - 将来: 連続正解ボーナス、難易度係数、実績システム等

const EVOLUTION = [
  { min: 0, emoji: '🥚', name: 'ビギナー' },
  { min: 10, emoji: '🌱', name: 'めばえ' },
  { min: 20, emoji: '🌸', name: 'つぼみ' },
  { min: 35, emoji: '🌟', name: 'きらめき' },
  { min: 50, emoji: '👑', name: 'マスター' }
];

// 回答を記録してポイント計算
// 戻り値: { pointsEarned, isFirstCorrect, attempts }
function recordAnswer(questionId, isCorrect, basePoints) {
  const past = state.answers[questionId];
  const wasCorrect = past?.correct;
  const attempts = (past?.attempts || 0) + 1;

  let pointsEarned = 0;
  let isFirstCorrect = false;

  if (isCorrect && !wasCorrect) {
    // 初回正解: ポイント付与
    pointsEarned = basePoints;
    isFirstCorrect = true;
    state.correctCount++;
    state.totalPoints += pointsEarned;
    state.stagePoints += pointsEarned;
  }

  // 回答履歴を更新
  state.answers[questionId] = {
    correct: isCorrect || wasCorrect,  // 一度正解したらtrue維持
    attempts
  };

  return { pointsEarned, isFirstCorrect, attempts };
}

// DOM要素のキャッシュ
const elements = {};

// 初期化
function init() {
  cacheElements();
  loadProgress();
  setupEventListeners();
  setupKeyboardShortcuts();
  updateUI();
}

// DOM要素をキャッシュ
function cacheElements() {
  elements.character = document.getElementById('character');
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
  elements.btnRetryQuestion = document.getElementById('btn-retry-question');
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
  elements.resultCorrectAnswer = document.getElementById('result-correct-answer');
  elements.resultMdnLink = document.getElementById('result-mdn-link');
  elements.clearComment = document.getElementById('clear-comment');
  elements.clearPoints = document.getElementById('clear-points');
  elements.worldClearCharacter = document.getElementById('world-clear-character');
  elements.worldClearMessage = document.getElementById('world-clear-message');
  elements.worldClearComment = document.getElementById('world-clear-comment');
  elements.confettiContainer = document.getElementById('confetti-container');
  // ナビゲーション
  elements.btnHome = document.getElementById('btn-home');
  elements.navStageSelect = document.getElementById('nav-stage-select');
  elements.navQuestionSelect = document.getElementById('nav-question-select');
}

// イベントリスナー設定
function setupEventListeners() {
  elements.btnStart.addEventListener('click', startGame);
  elements.btnContinue.addEventListener('click', continueGame);
  elements.btnStoryNext.addEventListener('click', goToDiscovery);
  elements.btnDiscoveryNext.addEventListener('click', goToGameIntro);
  elements.btnStartGame.addEventListener('click', startQuiz);
  elements.btnNextQuestion.addEventListener('click', nextQuestion);
  if (elements.btnRetryQuestion) {
    elements.btnRetryQuestion.addEventListener('click', retryQuestion);
  }
  elements.btnNextStage.addEventListener('click', nextStage);
  elements.btnNextWorld.addEventListener('click', nextWorld);

  // ヘッダーナビゲーション
  if (elements.btnHome) {
    elements.btnHome.addEventListener('click', goToTitle);
  }
  if (elements.navStageSelect) {
    elements.navStageSelect.addEventListener('change', handleNavStageChange);
  }
  if (elements.navQuestionSelect) {
    elements.navQuestionSelect.addEventListener('change', handleNavQuestionChange);
  }
}

// キーボードショートカット
function setupKeyboardShortcuts() {
  document.addEventListener('keydown', (e) => {
    // 入力中は無視
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT') return;

    // Enter, Space, → で次へ進む
    if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowRight') {
      e.preventDefault();
      handleNextAction();
    }
  });
}

// 現在の画面に応じて次のアクションを実行
function handleNextAction() {
  switch (state.currentScreen) {
    case 'title':
      if (elements.btnContinue.style.display !== 'none') {
        continueGame();
      } else {
        startGame();
      }
      break;
    case 'story':
      goToDiscovery();
      break;
    case 'discovery':
      goToGameIntro();
      break;
    case 'game-intro':
      startQuiz();
      break;
    case 'result':
      nextQuestion();
      break;
    case 'stage-clear':
      nextStage();
      break;
    case 'world-clear':
      nextWorld();
      break;
    // quiz画面ではキーボードショートカットは使わない（選択操作があるため）
  }
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

  // ステージ選択を更新
  updateNavStageSelect();
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

// ナビゲーション：ステージ選択を更新
function updateNavStageSelect() {
  if (!elements.navStageSelect) return;

  const currentValue = elements.navStageSelect.value;
  elements.navStageSelect.innerHTML = '<option value="">ステージ</option>';

  state.stages.forEach((stage, index) => {
    const option = document.createElement('option');
    option.value = index;

    // このステージの正解数をカウント
    let correctInStage = 0;
    let totalInStage = stage.questions.length;
    stage.questions.forEach(q => {
      if (state.answers[q.id]?.correct) correctInStage++;
    });

    const status = correctInStage === totalInStage ? '✅' :
                   correctInStage > 0 ? `${correctInStage}/${totalInStage}` : '';
    option.textContent = `${stage.stage}. ${stage.title} ${status}`;

    if (index === state.currentStage) {
      option.selected = true;
    }
    elements.navStageSelect.appendChild(option);
  });
}

// ナビゲーション：問題選択を更新
function updateNavQuestionSelect() {
  if (!elements.navQuestionSelect) return;

  const stage = state.stages[state.currentStage];
  elements.navQuestionSelect.innerHTML = '<option value="">問題</option>';

  if (!stage) return;

  stage.questions.forEach((q, index) => {
    const option = document.createElement('option');
    option.value = index;

    const answered = state.answers[q.id];
    const status = answered?.correct ? '✅' : answered ? '❌' : '';
    option.textContent = `Q${index + 1} ${status}`;

    if (index === state.currentQuestion) {
      option.selected = true;
    }
    elements.navQuestionSelect.appendChild(option);
  });
}

// ナビゲーション：ステージ変更ハンドラ
function handleNavStageChange(e) {
  if (e.target.value === '') return;

  state.currentStage = parseInt(e.target.value);
  state.currentQuestion = 0;
  state.stagePoints = 0;
  startStage();
}

// ナビゲーション：問題変更ハンドラ
function handleNavQuestionChange(e) {
  if (e.target.value === '') return;

  state.currentQuestion = parseInt(e.target.value);
  showQuestion();
}

// トップ画面に戻る
function goToTitle() {
  showScreen('title');
  updateUI();
}

// UI更新
function updateUI() {
  // プログレスバー（正解した問題数ベース）
  const totalQuestions = state.stages.reduce((sum, s) => sum + s.questions.length, 0);
  let correctQuestions = 0;
  Object.values(state.answers).forEach(a => {
    if (a.correct) correctQuestions++;
  });
  const progress = Math.round((correctQuestions / totalQuestions) * 100);
  elements.progressFill.style.width = progress + '%';
  elements.progressText.textContent = progress + '%';

  // ポイント
  elements.totalPoints.textContent = '💰 ' + state.totalPoints + 'pt';

  // キャラクター
  const character = getCharacter();
  elements.character.textContent = character.emoji;
  elements.footerCharacter.textContent = character.emoji;

  // ナビゲーション更新
  updateNavStageSelect();
  updateNavQuestionSelect();
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
  state.currentScreen = screenId;
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById('screen-' + screenId).classList.add('active');
}

// ゲーム開始
function startGame() {
  state.currentStage = 0;
  state.currentQuestion = 0;
  state.stagePoints = 0;
  startStage();
}

// 続きから
function continueGame() {
  state.currentQuestion = 0;
  state.stagePoints = 0;
  startStage();
}

// ステージ開始
function startStage() {
  const stage = state.stages[state.currentStage];
  state.stagePoints = 0;
  updateUI();

  // ストーリー画面へ - 会話を一気に表示
  elements.storyContent.innerHTML = '';
  showAllDialogues(elements.storyContent, stage.opening);
  showScreen('story');
}

// 会話を一気に表示
function showAllDialogues(container, dialogues) {
  dialogues.forEach((d, index) => {
    const char = CHARACTERS[d.c];
    const isProtagonist = d.c === 'tama';
    const dialogueEl = document.createElement('div');
    dialogueEl.className = `dialogue${isProtagonist ? ' is-protagonist' : ''}`;
    dialogueEl.style.animationDelay = (index * 0.1) + 's';
    dialogueEl.innerHTML = `
      <div class="dialogue-character">${char.emoji}</div>
      <div class="dialogue-bubble char-${d.c}">
        <div class="dialogue-name">${char.name}</div>
        <div class="dialogue-text">${escapeHtml(d.text)}</div>
      </div>
    `;
    container.appendChild(dialogueEl);
  });
}

// 発見パートへ
function goToDiscovery() {
  const stage = state.stages[state.currentStage];
  elements.discoveryContent.innerHTML = '';
  showAllDiscoveries(elements.discoveryContent, stage.discovery);
  showScreen('discovery');
}

// 発見パートを一気に表示
function showAllDiscoveries(container, discoveries) {
  discoveries.forEach((d, index) => {
    let el;

    if (d.type === 'code') {
      el = document.createElement('div');
      el.className = 'code-wrapper';

      // コードブロック
      const codeEl = document.createElement('div');
      codeEl.className = 'code-block';
      codeEl.textContent = d.content;
      el.appendChild(codeEl);

      // HTMLプレビューを追加（安全なHTMLのみ）
      if (shouldShowPreview(d.content)) {
        const previewEl = createHtmlPreview(d.content);
        el.appendChild(previewEl);
      }
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
      const isProtagonist = d.speaker === 'tama';
      el = document.createElement('div');
      el.className = `dialogue${isProtagonist ? ' is-protagonist' : ''}`;
      el.innerHTML = `
        <div class="dialogue-character">${char.emoji}</div>
        <div class="dialogue-bubble char-${d.speaker}">
          <div class="dialogue-name">${char.name}</div>
          <div class="dialogue-text">${escapeHtml(d.text)}</div>
        </div>
      `;
    }

    if (el) {
      el.style.animationDelay = (index * 0.05) + 's';
      container.appendChild(el);
    }
  });
}

// HTMLプレビューを表示すべきか判定
function shouldShowPreview(code) {
  // 構造系タグは除外（プレビューしても意味がない）
  const excludePatterns = ['<!DOCTYPE', '<html', '<head', '<body', '<meta', '<title>'];
  if (excludePatterns.some(p => code.includes(p))) return false;

  // 単純なHTMLタグを含む場合のみプレビュー
  const previewableTags = ['<p>', '<h1>', '<h2>', '<h3>', '<h4>', '<h5>', '<h6>',
                           '<ul>', '<ol>', '<li>', '<strong>', '<em>', '<b>', '<i>'];
  return previewableTags.some(tag => code.includes(tag));
}

// HTMLプレビューを生成
function createHtmlPreview(code) {
  const wrapper = document.createElement('div');
  wrapper.className = 'html-preview';
  wrapper.innerHTML = `
    <div class="html-preview-label">👁 ブラウザで見ると...</div>
    <div class="html-preview-content"></div>
  `;

  const content = wrapper.querySelector('.html-preview-content');
  // 安全なタグのみ許可してレンダリング
  const safeHtml = sanitizeHtml(code);
  content.innerHTML = safeHtml;

  return wrapper;
}

// 安全なHTMLタグのみ残す
function sanitizeHtml(html) {
  const temp = document.createElement('div');
  temp.innerHTML = html;

  // スクリプトや危険な要素を削除
  const scripts = temp.querySelectorAll('script, style, iframe, object, embed');
  scripts.forEach(s => s.remove());

  // href属性からjavascript:を除去
  const links = temp.querySelectorAll('a[href^="javascript:"]');
  links.forEach(a => a.removeAttribute('href'));

  return temp.innerHTML;
}

// ゲーム導入へ
function goToGameIntro() {
  const stage = state.stages[state.currentStage];
  elements.gameIntroContent.innerHTML = '';
  showAllDialogues(elements.gameIntroContent, stage.gameIntro);
  showScreen('game-intro');
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

  // この問題の過去の回答状況を確認
  const pastAnswer = state.answers[question.id];
  const alreadyCorrect = pastAnswer && pastAnswer.correct;

  elements.quizNumber.textContent = `Q${state.currentQuestion + 1}`;

  // 既に正解済みならポイント表示を変える
  if (alreadyCorrect) {
    elements.quizPoints.textContent = '✅ 正解済み';
    elements.quizPoints.style.color = 'var(--correct)';
  } else {
    elements.quizPoints.textContent = `+${question.points}pt`;
    elements.quizPoints.style.color = '';
  }

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

  // 自動フォーカス
  setTimeout(() => input.focus(), 100);
}

// 並べ替え問題のUI
function renderSortQuestion(question) {
  const wrapper = document.createElement('div');
  wrapper.className = 'sort-container';

  // ドラッグ可能なアイテム
  const itemsContainer = document.createElement('div');
  itemsContainer.className = 'sort-items';

  // シャッフルした配列を作成
  const shuffled = [...question.items].sort(() => Math.random() - 0.5);

  // ラベル（a, b, c, d, e...）を生成
  const labels = 'abcdefghij'.split('');

  shuffled.forEach((item) => {
    const itemEl = document.createElement('div');
    itemEl.className = 'sort-item';
    itemEl.draggable = true;
    itemEl.dataset.id = item.id;
    // ラベルをアイテムにくっつける（アイテムIDからラベルを取得）
    const labelIndex = question.items.findIndex(i => i.id === item.id);
    const label = labels[labelIndex] || item.id;
    itemEl.innerHTML = `<span class="sort-item-label">${label}</span><span class="sort-item-text">${escapeHtml(item.text)}</span>`;

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
      const draggedEl = itemsContainer.querySelector(`[data-id="${draggedId}"]`);
      const dropTarget = itemEl;

      if (draggedEl && dropTarget && draggedEl !== dropTarget) {
        const allItems = [...itemsContainer.querySelectorAll('.sort-item')];
        const draggedIndex = allItems.indexOf(draggedEl);
        const dropIndex = allItems.indexOf(dropTarget);

        if (draggedIndex < dropIndex) {
          dropTarget.after(draggedEl);
        } else {
          dropTarget.before(draggedEl);
        }

        // 移動フィードバック
        draggedEl.classList.add('just-moved');
        setTimeout(() => draggedEl.classList.remove('just-moved'), 300);
      }
    });

    // タッチ対応（タップで選択→別のアイテムタップで入れ替え）
    itemEl.addEventListener('click', () => {
      const selected = itemsContainer.querySelector('.sort-item.selected');
      if (selected && selected !== itemEl) {
        // 入れ替え
        const items = [...itemsContainer.querySelectorAll('.sort-item')];
        const idx1 = items.indexOf(selected);
        const idx2 = items.indexOf(itemEl);

        if (idx1 < idx2) {
          itemEl.after(selected);
        } else {
          itemEl.before(selected);
        }

        selected.classList.remove('selected');
        // 移動フィードバック
        selected.classList.add('just-moved');
        setTimeout(() => selected.classList.remove('just-moved'), 300);
      } else {
        itemsContainer.querySelectorAll('.sort-item').forEach(i => i.classList.remove('selected'));
        itemEl.classList.add('selected');
      }
    });

    itemsContainer.appendChild(itemEl);
  });

  wrapper.appendChild(itemsContainer);

  const submitBtn = document.createElement('button');
  submitBtn.className = 'btn btn-primary sort-submit';
  submitBtn.textContent = '回答する';
  submitBtn.addEventListener('click', () => {
    const items = itemsContainer.querySelectorAll('.sort-item');
    const userOrder = [...items].map(i => i.dataset.id);
    const isCorrect = JSON.stringify(userOrder) === JSON.stringify(question.correctOrder);

    submitBtn.disabled = true;
    items.forEach(i => {
      i.draggable = false;
      i.style.cursor = 'default';
    });

    setTimeout(() => showResult(isCorrect, question), 500);
  });

  elements.quizChoices.appendChild(wrapper);
  elements.quizChoices.appendChild(submitBtn);
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

  // 保存用
  state.lastQuestion = question;
  state.lastQuestionCorrect = isCorrect;

  // 回答を記録（ポイント計算もここで）
  const result = recordAnswer(question.id, isCorrect, question.points);

  if (isCorrect) {
    elements.resultIcon.textContent = '🎉';
    elements.resultTitle.textContent = result.isFirstCorrect ? '正解！' : '復習OK！';
    elements.resultTitle.className = 'result-title correct';

    renderComments(elements.resultComment, question.correctComment);

    // 正答表示は非表示
    if (elements.resultCorrectAnswer) {
      elements.resultCorrectAnswer.style.display = 'none';
    }

    // 初回正解時のみ紙吹雪
    if (result.isFirstCorrect) {
      createConfetti();
    }
  } else {
    elements.resultIcon.textContent = '😊';
    elements.resultTitle.textContent = 'おしい！';
    elements.resultTitle.className = 'result-title wrong';

    renderComments(elements.resultComment, question.wrongComment);

    // 正答を表示
    if (elements.resultCorrectAnswer) {
      const correctAnswerText = getCorrectAnswerText(question);
      elements.resultCorrectAnswer.innerHTML = `<div class="correct-answer-box">💡 正解: ${escapeHtml(correctAnswerText)}</div>`;
      elements.resultCorrectAnswer.style.display = 'block';
    }
  }

  // MDNリンク
  if (stage.mdnUrl) {
    elements.resultMdnLink.href = stage.mdnUrl;
    elements.resultMdnLink.textContent = `📖 ${stage.mdnTitle}`;
    elements.resultMdnLink.style.display = 'inline-block';
  } else {
    elements.resultMdnLink.style.display = 'none';
  }

  // もう一度ボタンの表示
  if (elements.btnRetryQuestion) {
    elements.btnRetryQuestion.style.display = isCorrect ? 'none' : 'inline-block';
  }

  saveProgress();
  updateUI();
  showScreen('result');
}

// 正答テキストを取得
function getCorrectAnswerText(question) {
  switch (question.type) {
    case 'choice':
    case 'predict':
      const correct = question.choices.find(c => c.correct);
      return correct ? correct.text : '';
    case 'fill':
      return question.answer || question.acceptableAnswers[0];
    case 'sort':
      return question.correctOrder.map((id, i) => {
        const item = question.items.find(item => item.id === id);
        return `${i+1}. ${item.text}`;
      }).join('\n');
    case 'match':
      return question.pairs.map(p => `${p.item} → ${p.match}`).join('\n');
    default:
      return '';
  }
}

// もう一度挑戦
function retryQuestion() {
  showQuestion();
}

// コメントを描画
function renderComments(container, comments) {
  container.innerHTML = '';
  comments.forEach((c, index) => {
    const char = CHARACTERS[c.c];
    const isProtagonist = c.c === 'tama';
    const dialogueEl = document.createElement('div');
    dialogueEl.className = `dialogue${isProtagonist ? ' is-protagonist' : ''}`;
    dialogueEl.style.animationDelay = (index * 0.1) + 's';
    dialogueEl.innerHTML = `
      <div class="dialogue-character">${char.emoji}</div>
      <div class="dialogue-bubble char-${c.c}">
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
  elements.clearPoints.textContent = state.stagePoints > 0 ?
    `+${state.stagePoints}pt 獲得！` :
    '復習完了！';

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
    saveProgress();
    startStage();
  }
}

// ワールドクリア画面
function showWorldClear() {
  const newChar = getCharacter();
  const prevCharIndex = EVOLUTION.findIndex(e => e.emoji === newChar.emoji) - 1;
  const prevChar = prevCharIndex >= 0 ? EVOLUTION[prevCharIndex] : null;

  elements.worldClearCharacter.textContent = newChar.emoji;

  if (prevChar && prevChar.emoji !== newChar.emoji) {
    elements.worldClearMessage.textContent = `称号「${newChar.name}」を獲得！`;
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
