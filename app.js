const messages = document.getElementById("messages");
const form = document.getElementById("chatForm");
const input = document.getElementById("messageInput");
const micBtn = document.getElementById("micBtn");
const listeningNote = document.getElementById("listeningNote");
const voiceLang = document.getElementById("voiceLang");
const speakReplies = document.getElementById("speakReplies");

function addMessage(text, who="assistant") {
  const row = document.createElement("div");
  row.className = `message ${who}`;
  if (who === "assistant") {
    const avatar = document.createElement("div");
    avatar.className = "avatar";
    avatar.textContent = "F";
    row.appendChild(avatar);
  }
  const bubble = document.createElement("div");
  bubble.className = "bubble";
  if (who === "assistant") {
    const label = document.createElement("strong");
    label.textContent = "FRIDAY";
    const p = document.createElement("p");
    p.textContent = text;
    bubble.append(label, p);
  } else {
    const p = document.createElement("p");
    p.textContent = text;
    bubble.appendChild(p);
  }
  row.appendChild(bubble);
  messages.appendChild(row);
  messages.scrollTop = messages.scrollHeight;
}

function localReply(message) {
  const m = message.toLowerCase();
  if (/^(hi|hello|hey|hii)\b/.test(m) || /^(नमस्ते|हाय|हेलो)/.test(message))
    return "Hello! Main FRIDAY hoon. Aaj main aapki kis tarah madad kar sakta hoon?";
  if (m.includes("study") || m.includes("homework") || m.includes("padh") || /पढ़ाई|होमवर्क/.test(message))
    return "Bilkul! Apna subject aur topic batao. Main use simple steps mein samjhaunga aur practice mein help karunga.";
  if (m.includes("time") || m.includes("date") || /समय|तारीख/.test(message))
    return `Aapke device ke mutabik abhi ${new Date().toLocaleString()} hai.`;
  if (m.includes("who are you") || m.includes("tum kaun") || /तुम कौन/.test(message))
    return "Main FRIDAY hoon — aapka personal assistant demo. Abhi main basic local replies deta hoon; real AI brain abhi connect nahi hai.";
  return "Message mil gaya! Main abhi demo mode mein hoon, isliye mere paas connected AI brain ya live internet search nahi hai. Voice feature aapki baat sun sakta hai aur ye demo reply bolkar suna sakta hai.";
}

function speak(text) {
  if (!("speechSynthesis" in window) || !speakReplies.checked) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = /[\u0900-\u097F]/.test(text) ? "hi-IN" : (voiceLang.value || "en-IN");
  window.speechSynthesis.speak(utterance);
}

function send(text) {
  const clean = text.trim();
  if (!clean) return;
  addMessage(clean, "user");
  input.value = "";
  const reply = localReply(clean);
  window.setTimeout(() => {
    addMessage(reply);
    speak(reply);
  }, 300);
}

form.addEventListener("submit", e => { e.preventDefault(); send(input.value); });
document.getElementById("clearBtn").addEventListener("click", () => {
  messages.innerHTML = "";
  addMessage("Conversation cleared. Hello again! How can I help?");
});
document.querySelectorAll(".quick-card").forEach(btn => btn.addEventListener("click", () => send(btn.dataset.prompt)));

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
if (SpeechRecognition) {
  const recognition = new SpeechRecognition();
  recognition.lang = voiceLang.value;
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;
  voiceLang.addEventListener("change", () => { recognition.lang = voiceLang.value; });
  micBtn.addEventListener("click", () => {
    try { recognition.lang = voiceLang.value; recognition.start(); }
    catch (_) { listeningNote.hidden = false; listeningNote.textContent = "Please wait, microphone is starting…"; }
  });
  recognition.onstart = () => { listeningNote.hidden = false; listeningNote.textContent = "Listening… speak now"; micBtn.textContent = "●"; };
  recognition.onend = () => { listeningNote.hidden = true; micBtn.textContent = "🎙"; };
  recognition.onerror = () => { listeningNote.hidden = false; listeningNote.textContent = "Mic unavailable. Check permission or type your message."; };
  recognition.onresult = event => {
    const transcript = event.results[0][0].transcript;
    input.value = transcript;
    send(transcript);
  };
} else {
  micBtn.addEventListener("click", () => addMessage("Voice input is not supported by this browser. Try Chrome on Android, allow microphone permission, or type your message."));
}
if (!("speechSynthesis" in window)) {
  speakReplies.checked = false;
  speakReplies.disabled = true;
}
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => navigator.serviceWorker.register("./sw.js").catch(() => {}));
}
