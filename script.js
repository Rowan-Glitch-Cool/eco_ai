let messages = [
  { role: "system", content: "You are a helpful chatbot. Be short and clear." }
];

async function sendMessage() {
  const input = document.getElementById("userInput");
  const chat = document.getElementById("chat");

  const userText = input.value.trim();
  if (!userText) return;

  // Display user message
  chat.innerHTML += `<p class="user"><b>You:</b> ${userText}</p>`;
  input.value = "";

  messages.push({ role: "user", content: userText });

  try {
    const response = await puter.ai.chat(messages);

    const botReply = response.message.content;

    messages.push(response.message);

    chat.innerHTML += `<p class="bot"><b>Bot:</b> ${botReply}</p>`;
    chat.scrollTop = chat.scrollHeight;

  } catch (err) {
    chat.innerHTML += `<p class="bot"><b>Error:</b> ${err.message}</p>`;
  }
}

// Enter key support
document.getElementById("userInput").addEventListener("keypress", function(e) {
  if (e.key === "Enter") sendMessage();
});
