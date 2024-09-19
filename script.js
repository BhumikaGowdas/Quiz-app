document.addEventListener('DOMContentLoaded', () => {
    const quizData = [
        {
            question: "What is the capital of France?",
            options: ["Berlin", "Madrid", "Paris", "Rome"],
            answer: "Paris"
        },
        {
            question: "Which planet is known as the Red Planet?",
            options: ["Earth", "Jupiter", "Mars", "Saturn"],
            answer: "Mars"
        },
        {
            question: "Who wrote 'To Kill a Mockingbird'?",
            options: ["Harper Lee", "Mark Twain", "J.K. Rowling", "Ernest Hemingway"],
            answer: "Harper Lee"
        }
    ];

    let currentQuestionIndex = 0;
    let score = 0;

    function loadQuestion() {
        const quizContainer = document.getElementById('quiz');
        quizContainer.innerHTML = '';

        const questionData = quizData[currentQuestionIndex];
        const questionElement = document.createElement('div');
        questionElement.textContent = questionData.question;
        quizContainer.appendChild(questionElement);

        questionData.options.forEach(option => {
            const optionButton = document.createElement('div');
            optionButton.textContent = option;
            optionButton.className = 'option';
            optionButton.addEventListener('click', () => handleAnswer(option));
            quizContainer.appendChild(optionButton);
        });
    }

    function handleAnswer(selectedOption) {
        const questionData = quizData[currentQuestionIndex];
        const options = document.querySelectorAll('.option');
        
        options.forEach(option => {
            if (option.textContent === questionData.answer) {
                option.classList.add('correct');
            } else if (option.textContent === selectedOption) {
                option.classList.add('incorrect');
            }
            option.removeEventListener('click', handleAnswer);
        });

        if (selectedOption === questionData.answer) {
            score++;
        }

        document.getElementById('score').textContent = `Score: ${score}`;
        document.getElementById('next-button').disabled = false;
    }

    function nextQuestion() {
        currentQuestionIndex++;

        if (currentQuestionIndex < quizData.length) {
            loadQuestion();
            document.getElementById('next-button').disabled = true;
        } else {
            document.getElementById('quiz').innerHTML = '<h2>Quiz Complete!</h2>';
            document.getElementById('next-button').style.display = 'none';
        }
    }

    document.getElementById('next-button').addEventListener('click', nextQuestion);

    loadQuestion();
});