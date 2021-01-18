/* ***************************
  JWD JavaScript Assessment

  This code is unfinished. You will need to study it to figure out what it does. Then you will need to use this and
  your own code, to finish the app. 
  
  The tasks you need to do are below.

    TASKS TODO:
      1. Calculate the score as the total of the number of correct answers

      2. Add an Event listener for the submit button, which will display the score and highlight 
         the correct answers when the button is clicked. Use the code from lines 67 to 86 to help you.

      3. Add 2 more questions to the app (each question must have 4 options).

      4. Reload the page when the reset button is clicked (hint: search window.location)

      5. Add a countdown timer - when the time is up, end the quiz, display the score and highlight the correct answers
*************************** */

window.addEventListener("DOMContentLoaded", () => {
  const start = document.querySelector("#start");
  start.addEventListener("click", function (e) {
    document.querySelector("#quizBlock").style.display = "block";
    start.style.display = "none";

    //Add a countdown timer - when the time is up, end the quiz, display the score and highlight the correct answers
    const time = document.querySelector("#time");
    let startTime = new Date().getTime();
    let quizTime = 1; //set the timer for 1 minute
    let quizTimeMilliSeconds = quizTime * 60 * 1000; //converted to milliseconds
    let countDownTime = startTime + quizTimeMilliSeconds; //calculated the timer ending time
    let callingInterval = 1000;
    // Update the count down every 1 second
    let x = setInterval(function () {
      // Get today's date and time
      let now = new Date().getTime();

      // Find the timeRemaining between now and the count down date
      let timeRemaining = countDownTime - now;

      // Time calculations for minutes and seconds

      let minutes = Math.floor(
        (timeRemaining % (1000 * 60 * 60)) / (1000 * 60)
      );
      let seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

      // Display the result in the element with id="demo"
      time.innerHTML = `${minutes}  m  ${seconds} s`;
      // If the count down is finished, write some text, submitting the results
      if (timeRemaining <= 0 || btnSubmit.disabled == true) {
        clearInterval(x);
        
        calculateScore(); //calculating the final score and highlighting the answers
        
        btnSubmit.disabled = true; // disabling the submit button when time remaining is zero
        if (btnSubmit.disabled == true) {
          time.innerHTML = `: 0 seconds. Quiz submitted`;
        }
        
      }
    }, callingInterval);
  });

  // quizArray QUESTIONS & ANSWERS
  // q = QUESTION, o = OPTIONS, a = CORRECT ANSWER
  // Basic ideas from https://code-boxx.com/simple-javascript-quiz/
  const quizArray = [
    {
      q: "Which is the third planet from the sun?",
      o: ["Saturn", "Earth", "Pluto", "Mars"],
      a: 1, // array index 1 - so Earth is the correct answer here
    },
    {
      q: "Which is the largest ocean on Earth?",
      o: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
      a: 3,
    },
    {
      q: "What is the capital of Australia",
      o: ["Sydney", "Canberra", "Melbourne", "Perth"],
      a: 1,
    },
    {
      q: "Which is the smallest country in the world",
      o: ["Nepal", "Vatican City", "Australia", "Sri Lanka"],
      a: 1,
    },
    {
      q: "Which is the largest country in the world",
      o: ["Russia", "China", "India", "Australia"],
      a: 0,
    },
  ];

  // function to Display the quiz questions and answers from the object
  const displayQuiz = () => {
    const quizWrap = document.querySelector("#quizWrap");
    let quizDisplay = "";
    quizArray.map((quizItem, index) => {
      quizDisplay += `<ul class="list-group">
                   Q - ${quizItem.q}
                    <li class="list-group-item mt-2" id="li_${index}_0"><input type="radio" name="radio${index}" id="radio_${index}_0"> ${quizItem.o[0]}</li>
                    <li class="list-group-item" id="li_${index}_1"><input type="radio" name="radio${index}" id="radio_${index}_1"> ${quizItem.o[1]}</li>
                    <li class="list-group-item"  id="li_${index}_2"><input type="radio" name="radio${index}" id="radio_${index}_2"> ${quizItem.o[2]}</li>
                    <li class="list-group-item"  id="li_${index}_3"><input type="radio" name="radio${index}" id="radio_${index}_3"> ${quizItem.o[3]}</li>
                    </ul>
                    <div>&nbsp;</div>`;
      quizWrap.innerHTML = quizDisplay;
    });
  };

  // Function definition for calculating scores and highlighting the answers after submission
  const calculateScore = () => {
    let score = 0;
    quizArray.map((quizItem, index) => {
      for (let i = 0; i < 4; i++) {
        //highlight the li if it is the correct answer
        let li = `li_${index}_${i}`;
        let r = `radio_${index}_${i}`;
        liElement = document.querySelector("#" + li);
        radioElement = document.querySelector("#" + r);
        liElement.style.backgroundColor = "white"; // initializing the background color as white
        if (quizItem.a == i) {
          //change background color of li element here
          liElement.style.backgroundColor = "green"; //changing the background color of correct answer to green
        }

        if (radioElement.checked) {
          // code for task 1 goes here

          if (quizItem.a == i) {
            score++;

            //change background color of li element here
            liElement.style.backgroundColor = "green"; //changing the background color of correct answer to green
          } else {
            liElement.style.backgroundColor = "red"; //changing the background color of wrong answer to red
          }
        }
      }
      //Printing scores
      const display_score = document.querySelector("#score");
      display_score.innerHTML = "Your score: " + score;
      btnSubmit.disabled = true;
    });
  };

  // Add an Event listener for the submit button, which will display the score and highlight
  // the correct answers when the button is clicked.
  // Calculate the score
  const btnSubmit = document.querySelector("#btnSubmit");
  btnSubmit.addEventListener("click", calculateScore);

  // Add an event listener to button reset
  const btnReset = document.querySelector("#btnReset");
  btnReset.addEventListener(
    "click",
    (homepage = () => {
      window.location.assign(window.location.href);
    })
  );

  // call the displayQuiz function
  displayQuiz();
});
