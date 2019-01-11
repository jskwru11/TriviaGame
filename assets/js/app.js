/**

 * create a countdown function to go from 30seconds to 0 seconds
 


 * display the format for countdown time
 * create a right answer for each answer listed, if wrong display correct answer with pic for 5 seconds and add 1 to incorrect counter
 * if correct add 1 to correct counter
 * if question is unanswered add 1 to unanswered counter
 * generate next random question and render to DOM
 * after all questions show a final summary screen and a play again button.  don't let the screen refresh if you reload.  reset the screen.  prevent.default()
 * format:
 * Time Remaining: time Seconds
 * All done, heres how you did!
 * correct answers: num
 * incorrect answers: num
 * unAnswered: num
 */




$(document).ready(() => {


// create an array of questions and answers in an object

    let pages = 
        [
        {
            question: "Who died in Infinity War?",
            choice: ["everyone", "black panther", "captain america", "hulk"],
            correctAnswer: 1,
            image: "assets/images/blackpanther.jpg"
        },
        {
            question: "On what planet did Thanos find the soul stone?",
            choice: ["everyone", "black panther", "captain america", "vormir"],
            correctAnswer: 3,
            image: "assets/images/soul-stone.jpeg"
        },
        {
            question: "What is the name of Thor's new weapon?",
            choice: ["everyone", "storm breaker", "captain america", "thor's hammer"],
            correctAnswer: 1,
            image: "assets/images/storm-breaker.jpg"
        },
        {
            question: "What was the name of Gamaro's sister?",
            choice: ["nebula", "black widow", "captain marvel", "hulk"],
            correctAnswer: 0,
            image: "assets/images/nebula.jpg"
        },
        {
            question: "What is the name of the dwarf that built Thanos' infinity gauntlet?",
            choice: ["everyone", "black panther", "eitri", "hulk"],
            correctAnswer: 2,
            image: "assets/images/eitri.jpeg"
        },

    ]


    let correct = 0;
    let incorrect = 0;
    let unAnswered = 0;
    let timer = 30;
    let intervalId;
    let stillTime = false;
    let numPages = pages.length;
    let pick;
    let index = 0;
    let storeArrayValues = [];
    const interval = 1000;
    let newElement;
    let timeout;
    let selectedAnswer;
    let theRightAnswer;



    $('.play-again').hide();

    // create a start button to begin the game
    $('.start-game').on('click', () => {
        $('.start-game').hide();
        displayQuestion();
        setupTimer();

        
     
    });


//TODO: setup Interval timer
    const setupTimer = () => {
        if (!stillTime ) {
            intervalId = setInterval(countDown, interval);
            stillTime = !stillTime;
        } 
    };
//TODO: setup callback to countdown the time
    const countDown = () => {
        $('#basicUsage').html(`Time Remaining: ${timer} Seconds`);
        timer--;

        if (timer === 0) {
            unAnswered++;
            stopTimer();
            $('.answer').html(`<p>Time is up! the correct answer is: ${pick.choice[pick.correctAnswer]}!</p>`)
            displayImage();

        }
    };

//TODO: setup callback to stop the timer

    const stopTimer = () => {
        stillTime = !stillTime;
        clearInterval(intervalId);

    };
//TODO: setup function to display questions answer choices
    const displayQuestion = () => {
        index = Math.floor(Math.random() * pages.length);
        pick = pages[index];
             
 //TODO: display each question and answers for each question       
        $('.question').html(`<h2>${pick.question}</h2>`);
        pick.choice.forEach((option) => {
            newElement = $('<div>').addClass('selection').attr('value', option).html(option);
            $('.answer').append(newElement);
        });


//TODO: setup eventHandler to all answers and check if the answer selected is the correct answer
    $('.selection').on('click', function() {
                
        selectedAnswer = $(this).attr('value'); 
        theRightAnswer = pick.choice[pick.correctAnswer];
        if (selectedAnswer === pick.choice[pick.correctAnswer]) {
            stopTimer();
            correct++;
            selectedAnswer = '';
            $('.answer').html("<h3>Correct!</h3>");
            displayImage();
            
//TODO: stop the timer if the timer is incorrect, increase the counter for incorrect answer
        } else {
            stopTimer();
            incorrect++;
            selectedAnswer = '';
            $('.answer').html(`<p>Wrong Answer! The correct answer is: ${theRightAnswer}</p>`);
            displayImage();
            
        }
        
    });
};
//TODO: display the image after a question has been answered.

    const displayImage = () => {
        timeout = 4000;
        $('<img>').addClass('img').attr('src', pick.image).appendTo(`.answer`);
        storeArrayValues.push(pick);
        pages.splice(index,1);
    
//TODO: setup timeout on the about of time to dispaly the image
        const imageHide = setTimeout(() => {
            $('.answer').empty();
            timer = 30;
        

        if ((incorrect + correct + unAnswered) === numPages) {
            $('.question').empty();
            $('.question').append(`<h3>All done, heres how you did!</h3>`);
            $('.answer').append(`<h3>Correct Answers: ${correct}</h3>`);
            $('.answer').append(`<h3>Incorrect Answers: ${incorrect}</h3>`);
            $('.answer').append(`<h3>UnAnswered: ${unAnswered}<h3>`);
            $('.play-again').show();
            correct = 0;
            incorrect = 0;
            unAnswered = 0;
        } else {
            setupTimer();
            displayQuestion();
        }

    }, timeout);
    
    };
//TODO: setup play again / restart button to play the game again.    
    $('.play-again').on('click', () => {
        $('.play-again').hide();
        $('.question, .answer').empty();
        setupTimer();
        pages = [...storeArrayValues];
        displayQuestion();
    });
});
