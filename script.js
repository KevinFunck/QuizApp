let questions = [
    {
        "question": "In welchen Jahr wurde JavaScript eingeführt?",
        "answer_1": 1992,
        "answer_2": 1995,
        "answer_3": 1998,
        "answer_4": 2000,
        "right_answer": 2
    },
    {
        "question": "Wer hat HTML erfunden?",
        "answer_1": "Lady  Gaga",
        "answer_2": "Robbie Williams",
        "answer_3": "Justin Biber",
        "answer_4": "Tim Berners-Lee",
        "right_answer": 4 
    },
    {
        "question": "Wie hieß JavaScript früher?",
        "answer_1": "ECMAScript",
        "answer_2": "ECMAMAScript",
        "answer_3": "ECMAMAcript",
        "answer_4": "ECMAMAcri",
        "right_answer": 1 
    },
    {
        "question": "Wann wurde HTML erfunden?",
        "answer_1": 1970,
        "answer_2": 1989,
        "answer_3": 1999,
        "answer_4": 2003,
        "right_answer": 2 
    },
    {
        "question": "Wer hat Python entwickelt?",
        "answer_1": "Lady  Gaga",
        "answer_2": "Guido van Rossum",
        "answer_3": "Justin Biber",
        "answer_4": "Tim Berners-Lee",
        "right_answer": 2 
    }
];


let currentQuestion = 0;
let rightQuestions = 0;
let audioSuccess = new Audio('sounds/success.mp3');
let audioWrong = new Audio('sounds/wrong.mp3');


function init(){
    document.getElementById('allQuestions').innerHTML = questions.length

    showQuestion()
}


function showQuestion(){
    if(gameIsOver()){
       showEndScreen();
    }else{
        updateProgressBar();
        updateToNextQuestion();
    }
}


function gameIsOver(){
    return currentQuestion >= questions.length
}


function showEndScreen(){
    document.getElementById('endscreen').style = ``;
    document.getElementById('questionbody').style = `display: none`;
    document.getElementById('amount-of-questions').innerHTML =  questions.length;
    document.getElementById('amount-right-questions').innerHTML = rightQuestions;
    document.getElementById('header-image').src = `img/win.png`;
}


function updateToNextQuestion(){
    let question = questions[currentQuestion];
    document.getElementById('question-number').innerHTML = currentQuestion +1;
    document.getElementById('questionText').innerHTML = question['question'];
    document.getElementById('answer_1').innerHTML = question['answer_1'];
    document.getElementById('answer_2').innerHTML = question['answer_2'];
    document.getElementById('answer_3').innerHTML = question['answer_3'];
    document.getElementById('answer_4').innerHTML = question['answer_4'];
}


function updateProgressBar(){
    let percent = (currentQuestion + 1) / questions.length;
    percent = Math.round(percent * 100);
    document.getElementById('progress-bar').innerHTML = `${percent}%`;
    document.getElementById('progress-bar').style = `width: ${percent}%`;
}


function answer(selection){
    let question = questions[currentQuestion];
    let selectionQuestionNumber = selection.slice(-1);
    let idOfRightAnswer = `answer_${question['right_answer']}`;

    if(selectionQuestionNumber == question['right_answer']){
        console.log('Richtige Antwort');
        document.getElementById(selection).parentNode.classList.add('bg-success');
        audioSuccess.play();
        rightQuestions++;
    }else{
        console.log('Falsche Antwort');
        document.getElementById(selection).parentNode.classList.add('bg-danger');
        document.getElementById(idOfRightAnswer).parentNode.classList.add('bg-success');
        audioWrong.play();
    }
    document.getElementById('next-button').disabled = false;
}


function nextQuestion(){
    currentQuestion++;
    document.getElementById('next-button').disabled = true;
    resetAnswerButtons();
    showQuestion();
}


function resetAnswerButtons(){
    document.getElementById('answer_1').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_1').parentNode.classList.remove('bg-success');
    document.getElementById('answer_2').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_2').parentNode.classList.remove('bg-success');
    document.getElementById('answer_3').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_3').parentNode.classList.remove('bg-success');
    document.getElementById('answer_4').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_4').parentNode.classList.remove('bg-success');
}


function restartGame(){
    document.getElementById('header-image').src = `img/quiz.png`;
    document.getElementById('questionbody').style = ``; 
    document.getElementById('endscreen').style = `display: none`;
     currentQuestion = 0;
     rightQuestions = 0;
     init();
}