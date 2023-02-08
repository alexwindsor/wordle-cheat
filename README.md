Wordle Cheat

This is a version of Wordle, which you can play as normal. It also features the ability to cancel a word submission and it also works out all the possible words based on the combination of grey, yellow and green letters in previous rows.

The difference between 'PLAY' mode and 'ANALYSE' mode is that in the latter, there is no random 5 letter word to guess. You enter a word and before submitting that word, you can click/tap each letter once to make it yellow and once again to make it green. Submitting the word will show all possible five letter words based on the combination of grey, yellow and green letters in previous rows. The idea behind this is that you can use it to 'analyze' (or rather, cheat at) another version of the game, such as on the New York Times website.

I AM AWARE THAT THERE IS A FLAW in the way it works out possible letters ! I intend to fix this when I get the time, but for now, it works at around 95%.

This is written in the Vue3 javascript framework and also PHP. Whenever the list of 5-letter words is consulted, because it sits on the server, this is done with a fetch() call to a php script.

In order to run this, in dev mode, download the files to a server that has Node.JS installed and PHP, then type 'npm run dev' on the command line from the root directory.

To deploy, type in 'npm run build' then take the files from the dist/ folder as the root of the application. You will need to change the links to the .js, .css and .ico files on the index.html page to include a dot at the start, eg:

"/assets/index-5d0f8cfe.js" needs to be "./assets/index-5d0f8cfe.js"

You then need to copy the /src/php folder to dist/php and change the links to the php scripts in the .js file to the full link on the server to their locations.

For now, you can play this game at http://alexphpdev.ddns.net/wordgame2/

Watch this space for more improvements and contact me on alexwindsormusic@gmail.com with any ideas or feedback.