<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");


$submittedLetters = json_decode(strtolower(file_get_contents('php://input')), true);

$submittedWord = implode($submittedLetters);

// first check to see if the word is in the wordlist
$wordList = fopen("fiveLetterWords_withPlurals.txt", "r");
$found = false;

while(!feof($wordList)) {
    $word = trim(fgets($wordList));
    if ($submittedWord == $word) {
        $found = true;
        break;
    }
}
fclose($wordList);

if (! $found) die('["' . $submittedWord . '"]');



$randomWord = $_GET['randomWord'];
$randomWordLetters = str_split($_GET['randomWord']);
$states = [0, 0, 0, 0, 0];
$green_letters = [];
$yellow_letters = [];


for ($i = 0; $i < 5; $i++) {

    // if letters match then state = 2 (green)
    if ($submittedLetters[$i] === $randomWordLetters[$i]) {
        $states[$i] = 2;
        $green_letters[] = $submittedLetters[$i];
    }

}


for ($i = 0; $i < 5; $i++) {

    // if the letters don't match - does the letter appear elsewhere in the word?
    if ($submittedLetters[$i] !== $randomWordLetters[$i]) {
        $letter_count =
            substr_count($randomWord, $submittedLetters[$i]) -
            (count(array_keys($green_letters, $submittedLetters[$i])) + count(array_keys($yellow_letters, $submittedLetters[$i])));
        if ($letter_count > 0) {
            $states[$i] = 1;
            $yellow_letters[] = $submittedLetters[$i];
        }
    }

}

echo json_encode($states);