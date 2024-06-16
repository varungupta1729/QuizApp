# Quiz App

Welcome to the Quiz App! This application is designed to test your knowledge with multiple choice questions in a timed environment. 


## Features

- **Full Screen Mode**: The quiz can only be taken in full screen mode. A popup will prompt you to enter full screen if not enabled.
- **Persistent State**: If you refresh the page, the quiz will resume from where you left off.
- **Timer**: You have 10 minutes to complete the quiz. The timer starts as soon as the quiz begins.
- **Multiple Choice Questions**: Each question has multiple answers, and you need to select all correct answers.
- **Copy Restriction**: Student cant copy the text ensuring not to cheat from browser.
## Live Demo

Check out the live demo of the application [here](https://quiz-app-eta-ashy.vercel.app/).

## Getting Started

To get a local copy up and running, follow these steps:

### Prerequisites

You need to have Node.js and npm installed. You can download them from [here](https://nodejs.org/).

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/quiz-app.git
    cd quiz-app
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Start the development server:

    ```bash
    npm start
    ```

    The app will be available at `http://localhost:3000`.

## Usage

### Full Screen Mode

- The quiz can only be taken in full screen mode. If full screen is not enabled, a popup will prompt you to enable it.
- To enter full screen, press `F11` or use the full screen option in your browser.

### Timer

- Once you start the quiz, a 10-minute timer will begin. The remaining time will be displayed at the top of the quiz.
- If you refresh the page, the timer will continue from where it left off.

### Persistent State

- If you refresh the page, the quiz will remember which question you were on and resume from there.
- Your progress and the timer state are saved in the browser's local storage.

###Copy Restriction 

- Student cant copy the text ensuring not to cheat from browser.

### Questions

- The quiz consists of 10 multiple choice questions.
- Each question can have more than one correct answer. Select all correct answers to score points.

## Development

### Adding Questions

- The questions are stored in a JSON file (`quiz.json`) in the `public` directory.
- Each question has an `id`, `question` text, `options` (array of possible answers), and `answers` (array of correct answers).

Example of `quiz.json`:

```json
[
    {
        "id": 1,
        "question": "Which of the following are JavaScript frameworks/libraries?",
        "options": ["React", "Django", "Vue", "Flask"],
        "answers": ["React", "Vue"]
    },
    ...
]
