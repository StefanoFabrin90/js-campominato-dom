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

    // lista dei tentativi
    const tenTativi = [];
    const totTentativi = cellsNumber - listBomb.length;
    console.log(totTentativi);

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
        square.addEventListener('click', function() {
            // square.classList.add('clicked');
            clickSquare (square, listBomb, tenTativi, totTentativi)
        });
    }

    // inserimento nel HTML
    wrapGrid.append(grid);
})




// FUNZIONI=

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


// funzione click

function clickSquare (square, listBomb, tenTativi, totTentativi) {
    // ottenere il numero all interno del div square
    const num = parseInt(square.innerText); //posso usare innertext perche all interno del div non ho html
    console.log(num);

    // capire se ho colpito la bomba 
    if (listBomb.includes(num)) {
        // console.log('bomba');
        endGame (listBomb, tenTativi, totTentativi)

    } else if (!tenTativi.includes(num)) {
        // aggiunger colore di sfondo
        square.classList.add('safe');

        // aggiungere il numero alla lista dei tentativi
        tenTativi.push(num);
        
        // controllare se il numero dei tentativi sono uguali al  numero massimo dei tentativi
        if (tenTativi.length === totTentativi){
            endGame (listBomb, tenTativi, totTentativi)
        }
    }
}


// funzione fine gioco

function endGame (listBomb, tenTativi, totTentativi) {
    // ottenere tutti i div  = queryselectorAll ----> Array
    const squareS = document.querySelectorAll('.square')
    console.log(squareS);

    // mostrare tutte le bombe, si parte da 0 perche e l'indice dell array
    for (let i = 0; i < squareS.length; i++) {
        const square = squareS[i];
        const squareNumber = parseInt(square.innerText);

        if(listBomb.includes(squareNumber)) {
            square.classList.add('bomb');
        }
    }


    // testo messaggio di fine partita
    let messagge = `Complimenti hai vinto... Hai indovinato i ${totTentativi} tentativi validi!!!`

    // end
    if (tenTativi.length < totTentativi) {
        messagge = `Mi dispiace hai perso... Hai indovinato ${tenTativi.length} tentativi. Gioca ancora...`
    }

    // creazione elemento messaggio
    const messEl = document.createElement('div');
    messEl.classList.add('text-center', 'mt-5');
    messEl.append(messagge);
    document.querySelector('.wrap-grid').append(messEl);


    // non rendere le square piu cliccabili
    document.querySelector('.grid').classList.add('end');
}