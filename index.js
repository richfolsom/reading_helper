
let recognizer;

let g_words = ['one', 'four', 'five', 'go', 'stop'];
let g_index = 0;

function showWords() {
    let wordhtml = "";
    let thediv = document.querySelector('#words');
    thediv.innerHTML="";
    for (let i = 0; i < g_words.length; i++) {
        var div = document.createElement("span");
        div.style.fontSize=64;
        if (i < g_index) {
            div.style.background = "green";
            div.style.color = "white";
        }
        if (i == g_index) {
            //div.style.background = "blue";
            //div.style.color = "white";
            div.style.textDecoration="underline";
        }
        div.innerHTML = g_words[i] + "     ";    // Create a text node
        thediv.appendChild(div);
    }
    /*
    for(let i=0; i < words.length; i++){
        wordhtml += words[i] + "<br>";
    }
    console.log(wordhtml);
    document.querySelector('#words').innerHTML=wordhtml;
    */
}

function predictWord() {
    // Array of words that the recognizer is trained to recognize.
    const words = recognizer.wordLabels();
    recognizer.listen(({ scores }) => {
        // Turn scores into a list of (score,word) pairs.
        scores = Array.from(scores).map((s, i) => ({ score: s, word: words[i] }));
        // Find the most probable word.
        scores.sort((s1, s2) => s2.score - s1.score);
        document.querySelector('#console').textContent = scores[0].word;
        console.log(scores[0].word + " " + words[g_index]);
        if(scores[0].word == g_words[g_index]){
            g_index++;
            showWords();
        }
    }, { probabilityThreshold: 0.85 });
}

async function app() {
    recognizer = speechCommands.create('BROWSER_FFT');
    await recognizer.ensureModelLoaded();
    showWords();
    predictWord();
}

app();