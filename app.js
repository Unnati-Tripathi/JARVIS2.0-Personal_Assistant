
const btn = document.querySelector('.talk');
const content = document.querySelector('.content');

function speak(sentence) {
    const text_speak = new SpeechSynthesisUtterance(sentence);
    
    text_speak.rate = 1;
    text_speak.pitch = 1;
    
    window.speechSynthesis.speak(text_speak);
}

function wishMe() {
    var day = new Date();
    var hr = day.getHours();

    if(hr >= 0 && hr < 12) {
        speak("Good Morning Boss");
    }
    else if(hr == 12) {
        speak("Good Noon Boss");
    }
    else if(hr > 12 && hr <= 17) {
        speak("Good Afternoon Boss");
    }
    else {
        speak("Good Evening Boss");
    }
}

window.addEventListener('load', () => {
    speak("Activating Inertia");
    speak("Going online");
    wishMe();
});

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onresult = (event) => {
    const current = event.resultIndex;
    const transcript = event.results[current][0].transcript;
    content.textContent = transcript;
    speakThis(transcript.toLowerCase());
}

btn.addEventListener('click', () => {
    recognition.start();
});

function speakThis(message) {
    const speech = new SpeechSynthesisUtterance();

    speech.text = "I did not understand what you said, please try again.";

    if (message.includes('hey') || message.includes('hello')) {
        speech.text = "Hello Boss";
    }
    else if (message.includes('how are you')) {
        speech.text = "I am fine Boss. Tell me, how can I help you?";
    }
    else if (message.includes('name')) {
        speech.text = "My name is Jarvis";
    }
    else if (message.includes('open google')) {
        openSite('https://google.com');
        speech.text = "Opening Google";
    }
    else if (message.includes('open instagram')) {
        openSite('https://instagram.com');
        speech.text = "Opening Instagram";
    }
    else if (message.includes('what is') || message.includes('who is') || message.includes('what are')) {
        const query = message.replace("what is", "").replace("who is", "").replace("what are", "").trim();
        openSite(`https://www.google.com/search?q=${encodeURIComponent(query)}`);
        speech.text = `This is what I found on the internet regarding ${query}`;
    }
    else if (message.includes('wikipedia')) {
        const query = message.replace("wikipedia", "").trim();
        openSite(`https://en.wikipedia.org/wiki/${encodeURIComponent(query)}`);
        speech.text = `This is what I found on Wikipedia regarding ${query}`;
    }
    else if (message.includes('time')) {
        const time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
        speech.text = `The current time is ${time}`;
    }
    else if (message.includes('date')) {
        const date = new Date().toLocaleString(undefined, { month: "short", day: "numeric" });
        speech.text = `Today's date is ${date}`;
    }
    else if (message.includes('calculator')) {
        openSite('Calculator:///');
        speech.text = "Opening Calculator";
    }
    else {
        const query = message.trim();
        openSite(`https://www.google.com/search?q=${encodeURIComponent(query)}`);
        speech.text = `I found some information for ${query} on Google.`;
    }

    speech.volume = 1;
    speech.pitch = 1;
    speech.rate = 1;

    window.speechSynthesis.speak(speech);
}

// Helper function to open a website in a new tab or window
function openSite(url) {
    const win = window.open(url, '_blank');
    if (win) {
        // The browser allowed opening a new tab
        win.focus();
    } else {
        // Browser blocked the new tab (common in mobile or pop-up blockers)
        alert('Please allow popups for this website');
    }
}



























































