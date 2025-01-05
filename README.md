# Qwen AI Assistant - Chatbot Web Application

## Overview

This project implements a web-based AI chatbot using the "Qwen AI" model for natural language processing (NLP). The chatbot allows users to interact with different versions of the Qwen models through a simple web interface. The chatbot sends queries to the AI model, retrieves responses, and displays them in the chat window.

## Features

- Choose between multiple AI models:
  - **Qwen Max**: Powerful cognitive understanding capabilities.
  - **Qwen Plus**: Balanced performance.
  - **Qwen Long**: Supports long conversations.
  
- Input user messages in a text area.
- Receive responses from the AI, with a loading indicator while processing.
- Display the conversation history in a chat window.
- Customizable chatbot avatar.

## How to Use

1. Open the HTML file in your web browser.
2. Select the desired AI model from the dropdown menu.
3. Type your query in the input field and press the "Send" button or hit "Enter" on your keyboard.
4. Wait for the AI to process the input and display the response in the chat window.

## Installation

This project requires a basic web server or a simple local setup to run. No back-end is required for the front-end code to function, but you will need an API key for communication with the AI model.

### Steps to Set Up

1. Clone this repository or download the project files.
2. Configure the API key:
   - Open `script.js`.
   - Replace `API_KEY = '?'` with your own AI model API key.
3. Place your preferred avatar image (e.g., `xxx.jpg`) in the root directory and update `BOT_AVATAR` in `script.js` to the name of your image file.
4. Open the `index.html` file in a web browser to start using the chatbot.

## Dependencies

This project uses the following technologies:

- **HTML/CSS**: Basic structure and styling of the chat interface.
- **JavaScript**: Handles chat interactions, API requests, and DOM manipulation.
- **Fetch API**: For making HTTP requests to the AI API.

## Folder Structure

- `index.html`: The main HTML file for the chatbot interface.
- `style.css`: Contains the styling for the chat UI.
- `script.js`: The JavaScript file responsible for handling the chatbot logic, including API interaction.

## API Information

This chatbot sends requests to an external API for processing the user queries. You need to obtain an API key to use the service. Here’s a sample of the API request being made:

```javascript
fetch('https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
    },
    body: JSON.stringify({
        model: model,
        messages: [
            { role: 'system', content: 'You are a helpful assistant.' },
            { role: 'user', content: message }
        ]
    })
})
```

## Customization
Chatbot Avatar: Modify the BOT_AVATAR variable to change the bot's avatar image. Place your image in the root directory and update the file name accordingly.
AI Models: The available AI models are defined in the dropdown menu. You can change the options in the HTML file to add more models if needed.

## Known Issues
The script relies on external APIs, and any downtime or limitations from those services may impact functionality.
Ensure that the API key is valid to avoid authorization errors.
## License
This project is open-source and available under the MIT License.
