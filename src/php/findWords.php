<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

$gameState = json_decode(strtolower(file_get_contents('php://input')), true);



// echo json_encode($gameState);
// die();

/*
    we get all the state-of-play data from the front end app into an array called $gameState
    then we loop through that array and recompile all the data into the four arrays below
 */

// array of letters that must or must not appear, by column
$good = [];
$bad = [];
// array of letters that aren't anywhere in the word
$cant_contain = [];
// array of letters that must be somewhere in the word, and the amount of times it should appear
$must_contain = [];


/*
    now loop through $gameState, first loop is through the rows, nested loop through the columns to transfer the data to the four above arrays
 */


for ($row = 0; $row < 6; $row++) {

    // stop when we have no more rows
    if (in_array('', $gameState[$row][0])) break;

    $must_contain_tempForThisRow = []; // temporary array for tracking yellow boxes, just for the latest row

    foreach ($gameState[$row][0] as $col => $letter) {

        // green box
        if ($gameState[$row][1][$col] == 2) {
            // letters that must appear in this column
            $good[$col] = $letter;
            // make array of bad letters null for this column
            $bad[$col] = null;

            // if there are previous must_contain values for this letter then we need to decrement the value of that letter by one here - to indicate the letter in the wrong place in the previous row has now been found and can be removed from that array
            // we use a temporary array for this row and update the main array at the end of this loop
            if (isset($must_contain[$letter]) &&
                $must_contain[$letter] > 0)
                $must_contain[$letter] = $must_contain[$letter] - 1;
        }

        // yellow or grey boxes - letters that cannot appear in this column
        elseif ($gameState[$row][1][$col] < 2)
            // add to the array of letters in this column that cannot appear here
            $bad[$col][] = $letter;

        // yellow boxes - for letters that are in the wrong place, we make a tally of how many there are for each letter in a temporary array just for this current row
        // we will then use it to compare and complete the full $must_contain array after this foreach loop is completed
        if ($gameState[$row][1][$col] == 1)
            $must_contain_tempForThisRow[$letter] =
                isset($must_contain_tempForThisRow[$letter]) ? $must_contain_tempForThisRow[$letter] + 1 : 1;


        // make array of letters that can't appear anywhere
        if ($gameState[$row][1][$col] == 0 && ! in_array($letter, array_keys($must_contain)) && ! in_array($letter, array_keys($must_contain_tempForThisRow)))
            $cant_contain[] = $letter;
    }

    // loop through the temp data for must_contain letters updating the final array if an additional yellow letter is found
    foreach ($must_contain_tempForThisRow as $letter => $occurrences) {
        $must_contain[$letter] = $must_contain[$letter] ?? 0;
        if ($must_contain[$letter] < $occurrences) $must_contain[$letter] = $occurrences;
    }

}

// remove duplicates from $cant_contain
$cant_contain = array_unique($cant_contain);
// remove any letters in $cant_contain that are in the $good array (this has to be done after the above loop)
foreach ($cant_contain as $key => $letter) if (in_array($letter, $good)) unset($cant_contain[$key]);
// remove any letters in $must_contain that finally have zero occurrences
foreach ($must_contain as $letter => $occurrences) if ($must_contain[$letter] === 0) unset($must_contain[$letter]);



/*
    now, with the arrays created above from the state-of-play data, we loop through the text file containing all the 5 letter words in the english language (5000 or so) and eliminate them using the data in those arrays
    if a word is not eliminated then we add that word to the final list of possible words
*/

$foundWords = [];

$fiveLetterWords = fopen('./fiveLetterWords.txt', 'r');

// loop through all the 5 letter words
while (($line = fgets($fiveLetterWords)) !== false) {

    $word = trim($line); // the current word
    $letters = str_split(trim($line)); // an array of all the letters in the word
    $skip_word = false; // a flag that will be set to true if it fails to qualify according to the arrays that we made above

    // loop through all the letters in the word we are currently on to see if it matches the data
    for ($i = 0; $i < 5; $i++) {

        if (
            (isset($good[$i]) && $letters[$i] !== $good[$i])
            ||
            in_array($letters[$i], $cant_contain)
            ||
            (is_array($bad[$i]) && in_array($letters[$i], $bad[$i]))
        ) {
            $skip_word = true;
            break;
        }

    }

    if ($skip_word === true) continue;

    // check all the letters in the word against the must_contain array to make sure there are the correct number of letters in unknown places (yellow letters from the game)
    foreach ($must_contain as $letter => $occurrences)
        if (count(array_keys($letters, $letter)) < $occurrences) {
            $skip_word = true;
            break;
        }

    // if the word in the current loop has passed all the above tests then we add it to the $foundWords array
    if ($skip_word === false) $foundWords[] = $word;

}

fclose($fiveLetterWords);

print_r(json_encode($foundWords));