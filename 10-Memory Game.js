window.addEventListener("load",()=>main(),false);
let startingColors = ["yellowgreen","crimson","forestgreen","teal","fuchsia","gold","cornflowerblue","aqua",
"chartreuse","tomato","darkorange","palevioletred","blue","red","antiquewhite","chocolate","purple","brown","hotpink","indigo","sienna"]

const hiddenColor = "dimgray"; // Color of the back of the squares.
const playersTurn ="-webkit-radial-gradient(ellipse,rgb(240, 225, 94) 20%, rgb(56, 140, 148) 80%)";
const playersNoTurn = "-webkit-radial-gradient(circle,rgb(117, 184, 190) 20%, rgb(56, 140, 148) 80%)";

let colorsOfSquares = new Array(42); // Array that will handle the color of each square.
let Squares, i = 0;
let TimerID;
let isPlayer2Turn = false; // false: player 1 || true: player 2.
let isFirstMove = true;  // it shows which player started this game. Reset reverses it.
let phase = 0;   // 0: No flip on this turn. || 1: 1 flipped. || 2: 2 flipped.
let move = ["",""]; // To know if the revealed Squares match.
let positions = [0,0]; // To know the positions of the Squares played.
let punctuation1=0, punctuation2=0;
let player1, player2;

const main= () =>
{
    Squares = document.getElementsByClassName("Square");
    player1 = document.getElementById("Player1");
    player2 = document.getElementById("Player2");
    document.getElementById("Reset").addEventListener("click",() => Reset(),false);
    player1.addEventListener("click",() => rename(1),false)
    player2.addEventListener("click",() => rename(2),false)

    Squares[0].addEventListener("click",() => toReveal(0),false);
    Squares[1].addEventListener("click",() => toReveal(1),false);
    Squares[2].addEventListener("click",() => toReveal(2),false);
    Squares[3].addEventListener("click",() => toReveal(3),false);
    Squares[4].addEventListener("click",() => toReveal(4),false);
    Squares[5].addEventListener("click",() => toReveal(5),false);
    Squares[6].addEventListener("click",() => toReveal(6),false);
    Squares[7].addEventListener("click",() => toReveal(7),false);
    Squares[8].addEventListener("click",() => toReveal(8),false);
    Squares[9].addEventListener("click",() => toReveal(9),false);
    Squares[10].addEventListener("click",() => toReveal(10),false);
    Squares[11].addEventListener("click",() => toReveal(11),false);
    Squares[12].addEventListener("click",() => toReveal(12),false);
    Squares[13].addEventListener("click",() => toReveal(13),false);
    Squares[14].addEventListener("click",() => toReveal(14),false);
    Squares[15].addEventListener("click",() => toReveal(15),false);
    Squares[16].addEventListener("click",() => toReveal(16),false);
    Squares[17].addEventListener("click",() => toReveal(17),false);
    Squares[18].addEventListener("click",() => toReveal(18),false);
    Squares[19].addEventListener("click",() => toReveal(19),false);
    Squares[20].addEventListener("click",() => toReveal(20),false);
    Squares[21].addEventListener("click",() => toReveal(21),false);
    Squares[22].addEventListener("click",() => toReveal(22),false);
    Squares[23].addEventListener("click",() => toReveal(23),false);
    Squares[24].addEventListener("click",() => toReveal(24),false);
    Squares[25].addEventListener("click",() => toReveal(25),false);
    Squares[26].addEventListener("click",() => toReveal(26),false);
    Squares[27].addEventListener("click",() => toReveal(27),false);
    Squares[28].addEventListener("click",() => toReveal(28),false);
    Squares[29].addEventListener("click",() => toReveal(29),false);
    Squares[30].addEventListener("click",() => toReveal(30),false);
    Squares[31].addEventListener("click",() => toReveal(31),false);
    Squares[32].addEventListener("click",() => toReveal(32),false);
    Squares[33].addEventListener("click",() => toReveal(33),false);
    Squares[34].addEventListener("click",() => toReveal(34),false);
    Squares[35].addEventListener("click",() => toReveal(35),false);
    Squares[36].addEventListener("click",() => toReveal(36),false);
    Squares[37].addEventListener("click",() => toReveal(37),false);
    Squares[38].addEventListener("click",() => toReveal(38),false);
    Squares[39].addEventListener("click",() => toReveal(39),false);
    Squares[40].addEventListener("click",() => toReveal(40),false);
    Squares[41].addEventListener("click",() => toReveal(41),false);

    Reset();    // The initial conditions are established.
}

function rename(name)
{
    if(name == 1)
    {
        let tempName = prompt("Write a name for this player");
        player1.innerHTML = tempName.trim() === "" ? "Player 1" : tempName;
    }
    else
    {
        let tempName = prompt("Write a name for this player");
        player2.innerHTML=tempName.trim() === "" ? "Player 2" : tempName;
    }
}

function toReveal(Num) // Allows you to flip a square under certain conditions.
{
    if(Squares[Num].style.background == hiddenColor && phase < 2) // It only enters if the square is flipped.
    {           
        Squares[Num].style.background = colorsOfSquares[Num];    // Its color is revealed.
        move[phase] = colorsOfSquares[Num]; // This color is stored for later comparison.
        positions[phase] = Num; // The square number is stored in case it needs to return to normal.
        phase++; // Advance to the next phase of the turn.
        if(phase == 2)
        {
            checkAnnotation();
				alertWinner();
        }
    }
}

function checkAnnotation() // It checks if there is annotation on this turn or not .
{
    if(move[0] == move[1])  // If the colors of the revealed squares match.
    {
        if(isPlayer2Turn)
        {
            punctuation2++;
            document.getElementById("Score2").innerHTML=punctuation2;
            document.getElementById("Score2").style.background = playersTurn;
        }
        else    // If is player 1 turn.
        {
            punctuation1++;
            document.getElementById("Score1").innerHTML=punctuation1;
            document.getElementById("Score1").style.background = playersTurn;
        }
        setTimeout(turnOffScore,1000);
        phase = 0; // The turn is restarted for the same player.
    }
    else // If the colors of the revealed cells do not match.
    {                               // The two squares are flipped again
        setTimeout(flipSquare,1000);    // moves after waiting 1 second.
    }    
}

function turnOffScore()
{
    document.getElementById("Score1").style.background = playersNoTurn;
    document.getElementById("Score2").style.background = playersNoTurn;
}

function flipSquare()
{
    Squares[positions[0]].style.background = hiddenColor;
    Squares[positions[1]].style.background = hiddenColor;
    phase = 0;   // The turn is reset
    move = ["",""];
    positions = [0,0];
    if(isPlayer2Turn)   // The turn is assigned to the other player.
    {
        isPlayer2Turn = false;
        player1.style.background = playersTurn;
        player2.style.background = playersNoTurn; 
    }
    else
    {
        isPlayer2Turn = true;
        player1.style.background = playersNoTurn;
        player2.style.background = playersTurn; 
    }
}

function Reset()    // Restores the initial conditions of the program.
{
     for(i=0;i<Squares.length;i++)   // The 42 Squares are traversed so that they initially look flipped.
    {
        Squares[i].style.background=hiddenColor;
        colorsOfSquares[i]="";
    }
    for(i=0;i<startingColors.length;i++)   // The 21 colors are cycled through to randomly assign them to the cells twice.
    {
        fillColors(i);   // The index of the color array is sent as a parameter so that it can be assigned a place.
        fillColors(i);
    }
    phase = 0;
    positions = [0,0];
    move = ["",""];

    if(isFirstMove)   // If this game was started by player 2.
    {                   // the new game will start by player 1.
        isPlayer2Turn = false;
        isFirstMove = false;
        player1.style.background = playersTurn;
        player2.style.background = playersNoTurn; 
    }
    else  
    {      
        isPlayer2Turn = true;
        isFirstMove = true;
        player1.style.background = playersNoTurn;
        player2.style.background = playersTurn; 
    }
}

function fillColors(index)  // Store each color in the grid 2 times in random places without repeating.
{
    let spot=0;

    spot=Math.round(Math.random()*(Squares.length-1)); // It points to a tentative index of the Squares
    // we don't know if it will be empty or not.
    while(colorsOfSquares[spot] != "") // If said spot is not empty, it must sign up for another.
    {
    spot=Math.round(Math.random()*(Squares.length-1)); // It points to another as long as it is not empty.
    }
    colorsOfSquares[spot] = startingColors[index];
}

function alertWinner () {
	let isWinner = true;
	for (let i = 0; i < Squares.length; i++) {
		if (Squares[i].style.background !== colorsOfSquares[i]) {
			isWinner = false;
		}
	}
	if (isWinner) {
		if(punctuation1 > punctuation2){
			alert("Congratulations, " + player1.innerHTML + " you win!");
		}
		else if (punctuation1 < punctuation2) {
			alert("Congratulations, " + player2.innerHTML + " you win!")
		}
	}
}
