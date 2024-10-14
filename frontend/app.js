let selectedModel = "tota";

function selectModel() {
    const modelSelect = document.getElementById('models');
    selectedModel = modelSelect.value;
    console.log("Model selected:", selectedModel);
}

function generate() {
    console.log("Generate button clicked!");

    const userInput = document.getElementById('input').value;
    const messagesDiv = document.getElementById('messages');
    
    console.log("User input:", userInput);

    if (!userInput) {
        return; 
    }

    document.getElementById('input').value = "";

    const userMessage = document.createElement('div');
    userMessage.className = 'message user-message';
    userMessage.innerHTML = `<span class="profile-icon">👤</span> <span>${userInput}</span>`;
    messagesDiv.appendChild(userMessage);
    
    messagesDiv.scrollTop = messagesDiv.scrollHeight;

    const aiMessageContainer = document.createElement('div');
    aiMessageContainer.className = 'message ai-message';
    const aiMessageText = document.createElement('span');
    aiMessageText.className = 'ai-text'; // Unique class for each AI response
    aiMessageText.innerHTML = `<span class="profile-icon">🤖</span> <span></span>`;
    aiMessageContainer.appendChild(aiMessageText);
    messagesDiv.appendChild(aiMessageContainer);

    messagesDiv.scrollTop = messagesDiv.scrollHeight;

    fetch('http://localhost:5000/generate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            input: userInput,
            model: selectedModel
        })
    })
    .then(response => {
        const reader = response.body.getReader();
        const decoder = new TextDecoder('utf-8');
        let fullResponse = ""; 

        return reader.read().then(function processText({ done, value }) {
            if (done) {
                console.log("Stream completed.");
                return;
            }

            const chunk = decoder.decode(value, { stream: true });
            aiMessageText.lastElementChild.textContent += chunk;
            fullResponse += chunk;

            messagesDiv.scrollTop = messagesDiv.scrollHeight;

            return reader.read().then(processText);
        });
    })
    .catch(error => {
        console.error("Streaming error:", error);
    });
}

