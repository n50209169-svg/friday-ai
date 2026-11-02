FRIDAY PWA — beginner starter project

WHAT THIS VERSION DOES
- Mobile-friendly FRIDAY interface.
- Text chat with simple local demo replies.
- Voice input where the browser supports Web Speech Recognition.
- Spoken replies using browser text-to-speech.
- Installable PWA shell and basic offline caching.

IMPORTANT LIMITATION
This is a FRONT-END DEMO, not yet a connected generative AI assistant.
It does not have live internet search, a real AI brain, or cloud chat history.
To add a real AI model safely, connect it through a small secure backend.
Never put a private AI API key in app.js or any file shipped to the phone.

HOW TO PUT IT ONLINE
1. Extract this ZIP.
2. Upload the files to a static hosting service that supports HTTPS (for example, GitHub Pages or Netlify).
3. Open the HTTPS site in Chrome on Android.
4. Use Chrome menu > Install app or Add to Home screen.
5. Microphone access requires permission; speech recognition support varies by browser.

FILES
index.html          App screen
styles.css          Visual design
app.js              Chat demo, voice input and speech output
manifest.webmanifest PWA install metadata
sw.js               Offline service worker
icon.svg            App icon
