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
            image: "assets/images/Eitri.png"
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
    let newArray = [];
    let holder = [];
    const interval = 1000;
    let newElement;
    let timeout;
    let selectedAnswer;
    let theRightAnswer;
    let indexSelected = [];


    $('.play-again').hide();

    // create a start button to begin the game
    $('.start-game').on('click', () => {
        $('.start-game').hide();
        displayQuestion();
        setupTimer();

        
     
    });


//create a countdown function to go from 30seconds to 0 seconds
    const setupTimer = () => {
        if (!stillTime ) {
            intervalId = setInterval(countDown, interval);
            stillTime = !stillTime;
        } 
    };

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

    const stopTimer = () => {
        stillTime = !stillTime;
        clearInterval(intervalId);

    };

    const displayQuestion = () => {
        index = Math.floor(Math.random() * pages.length);
        pick = pages[index];
             
        
        $('.question').html(`<h2>${pick.question}</h2>`);
        pick.choice.forEach((option) => {
            newElement = $('<div>').addClass('selection').attr('value', option).html(option);
            $('.answer').append(newElement);
        });



    $('.selection').on('click', function() {
                
        selectedAnswer = $(this).attr('value'); 
        theRightAnswer = pick.choice[pick.correctAnswer];
        if (selectedAnswer === pick.choice[pick.correctAnswer]) {
            stopTimer();
            correct++;
            selectedAnswer = '';
            $('.answer').html("<h3>Correct!</h3>");
            displayImage();

        } else {
            stopTimer();
            incorrect++;
            selectedAnswer = '';
            $('.answer').html(`Wrong Answer! The correct answer is: ${theRightAnswer}`);
            displayImage();
        }
        
    });
};

    const displayImage = () => {
        timeout = 4000;
        $('<img>').addClass('img').attr('src', pick.image).appendTo(`.answer`);
        newArray.push(pick);
        pages.splice(index,1);
        console.log(newArray);

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
    
    $('.play-again').on('click', () => {
        $('.play-again').hide();
        $('.question, .answer').empty();
        // for(let i = 0; i < newArray.length; i++) {
        //     pages.push(newArray[i]);
        // }
        setupTimer();
        pages = [...newArray];
        displayQuestion();
    });
});

// for (let i = 0; i<pick.choice.length; i++) {
//     newElement = $('<div>').addClass('selection').attr('value', i).html(pick.choice[i]);
//     $('.answer').append(newElement);
// }

        // for (let i = 0; i<pick.choice.length; i++) {
        //     newElement = $('<div>').addClass('selection').attr('value', i).html(pick.choice[i]);
        //     $('.answer').append(newElement);
        // }


        // for (let i = 0; i<pick.choice.length; i++) {
        //     newElement = $('<div>').addClass('selection').attr('value', i).html(pick.choice[i]);
        //     $('.answer').append(newElement);
        // }

//     // select a question and display it to the screen with answers
//     const displayQuestion = (pageNum, questionNum) => {
//         const selectedQuestion = gamePlay[`page${pageNum}`].questions[questionNum];
//         return selectedQuestion;
//     };

//     const displayAnswer = (pageNum, answerNum) => {
//         const answer = gamePlay[`page${pageNum}`].answers[answerNum];
//         return answer;

//     };

//     /** format: 
//     * Time Remaining: time Seconds
//     * Question?
//     * answers below with on hover highlight*/
// //    const displayQuestionAnswer = (obj) => {
// //        $('.question').html(randomQuestion(gamePlay.questions.answers));
// //        for (let i = 1; i<5; i++) {
           
// //            $('<p></p>').addClass('dynamic').html(obj[`answer${i}`].correct).appendTo('.game-screen').on('click', function() {
// //                if ($(this).html() === 'everyone') {
// //                    console.log('you got it right');
// //                    displayQuestionAnswer(answers);
// //                     countDown();
// //                } else {
// //                 console.log(`c'mon man`);
// //                 console.log($(this).html());
// //                }
// //            });
// //        }

// //    };

//    const renderQuestion = (pNum, qNum) => {
//         let pageNumber = 1;
//         let index = 0;

//         countDown();
//        $('<p></p>').addClass('dynamic-question').html(displayQuestion(pNum, qNum)).appendTo('.game-screen');
//        $('<p></p>').addClass('dynamic-answer').html(displayAnswer(pNum, 0)).appendTo('.game-screen');
//        $('<p></p>').addClass('dynamic-answer').html(displayAnswer(pNum, 1)).appendTo('.game-screen');
//        $('<p></p>').addClass('dynamic-answer').html(displayAnswer(pNum, 2)).appendTo('.game-screen');
//        $('<p></p>').addClass('dynamic-answer').html(displayAnswer(pNum, 3)).appendTo('.game-screen');

//        $('.dynamic-answer').on('click', function() {
//         while (pageNumber < 5) {
//             let stillTime = true;
//             if ($(this).html() !== "everyone" || stillTime) {
//                 incorrect++;
//                 index++;
//                 pageNumber++;
//                 stillTime = !stillTime;
//                 $("dynamic-question, dynamic-answer").remove();
//                 renderQuestion(pageNumber,index);
//             } else if (!stillTime) {
//                 unAnswered++;
//                 index++;
//                 pageNumber++;
//                 stillTime = !stillTime;
//                 renderQuestion(pageNumber,index);
//             } else {
//                 correct++;
//                 index++;
//                 pageNumber++;
//                 stillTime = !stillTime;
//                 $('.dynamic-question, .dynamic-answer').remove();
//                 renderQuestion(pageNumber,index);
//             }
//         } 
//         renderFinalScreen();


//     });
//    };

//    const renderFinalScreen = () => {
//     $('<p></p>').addClass('end-game').html(`All done, heres how you did!`).appendTo('.game-screen');
//     $('<p></p>').addClass('answers-correct').html(`Correct Answers: ${correct}`).appendTo('.game-screen');
//     $('<p></p>').addClass('answers-incorrect').html(`Incorrect Answers: ${incorrect}`).appendTo('.game-screen');
//     $('<p></p>').addClass('unanswered').html(`Unanswered: ${unAnswered}`).appendTo('.game-screen');
//    };

