import {reactive} from "vue";

export let game = reactive({

    letters: [
        [['', '', '', '', ''],[0, 0, 0, 0, 0]],
        [['', '', '', '', ''],[0, 0, 0, 0, 0]],
        [['', '', '', '', ''],[0, 0, 0, 0, 0]],
        [['', '', '', '', ''],[0, 0, 0, 0, 0]],
        [['', '', '', '', ''],[0, 0, 0, 0, 0]],
        [['', '', '', '', ''],[0, 0, 0, 0, 0]],
    ],

    greenLetters: [],
    yellowLetters: [],
    blackLetters: [],

    // currently selected letter tile
    selectedTile: [0, 0],

    currentRow: 0,
    rowReady: false,

    // 0 = game hasn't started
    // 1 = game in progress
    // 2 = game finished
    gameState: 0,

    // 0 = play
    // 1 = analyse
    gameMode: 0,

    randomWord: '',

    foundWords: [],

    async getRandomWord() {

        // populate the letters array from a list of pangrammable words
        await fetch('http://alexphpdev.ddns.net/.sandpit/wordcheat/7/src/php/getRandomWord.php', {method: 'GET'})
            .then(response => response.text())
            .then((randomWord) => {
                game.randomWord = randomWord;
            })

    },



    inputLetter(letter) {

        // this method is designed to work for both physical and virtual keyboard (latter for mobile)
        // so we get a value for letter that works with both
        if (typeof letter === 'object') {
            // check if backspace key was pressed
            if (letter.keyCode === 8) letter = 'del'
            else if (letter.keyCode === 13 && game.rowReady === true) {
                game.submitRow()
            } 
            else letter = letter.key
        }


        // check that we have a letter and not a number or something else
        if ((letter.match(/[A-Za-z]/i) && letter.length === 1) || letter === 'del' || letter === 'ent') {
            // convert to lowercase
            letter = letter.toLowerCase()
        }
        else return false
        

        // if delete key is pressed
        if (letter === 'del') {
            // clear the current tile and
            game.letters[game.selectedTile[0]][0][game.selectedTile[1]] = '';
            // move back a tile if we are not on the first tile
            if (game.selectedTile[1] > 0) game.selectedTile[1]--
        }
        // if a letter is pressed
        else {
            // fill the tile with that letter and
            game.letters[game.selectedTile[0]][0][game.selectedTile[1]] = letter;
            // move forward a tile if we are not on the last tile
            if (game.selectedTile[1] < 4) game.selectedTile[1]++
        }

        // check if the row is now filled with letters, then we display the 'go' button for the row
        if (! game.letters[game.currentRow][0].includes('')) game.rowReady = true;
        else game.rowReady = false;

        game.gameState = 1

    },


    selectTile(row, col) {

        if (game.currentRow !== row) return false

        game.selectedTile = [row, col]


        if (game.gameMode === 1) {
            if (game.letters[row][1][col] === 2) game.letters[row][1][col] = 0
            else game.letters[row][1][col]++
        }

    },


    async submitRow() {


        // obviously, this is skipped if we are in 'ANALYZE' mode
        if (game.gameMode === 0) {
            // send the row to the php script that will return the states for this row
            const checkWord = await fetch('http://alexphpdev.ddns.net/.sandpit/wordcheat/7/src/php/checkWord.php?randomWord=' + game.randomWord, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                redirect: 'follow',
                body: JSON.stringify(game.letters[game.currentRow][0])
            });

            let rowStates = await checkWord.json()

            if (rowStates.length === 1) {
                alert('"' + rowStates[0] + '" is not in the word list, sorry.')
                return false
            }
        
            game.letters[game.currentRow][1] = rowStates

        }



        // check if word is found
        if (game.letters[game.currentRow][1].reduce(function(a, b) { return a + b; }, 0) === 10) {
            alert('You win, well done !')
            game.gameState = 2
            return false
        }
        // if we are on the last row, then end the game
        else if (game.currentRow === 5) {
            game.gameState = 2
            if (game.gameMode === 0) alert("Sorry - the word was :\n\n" + game.randomWord.toUpperCase())
            return false
        }


        // send the entire letters array to the php script that will send back a list of all possible words based on the current game state
        const findWords = await fetch('http://alexphpdev.ddns.net/.sandpit/wordcheat/7/src/php/findWords.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            body: JSON.stringify(game.letters)
        });

        game.foundWords[game.currentRow] = await findWords.json()

        

        // reassess the colour of keyboard keys
        game.letterColours() 

        // increment the row and reset the properties for the new row
        game.currentRow++ 
        game.rowReady = false // 
        game.selectedTile = [game.currentRow, 0]

    },




    letterColours() {

        let i, j, index = 0

        // loop through rows
        for (i = 0; i <= game.currentRow; i++) {

            // loop through each letter in the row
            for (j = 0; j <= 4; j++) {
                // add any green letters
                if (game.letters[i][1][j] === 2) {
                    game.greenLetters.push(game.letters[i][0][j])
                    // remove the letter from the yellow list if it is there
                    index = game.yellowLetters.indexOf(game.letters[i][0][j])
                    if (index !== -1) game.yellowLetters.splice(index, 1)
                }
                // add any yellow letters, if they are not already in the yellow list
                if (
                    game.letters[i][1][j] === 1 && 
                    ! game.greenLetters.includes(game.letters[i][0][j])
                ) game.yellowLetters.push(game.letters[i][0][j])
                // add any black letters if they aren't in the yellow or green list
                if (
                    game.letters[i][1][j] === 0 && 
                    ! game.greenLetters.includes(game.letters[i][0][j]) && 
                    ! game.yellowLetters.includes(game.letters[i][0][j])
                ) game.blackLetters.push(game.letters[i][0][j])

            // remove duplicates from the three arrays
            game.greenLetters = [...new Set(game.greenLetters)]
            game.yellowLetters = [...new Set(game.yellowLetters)]
            game.blackLetters = [...new Set(game.blackLetters)]
            }
        }


    },


    backOneRow() {

        let i = 0

        // clear the letters from the current row
        for (i = 0; i < 5; i++) game.letters[this.currentRow][0][i] = '';
        // go back one row
        game.currentRow--
        game.selectedTile = [game.currentRow, 0]
        // clear the 'states' for the previous row
        for (i = 0; i < 5; i++) game.letters[this.currentRow][1][i] = 0;
        game.rowReady = true
    },

    pickWord(word) {

        if (game.gameState !== 1) return false
        
        let i = 0

        for (i = 0; i < 5; i++) {
            game.letters[game.currentRow][0][i] = word.substring(i, i + 1)
        }

        game.rowReady = true

    },



    reset(gameMode) {

        game.gameMode = gameMode

        game.letters = [
            [['', '', '', '', ''],[0, 0, 0, 0, 0]],
            [['', '', '', '', ''],[0, 0, 0, 0, 0]],
            [['', '', '', '', ''],[0, 0, 0, 0, 0]],
            [['', '', '', '', ''],[0, 0, 0, 0, 0]],
            [['', '', '', '', ''],[0, 0, 0, 0, 0]],
            [['', '', '', '', ''],[0, 0, 0, 0, 0]],
        ],
    
        game.greenLetters = []
        game.yellowLetters = []
        game.blackLetters = []

        game.selectedTile = [0, 0]
        game.currentRow = 0
        game.rowReady = false
        game.gameState = 0
        game.randomWord = ''
        game.foundWords = []


        if (game.gameMode === 0) game.getRandomWord()




    }




})




