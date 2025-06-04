const Gameboard = (()=>{
    let gameboard = [[null, null, null],
                    [null, null, null],
                    [null, null, null]];
    const getGameboard = () => gameboard;
    const setGameboard = (row, col, marker) => {
        if (gameboard[row][col] === null) {
            gameboard[row][col] = marker;
        }
    }
    const resetGameboard = () => {
        gameboard = [[null, null, null],
                    [null, null, null],
                    [null, null, null]];
    }
    const checkWinner = () => {
        const row0 = gameboard[0];
        const row1 = gameboard[1];
        const row2 = gameboard[2];

        if((row0[0] !== null && row0[0] === row0[1] && row0[1] === row0[2]) ||
            (row1[0] !== null && row1[0] === row1[1] && row1[1] === row1[2]) ||
            (row2[0] !== null && row2[0] === row2[1] && row2[1] === row2[2]) ||

            (row0[0] !== null && row0[0] === row1[0] && row1[0] === row2[0]) ||
            (row0[1] !== null && row0[1] === row1[1] && row1[1] === row2[1]) ||
            (row0[2] !== null && row0[2] === row1[2] && row1[2] === row2[2]) ||

            (row0[0] !== null && row0[0] === row1[1] && row1[1] === row2[2]) ||
            (row0[2] !== null && row0[2] === row1[1] && row1[1] === row2[0])){
                return true;
            }
        return false;
    }

    return {getGameboard, setGameboard, resetGameboard, checkWinner};
})();

const Player = (name, marker)=>{
    const getName = () => name;
    const getMarker = () => marker;

    return {getName, getMarker};
}

const gameFlow = (player1, player2)=>{
    let currentPlayer = player1;
    let player1Score = 0;
    let player2Score = 0;

    const getCurrentPlayerName = () => currentPlayer.getName();
    const getCurrentPlayerMarker = () => currentPlayer.getMarker();
    const resetCurrentPlayer = () => { currentPlayer = player1; };

    const playerMove = (row,col) => {
        document.querySelector('.current-player-name').textContent = getCurrentPlayerName();
        Gameboard.setGameboard(row,col,currentPlayer.getMarker());
        if(!Gameboard.checkWinner()){
            nextPlayer();
        }else{
            if (currentPlayer === player1) {
                player1Score++;
                document.querySelector('.player-one-score').textContent = `${player1.getName()}: ${player1Score}`;
            }else if (currentPlayer === player2) {
                player2Score++;
                document.querySelector('.player-two-score').textContent = `${player2.getName()}: ${player2Score}`;
            }
            document.querySelector('.current-player-label').textContent = "Winner:";
            document.querySelector('.current-player-name').textContent = getCurrentPlayerName();
        }
        return Gameboard.checkWinner();
    };

    const nextPlayer = ()=>{
        if(!Gameboard.checkWinner()){
            if (currentPlayer == player1){
                currentPlayer = player2;
                document.querySelector('.current-player-name').textContent = getCurrentPlayerName();
            }else{
                currentPlayer = player1;
                document.querySelector('.current-player-name').textContent = getCurrentPlayerName();
            }
        }else{
            return "winner winner chicken dinner";
        }
    }

    return {getCurrentPlayerName, getCurrentPlayerMarker, resetCurrentPlayer, playerMove, nextPlayer}
}

const startButton = document.querySelector('.start-button');
startButton.addEventListener('click', (e) => {
    e.preventDefault();
    const startScreen = document.querySelector('.start-screen');
    const gameScreen = document.querySelector('.game-screen');
    startScreen.style.display = 'none';
    gameScreen.style.display = 'flex';

    const player1 = (()=>{
        const player1Input = document.querySelector('#player-one');
        if (player1Input.value === '') {
            return Player("Player One", "X");
        }else{
            return Player(player1Input.value, "X");
        }
    });
    const player2 = (()=>{
        const player2Input = document.querySelector('#player-two');
        if (player2Input.value === '') {
            return Player("Player Two", "O");
        }else{
            return Player(player2Input.value, "O");
        }
    });

    window.game = gameFlow(player1(), player2());
    document.querySelector('.current-player-name').textContent = game.getCurrentPlayerName();
    document.querySelector('.player-one-score').textContent = `${player1().getName()}: 0`;
    document.querySelector('.player-two-score').textContent = `${player2().getName()}: 0`;
});

cellButtons = document.querySelectorAll('.cell');
cellButtons.forEach((cell) => {
    cell.addEventListener('click', (e) => {
        let row = 0;
        let col = 0;
        const cell = parseInt(e.target.dataset.cell);
        if(!Gameboard.checkWinner()){
            if (cell === 0 || cell === 1 || cell === 2) {
                row = 0;
                col = parseInt(cell);
            }else if (cell === 3 || cell === 4 || cell === 5) {
                row = 1;
                col = parseInt(cell) - 3;
            } else if (cell === 6 || cell === 7 || cell === 8) {
                row = 2;
                col = parseInt(cell) - 6;
            }
            if (Gameboard.getGameboard()[row][col] === null) {
                e.target.textContent = game.getCurrentPlayerMarker();
                game.playerMove(row, col);
            }
        }
        
    });
});

restartButton = document.querySelector('.restart-button');
restartButton.addEventListener('click',()=>{
    Gameboard.resetGameboard();
    game.resetCurrentPlayer();
    document.querySelector('.current-player-name').textContent = game.getCurrentPlayerName();
    cellButtons.forEach((cell) => {
        cell.textContent = '';
    });
});
