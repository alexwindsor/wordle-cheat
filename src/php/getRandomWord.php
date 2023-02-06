<?php
header("Access-Control-Allow-Origin: *");


// the list of 5-letter english words contains about 4279 words, so we pick a line at random, then grab the word

$wordCount = shell_exec('wc -l fiveLetterWords.txt');


$random_line = rand(0, intval($wordCount));

$file = new SplFileObject('fiveLetterWords.txt');
$file->seek($random_line);

$randomWord = trim($file->current());


echo $randomWord;