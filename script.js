let gameBoard = [' ',' ',' ',' ',' ',' ',' ',' ',' '];
// let gameBoard = ['O',' ',' ','O',' ',' ','O',' ',' '];


const Player = function(name,marker,actualTurn){

    let score = 0;
    function sayHello(){
        console.log("Hi, I'm here! "+name);
        console.log(gameBoard);
    };

    function play(){
        let a = true;
        
        // let condition = ()
        do {
            choice = prompt("Enter the case: ");
            Number(choice);
            choice = choice - 1;
            console.log(choice);
            if(gameBoard[choice] != ' ' || (choice<0 ||  choice>gameBoard.length)){
                console.log("Error");
            }else{
                gameBoard[choice] = marker;
                actualTurn += 1;
                console.log(actualTurn,"suhushu");
                a = false;
            }
            
        } while (a === true);
        console.log(gameBoard);

    }

    function setScore(){
        score += 1;
    }

    function getScore(){
        return score;
    }

    function getTurn(){
        return actualTurn;
    }

    



    return {sayHello,play,actualTurn,getTurn,setScore,getScore};
}

const newGame =  function(){

    let score1 = 0;
    let score2 = 0;


    const displayBoard = function(){
        console.log(`${gameBoard[0]}|${gameBoard[1]}|${gameBoard[2]}`);

        console.log(`${gameBoard[3]}|${gameBoard[4]}|${gameBoard[5]}`);

        console.log(`${gameBoard[6]}|${gameBoard[7]}|${gameBoard[8]}`);
    }

    let turn = 0;

    const gameStateCheck = function(){
        const winningComb = [[0,1,2],[3,4,5],[6,7,8], [0,3,6],[1,4,7],[2,5,8], [0,4,8],[2,4,6]];
        let winner = "none";

        winningComb.forEach((comb) => {
            // console.log(comb[0]);
            // console.log(gameBoard[index]);
            if((gameBoard[comb[0]] === gameBoard[comb[1]]) && (gameBoard[comb[1]] === gameBoard[comb[2]])){
                if(gameBoard[comb[0]] != ' '){
                    console.log(gameBoard[comb[0]] + "WIN!!!");
                    winner =  gameBoard[comb[0]];
                }
            }

            
        });
        
        return winner;
    }

    const wins = function(winner,player1,player2){
        if(winner === 'X'){
            player1.setScore();
            alert(`Player 1: ${player1.getScore()}`)
        }else if(winner === 'O'){
            player2.setScore();
            alert(`Player 2: ${player2.getScore()}`)
        }else{
            alert("It's a tie!")
        }
    }

    const checkTurn = function(){
        let turn = 0;
        gameBoard.forEach((place)=>{
            if(place != ' '){
                turn += 1;
            }
        });

        return turn;
    }

    const startGame =  function(){
        let winner = "none";
        let player1 = Player("Joe Dash","X",turn);
        let player2 = Player("Jiguli","O",turn);
        while(turn<=8 && winner === "none"){
            console.log("Winner "+winner);

            player1.play()
            // console.log(player1.getTurn());
            turn = checkTurn();
            // console.log("Turn"+player1.actualTurn);
            console.log("Actual Turn: ",turn);
            displayBoard();
            winner = gameStateCheck();
    
            if(turn>=8 || winner != "none"){
                break;
            }

        
            
            player2.play()
            turn = checkTurn();
            displayBoard();
            winner = gameStateCheck();
            console.log("Winner "+winner);

        }

        wins(winner,player1,player2);

    }
}

newGame();