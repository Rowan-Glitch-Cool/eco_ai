let messages = [
  { role: "system", content: "You are a helpful chatbot. Be concise." }
];

async function sendMessage() {
  const input = document.getElementById("userInput");
  const chat = document.getElementById("chat");

  const text = input.value.trim();
  if (!text) return;

  addMessage(text, "user");
  input.value = "";

  messages.push({ role: "user", content: text });

  const loading = addMessage("...", "bot");

  try {
    const res = await puter.ai.chat(messages);
    const reply = res.message.content;

    messages.push(res.message);

    loading.innerText = reply;

  } catch (e) {
    loading.innerText = "Error: " + e.message;
  }
}

function addMessage(text, sender) {
  const chat = document.getElementById("chat");

  const div = document.createElement("div");
  div.className = `message ${sender}`;

  const bubble = document.createElement("div");
  bubble.className = "bubble";
  bubble.innerText = text;

  div.appendChild(bubble);
  chat.appendChild(div);

  chat.scrollTop = chat.scrollHeight;

  return bubble;
}

document.getElementById("userInput").addEventListener("keypress", e => {
  if (e.key === "Enter") sendMessage();
});
