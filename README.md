
# Project Title

A brief description of what this project does and who it's for

# Gemini AI Chat Application

This is a React-based web application that features a chat interface allowing users to communicate with an AI model using text and voice inputs. The application supports light and dark modes, live transcription of speech to text, and live typing animation.

## Features

- **Live Transcription:** Real-time conversion of speech to text.
- **Dark Mode:** Toggle between light and dark themes.
- **Live Typing Animation:** Real-time typing effect for bot responses.
- **Blinking Light Indicator:** Shows API activity status.
- **Speech Recognition:** Use voice to send messages.
- **Text Messaging:** Send and receive text messages.

## Technologies Used

- **React**: Frontend framework
- **Axios**: For API calls
- **React-Speech-Recognition**: For speech-to-text functionality
- **SCSS**: For styling

## Getting Started

### Prerequisites

- Node.js (v12 or higher)
- npm (v6 or higher) or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/gemini-ai-chat.git
    ```


Navigate to the project directory:
bash
 
cd gemini-ai-chat
Install the dependencies:
bash
 
```npm install```

or

```yarn install```


Running the Application
Start the development server:
bash
 
```npm start```

 or 

```yarn start```


Open your browser and go to http://localhost:3000 to see the application in action.
Building for Production
To create a production build of the application, run:

bash
 
```npm run build```
or

bash
 
```yarn build```

The output will be in the build directory.

Usage

Sending Messages

Text Input: Type your message in the input box and press Enter to send.

Voice Input: Click the microphone button to start recording. Speak your message, and it will be transcribed and sent automatically when you stop speaking.

Dark Mode Toggle


Click the dark mode toggle button at the top center to switch between light and dark themes.


Project Structure

```
├── public
│   ├── index.html
│   └── ...
├── src
│   ├── components
│   │   ├── ChatWindow.js
│   │   ├── DarkModeToggle.js
│   │   ├── InputContainer.js
│   │   └── ...
│   ├── css
│   │   ├── App.css
│   │   ├── InputContainer.css
│   │   └── ...
│   ├── widgets
│   │   ├── BlinkingLight.js
│   │   └── ...
│   ├── App.js
│   ├── index.js
│   └── ...
├── package.json
├── README.md
└── ...
```

Contributing

Fork the repository.
Create your feature branch (git checkout -b feature/your-feature).
Commit your changes (git commit -m 'Add some feature').
Push to the branch (git push origin feature/your-feature).
Open a pull request.
License
This project is licensed under the MIT License. See the LICENSE file for details.

Acknowledgments
React
Axios
React-Speech-Recognition


Make sure to replace 
```
`https://github.com/srivatsavavuppala/gemini-ai-chat.git`
```


This `README.md` file provides a comprehensive overview of your project, including installation and usage instructions, as well as a brief description of the features and technologies used.

