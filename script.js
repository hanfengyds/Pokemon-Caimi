// 游戏状态变量
let currentScore = 15;
let caughtPokemon = new Set();
let currentPuzzle = null;
let currentPuzzleIndex = 0;
let puzzles = [];
let usedHints = new Set();
let expandedHints = new Set();
let currentMediaHintIndex = -1;
let answeredPuzzles = new Set();
let usedTypeBag = new Set();

// 本地存储键名
const STORAGE_KEYS = {
    SCORE: 'pokemon_game_score',
    CAUGHT_POKEMON: 'pokemon_game_caught',
    ANSWERED_PUZZLES: 'pokemon_game_answered',
    USED_HINTS: 'pokemon_game_used_hints',
    USED_TYPE_BAG: 'pokemon_game_used_type_bag'
};

// DOM元素
let menuScreen;
let puzzleScreen;
let pokedexScreen;
let startGameBtn;
let viewPokedexBtn;
let resetGameBtn;
let backToMenuBtn;
let backFromPokedexBtn;
let scoreElement;
let puzzleScoreElement;
let hintsContainer;
let mediaContainer;
let answerInput;
let submitAnswerBtn;
let pokedexContainer;
let modal;
let modalMessage;
let modalCloseBtn;
let correctModal;
let correctMessage;
let nextPuzzleBtn;
let returnMenuBtn;
let designerScreen;
let designerModeBtn;
let backFromDesignerBtn;
let designerContainer;
let typeBagBtn;
let magnifierBtn;

// 当DOM加载完成后初始化游戏
document.addEventListener('DOMContentLoaded', function() {
    // 获取DOM元素
    menuScreen = document.getElementById('menu-screen');
    puzzleScreen = document.getElementById('puzzle-screen');
    pokedexScreen = document.getElementById('pokedex-screen');
    startGameBtn = document.getElementById('start-game');
    resetGameBtn = document.getElementById('reset-game');
    viewPokedexBtn = document.getElementById('view-pokedex');
    backToMenuBtn = document.getElementById('back-to-menu');
    backFromPokedexBtn = document.getElementById('back-from-pokedex');
    scoreElement = document.getElementById('score');
    puzzleScoreElement = document.getElementById('puzzle-score');
    hintsContainer = document.getElementById('hints-container');
    mediaContainer = document.getElementById('media-container');
    answerInput = document.getElementById('answer-input');
    submitAnswerBtn = document.getElementById('submit-answer');
    pokedexContainer = document.getElementById('pokedex-container');
    modal = document.getElementById('modal');
    modalMessage = document.getElementById('modal-message');
    modalCloseBtn = document.getElementById('modal-close');
    correctModal = document.getElementById('correct-modal');
    correctMessage = document.getElementById('correct-message');
    nextPuzzleBtn = document.getElementById('next-puzzle');
    returnMenuBtn = document.getElementById('return-menu');
    designerScreen = document.getElementById('designer-screen');
    designerModeBtn = document.getElementById('designer-mode');
    backFromDesignerBtn = document.getElementById('back-from-designer');
    designerContainer = document.getElementById('designer-container');
    typeBagBtn = document.getElementById('type-bag');
    magnifierBtn = document.getElementById('magnifier');
    
    // 初始化游戏
    initGame();
});

// 初始化游戏
function initGame() {
    // 从本地存储加载数据
    loadFromLocalStorage();
    
    updateScoreDisplay();
    loadPuzzleData();
    setupEventListeners();
    updatePokedex();
}

// 从本地存储加载数据
function loadFromLocalStorage() {
    try {
        // 加载分数
        const savedScore = localStorage.getItem(STORAGE_KEYS.SCORE);
        if (savedScore !== null) {
            const parsedScore = parseInt(savedScore);
            if (!isNaN(parsedScore)) {
                currentScore = parsedScore;
            }
        }
        
        // 加载已捕获的宝可梦
        const savedCaught = localStorage.getItem(STORAGE_KEYS.CAUGHT_POKEMON);
        if (savedCaught !== null) {
            caughtPokemon = new Set(JSON.parse(savedCaught));
        }
        
        // 加载已回答的谜题
        const savedAnswered = localStorage.getItem(STORAGE_KEYS.ANSWERED_PUZZLES);
        if (savedAnswered !== null) {
            answeredPuzzles = new Set(JSON.parse(savedAnswered));
        }
        
        // 加载已使用的提示
        const savedUsedHints = localStorage.getItem(STORAGE_KEYS.USED_HINTS);
        if (savedUsedHints !== null) {
            usedHints = new Set(JSON.parse(savedUsedHints));
        }
        
        // 加载已使用的属性锦囊
        const savedUsedTypeBag = localStorage.getItem(STORAGE_KEYS.USED_TYPE_BAG);
        if (savedUsedTypeBag !== null) {
            usedTypeBag = new Set(JSON.parse(savedUsedTypeBag));
        }
    } catch (error) {
        console.error('从本地存储加载数据失败:', error);
        // 重置为默认值
        currentScore = 15;
        caughtPokemon = new Set();
        answeredPuzzles = new Set();
        usedHints = new Set();
        usedTypeBag = new Set();
    }
}

// 保存数据到本地存储
function saveToLocalStorage() {
    try {
        localStorage.setItem(STORAGE_KEYS.SCORE, currentScore.toString());
        localStorage.setItem(STORAGE_KEYS.CAUGHT_POKEMON, JSON.stringify([...caughtPokemon]));
        localStorage.setItem(STORAGE_KEYS.ANSWERED_PUZZLES, JSON.stringify([...answeredPuzzles]));
        localStorage.setItem(STORAGE_KEYS.USED_HINTS, JSON.stringify([...usedHints]));
        localStorage.setItem(STORAGE_KEYS.USED_TYPE_BAG, JSON.stringify([...usedTypeBag]));
    } catch (error) {
        console.error('保存数据到本地存储失败:', error);
    }
}

// 重置游戏
function resetGame() {
    if (confirm('确定要重置游戏吗？这会清除所有进度和图鉴收集。')) {
        // 重置游戏状态
        currentScore = 15;
        caughtPokemon = new Set();
        answeredPuzzles = new Set();
        usedHints = new Set();
        usedTypeBag = new Set();
        
        // 保存重置后的数据
        saveToLocalStorage();
        
        // 更新界面
        updateScoreDisplay();
        updatePokedex();
        
        // 显示重置成功提示
        showModal('游戏已重置！所有进度和图鉴已清除。');
    }
}

// 更新积分显示
function updateScoreDisplay() {
    if (scoreElement) {
        scoreElement.textContent = currentScore;
    }
    if (puzzleScoreElement) {
        puzzleScoreElement.textContent = currentScore;
    }
}

// 加载谜题数据
function loadPuzzleData() {
    // 加载所有谜题
    puzzles = [puzzle1, puzzle2, puzzle3, puzzle4, puzzle5, puzzle6, puzzle7, puzzle8, puzzle9, puzzle10, puzzle11, puzzle12, puzzle13, puzzle14, puzzle15, puzzle16, puzzle17, puzzle18, puzzle19, puzzle20, puzzle21, puzzle22, puzzle23, puzzle24, puzzle25, puzzle26, puzzle27, puzzle28, puzzle29, puzzle30, puzzle31, puzzle32];
    selectRandomPuzzle();
}

// 随机选择一个未答过的谜题
function selectRandomPuzzle() {
    const unAnsweredPuzzles = puzzles.filter((puzzle, index) => !answeredPuzzles.has(index));
    
    if (unAnsweredPuzzles.length === 0) {
        // 所有谜题都答过了，重置
        answeredPuzzles.clear();
        showModal('所有谜题都已答过，重新开始！');
        selectRandomPuzzle(); // 递归调用，重新选择
        return;
    }
    
    // 随机选择一个谜题
    const randomIndex = Math.floor(Math.random() * unAnsweredPuzzles.length);
    const selectedPuzzle = unAnsweredPuzzles[randomIndex];
    currentPuzzle = selectedPuzzle;
    currentPuzzleIndex = puzzles.indexOf(selectedPuzzle);
    // 重置线索区标题
    const mediaSectionH3 = document.querySelector('.media-section h3');
    if (mediaSectionH3) {
        mediaSectionH3.innerHTML = '线索区';
        mediaSectionH3.style.display = 'block';
    }
}

// 设置事件监听器
function setupEventListeners() {
    // 主菜单按钮
    if (startGameBtn) startGameBtn.addEventListener('click', startGame);
    if (viewPokedexBtn) viewPokedexBtn.addEventListener('click', viewPokedex);
    if (resetGameBtn) resetGameBtn.addEventListener('click', resetGame);
    
    // 谜题界面按钮
    if (backToMenuBtn) backToMenuBtn.addEventListener('click', showMenu);
    if (submitAnswerBtn) submitAnswerBtn.addEventListener('click', checkAnswer);
    if (answerInput) answerInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            checkAnswer();
        }
    });
    if (typeBagBtn) typeBagBtn.addEventListener('click', useTypeBag);
    if (magnifierBtn) magnifierBtn.addEventListener('click', useMagnifier);
    
    // 图鉴界面按钮
    if (backFromPokedexBtn) backFromPokedexBtn.addEventListener('click', showMenu);
    
    // 设计者模式按钮
    if (designerModeBtn) designerModeBtn.addEventListener('click', showDesigner);
    if (backFromDesignerBtn) backFromDesignerBtn.addEventListener('click', showMenu);
    
    // 弹窗按钮
    if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
    if (nextPuzzleBtn) nextPuzzleBtn.addEventListener('click', nextPuzzle);
    if (returnMenuBtn) returnMenuBtn.addEventListener('click', showMenu);
}

// 开始游戏
function startGame() {
    // 重置提示使用状态
    usedHints.clear();
    // 重置提示展开状态
    expandedHints.clear();
    // 显示谜题界面
    showPuzzle();
    // 渲染谜题提示
    renderHints();
    // 清空媒体容器（输入题和排序题不需要清空，因为initInputGame和initSequenceGame已经设置了内容）
    if (currentPuzzle.type !== 'input' && currentPuzzle.type !== 'sequence') {
        mediaContainer.innerHTML = '';
    }
    // 清空答案输入
    answerInput.value = '';
    // 重置属性锦囊按钮状态
    resetTypeBagButton();
    // 显示锦囊容器
    const bagContainer = document.querySelector('.bag-container');
    if (bagContainer) {
        bagContainer.style.display = 'flex';
    }
}

// 重置属性锦囊按钮状态
function resetTypeBagButton() {
    // 重置线索区标题
    const mediaSectionH3 = document.querySelector('.media-section h3');
    const typeHintDisplay = document.getElementById('type-hint-display');
    
    if (mediaSectionH3) {
        mediaSectionH3.style.display = 'block';
    }
    
    if (typeHintDisplay) {
        typeHintDisplay.innerHTML = '';
        typeHintDisplay.style.display = 'none';
    }
    
    // 重新获取按钮引用并绑定事件监听器
    typeBagBtn = document.getElementById('type-bag');
    magnifierBtn = document.getElementById('magnifier');
    
    if (typeBagBtn) {
        typeBagBtn.classList.remove('used');
        typeBagBtn.addEventListener('click', useTypeBag);
        // 设置属性锦囊的悬浮文字
        if (currentPuzzle && currentPuzzle.typeCost) {
            typeBagBtn.title = `消耗${currentPuzzle.typeCost}分，获得属性提示`;
        } else {
            typeBagBtn.title = '消耗0分，获得属性提示';
        }
    }
    if (magnifierBtn) {
        magnifierBtn.addEventListener('click', useMagnifier);
        // 设置剪影锦囊的悬浮文字
        magnifierBtn.title = '消耗7分，获得宝可梦的剪影';
    }
}

// 使用属性锦囊
function useTypeBag() {
    if (!currentPuzzle) {
        showModal('请先开始游戏！');
        return;
    }
    
    if (usedTypeBag.has(currentPuzzleIndex)) {
        showModal('本关已使用过属性锦囊！');
        return;
    }
    
    if (currentScore < currentPuzzle.typeCost) {
        showModal(`积分不足！需要 ${currentPuzzle.typeCost} 分`);
        return;
    }
    
    // 扣除积分
    currentScore -= currentPuzzle.typeCost;
    updateScoreDisplay();
    
    // 标记已使用
    usedTypeBag.add(currentPuzzleIndex);
    
    // 禁用按钮
    typeBagBtn.classList.add('used');
    
    // 显示属性提示
    showTypeHint();
}

// 使用放大镜
function useMagnifier() {
    if (!currentPuzzle) {
        showModal('请先开始游戏！');
        return;
    }
    
    if (currentScore < 7) {
        showModal('积分不足！需要 7 分');
        return;
    }
    
    // 扣除积分
    currentScore -= 7;
    updateScoreDisplay();
    
    // 显示剪影
    showSilhouette();
}

// 显示剪影
function showSilhouette() {
    const mediaContainer = document.getElementById('media-container');
    
    // 创建剪影图片
    const silhouetteImg = document.createElement('img');
    silhouetteImg.src = `assets/silhouette/${currentPuzzleIndex + 1}.png`;
    silhouetteImg.alt = '宝可梦剪影';
    silhouetteImg.className = 'silhouette-img';
    
    // 清空媒体容器并添加剪影
    mediaContainer.innerHTML = '';
    mediaContainer.appendChild(silhouetteImg);
}

// 连连看游戏相关变量
let selectedImage = null;
let selectedName = null;
let connections = [];
let matchedPairs = [];
let colorOrder = ['red', 'blue', 'green', 'yellow'];
let imageColorIndex = 0;
let nameColorIndex = 0;
let imageColorMap = new Map();
let nameColorMap = new Map();

// 初始化连连看游戏
function initMatchGame() {
    selectedImage = null;
    selectedName = null;
    connections = [];
    matchedPairs = [];
    colorOrder = ['red', 'blue', 'green', 'yellow'];
    imageColorIndex = 0;
    nameColorIndex = 0;
    imageColorMap = new Map();
    nameColorMap = new Map();
    
    const imageItems = document.getElementById('image-items');
    const nameItems = document.getElementById('name-items');
    
    // 清空容器
    imageItems.innerHTML = '';
    nameItems.innerHTML = '';
    
    // 清除旧的连线
    document.querySelectorAll('.match-connection').forEach(conn => conn.remove());
    
    // 复制并打乱项目
    const items = [...currentPuzzle.matchItems];
    const shuffledImages = shuffleArray([...items]);
    const shuffledNames = shuffleArray([...items]);
    
    // 创建图片项
    shuffledImages.forEach((item, index) => {
        const imgItem = document.createElement('div');
        imgItem.className = 'match-item';
        imgItem.dataset.id = item.name;
        imgItem.innerHTML = `
            <img src="Puzzle File/14/${item.image}" alt="${item.name}">
            <div class="name">${index + 1}</div>
        `;
        imgItem.addEventListener('click', () => handleImageClick(imgItem));
        imageItems.appendChild(imgItem);
    });
    
    // 创建名字项
    shuffledNames.forEach((item, index) => {
        const nameItem = document.createElement('div');
        nameItem.className = 'match-item';
        nameItem.dataset.id = item.name;
        nameItem.innerHTML = `
            <div class="name">${item.name}</div>
        `;
        nameItem.addEventListener('click', () => handleNameClick(nameItem));
        nameItems.appendChild(nameItem);
    });
    
    // 添加提交按钮事件
    document.getElementById('submit-match').addEventListener('click', submitMatch);
}

// 打乱数组
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// 处理图片点击
function handleImageClick(item) {
    const itemId = item.dataset.id;
    
    if (imageColorMap.has(itemId)) {
        // 取消颜色
        const color = imageColorMap.get(itemId);
        item.classList.remove(color);
        item.classList.remove('selected');
        imageColorMap.delete(itemId);
        
        // 重新计算颜色索引
        updateImageColorIndex();
    } else {
        // 分配新颜色
        if (imageColorIndex < colorOrder.length) {
            const color = colorOrder[imageColorIndex];
            item.classList.add(color);
            item.classList.add('selected');
            imageColorMap.set(itemId, color);
            imageColorIndex++;
        }
    }
}

// 处理名字点击
function handleNameClick(item) {
    const itemId = item.dataset.id;
    
    if (nameColorMap.has(itemId)) {
        // 取消颜色
        const color = nameColorMap.get(itemId);
        item.classList.remove(color);
        item.classList.remove('selected');
        nameColorMap.delete(itemId);
        
        // 重新计算颜色索引
        updateNameColorIndex();
    } else {
        // 分配新颜色
        if (nameColorIndex < colorOrder.length) {
            const color = colorOrder[nameColorIndex];
            item.classList.add(color);
            item.classList.add('selected');
            nameColorMap.set(itemId, color);
            nameColorIndex++;
        }
    }
}

// 更新图片颜色索引
function updateImageColorIndex() {
    const usedColors = new Set(imageColorMap.values());
    imageColorIndex = usedColors.size;
}

// 更新名字颜色索引
function updateNameColorIndex() {
    const usedColors = new Set(nameColorMap.values());
    nameColorIndex = usedColors.size;
}

// 提交连连看答案
function submitMatch() {
    let correctCount = 0;
    let wrongCount = 0;
    
    // 检查所有颜色匹配
    colorOrder.forEach(color => {
        // 找到该颜色的图片和名字
        let imageWithColor = null;
        let nameWithColor = null;
        
        // 查找图片
        imageColorMap.forEach((imgColor, imgId) => {
            if (imgColor === color) {
                const imgElement = Array.from(document.querySelectorAll('#image-items .match-item')).find(item => 
                    item.dataset.id === imgId
                );
                if (imgElement) imageWithColor = imgElement;
            }
        });
        
        // 查找名字
        nameColorMap.forEach((nameColor, nameId) => {
            if (nameColor === color) {
                const nameElement = Array.from(document.querySelectorAll('#name-items .match-item')).find(item => 
                    item.dataset.id === nameId
                );
                if (nameElement) nameWithColor = nameElement;
            }
        });
        
        if (imageWithColor && nameWithColor) {
            const imgName = imageWithColor.dataset.id;
            const nameName = nameWithColor.dataset.id;
            
            if (imgName === nameName) {
                correctCount++;
            } else {
                wrongCount++;
            }
        } else if (imageWithColor || nameWithColor) {
            wrongCount++;
        }
    });
    
    // 计算分数
    const scoreChange = correctCount - wrongCount;
    currentScore += scoreChange;
    updateScoreDisplay();
    
    // 如果全部正确，添加到图鉴
    if (correctCount === colorOrder.length && wrongCount === 0) {
        caughtPokemon.add(currentPuzzle.id);
        updatePokedex();
    }
    
    answeredPuzzles.add(currentPuzzleIndex);
    saveToLocalStorage(); // 保存游戏进度
    
    // 显示结果
    const resultMessage = `连连看结果：<br>正确：${correctCount}个，加${correctCount}分<br>错误：${wrongCount}个，扣${wrongCount}分<br>总分变化：${scoreChange > 0 ? '+' : ''}${scoreChange}分`;
    modalMessage.innerHTML = resultMessage;
    modal.classList.add('active');
    
    // 标记谜题为已完成
    answeredPuzzles.add(currentPuzzleIndex);
    
    // 显示下一题按钮
    setTimeout(() => {
        const correctModal = document.getElementById('correct-modal');
        const correctMessage = document.getElementById('correct-message');
        
        let finalMessage = `连连看完成！<br>正确：${correctCount}个<br>错误：${wrongCount}个<br>总分变化：${scoreChange > 0 ? '+' : ''}${scoreChange}分`;
        
        // 先移除旧的宝可梦显示
        const oldPokemonDisplay = correctModal.querySelector('.pokemon-display');
        if (oldPokemonDisplay) {
            oldPokemonDisplay.remove();
        }
        
        // 添加四个图片的显示（对于第14题）
        if (currentPuzzle.id === 14 && currentPuzzle.displayImages) {
            finalMessage += '<br><br>相关宝可梦：';
            
            const imagesDisplay = document.createElement('div');
            imagesDisplay.className = 'pokemon-display';
            imagesDisplay.style.display = 'grid';
            imagesDisplay.style.gridTemplateColumns = 'repeat(2, 1fr)';
            imagesDisplay.style.gap = '20px';
            imagesDisplay.style.marginTop = '20px';
            imagesDisplay.style.justifyItems = 'center';
            imagesDisplay.style.padding = '20px';
            imagesDisplay.style.backgroundColor = '#f5f5f5';
            imagesDisplay.style.borderRadius = '10px';
            
            currentPuzzle.displayImages.forEach(imgData => {
                imagesDisplay.innerHTML += `
                    <div style="text-align: center;">
                        <img src="Puzzle File/14/${imgData.image}" alt="${imgData.name}" style="width: 100px; height: 100px; object-fit: contain; margin-bottom: 10px;">
                        <p style="margin: 0; font-weight: 600; font-size: 16px;">${imgData.name}</p>
                    </div>
                `;
            });
            
            // 在消息后插入图片显示
            correctMessage.innerHTML = finalMessage;
            correctMessage.parentNode.insertBefore(imagesDisplay, correctMessage.nextSibling);
        } else {
            correctMessage.textContent = finalMessage;
        }
        
        correctModal.classList.add('active');
    }, 500);
}

// 初始化输入题游戏
function initInputGame() {
    const mediaContainer = document.getElementById('media-container');
    if (!mediaContainer) {
        console.error('mediaContainer not found');
        return;
    }
    
    const inputImage = document.createElement('img');
    inputImage.id = 'input-image';
    inputImage.src = `Puzzle File/${currentPuzzle.id}/${currentPuzzle.inputData.image}`;
    inputImage.alt = currentPuzzle.name;
    inputImage.style.maxWidth = '100%';
    inputImage.style.maxHeight = '300px';
    inputImage.style.marginBottom = '20px';
    
    const questionElement = document.createElement('div');
    questionElement.id = 'input-question';
    questionElement.innerHTML = currentPuzzle.inputData.question;
    questionElement.style.fontSize = '18px';
    questionElement.style.marginBottom = '20px';
    
    mediaContainer.innerHTML = '';
    mediaContainer.appendChild(inputImage);
    mediaContainer.appendChild(questionElement);
    
    // 清空答案输入
    const answerInput = document.getElementById('answer-input');
    if (answerInput) {
        answerInput.value = '';
    }
    
    // 隐藏提示区（包括标题）
    const hintsSection = document.querySelector('.hints-section');
    if (hintsSection) {
        hintsSection.style.display = 'none';
    }
    
    // 隐藏线索区表头
    const mediaSectionHeader = document.querySelector('.media-section-header');
    if (mediaSectionHeader) {
        mediaSectionHeader.style.display = 'none';
    }
}

// 初始化判断题游戏
function initJudgmentGame() {
    const judgmentImage = document.getElementById('judgment-image');
    const judgmentQuestion = document.getElementById('judgment-question');
    const judgmentOptions = document.getElementById('judgment-options');
    
    // 清空容器
    judgmentOptions.innerHTML = '';
    
    // 设置图片
    judgmentImage.src = `Puzzle File/${currentPuzzle.id}/${currentPuzzle.judgmentData.image}`;
    judgmentImage.alt = currentPuzzle.name;
    
    // 设置问题
    judgmentQuestion.textContent = currentPuzzle.judgmentData.question;
    
    // 创建选项
    currentPuzzle.judgmentData.options.forEach(option => {
        const optionElement = document.createElement('div');
        optionElement.className = 'judgment-option';
        optionElement.dataset.id = option.id;
        
        // 检查选项是否有图片
        if (option.image) {
            // 显示图片
            optionElement.innerHTML = `
                <span class="option-id">${option.id}</span>
                <img src="Puzzle File/${currentPuzzle.id}/${option.image}" alt="${option.id}" style="width: 100px; height: 100px; object-fit: contain;">
            `;
        } else {
            // 显示文字
            optionElement.textContent = `${option.id}. ${option.text}`;
        }
        
        optionElement.addEventListener('click', () => {
            // 移除其他选项的选中状态
            document.querySelectorAll('.judgment-option').forEach(opt => {
                opt.classList.remove('selected');
            });
            // 添加当前选项的选中状态
            optionElement.classList.add('selected');
        });
        judgmentOptions.appendChild(optionElement);
    });
    
    // 添加提交按钮事件监听器
    const submitJudgmentButton = document.getElementById('submit-judgment');
    submitJudgmentButton.disabled = false; // 重新启用提交按钮
    submitJudgmentButton.onclick = function() {
        submitJudgment();
    };
}

// 提交判断题答案
function submitJudgment() {
    const selectedOption = document.querySelector('.judgment-option.selected');
    if (!selectedOption) {
        showModal('请选择一个选项！');
        return;
    }
    
    const selectedId = selectedOption.dataset.id;
    const correctAnswer = currentPuzzle.judgmentData.correctAnswer;
    const judgmentResult = document.getElementById('judgment-result');
    
    // 标记正确和错误选项
    document.querySelectorAll('.judgment-option').forEach(option => {
        if (option.dataset.id === correctAnswer) {
            option.classList.add('correct');
        } else if (option.dataset.id === selectedId && selectedId !== correctAnswer) {
            option.classList.add('incorrect');
        }
    });
    
    // 判断答案
    if (selectedId === correctAnswer) {
        // 答对了，使用自定义分值或默认值
        const correctScore = currentPuzzle.judgmentData.correctScore || 1;
        currentScore += correctScore;
        caughtPokemon.add(currentPuzzle.id);
        updatePokedex();
    } else {
        // 答错了，使用自定义分值或默认值
        const wrongScore = currentPuzzle.judgmentData.wrongScore || 1;
        currentScore = Math.max(0, currentScore - wrongScore);
    }
    
    // 更新分数显示
    document.getElementById('puzzle-score').textContent = currentScore;
    
    // 标记为已回答
    answeredPuzzles.add(currentPuzzle.id);
    
    // 保存到本地存储
    saveToLocalStorage();
    
    // 禁用提交按钮
    document.getElementById('submit-judgment').disabled = true;
    
    // 显示带有继续和返回主菜单按钮的弹窗
    setTimeout(() => {
        const correctModal = document.getElementById('correct-modal');
        const correctMessage = document.getElementById('correct-message');
        
        // 找到正确答案的文本
        const correctOption = currentPuzzle.judgmentData.options.find(opt => opt.id === currentPuzzle.judgmentData.correctAnswer);
        const correctAnswerText = correctOption ? (correctOption.text || correctOption.id) : currentPuzzle.judgmentData.correctAnswer;
        
        // 获取自定义分值或默认值
        const correctScore = currentPuzzle.judgmentData.correctScore || 1;
        const wrongScore = currentPuzzle.judgmentData.wrongScore || 1;
        
        let finalMessage = '';
        if (selectedId === correctAnswer) {
            finalMessage = `恭喜你答对了！获得${correctScore}分。<br>正确答案：${correctAnswerText}`;
        } else {
            finalMessage = `很遗憾答错了！扣除${wrongScore}分。<br>正确答案：${correctAnswerText}`;
        }
        
        correctMessage.innerHTML = finalMessage;
        correctModal.classList.add('active');
    }, 500);
}

// 显示属性提示
function showTypeHint() {
    if (!currentPuzzle || !currentPuzzle.types) {
        showModal('属性信息不存在！');
        return;
    }
    
    const mediaSectionH3 = document.querySelector('.media-section h3');
    const typeHintDisplay = document.getElementById('type-hint-display');
    
    if (mediaSectionH3 && typeHintDisplay) {
        // 隐藏标题
        mediaSectionH3.style.display = 'none';
        
        // 显示属性容器
        typeHintDisplay.style.display = 'flex';
        typeHintDisplay.style.alignItems = 'center';
        typeHintDisplay.style.justifyContent = 'center';
        typeHintDisplay.style.width = '100%';
        typeHintDisplay.style.gap = '15px';
        
        // 生成属性图标和文字
        let typesHtml = '';
        currentPuzzle.types.forEach((type, index) => {
            typesHtml += `
                <div style="display: flex; align-items: center; gap: 8px;">
                    <img src="type/${type}.png" alt="${type}" style="width: 35px; height: 35px; border-radius: 8px;">
                    <span style="font-size: 18px; font-weight: 600; color: #ff6b35;">${type}</span>
                </div>
            `;
            if (index < currentPuzzle.types.length - 1) {
                typesHtml += '<span style="color: #ff6b35; font-size: 18px; font-weight: bold;">+</span>';
            }
        });
        
        typeHintDisplay.innerHTML = typesHtml;
    }
}

// 显示主菜单
function showMenu() {
    menuScreen.classList.add('active');
    puzzleScreen.classList.remove('active');
    pokedexScreen.classList.remove('active');
    closeModal();
    closeCorrectModal();
    // 隐藏锦囊容器
    const bagContainer = document.querySelector('.bag-container');
    if (bagContainer) {
        bagContainer.style.display = 'none';
    }
}

// 显示谜题界面
function showPuzzle() {
    menuScreen.classList.remove('active');
    puzzleScreen.classList.add('active');
    pokedexScreen.classList.remove('active');
    designerScreen.classList.remove('active');
    
    // 获取锦囊容器
    const bagContainer = document.querySelector('.bag-container');
    
    // 根据谜题类型显示不同界面
    if (currentPuzzle.type === 'match') {
        document.getElementById('normal-puzzle').style.display = 'none';
        document.getElementById('match-puzzle').style.display = 'block';
        document.getElementById('combination-puzzle').style.display = 'none';
        document.getElementById('judgment-puzzle').style.display = 'none';
        document.getElementById('sequence-puzzle').style.display = 'none';
        initMatchGame();
        // 隐藏锦囊容器
        if (bagContainer) {
            bagContainer.style.display = 'none';
        }
    } else if (currentPuzzle.combinationItems) {
        document.getElementById('normal-puzzle').style.display = 'none';
        document.getElementById('match-puzzle').style.display = 'none';
        document.getElementById('combination-puzzle').style.display = 'block';
        document.getElementById('judgment-puzzle').style.display = 'none';
        document.getElementById('sequence-puzzle').style.display = 'none';
        initCombinationGame();
        // 隐藏锦囊容器
        if (bagContainer) {
            bagContainer.style.display = 'none';
        }
    } else if (currentPuzzle.type === 'judgment') {
        document.getElementById('normal-puzzle').style.display = 'none';
        document.getElementById('match-puzzle').style.display = 'none';
        document.getElementById('combination-puzzle').style.display = 'none';
        document.getElementById('judgment-puzzle').style.display = 'block';
        document.getElementById('sequence-puzzle').style.display = 'none';
        initJudgmentGame();
        // 隐藏锦囊容器
        if (bagContainer) {
            bagContainer.style.display = 'none';
        }
    } else if (currentPuzzle.type === 'input') {
        document.getElementById('normal-puzzle').style.display = 'block';
        document.getElementById('match-puzzle').style.display = 'none';
        document.getElementById('combination-puzzle').style.display = 'none';
        document.getElementById('judgment-puzzle').style.display = 'none';
        document.getElementById('sequence-puzzle').style.display = 'none';
        initInputGame();
        // 隐藏锦囊容器
        if (bagContainer) {
            bagContainer.style.display = 'none';
        }
    } else if (currentPuzzle.type === 'sequence') {
        document.getElementById('normal-puzzle').style.display = 'none';
        document.getElementById('match-puzzle').style.display = 'none';
        document.getElementById('combination-puzzle').style.display = 'none';
        document.getElementById('judgment-puzzle').style.display = 'none';
        document.getElementById('sequence-puzzle').style.display = 'block';
        initSequenceGame();
        // 隐藏锦囊容器
        if (bagContainer) {
            bagContainer.style.display = 'none';
        }
    } else {
        document.getElementById('normal-puzzle').style.display = 'flex';
        document.getElementById('match-puzzle').style.display = 'none';
        document.getElementById('combination-puzzle').style.display = 'none';
        document.getElementById('judgment-puzzle').style.display = 'none';
        document.getElementById('sequence-puzzle').style.display = 'none';
        // 重新显示提示区和线索区表头
        const hintsSection = document.querySelector('.hints-section');
        if (hintsSection) {
            hintsSection.style.display = 'block';
        }
        const mediaSectionHeader = document.querySelector('.media-section-header');
        if (mediaSectionHeader) {
            mediaSectionHeader.style.display = 'block';
        }
        renderHints();
        // 清空媒体容器
        mediaContainer.innerHTML = '';
        // 清空答案输入
        answerInput.value = '';
        // 重置属性锦囊按钮状态
        resetTypeBagButton();
        // 显示锦囊容器
        if (bagContainer) {
            bagContainer.style.display = 'flex';
        }
    }
}

// 显示图鉴界面
function viewPokedex() {
    menuScreen.classList.remove('active');
    puzzleScreen.classList.remove('active');
    pokedexScreen.classList.add('active');
    designerScreen.classList.remove('active');
    updatePokedex();
}

// 显示设计者模式界面
function showDesigner() {
    menuScreen.classList.remove('active');
    puzzleScreen.classList.remove('active');
    pokedexScreen.classList.remove('active');
    designerScreen.classList.add('active');
    
    // 显示谜题列表
    designerContainer.innerHTML = '';
    const titleElement = document.createElement('h3');
    titleElement.textContent = '选择谜题';
    designerContainer.appendChild(titleElement);
    
    puzzles.forEach((puzzle, index) => {
        const puzzleElement = document.createElement('div');
        puzzleElement.className = 'puzzle-item';
        puzzleElement.innerHTML = `
            <button class="select-puzzle-btn" data-index="${index}">
                谜题 ${puzzle.id}: ${puzzle.name}
            </button>
        `;
        designerContainer.appendChild(puzzleElement);
    });
    
    // 添加选择谜题的事件监听器
    document.querySelectorAll('.select-puzzle-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            selectPuzzle(index);
        });
    });
}

// 选择特定谜题
function selectPuzzle(index) {
    currentPuzzleIndex = index;
    currentPuzzle = puzzles[index];
    // 重置线索区标题
    const mediaSectionH3 = document.querySelector('.media-section h3');
    if (mediaSectionH3) {
        mediaSectionH3.innerHTML = '线索区';
        mediaSectionH3.style.display = 'block';
    }
    startGame();
}

// 渲染谜题提示
function renderHints() {
    hintsContainer.innerHTML = '';
    // 如果没有hints属性，直接返回
    if (!currentPuzzle.hints) {
        return;
    }
    currentPuzzle.hints.forEach((hint, index) => {
        const hintElement = document.createElement('div');
        hintElement.className = 'hint-item';
        const isExpanded = expandedHints.has(index);
        const arrowClass = isExpanded ? 'arrow-down' : 'arrow-right';
        const contentClass = isExpanded ? 'hint-content expanded' : 'hint-content collapsed';
        
        // 根据消耗分数设置颜色
        let costColor = '';
        switch(hint.cost) {
            case 1: costColor = 'gray'; break;
            case 2: costColor = 'green'; break;
            case 3: costColor = 'blue'; break;
            case 4: costColor = 'purple'; break;
            case 5: costColor = 'orange'; break; // 改为橙黄色
            case 6: costColor = 'red'; break; // 红色
            case 7: costColor = '#e91e63'; break; // 玫瑰红 (CSS颜色代码)
            case 8: costColor = 'black'; break; // 黑色
            default: costColor = 'gray';
        }
        
        hintElement.innerHTML = `
            <div class="hint-header" data-index="${index}">
                <img src="Hint Characters/${hint.title}.png" alt="${hint.title}" class="hint-character" onerror="this.style.display='none';">
                <strong>${hint.title}</strong>
                <span class="cost-display" style="background-color: ${costColor}; color: white; padding: 2px 6px; border-radius: 2px;">${hint.cost}</span>
                <span class="arrow ${arrowClass}"></span>
            </div>
            <div class="${contentClass}">
                ${usedHints.has(index) 
                    ? `<p>${hint.type === 'text' ? (hint.text || hint.content) : (hint.text ? hint.text : '已解锁')}</p>`
                    : `<p class="locked-message">点击标题消耗 <span style="background-color: ${costColor}; color: white; padding: 2px 6px; border-radius: 2px;">${hint.cost}</span> 分解锁此提示</p>`
                }
            </div>
        `;
        
        const headerElement = hintElement.querySelector('.hint-header');
        headerElement.addEventListener('click', () => toggleHint(index, hint));
        
        hintsContainer.appendChild(hintElement);
    });
}

// 切换提示展开/收起状态
function toggleHint(index, hint) {
    if (usedHints.has(index)) {
        // 如果提示已使用，则展开/收起并在展示区显示内容
        if (expandedHints.has(index)) {
            expandedHints.delete(index);
            // 如果收起的是当前显示的媒体提示，则清空媒体容器
            if (currentMediaHintIndex === index) {
                mediaContainer.innerHTML = '';
                currentMediaHintIndex = -1;
            }
        } else {
            expandedHints.add(index);
            // 在展示区显示内容
            if (hint.type === 'image') {
                currentMediaHintIndex = index;
                mediaContainer.innerHTML = `<img src="${hint.content}" alt="${hint.title}的提示">`;
            } else if (hint.type === 'audio') {
                currentMediaHintIndex = index;
                mediaContainer.innerHTML = `<audio controls><source src="${hint.content}" type="audio/mpeg">您的浏览器不支持音频播放</audio>`;
            }
        }
    } else {
        // 如果提示未使用，则使用提示
        useHint(index, hint);
        return;
    }
    renderHints();
}

// 使用提示
function useHint(index, hint) {
    if (usedHints.has(index)) return;
    if (currentScore < hint.cost) {
        showModal('积分不足，无法解锁提示！');
        return;
    }
    
    // 扣除积分
    currentScore -= hint.cost;
    updateScoreDisplay();
    
    // 标记提示为已使用
    usedHints.add(index);
    
    // 展开提示
    expandedHints.add(index);
    
    // 显示提示内容
    if (hint.type === 'text') {
        // 文本提示直接显示
        renderHints();
    } else if (hint.type === 'image' || hint.type === 'gif') {
        // 图片或gif提示显示在媒体容器
        currentMediaHintIndex = index;
        mediaContainer.innerHTML = `<img src="${hint.content}" alt="${hint.title}的提示">`;
        renderHints();
    } else if (hint.type === 'audio') {
        // 音频提示显示在媒体容器
        currentMediaHintIndex = index;
        mediaContainer.innerHTML = `<audio controls><source src="${hint.content}" type="audio/mpeg">您的浏览器不支持音频播放</audio>`;
        renderHints();
    }
}

// 检查答案
function checkAnswer() {
    const answer = answerInput.value.trim();
    if (!answer) {
        showModal('请输入答案！');
        return;
    }
    
    // 检查答案是否正确
    let isCorrect = false;
    
    if (currentPuzzle.type === 'input') {
        // 处理输入题（多个答案）
        const correctAnswers = currentPuzzle.inputData.correctAnswers;
        const scorePerAnswer = currentPuzzle.inputData.scorePerAnswer || 1;
        const penaltyPerMissing = currentPuzzle.inputData.penaltyPerMissing || 1;
        
        // 将用户答案和正确答案都转换为数组（用空格分隔）
        const userAnswers = answer.split(/[\s，、]+/).filter(a => a.trim());
        
        // 找到所有正确答案的集合
        let correctSet = new Set();
        correctAnswers.forEach(correctAnswer => {
            const correctItems = correctAnswer.split(/[\s，、]+/).filter(a => a.trim());
            correctItems.forEach(item => correctSet.add(item));
        });
        
        // 计算用户答对了多少个
        let correctCount = 0;
        userAnswers.forEach(userAnswer => {
            if (correctSet.has(userAnswer)) {
                correctCount++;
            }
        });
        
        // 计算少答了多少个
        const missingCount = correctSet.size - correctCount;
        
        // 计算得分
        const scoreChange = (correctCount * scorePerAnswer) - (missingCount * penaltyPerMissing);
        currentScore = Math.max(0, currentScore + scoreChange);
        updateScoreDisplay();
        
        // 标记为已回答
        answeredPuzzles.add(currentPuzzleIndex);
        saveToLocalStorage();
        
        // 显示结果
        let resultMessage = `你答对了${correctCount}个，加${correctCount * scorePerAnswer}分<br>`;
        if (missingCount > 0) {
            resultMessage += `少答了${missingCount}个，扣${missingCount * penaltyPerMissing}分<br>`;
        }
        resultMessage += `总分变化：${scoreChange > 0 ? '+' : ''}${scoreChange}分`;
        
        showCorrectModal(resultMessage);
        return;
    }
    
    // 处理普通谜题
    isCorrect = currentPuzzle.aliases.some(alias => 
        alias.toLowerCase() === answer.toLowerCase()
    );
    
    if (isCorrect) {
        // 答对了
        currentScore += 5;
        updateScoreDisplay();
        caughtPokemon.add(currentPuzzle.id);
        answeredPuzzles.add(currentPuzzleIndex);
        updatePokedex();
        saveToLocalStorage(); // 保存游戏进度
        showCorrectModal(`恭喜你答对了！获得 5 分奖励！`);
    } else {
        // 答错了
        answeredPuzzles.add(currentPuzzleIndex);
        saveToLocalStorage(); // 保存游戏进度
        showModal('不对哦');
    }
}

// 更新图鉴
function updatePokedex() {
    pokedexContainer.innerHTML = '';
    if (caughtPokemon.size === 0) {
        pokedexContainer.innerHTML = '<p>还没有收集到宝可梦，继续加油！</p>';
        return;
    }
    
    caughtPokemon.forEach(pokemonId => {
        // 处理特殊情况：连连看和组合题
        if (pokemonId === 14) {
            // 连连看：14.1-14.4
            const pokemons = [
                { id: 1, name: '风妖精', image: 'assets/Pokedex/14.1.png' },
                { id: 2, name: '食梦梦', image: 'assets/Pokedex/14.2.png' },
                { id: 3, name: '达摩狒狒（闭关）', image: 'assets/Pokedex/14.3.png' },
                { id: 4, name: '双卵细胞仔', image: 'assets/Pokedex/14.4.png' }
            ];
            
            pokemons.forEach(poke => {
                const pokemonEntry = document.createElement('div');
                pokemonEntry.className = 'pokemon-entry';
                pokemonEntry.innerHTML = `
                    <img src="${poke.image}" alt="${poke.name}">
                    <p>${poke.name}</p>
                `;
                pokedexContainer.appendChild(pokemonEntry);
            });
        } else if (pokemonId === 17) {
            // 组合题：17.1-17.4
            const pokemons = [
                { id: 1, name: '雷鸟龙', image: 'assets/Pokedex/17.1.png' },
                { id: 2, name: '雷鸟海兽', image: 'assets/Pokedex/17.2.png' },
                { id: 3, name: '鳃鱼龙', image: 'assets/Pokedex/17.3.png' },
                { id: 4, name: '鳃鱼海兽', image: 'assets/Pokedex/17.4.png' }
            ];
            
            pokemons.forEach(poke => {
                const pokemonEntry = document.createElement('div');
                pokemonEntry.className = 'pokemon-entry';
                pokemonEntry.innerHTML = `
                    <img src="${poke.image}" alt="${poke.name}">
                    <p>${poke.name}</p>
                `;
                pokedexContainer.appendChild(pokemonEntry);
            });
        } else {
            // 处理普通谜题
            const puzzle = puzzles.find(p => p.id === pokemonId);
            if (puzzle && puzzle.pokedexImage) {
                const pokemonEntry = document.createElement('div');
                pokemonEntry.className = 'pokemon-entry';
                pokemonEntry.innerHTML = `
                    <img src="${puzzle.pokedexImage}" alt="${puzzle.name}">
                    <p>${puzzle.name}</p>
                `;
                pokedexContainer.appendChild(pokemonEntry);
            }
        }
    });
}

// 显示弹窗
function showModal(message) {
    modalMessage.textContent = message;
    modal.classList.add('active');
}

// 关闭弹窗
function closeModal() {
    modal.classList.remove('active');
}

// 显示答对弹窗
function showCorrectModal(message) {
    const modalContent = correctModal.querySelector('.modal-content');
    correctMessage.textContent = message;
    
    // 先移除旧的宝可梦显示
    const oldPokemonDisplay = correctModal.querySelector('.pokemon-display');
    if (oldPokemonDisplay) {
        oldPokemonDisplay.remove();
    }
    
    // 对于输入题和排序题，不显示宝可梦图片
    if (currentPuzzle.type === 'input' || currentPuzzle.type === 'sequence') {
        correctModal.classList.add('active');
        return;
    }
    
    // 添加宝可梦的图片和名字
    const pokemonDisplay = document.createElement('div');
    pokemonDisplay.className = 'pokemon-display';
    const imagePath = currentPuzzle.gifImage || currentPuzzle.pokedexImage;
    pokemonDisplay.innerHTML = `
        <img src="${imagePath}" alt="${currentPuzzle.name}" class="pokemon-gif">
        <p class="pokemon-name">${currentPuzzle.name}</p>
    `;
    
    // 在消息后插入宝可梦显示
    correctMessage.parentNode.insertBefore(pokemonDisplay, correctMessage.nextSibling);
    
    correctModal.classList.add('active');
}

// 关闭答对弹窗
function closeCorrectModal() {
    correctModal.classList.remove('active');
    // 移除宝可梦显示
    const pokemonDisplay = correctModal.querySelector('.pokemon-display');
    if (pokemonDisplay) {
        pokemonDisplay.remove();
    }
}

// 继续游戏
function nextPuzzle() {
    closeCorrectModal();
    // 随机选择一个未答过的谜题
    selectRandomPuzzle();
    startGame();
}

// 排序题游戏相关变量
let sequencePools = [];
let selectedSequenceItem = null;

// 初始化排序题游戏
function initSequenceGame() {
    sequencePools = [null, null, null, null];
    selectedSequenceItem = null;
    
    const sequenceImage = document.getElementById('sequence-image');
    const sequenceQuestion = document.getElementById('sequence-question');
    const itemsContainer = document.getElementById('sequence-items');
    const poolElement = document.getElementById('sequence-pool');
    const slots = poolElement.querySelectorAll('.sequence-slot');
    
    // 清空容器
    itemsContainer.innerHTML = '';
    slots.forEach(slot => {
        slot.innerHTML = '';
    });
    
    // 设置图片
    sequenceImage.src = `Puzzle File/${currentPuzzle.id}/${currentPuzzle.sequenceData.image}`;
    sequenceImage.alt = currentPuzzle.name;
    
    // 设置题目
    sequenceQuestion.textContent = currentPuzzle.sequenceData.question;
    
    // 创建可拖动的图片项
    currentPuzzle.sequenceData.items.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'sequence-item';
        itemElement.dataset.id = item.id;
        itemElement.dataset.name = item.name;
        itemElement.draggable = true;
        itemElement.innerHTML = `
            <img src="Puzzle File/${currentPuzzle.id}/${item.image}" alt="${item.name}" style="width: 100px; height: 100px; object-fit: contain;">
            <div class="name">${item.name}</div>
        `;
        
        // 添加拖放事件监听器
        itemElement.addEventListener('dragstart', handleSequenceDragStart);
        itemElement.addEventListener('dragend', handleSequenceDragEnd);
        
        // 添加点击事件监听器（用于回位）
        itemElement.addEventListener('click', handleSequenceItemClick);
        
        itemsContainer.appendChild(itemElement);
    });
    
    // 为每个slot添加拖放事件监听器
    slots.forEach((slot, index) => {
        slot.addEventListener('dragover', handleSequenceDragOver);
        slot.addEventListener('dragleave', handleSequenceDragLeave);
        slot.addEventListener('drop', handleSequenceDrop);
    });
    
    // 添加提交按钮事件监听器
    const submitSequenceButton = document.getElementById('submit-sequence');
    submitSequenceButton.disabled = false;
    submitSequenceButton.onclick = function() {
        submitSequence();
    };
}

// 排序题点击图片回位
function handleSequenceItemClick(e) {
    const item = this;
    const parent = item.parentElement;
    
    // 如果图片在slot中，则放回itemsContainer
    if (parent.classList.contains('sequence-slot')) {
        const itemsContainer = document.getElementById('sequence-items');
        const slotIndex = parseInt(parent.dataset.index);
        
        // 从sequencePools中移除
        sequencePools[slotIndex] = null;
        
        // 将图片放回itemsContainer
        itemsContainer.appendChild(item);
    }
}

// 排序题拖放事件处理函数
function handleSequenceDragStart(e) {
    selectedSequenceItem = this;
    this.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
}

function handleSequenceDragEnd(e) {
    this.classList.remove('dragging');
}

function handleSequenceDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    this.classList.add('drag-over');
}

function handleSequenceDragLeave(e) {
    this.classList.remove('drag-over');
}

function handleSequenceDrop(e) {
    e.preventDefault();
    this.classList.remove('drag-over');
    
    if (!selectedSequenceItem) return;
    
    const slotIndex = parseInt(this.dataset.index);
    
    // 如果slot中已经有物品，将物品放回原处
    if (sequencePools[slotIndex]) {
        const oldItem = sequencePools[slotIndex];
        const itemsContainer = document.getElementById('sequence-items');
        itemsContainer.appendChild(oldItem);
    }
    
    // 将选中的物品放入slot
    this.innerHTML = '';
    this.appendChild(selectedSequenceItem);
    sequencePools[slotIndex] = selectedSequenceItem;
    
    selectedSequenceItem = null;
}

// 提交排序题答案
function submitSequence() {
    const slots = document.querySelectorAll('.sequence-slot');
    let userOrder = [];
    
    // 获取用户的排序
    slots.forEach(slot => {
        if (slot.querySelector('.sequence-item')) {
            const itemId = parseInt(slot.querySelector('.sequence-item').dataset.id);
            userOrder.push(itemId);
        }
    });
    
    // 检查是否所有slot都有物品
    if (userOrder.length !== 4) {
        showModal('请将所有饮料放入排序池中！');
        return;
    }
    
    // 检查答案是否正确
    const correctOrder = currentPuzzle.sequenceData.correctOrder;
    let isCorrect = true;
    
    for (let i = 0; i < correctOrder.length; i++) {
        if (userOrder[i] !== correctOrder[i]) {
            isCorrect = false;
            break;
        }
    }
    
    const correctScore = currentPuzzle.sequenceData.correctScore || 7;
    
    if (isCorrect) {
        // 答对了
        currentScore += correctScore;
        updateScoreDisplay();
        caughtPokemon.add(currentPuzzle.id);
        updatePokedex();
    }
    
    // 更新分数显示
    document.getElementById('puzzle-score').textContent = currentScore;
    
    // 标记为已回答
    answeredPuzzles.add(currentPuzzle.id);
    
    // 保存到本地存储
    saveToLocalStorage();
    
    // 禁用提交按钮
    document.getElementById('submit-sequence').disabled = true;
    
    // 显示结果
    let resultMessage = '';
    if (isCorrect) {
        resultMessage = `恭喜你答对了！获得${correctScore}分。<br>正确顺序：美味之水 - 劲爽汽水 - 果汁牛奶 - 哞哞鲜奶`;
    } else {
        resultMessage = `很遗憾答错了！正确顺序：美味之水 - 劲爽汽水 - 果汁牛奶 - 哞哞鲜奶`;
    }
    
    showCorrectModal(resultMessage);
}

// 组合题游戏相关变量
let combinationPools = [];
let selectedCombinationItem = null;

// 初始化组合题游戏
function initCombinationGame() {
    combinationPools = Array(4).fill().map(() => []);
    selectedCombinationItem = null;
    
    const itemPool = document.getElementById('combination-items');
    const poolsContainer = document.getElementById('combination-pools');
    
    // 清空容器
    itemPool.innerHTML = '';
    poolsContainer.innerHTML = '';
    
    // 创建可拖动的图片项
    currentPuzzle.combinationItems.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'combination-item';
        itemElement.dataset.name = item.name;
        itemElement.draggable = true;
        itemElement.innerHTML = `
            <img src="Puzzle File/17/${item.image}" alt="${item.name}">
            <div class="name">${item.name}</div>
        `;
        
        // 添加拖放事件监听器
        itemElement.addEventListener('dragstart', handleDragStart);
        itemElement.addEventListener('dragend', handleDragEnd);
        
        itemPool.appendChild(itemElement);
    });
    
    // 创建四个池子
    currentPuzzle.combinationTargets.forEach((target, index) => {
        const poolElement = document.createElement('div');
        poolElement.className = 'combination-pool';
        poolElement.dataset.index = index;
        poolElement.innerHTML = `
            <div class="pool-title">${target.name}</div>
            <div class="pool-content" data-index="${index}">
                <div class="pool-slot" data-pool="${index}" data-slot="0"></div>
                <div class="pool-slot" data-pool="${index}" data-slot="1"></div>
            </div>
        `;
        poolsContainer.appendChild(poolElement);
        
        // 为每个槽位添加拖放事件监听器
        const slots = poolElement.querySelectorAll('.pool-slot');
        slots.forEach(slot => {
            slot.addEventListener('dragover', handleDragOver);
            slot.addEventListener('drop', handleDrop);
        });
    });
    
    // 添加提交按钮事件
    document.getElementById('submit-combination').addEventListener('click', submitCombination);
}

// 处理拖动开始
function handleDragStart(e) {
    this.classList.add('selected');
    e.dataTransfer.setData('text/plain', this.dataset.name);
    e.dataTransfer.effectAllowed = 'copy';
}

// 处理拖动结束
function handleDragEnd(e) {
    document.querySelectorAll('.combination-item').forEach(item => {
        item.classList.remove('selected');
    });
}

// 处理拖动经过
function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault();
    }
    e.dataTransfer.dropEffect = 'copy';
    return false;
}

// 处理放置
function handleDrop(e) {
    if (e.stopPropagation) {
        e.stopPropagation();
    }
    
    const itemName = e.dataTransfer.getData('text/plain');
    const poolIndex = parseInt(this.dataset.pool);
    const slotIndex = parseInt(this.dataset.slot);
    
    // 检查是否已在池子里
    if (combinationPools[poolIndex].includes(itemName)) {
        showModal('该图片已在池子里！');
        return;
    }
    
    // 直接放入指定的槽位，替换该位置已有的图片（如果有）
    combinationPools[poolIndex][slotIndex] = itemName;
    
    // 更新池子显示
    updateCombinationPoolDisplay(poolIndex);
    
    return false;
}

// 更新组合题池子显示
function updateCombinationPoolDisplay(poolIndex) {
    const slots = document.querySelectorAll(`.pool-slot[data-pool="${poolIndex}"]`);
    
    // 清空所有槽位
    slots.forEach(slot => {
        slot.innerHTML = '';
        slot.classList.remove('filled');
    });
    
    // 在槽位中放置图片
    combinationPools[poolIndex].forEach((itemName, index) => {
        if (index < slots.length) {
            const slot = slots[index];
            slot.classList.add('filled');
            
            const itemData = currentPuzzle.combinationItems.find(item => item.name === itemName);
            const imagePath = itemData ? `Puzzle File/17/${itemData.image}` : '';
            
            slot.innerHTML = `
                <img src="${imagePath}" alt="${itemName}" style="width: 60px; height: 60px; object-fit: contain;">
            `;
        }
    });
    
    // 为槽位添加点击事件，点击即可撤销
    slots.forEach(slot => {
        slot.addEventListener('click', function() {
            const pool = parseInt(this.dataset.pool);
            const slotIndex = parseInt(this.dataset.slot);
            
            if (combinationPools[pool][slotIndex]) {
                const itemName = combinationPools[pool][slotIndex];
                removeCombinationItem(pool, itemName);
            }
        });
    });
}

// 从池子中移除组合题图片项
function removeCombinationItem(poolIndex, itemName) {
    combinationPools[poolIndex] = combinationPools[poolIndex].filter(item => item !== itemName);
    updateCombinationPoolDisplay(poolIndex);
}

// 提交组合题答案
function submitCombination() {
    let correctCount = 0;
    let wrongCount = 0;
    
    // 检查每个池子的组合（注意顺序）
    combinationPools.forEach((pool, index) => {
        const target = currentPuzzle.combinationTargets[index];
        const expectedComponents = target.components;
        const actualComponents = pool;
        
        // 检查顺序和内容是否完全匹配
        if (actualComponents.length === 2 && 
            actualComponents[0] === expectedComponents[0] && 
            actualComponents[1] === expectedComponents[1]) {
            correctCount++;
        } else {
            wrongCount++;
        }
    });
    
    // 计算分数
    const scoreChange = correctCount - wrongCount;
    currentScore += scoreChange;
    updateScoreDisplay();
    
    // 如果全部正确，添加到图鉴
    if (correctCount === 4 && wrongCount === 0) {
        caughtPokemon.add(currentPuzzle.id);
        updatePokedex();
    }
    
    answeredPuzzles.add(currentPuzzleIndex);
    saveToLocalStorage(); // 保存游戏进度
    
    // 显示结果
    const resultMessage = `组合题结果：<br>正确：${correctCount}个，加${correctCount}分<br>错误：${wrongCount}个，扣${wrongCount}分<br>总分变化：${scoreChange > 0 ? '+' : ''}${scoreChange}分`;
    modalMessage.innerHTML = resultMessage;
    modal.classList.add('active');
    
    // 标记谜题为已完成
    answeredPuzzles.add(currentPuzzleIndex);
    
    // 显示下一题按钮
    setTimeout(() => {
        const correctModal = document.getElementById('correct-modal');
        const correctMessage = document.getElementById('correct-message');
        
        let finalMessage = `组合题完成！<br>正确：${correctCount}个<br>错误：${wrongCount}个<br>总分变化：${scoreChange > 0 ? '+' : ''}${scoreChange}分`;
        
        // 如果全部正确，添加宝可梦图片展示
        if (correctCount === 4 && wrongCount === 0) {
            finalMessage += '<br><br>恭喜你全部拼接正确！以下是你拼接出的宝可梦：<br><div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-top: 20px; justify-items: center; padding: 20px; background-color: #f5f5f5; border-radius: 10px;">';
            
            // 为每个目标宝可梦创建图片展示
            currentPuzzle.combinationTargets.forEach(target => {
                finalMessage += `
                    <div style="text-align: center;">
                        <img src="Puzzle File/17/${target.image}" alt="${target.name}" style="width: 100px; height: 100px; object-fit: contain; margin-bottom: 10px;">
                        <p style="margin: 0; font-weight: 600; font-size: 16px;">${target.name}</p>
                    </div>
                `;
            });
            
            finalMessage += '</div>';
        }
        
        correctMessage.innerHTML = finalMessage;
        
        correctModal.classList.add('active');
    }, 500);
}
