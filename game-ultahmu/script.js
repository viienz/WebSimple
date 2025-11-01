// Global variables
let currentScreen = 'loading';
let typewriterInterval = null;
let isTyping = false;
let currentPhotoIndex = 0;
let tetrisGameInstance = null; // Untuk instance Tetris

// === ARRAY FOTO (GLOBAL) ===
const photos = [
    { text: 'Anjay dari bayi', image: './images/photo1.jpg' },
    { text: 'nyengir bang?', image: './images/photo2.jpg' },
    { text: 'ngupil dlu kaleee', image: './images/photo3.jpg' },
    { text: 'ga renang lagi ni?', image: './images/photo5.jpg' },
    { text: 'beh saiki mtr dewe2', image: './images/photo6.jpg' },
    { text: 'Ompong', image: './images/photo7.jpg' },
    { text: 'P adu balap', image: './images/photo8.jpg' },
    { text: '🎉🎉', image: './images/photo9.jpg' },
    { text: 'Kapan-kapan ke sini bareng', image: './images/photo10.jpg' },
    { text: 'tebak gunung??', image: './images/photo11.jpg' },
];

// === VARIABEL MUSIK (GLOBAL) ===
let currentAudio = new Audio(); // Satu player audio untuk semua lagu
let currentPlayingSong = null;  // Untuk melacak lagu yang sedang diputar

// Daftar lagu-lagu kamu
const songs = [
        { 
            title: 'Main Song For You', 
            artist: 'Artis 1', 
            file: './music/mainSong.mp3' // Ganti path ini
        },
        { 
            title: 'message for you', 
            artist: 'Artis 2', 
            file: './music/messageforyou.mp3' // Ganti path ini
        }
];


function initializeApp() {
    console.log("Initializing app...");
    simulateLoading();
}

function simulateLoading() {
    const progressFill = document.getElementById('progress-fill');
    const progressText = document.querySelector('.progress-text');
    let progress = 0;

    if (progressText) {
        progressText.textContent = `${progress}%`;
    }

    const interval = setInterval(() => {
        progress += 2;
        if (progress > 100) {
            progress = 100;
        }

        if (progressFill) {
            progressFill.style.width = `${progress}%`;
        }
        
        if (progressText) {
            progressText.textContent = `${progress}%`;
        }

        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                transitionToMainScreen();
            }, 500);
        }
    }, 50);
}

function transitionToMainScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    const mainScreen = document.getElementById('main-screen');

    if(loadingScreen) {
        loadingScreen.classList.add('fade-out');
    }

    setTimeout(() => {
        if(loadingScreen) {
            loadingScreen.classList.remove('active', 'fade-out', 'loading-complete');
        }
        if(mainScreen) {
            mainScreen.classList.add('active', 'screen-entering');
        }
        currentScreen = 'main';

        setTimeout(() => {
            initializeMainScreen();
        }, 100);

        setTimeout(() => {
            if(mainScreen) {
                mainScreen.classList.remove('screen-entering');
            }
        }, 1200);
    }, 600);
}

function initializeMainScreen() {
    const menuButtons = document.querySelectorAll('.menu-btn');
    const startBtn = document.querySelector('.start-btn');
    const backBtns = document.querySelectorAll('.back-btn');

    menuButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
                const target = this.getAttribute('data-page');
                showScreen(target);
            }, 150);
        });
    });

    if (startBtn) {
        startBtn.addEventListener('click', function () {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    }

    backBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const target = this.getAttribute('data-page');
            showScreen(target);
        });
    });
}

function showScreen(screenName) {
    // Hentikan audio jika pindah dari layar musik
    if (currentScreen === 'music' && screenName !== 'music') {
        currentAudio.pause();
        currentAudio.src = ""; // Kosongkan sumber
        currentPlayingSong = null;
    }
    
    // Hentikan game loop Tetris jika pindah layar
    if (currentScreen === 'tetris' && screenName !== 'tetris') {
        stopTetrisGame();
    }

    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => {
        screen.classList.remove('active');
    });

    const targetScreen = document.getElementById(`${screenName}-screen`);
    if (targetScreen) {
        targetScreen.classList.add('active');
        currentScreen = screenName;

        switch (screenName) {
            case 'message':
                setTimeout(() => initializeMessage(), 100);
                break;
            case 'gallery':
                setTimeout(() => initializeGallery(), 100);
                break;
            case 'music':
                setTimeout(() => initializeMusicPlayer(), 100); 
                break;
            case 'tetris':
                setTimeout(() => initializeTetrisGame(), 100); 
                break;
        }
    } else if (screenName === 'main') {
        const mainScreen = document.getElementById('main-screen');
        if(mainScreen) {
            mainScreen.classList.add('active');
            currentScreen = 'main';
        }
    }
}

// Message Page
function initializeMessage() {
    if (typewriterInterval) {
        clearInterval(typewriterInterval);
        typewriterInterval = null;
    }

    const messageScreen = document.getElementById('message-screen');
    const pageScreen = messageScreen.querySelector('.page-screen');
    if (pageScreen) {
        pageScreen.innerHTML = `
            <div class="page-header">Message</div>
            <div class="message-content"></div>
            <button class="skip-btn">SKIP</button>
        `;
        const skipBtn = pageScreen.querySelector('.skip-btn');
        if (skipBtn) {
            skipBtn.addEventListener('click', skipTypewriter);
        }
    }

    setTimeout(() => startTypewriter(), 300);
}

function startTypewriter() {
    const messageContent = document.querySelector('#message-screen .message-content');
    if (!messageContent) return;

    const fullMessage = `Hi,

Happy Birthday leksss
dak keraso dah tambah umur lagi be.
Di hari spesial ini, happy happy selalu. Nikmati harimu, tertawalah paling kencang, 
lupakan dulu semua pikiran atau tugas yang bikin pusing.

nah cmn kasi spoiler dan ga semua selalu sama, makin dewasa hidup akan punya tantangannya sendiri. 
Nanti akan ada masalah yang rumit, orang yang bikin kecewa, atau hari-hari yang rasanya berat.
Tapi harus tau dan ingat satu hal, kalo kau dak sendirian di dunia ini. 
ado mamah, papah, smo Kakak u yang akan selalu jadi orang pertama yang pasang badan buat kau. 
Kapan pun klo butuh tempat cerita, butuh sandaran, atau butuh "tameng", selalu inget ado sodara kau. 
klo ado masalah dk usah dipendem selalu certain, berusaha tuk terbuka ke keluarga, klo tkut smo mama papa smo mamas be, jadi dak ngraso sendiri

and last
Jangan pernah takut melangkah, berani mencoba, karena kalo blm coba blm tahu hasilnya, 
dan lebih baik mencoba dari pada tidak sama sekali.

Selamat ulang tahun sekali lagi. love you.`;

    messageContent.innerHTML = '';
    let charIndex = 0;
    isTyping = true;

    if (typewriterInterval) {
        clearInterval(typewriterInterval);
    }

    typewriterInterval = setInterval(() => {
        if (charIndex < fullMessage.length) {
            const char = fullMessage[charIndex];
            messageContent.innerHTML += (char === '\n') ? '<br>' : char;
            charIndex++;
            messageContent.scrollTop = messageContent.scrollHeight;
        } else {
            clearInterval(typewriterInterval);
            isTyping = false;
        }
    }, 50);
}

function skipTypewriter() {
    if (isTyping && typewriterInterval) {
        clearInterval(typewriterInterval);
    }
    
    const messageContent = document.querySelector('#message-screen .message-content');
    if (messageContent) {
        const fullMessage = `Hi,
<br><br>
Happy Birthday leksss
<br><br>
dak keraso dah tambah umur lagi be.
Di hari spesial ini, happy happy selalu. Nikmati harimu, tertawalah paling kencang, 
lupakan dulu semua pikiran atau tugas yang bikin pusing.
<br><br>
nah cmn kasi spoiler dan ga semua selalu sama, makin dewasa hidup akan punya tantangannya sendiri. 
Nanti akan ada masalah yang rumit, orang yang bikin kecewa, atau hari-hari yang rasanya berat.
Tapi harus tau dan ingat satu hal, kalo kau dak sendirian di dunia ini. 
ado mamah, papah, smo Kakak u yang akan selalu jadi orang pertama yang pasang badan buat kau. 
Kapan pun klo butuh tempat cerita, butuh sandaran, atau butuh "tameng", selalu inget ado sodara kau. 
klo ado masalah dk usah dipendem selalu certain, berusaha tuk terbuka ke keluarga, klo tkut smo mama papa smo mamas be, jadi dak ngraso sendiri
<br><br>
and last
Jangan pernah takut melangkah, berani mencoba, karena kalo blm coba blm tahu hasilnya, 
dan lebih baik mencoba dari pada tidak sama sekali.
<br><br>
Selamat ulang tahun sekali lagi. love you.`;
        
        messageContent.innerHTML = fullMessage;
        isTyping = false;
        messageContent.scrollTop = messageContent.scrollHeight;
    }
}


// Gallery Page (Sudah diperbaiki)
function showGalleryPhoto(index) {
    const galleryContent = document.querySelector('#gallery-screen .gallery-content');
    if (!galleryContent || !photos[index]) return;

    const photo = photos[index];
    galleryContent.innerHTML = `
        <div class="photo-display-single">
            <img src="${photo.image}" alt="${photo.text}" class="gallery-image-main">
            <div class="gallery-caption">${photo.text}</div>
        </div>
        <div class="gallery-counter">${index + 1} / ${photos.length}</div>
    `;
}

function initializeGallery() {
    currentPhotoIndex = 0; 
    showGalleryPhoto(currentPhotoIndex); 

    const continueBtn = document.querySelector('#gallery-screen .continue-btn');
    if (!continueBtn) return;
    
    const newBtn = continueBtn.cloneNode(true);
    continueBtn.parentNode.replaceChild(newBtn, continueBtn);

    newBtn.addEventListener('click', () => {
        currentPhotoIndex++; 
        
        if (currentPhotoIndex >= photos.length) {
            currentPhotoIndex = 0; 
        }
        
        showGalleryPhoto(currentPhotoIndex);
    });
}


// Music Player Functions
function initializeMusicPlayer() {
    const musicContent = document.querySelector('#music-screen .music-content');
    if (!musicContent) return;

    musicContent.innerHTML = `
        <ul class="music-list">
            ${songs.map((song, index) => `
                <li class="music-item" data-index="${index}">
                    <div class="music-info">
                        <div class="music-title">${song.title}</div>
                        <div class="music-artist">${song.artist}</div>
                    </div>
                    <div class="music-play-icon">▶</div>
                </li>
            `).join('')}
        </ul>
    `;

    const musicItems = musicContent.querySelectorAll('.music-item');
    musicItems.forEach(item => {
        item.addEventListener('click', () => {
            const songIndex = item.getAttribute('data-index');
            playSong(songIndex, item);
        });
    });
}

function playSong(songIndex, selectedItem) {
    const song = songs[songIndex];

    document.querySelectorAll('.music-item').forEach(i => i.classList.remove('playing'));
    
    if (currentPlayingSong === song.file && !currentAudio.paused) {
        currentAudio.pause();
        currentPlayingSong = null;
    } else {
        currentAudio.pause();
        currentAudio.src = song.file;
        currentAudio.play();
        currentPlayingSong = song.file;
        selectedItem.classList.add('playing');
    }
}


// === TETRIS GAME LOGIC START ===
// (Kembali ke versi Papan Kosong)

function initializeTetrisGame() {
    console.log("Initializing Tetris...");
    
    if (tetrisGameInstance) {
        tetrisGameInstance.stop();
    }

    const canvas = document.getElementById('tetris-canvas');
    if (!canvas) {
        console.error("Tetris canvas not found!");
        return;
    }
    const context = canvas.getContext('2d');
    
    const COLS = 10;
    const ROWS = 20;
    const BLOCK_SIZE = 20; 
    
    canvas.width = COLS * BLOCK_SIZE;
    canvas.height = ROWS * BLOCK_SIZE;
    
    context.scale(BLOCK_SIZE, BLOCK_SIZE);

    const scoreElement = document.getElementById('score');
    const levelElement = document.getElementById('level');
    const linesElement = document.getElementById('lines');

    const SHAPES = [
        [[1, 1, 1, 1]], // I
        [[1, 1], [1, 1]], // O
        [[0, 1, 0], [1, 1, 1]], // T
        [[1, 1, 0], [0, 1, 1]], // Z
        [[0, 1, 1], [1, 1, 0]], // S
        [[1, 0, 0], [1, 1, 1]], // J
        [[0, 0, 1], [1, 1, 1]]  // L
    ];

    const COLORS = [
        '#0f380f', // Background
        '#00FFFF', // I (Cyan)
        '#FFFF00', // O (Yellow)
        '#800080', // T (Purple)
        '#FF0000', // Z (Red)
        '#00FF00', // S (Green)
        '#0000FF', // J (Blue)
        '#FFA500'  // L (Orange)
    ];

    function createEmptyBoard() {
        return Array.from({ length: ROWS }, () => Array(COLS).fill(0));
    }

    let board = createEmptyBoard(); // Menggunakan papan kosong
    let piece = null;
    let score = 0;
    let lines = 0;
    let level = 1;
    let dropStart = Date.now();
    let isGameOver = false;
    let animationFrameId = null;

    function spawnPiece() {
        const randIndex = Math.floor(Math.random() * SHAPES.length);
        const shape = SHAPES[randIndex];
        return {
            x: Math.floor(COLS / 2) - Math.floor(shape[0].length / 2),
            y: 0,
            shape: shape,
            color: randIndex + 1
        };
    }

    function draw() {
        context.fillStyle = COLORS[0];
        context.fillRect(0, 0, canvas.width, canvas.height);
        
        board.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value > 0) {
                    context.fillStyle = COLORS[value];
                    context.fillRect(x, y, 1, 1);
                }
            });
        });

        if (piece) {
            context.fillStyle = COLORS[piece.color];
            piece.shape.forEach((row, y) => {
                row.forEach((value, x) => {
                    if (value > 0) {
                        context.fillRect(piece.x + x, piece.y + y, 1, 1);
                    }
                });
            });
        }
    }
    
    function movePiece(dx, dy) {
        if (!piece) return;
        let newX = piece.x + dx;
        let newY = piece.y + dy;
        
        if (isValidMove(piece.shape, newX, newY)) {
            piece.x = newX;
            piece.y = newY;
            return true;
        }
        return false;
    }

    function rotatePiece() {
        if (!piece) return;
        
        const newShape = piece.shape[0].map((_, i) => piece.shape.map(row => row[i])).reverse();
        
        if (isValidMove(newShape, piece.x, piece.y)) {
            piece.shape = newShape;
        } else if (isValidMove(newShape, piece.x + 1, piece.y)) {
            piece.x++;
            piece.shape = newShape;
        } else if (isValidMove(newShape, piece.x - 1, piece.y)) {
            piece.x--;
            piece.shape = newShape;
        }
    }

    function dropPiece() {
        if (isGameOver) return;
        let now = Date.now();
        let delta = now - dropStart;
        let dropInterval = 1000 / (level * 0.8 + 1); 

        if (delta > dropInterval) {
            if (!movePiece(0, 1)) {
                lockPiece();
                piece = spawnPiece();
                if (!isValidMove(piece.shape, piece.x, piece.y)) {
                    gameOver();
                }
            }
            dropStart = Date.now();
        }
    }

    function hardDrop() {
        if (!piece) return;
        while(movePiece(0, 1)) {
            // (kosong)
        }
        lockPiece();
        piece = spawnPiece();
        if (!isValidMove(piece.shape, piece.x, piece.y)) {
            gameOver();
        }
        dropStart = Date.now();
    }

    function isValidMove(shape, x, y) {
        for (let row = 0; row < shape.length; row++) {
            for (let col = 0; col < shape[row].length; col++) {
                if (shape[row][col] > 0) {
                    let newX = x + col;
                    let newY = y + row;
                    if (newX < 0 || newX >= COLS || newY >= ROWS || (newY >= 0 && board[newY][newX] > 0)) {
                        return false;
                    }
                }
            }
        }
        return true;
    }

    function lockPiece() {
        if (!piece) return;
        piece.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value > 0) {
                    if (piece.y + y < 0) {
                        gameOver();
                    } else {
                         if (board[piece.y + y] !== undefined) {
                            board[piece.y + y][piece.x + x] = piece.color;
                        }
                    }
                }
            });
        });
        clearLines();
    }

    function clearLines() {
        let linesCleared = 0;
        for (let y = ROWS - 1; y >= 0; y--) {
            if (board[y].every(value => value > 0)) {
                linesCleared++;
                board.splice(y, 1);
                board.unshift(Array(COLS).fill(0));
                y++;
            }
        }
        
        if (linesCleared > 0) {
            lines += linesCleared;
            score += (linesCleared * 10 * level) * linesCleared;
            level = Math.floor(lines / 10) + 1;
            
            updateScore();
        }
    }
    
    function updateScore() {
        if(scoreElement) scoreElement.textContent = score;
        if(levelElement) levelElement.textContent = level;
        if(linesElement) linesElement.textContent = lines;
    }

    function gameOver() {
        isGameOver = true;
        stopGame();
        
        const modal = document.getElementById('game-over-modal');
        if (modal) {
            modal.style.display = 'flex';
        }
    }

    function gameLoop() {
        if (isGameOver) return;
        
        dropPiece();
        draw();
        
        animationFrameId = requestAnimationFrame(gameLoop);
    }
    
    function startGame() {
        board = createEmptyBoard(); // Mulai dengan papan kosong
        piece = spawnPiece();
        score = 0;
        lines = 0;
        level = 1;
        isGameOver = false;
        updateScore();
        
        const modal = document.getElementById('game-over-modal');
        if (modal) modal.style.display = 'none';
        const finalModal = document.getElementById('final-message-modal');
        if (finalModal) finalModal.style.display = 'none';
        
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
        }
        
        gameLoop();
    }

    function stopGame() {
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
        }
        isGameOver = true;
    }

    // --- Kontrol ---
    // 1. Tombol di layar Tetris (SEKARANG SUDAH TERLIHAT)
    const leftBtn = document.getElementById('left-btn');
    const rightBtn = document.getElementById('right-btn');
    const rotateBtn = document.getElementById('rotate-btn');
    
    const safeMoveLeft = () => { if (!isGameOver) movePiece(-1, 0); };
    const safeMoveRight = () => { if (!isGameOver) movePiece(1, 0); };
    const safeRotate = () => { if (!isGameOver) rotatePiece(); };

    if(leftBtn) leftBtn.onclick = safeMoveLeft;
    if(rightBtn) rightBtn.onclick = safeMoveRight;
    if(rotateBtn) rotateBtn.onclick = safeRotate;

    // === PERUBAHAN DI SINI ===
    // 2. Tombol di badan Gameboy (sekarang menargetkan yang ada di #tetris-screen)
    const dpadLeft = document.querySelector('#tetris-screen .dpad-left');
    const dpadRight = document.querySelector('#tetris-screen .dpad-right');
    const dpadDown = document.querySelector('#tetris-screen .dpad-down');
    const dpadUp = document.querySelector('#tetris-screen .dpad-up');
    const aBtn = document.querySelector('#tetris-screen .a-btn');
    const bBtn = document.querySelector('#tetris-screen .b-btn');

    // Buat fungsi wrapper agar hanya aktif saat di layar tetris
    // (Pengecekan currentScreen tidak perlu lagi karena tombol ini HANYA ada di layar tetris)
    const tetrisMoveLeft = () => { if(!isGameOver) movePiece(-1, 0); };
    const tetrisMoveRight = () => { if(!isGameOver) movePiece(1, 0); };
    const tetrisMoveDown = () => { if(!isGameOver) dropPiece(); };
    const tetrisRotate = () => { if(!isGameOver) rotatePiece(); };
    const tetrisHardDrop = () => { if(!isGameOver) hardDrop(); };
    
    if(dpadLeft) dpadLeft.onclick = tetrisMoveLeft;
    if(dpadRight) dpadRight.onclick = tetrisMoveRight;
    if(dpadDown) dpadDown.onclick = tetrisMoveDown;
    if(dpadUp) dpadUp.onclick = tetrisRotate;
    if(aBtn) aBtn.onclick = tetrisRotate;
    if(bBtn) bBtn.onclick = tetrisHardDrop;

    // 3. Tombol Keyboard
    document.onkeydown = (e) => {
        if (currentScreen !== 'tetris' || isGameOver) return;
        
        if (e.key === 'ArrowLeft') { e.preventDefault(); tetrisMoveLeft(); }
        else if (e.key === 'ArrowRight') { e.preventDefault(); tetrisMoveRight(); }
        else if (e.key === 'ArrowDown') { e.preventDefault(); tetrisMoveDown(); }
        else if (e.key === 'ArrowUp' || e.key.toLowerCase() === 'x') { e.preventDefault(); tetrisRotate(); }
        else if (e.key === ' ' || e.key.toLowerCase() === 'z') { e.preventDefault(); tetrisHardDrop(); }
    };
    
    // 4. Tombol "CONFIRM" di modal Game Over
    const confirmBtn = document.getElementById('confirm-btn');
    if (confirmBtn) {
        confirmBtn.onclick = () => {
            const modal = document.getElementById('game-over-modal');
            if (modal) modal.style.display = 'none';
            const finalMsgModal = document.getElementById('final-message-modal');
            if(finalMsgModal) finalMsgModal.style.display = 'flex';
        };
    }
    
    // 5. Tombol "OK" di modal "I LOVE YOU"
    const okBtn = document.getElementById('ok-btn');
    if (okBtn) {
        okBtn.onclick = () => {
            document.getElementById('final-message-modal').style.display = 'none';
            startGame();
        };
    }

    // Public interface
    tetrisGameInstance = {
        start: startGame,
        stop: stopGame
    };

    startGame();
}

function stopTetrisGame() {
    if (tetrisGameInstance) {
        tetrisGameInstance.stop();
        tetrisGameInstance = null;
    }
    document.onkeydown = null;
    
    // Hapus listener tombol gameboy di layar tetris
    const dpadLeft = document.querySelector('#tetris-screen .dpad-left');
    const dpadRight = document.querySelector('#tetris-screen .dpad-right');
    const dpadDown = document.querySelector('#tetris-screen .dpad-down');
    const dpadUp = document.querySelector('#tetris-screen .dpad-up');
    const aBtn = document.querySelector('#tetris-screen .a-btn');
    const bBtn = document.querySelector('#tetris-screen .b-btn');

    if(dpadLeft) dpadLeft.onclick = null;
    if(dpadRight) dpadRight.onclick = null;
    if(dpadDown) dpadDown.onclick = null;
    if(dpadUp) dpadUp.onclick = null;
    if(aBtn) aBtn.onclick = null;
    if(bBtn) bBtn.onclick = null;
}
// === TETRIS GAME LOGIC END ===


// Menunggu DOM siap
document.addEventListener('DOMContentLoaded', (event) => {
    initializeApp();
});