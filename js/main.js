// L’utente indica un livello di difficoltà in base al quale viene generata una griglia di gioco quadrata, in cui ogni cella contiene un numero tra quelli compresi in un range:
// con difficoltà 1 => tra 1 e 100
// con difficoltà 2 => tra 1 e 81
// con difficoltà 3 => tra 1 e 49


// Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.
// I numeri nella lista delle bombe non possono essere duplicati.

// In seguito l’utente clicca su ogni cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina, altrimenti la cella cliccata si colora di azzurro e l’utente può continuare a cliccare sulle altre celle.
// La partita termina quando il giocatore clicca su una bomba o raggiunge il numero massimo possibile di numeri consentiti.

// Al termine della partita il software deve scoprire tutte le bombe e comunicare il punteggio, cioè il numero di volte che l’utente ha inserito un numero consentito.




const setBtn = document.getElementById('set');
const wrapGrid = document.querySelector('.wrap-grid');
const dimensionLevel = document.getElementById('dimensioni');

// set griglia
setBtn.addEventListener('click', () => {
    // console.log('click');

    // reset del title
    wrapGrid.innerHTML = '';

    // settare la griglia
    const griDimension = dimensionLevel.value;
    console.log(griDimension);
    let cellsNumber;
    let cellsSide;
    
    switch (griDimension) {
        case '1':
            cellsNumber = 100;
            cellsSide = 10;
            break;
        case '2':
            cellsNumber = 81;
            cellsSide = 9;
            break;
        case '3':
            cellsNumber = 49;
            cellsSide = 7;
            break;
    }
    console.log(cellsNumber);
    console.log(cellsSide);

    // generazione delle bombe 
    const listBomb = genBombos(cellsNumber, 16);
    console.log(listBomb);

    // generazione grid
    const grid = document.createElement ('div');
    grid.classList.add('grid');

   
    // generazione caselle
    for (let i = 1; i <= cellsNumber; i++) {
        // gen square
        const square = genSquare(i, cellsSide);
        // square.innerHTML += `${i}`;
        grid.append(square);

        // cliccabile
        square.addEventListener('click', function(){
            console.log(square);
            square.classList.add('clicked');
        });
    }

    // inserimento nel HTML
    wrapGrid.append(grid);
})




// funzioni

function genSquare (num, cells) {
    const node = document.createElement('div');
    node.classList.add('square');
    node.style.width = `calc(100% / ${cells})`;
    node.style.height = `calc(100% / ${cells})`;
    node.append(num);

    return node;
}


// lista delle bombe: 16 numeri di tipo univoco

function genBombos(totCells, totBombs){
    const bomBs =[]; //array dove devo inserire il numero delle bombe

    while(bomBs.length < totBombs){

        const bomb = numRandom (1, totCells)

        if (!bomBs.includes(bomb)) {
            bomBs.push(bomb);
        }
    }
    return bomBs;
} 



// numero random 

function numRandom (min, max){
    return Math.floor( Math.random() * (max - min + 1) ) + min;
}