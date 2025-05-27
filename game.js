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

    const getCurrentPlayerName = () => currentPlayer.getName();
    const getCurrentPlayerMarker = () => currentPlayer.getMarker();

    const playerMove = (row,col) => {
        Gameboard.setGameboard(row,col,currentPlayer.getMarker());
        if(!Gameboard.checkWinner()){
            nextPlayer();
        }else{
            console.log(`Congratulations! ${getCurrentPlayerName()} is the winner!`);
        }
        return Gameboard.checkWinner();
    };

    const nextPlayer = ()=>{
        if(!Gameboard.checkWinner()){
            if (currentPlayer == player1){
                currentPlayer = player2;
            }else{
                currentPlayer = player1;
            }
        }else{
            return "winner winner chicken dinner";
        }
    }

    return {getCurrentPlayerName, getCurrentPlayerMarker, playerMove, nextPlayer}
}