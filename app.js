

const btn = document.querySelector('.talk');
const content = document.querySelector('.content');

let englishVoice = null;

// Load voices and trigger intro only once voices are ready
function loadVoicesAndIntro() {
    const voices = window.speechSynthesis.getVoices();
    englishVoice = voices.find(v => v.lang === "en-US" && v.name.includes("Google")) ||
                   voices.find(v => v.lang === "en-US");

    if (englishVoice) {
        giveIntro();
    }
}

window.speechSynthesis.onvoiceschanged = loadVoicesAndIntro;

function giveIntro() {
    const introText = [
        "Activating inertia.",
        "Going online.",
        "Hello Sir, I am Jarvis. How can I help you?"
    ];
    speakInOrder(introText);
}

function speak(sentence) {
    const text_speak = new SpeechSynthesisUtterance(sentence);
    text_speak.voice = englishVoice;
    text_speak.lang = "en-US";
    text_speak.rate = 1;
    text_speak.pitch = 1;

    window.speechSynthesis.speak(text_speak);
}

function speakInOrder(sentences) {
    let index = 0;

    function next() {
        if (index < sentences.length) {
            const utterance = new SpeechSynthesisUtterance(sentences[index]);
            utterance.voice = englishVoice;
            utterance.lang = "en-US";
            utterance.rate = 1;
            utterance.pitch = 1;
            utterance.onend = () => {
                index++;
                next();
            };
            window.speechSynthesis.speak(utterance);
        }
    }
    next();
}

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onresult = (event) => {
    const current = event.resultIndex;
    const transcript = event.results[current][0].transcript;
    content.textContent = transcript;
    speakThis(transcript.toLowerCase());
};

btn.addEventListener('click', () => {
    window.speechSynthesis.cancel();
    recognition.start();
});

function speakThis(message) {
    const speech = new SpeechSynthesisUtterance();
    speech.voice = englishVoice;
    speech.lang = "en-US";
    speech.volume = 1;
    speech.pitch = 1;
    speech.rate = 1;

    speech.text = "I did not understand what you said, please try again.";

    if (message.includes('hey') || message.includes('hello')) {
        speech.text = "Hello Boss";
    } else if (message.includes('how are you')) {
        speech.text = "I am fine Boss. Tell me, how can I help you?";
    } else if (message.includes('name')) {
        speech.text = "My name is Jarvis";
    } else if (message.includes('open google')) {
        speech.text = "Opening Google";
        speech.onend = () => openSite('https://google.com');
    } else if (message.includes('open instagram')) {
        speech.text = "Opening Instagram";
        speech.onend = () => openSite('https://instagram.com');
    } else if (message.includes('what is') || message.includes('who is') || message.includes('what are')) {
        const query = message.replace("what is", "").replace("who is", "").replace("what are", "").trim();
        speech.text = `This is what I found regarding ${query}`;
        speech.onend = () => openSite(`https://www.google.com/search?q=${encodeURIComponent(query)}`);
    } else if (message.includes('wikipedia')) {
        const query = message.replace("wikipedia", "").trim();
        speech.text = `Searching Wikipedia for ${query}`;
        speech.onend = () => openSite(`https://en.wikipedia.org/wiki/${encodeURIComponent(query)}`);
    } else if (message.includes('time')) {
        const time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
        speech.text = `The current time is ${time}`;
    } else if (message.includes('date')) {
        const date = new Date().toLocaleString(undefined, { month: "short", day: "numeric" });
        speech.text = `Today's date is ${date}`;
    } else {
        const query = message.trim();
        speech.text = `Searching Google for ${query}`;
        speech.onend = () => openSite(`https://www.google.com/search?q=${encodeURIComponent(query)}`);
    }

    window.speechSynthesis.speak(speech);
}

function openSite(url) {
    const win = window.open(url, '_blank');
    if (win) {
        win.focus();
    } else {
        alert('Please allow popups for this website');
    }
}








