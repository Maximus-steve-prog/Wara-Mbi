let quizData;  // Will hold the loaded quiz data
let currentQuestionIndex = 0;
let score = 0;
let selectedCategory = '';

// Fetch the quiz data from quiz.json
$(document).ready(function () {
    $.getJSON('quiz.json', function(data) {
        quizData = data.categories; // Load categories to quizData
    });

    $('#start-btn').on('click', function () {
        $('#start-screen').addClass('hidden');
        $('#quiz-screen').removeClass('hidden');
        loadQuestion();
    });

    $('.category-btn').on('click', function () {
        selectedCategory = $(this).data('category');
        $('#total-questions').text(quizData[selectedCategory].length);
    });

    function loadQuestion() {
        const currentQuestion = quizData[selectedCategory][currentQuestionIndex];
        $('#current-question').text(currentQuestionIndex + 1);
        $('#question-text').text(currentQuestion.question);
        $('#options-container').empty();

        currentQuestion.answers.forEach((answer, index) => {
            $('#options-container').append(`
                <button class="answer-btn bg-blue-300 hover:bg-blue-400 text-white font-semibold py-2 px-4 rounded mb-2" data-index="${index}">
                    ${answer}
                </button>
            `);
        });
    }

    $(document).on('click', '.answer-btn', function () {
        const selectedAnswerIndex = $(this).data('index');
        const currentQuestion = quizData[selectedCategory][currentQuestionIndex];

        if (selectedAnswerIndex === currentQuestion.correct) {
            score++;
            $('#feedback').text('Correct!').css('color', 'green');
        } else {
            $('#feedback').text('Wrong! The correct answer was: ' + currentQuestion.answers[currentQuestion.correct]).css('color', 'red');
        }

        $('#next-btn').removeClass('hidden');
    });

    $('#next-btn').on('click', function () {
        if (currentQuestionIndex < quizData[selectedCategory].length - 1) {
            currentQuestionIndex++;
            loadQuestion();
            $('#feedback').text('');
            $(this).addClass('hidden');
        } else {
            showResults();
        }
    });

    function showResults() {
        $('#quiz-screen').addClass('hidden');
        $('#results-screen').removeClass('hidden');
        $('#final-score').text(score);
        $('#max-score').text(quizData[selectedCategory].length);
    }

    $('#restart-btn').on('click', function () {
        currentQuestionIndex = 0;
        score = 0;
        $('#results-screen').addClass('hidden');
        $('#start-screen').removeClass('hidden');
        $('#score').text(score);
    });
});