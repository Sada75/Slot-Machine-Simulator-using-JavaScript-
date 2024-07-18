 //deposit some money
 //Determine the no of lines to bet on 
 //collect the bet amount
 //spin the slot machine
 //check if the user won
 //give the user their winnings
 //play again

//  function deposit(){

//  }
    


const prompt = require("prompt-sync")();

const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT ={
    A : 2,
    B : 4,
    C : 6,
    D : 8
}

const SYMBOL_VALUES ={
    A: 5,
    B: 4,
    C: 3,
    D: 2
}



const deposit=()=>{
    
    while(true){
        const depositAmount=prompt("Enter the deposit amount: ");
        const numberDepositAmount = parseFloat(depositAmount);
        if(isNaN(numberDepositAmount) || numberDepositAmount<=0){
            console.log("Invalid input . try again ");
        }else{
            return numberDepositAmount;
        }
    }
    
};

const getNumberofLines=()=>{
    while(true){
        const lines=prompt("Enter the number of lines which you want to bet on(1-3 ) : ");
        const numberofLines=parseFloat(lines);
        if(isNaN(numberofLines) || numberofLines<=0 || numberofLines>3){
            console.log("Invalid input . Try again");
        }else{
            return numberofLines;
        }
    }
    
}

const getBet=(balance,lines)=>{
    while(true){
        const bet=prompt("Enter the bet amount per line : ");
        const numberBet=parseFloat(bet);
        if(isNaN(numberBet) || numberBet>(balance/lines) || numberBet<=0){
            console.log("Invalid input. Enter again : ");
        }else{
            return numberBet;
        }
    }
}

const spin=()=>{
    const symbols=[];
    for(const [symbol,count] of Object.entries(SYMBOLS_COUNT)){
        for(let i=0;i<count;i++){
            symbols.push(symbol);
        }
    } 

    const reels=[];
    for(let i=0;i<COLS;i++){
        reels.push([]);
        const reelSymbols = [...symbols];
        for(let j=0;j<ROWS;j++){
             const randomIndex = Math.floor(Math.random() * reelSymbols.length);
             const selectedSymbol = reelSymbols[randomIndex];
             reels[i].push(selectedSymbol);
             reelSymbols.splice(randomIndex,1);
        }
    }
    return reels;
}

const transpose=(reels)=>{
    const transposeArr = [];
    for(let i=0;i<reels.length;i++){
        transposeArr.push([]);
        for(let j=0;j<reels[i].length;j++){
                transposeArr[i].push(reels[j][i]);
        }

    }
    return transposeArr;
}

const printRow=(rows)=>{
    // if(!Array.isArray(rows)){
    //     console.error("Input is not an array.")
    //     return;
    // }
    // for(let i=0;i<rows.length;i++){
    //     let result = '';
    //     if(!Array.isArray(rows[i])){
    //         console.error("Invalid Input")
    //         return ;
    //     }
    //     for(let j=0;j<rows[i].length;j++){
    //         result+=` | ${rows[i][j]} | `
    //     }
    //     console.log(result);
    // }

    for(const row of rows){
        let result = "";
        for(const [i,symbol] of row.entries()){
            result += `${symbol}`;
            if(i!=row.length-1){
                result += "|";
            }

        }
        console.log(result);
    }
}

const getWinnings = (rows,bet,lines) =>{
    let winnings = 0;
    for(let row = 0 ; row<lines; row++){
        const symbols = rows[row];
        let allsame=true;
        for(const symbol of symbols){
            if(symbol !== symbols[0]){
                allsame=false;
                break;
            }
           
        }
        if(allsame){
            winnings += bet * SYMBOL_VALUES[symbols[0]];
        }
        
    }
    return winnings;
};





let balance= deposit();
while(true){
    const numberofLines=getNumberofLines();
const bet=getBet(balance,numberofLines);
const reels=spin();
const rows = transpose(reels);
console.log(rows);
printRow(rows);
const winnings = getWinnings(rows, bet , numberofLines);
console.log("You won, $"+ winnings.toString());
if(winnings===0){
    balance -= bet*numberofLines;
}else{
    balance += winnings;
}
console.log(`You are left with ${balance}$`);
let k=0;

if(balance===0){
    const choice = prompt("You ran out of money . want to deposit more ? (y/n)");
    if(choice=="y"){
        k=1;
        balance=deposit();
    }
    else{
        break;
    }
}
if(k===0){

    const y=prompt("You want to play againc? : (y/n)");
if(y=="n"){
    break;
}
else{
    continue;
}

}

}





