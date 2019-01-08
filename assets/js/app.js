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

    let correct = 0;
    let incorrect = 0;
    let unAnswered = 0;
    let stillTime = true;

    const gamePlay = {
        page1: {
            questions: ["Who died in Infinity War?", "did you?","did it rain?","do you play golf?","what day is it?"],
            answers: ["everyone", "ironman", "captain america", "hulk"]
        },
        page2: {
            questions: ["Who died in Infinity War?", "did you?","did it rain?","do you play golf?","what day is it?"],
            answers: ["everyone", "ironman", "captain america", "hulk"]
        },
        page3: {
            questions: ["Who died in Infinity War?", "did you?","did it rain?","do you play golf?","what day is it?"],
            answers: ["everyone", "ironman", "captain america", "hulk"]
        },
        page4: {
            questions: ["Who died in Infinity War?", "did you?","did it rain?","do you play golf?","what day is it?"],
            answers: ["everyone", "ironman", "captain america", "hulk"]
        },
        page5: {
            questions: ["Who died in Infinity War?", "did you?","did it rain?","do you play golf?","what day is it?"],
            answers: ["everyone", "ironman", "captain america", "hulk"]
        }
    };

    const answers = gamePlay.answers;

//create a countdown function to go from 30seconds to 0 seconds
    const countDown = () => {
        let count = 30;
        let timer = setInterval(() => {
            if (count >= 1 && stillTime ) {
                $('#basicUsage').html(`Time Remaining: ${count} Seconds`);
                count--;
            } else {
                console.log('next Question');
                stillTime = !stillTime
                clearInterval(timer);
            }
        }, 1000);
        
    };

    // select a question and display it to the screen with answers
    const displayQuestion = (pageNum, questionNum) => {
        const selectedQuestion = gamePlay[`page${pageNum}`].questions[questionNum];
        return selectedQuestion;
    };

    const displayAnswer = (pageNum, answerNum) => {
        const answer = gamePlay[`page${pageNum}`].answers[answerNum];
        return answer;

    };

    /** format: 
    * Time Remaining: time Seconds
    * Question?
    * answers below with on hover highlight*/
   const displayQuestionAnswer = (obj) => {
       $('.question').html(randomQuestion(gamePlay.questions.answers));
       for (let i = 1; i<5; i++) {
           
           $('<p></p>').addClass('dynamic').html(obj[`answer${i}`].correct).appendTo('.game-screen').on('click', function() {
               if ($(this).html() === 'everyone') {
                   console.log('you got it right');
                   displayQuestionAnswer(answers);
                    countDown();
               } else {
                console.log(`c'mon man`);
                console.log($(this).html());
               }
           });
       }

   };

   const renderQuestion = (pNum, qNum) => {
       $('<p></p>').addClass('dynamic-question').html(displayQuestion(pNum, qNum)).appendTo('.game-screen')
       $('<p></p>').addClass('dynamic-answer').html(displayAnswer(pNum, 0)).appendTo('.game-screen')
       $('<p></p>').addClass('dynamic-answer').html(displayAnswer(pNum, 1)).appendTo('.game-screen')
       $('<p></p>').addClass('dynamic-answer').html(displayAnswer(pNum, 2)).appendTo('.game-screen')
       $('<p></p>').addClass('dynamic-answer').html(displayAnswer(pNum, 3)).appendTo('.game-screen')
   };

   const renderFinalScreen = () => {
    $('<p></p>').addClass('end-game').html(`All done, heres how you did!`).appendTo('.game-screen')
    $('<p></p>').addClass('answers-correct').html(`Correct Answers: ${correct}`).appendTo('.game-screen')
    $('<p></p>').addClass('answers-incorrect').html(`Incorrect Answers: ${incorrect}`).appendTo('.game-screen')
    $('<p></p>').addClass('unanswered').html(`Unanswered: ${unAnswered}`).appendTo('.game-screen')
   };

// create a start button to begin the game
    $('.start-game').on('click', () => {
        countDown();
        // displayQuestionAnswer(answers);
        renderQuestion(1,0);
        // renderFinalScreen();

        $('.dynamic-answer').on('click', function() {
            if ($(this).html() === "everyone" || stillTime) {
                correct++;
                $('.dynamic-question, .dynamic-answer').empty();
                renderQuestion(2,1);
            } else if ($(this).html() !== "everyone" || stillTime) {
                incorrect++;
                renderQuestion(2,1);
            } else {
                unAnswered++;
                renderQuestion(2,1);
            }

        });
    });
    


    
});
