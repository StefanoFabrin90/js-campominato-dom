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

    // generazione grid
    const grid = document.createElement ('div');
    grid.classList.add('grid');

   
    // generazione caselle
    for (let i = 1; i <= cellsNumber; i++) {
        // gen square
        const square = genSquare(cellsSide);
        square.innerHTML += `${i}`;
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

function genSquare (cells) {
    const node = document.createElement('div');
    node.classList.add('square');
    node.style.width = `calc(100% / ${cells})`;
    node.style.height = `calc(100% / ${cells})`;

    return node;
}