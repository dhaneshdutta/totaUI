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
        return; // Do nothing if input is empty
    }

    // Clear the input field
    document.getElementById('input').value = "";

    // Create a user message element with emoji as profile icon
    const userMessage = document.createElement('div');
    userMessage.className = 'message user-message';
    userMessage.innerHTML = `<span class="profile-icon">👤</span> <span>${userInput}</span>`;
    messagesDiv.appendChild(userMessage);
    
    // Scroll to the bottom of the chat
    messagesDiv.scrollTop = messagesDiv.scrollHeight;

    // Create an AI message container for this specific interaction
    const aiMessageContainer = document.createElement('div');
    aiMessageContainer.className = 'message ai-message';
    const aiMessageText = document.createElement('span');
    aiMessageText.className = 'ai-text'; // Unique class for each AI response
    aiMessageText.innerHTML = `<span class="profile-icon">🤖</span> <span></span>`;
    aiMessageContainer.appendChild(aiMessageText);
    messagesDiv.appendChild(aiMessageContainer);

    // Scroll to the bottom of the chat
    messagesDiv.scrollTop = messagesDiv.scrollHeight;

    // Use the EventSource-like fetch to handle streaming
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
        let fullResponse = ""; // To accumulate the full response

        // Stream the response body
        return reader.read().then(function processText({ done, value }) {
            if (done) {
                console.log("Stream completed.");
                return;
            }

            // Decode the text and append it to this specific AI message
            const chunk = decoder.decode(value, { stream: true });
            aiMessageText.lastElementChild.textContent += chunk;
            fullResponse += chunk;

            // Scroll to the bottom as new text arrives
            messagesDiv.scrollTop = messagesDiv.scrollHeight;

            // Continue reading the stream
            return reader.read().then(processText);
        });
    })
    .catch(error => {
        console.error("Streaming error:", error);
    });
}

