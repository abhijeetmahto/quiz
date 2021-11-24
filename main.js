(function(){

//functions
//building questions
function buildQuiz(){
    const dis = [];  //display of questions in HTML

    //questions
    questions.forEach((currentQ,qNo) => {
        const answers = []; //storing answers

        for(i in currentQ.answers)
        {
            //add radio button
            answers.push(`<label> 
            <input type="radio" name="question${qNo}" value ="${i}"> ${i} :${currentQ.answers[i]}
            </label>` );
        }
        //adding this question in html
       /* dis.push(`<div class="question"> ${currentQ.question}</div>
        <div class="answers"> ${answers.join('')}</div>`
        );*/
        //hiding and showing questions
        dis.push(`<div class="page">
        <div class="question"> ${currentQ.question}</div>
        <div class="answers"> ${answers.join("")}</div>
        </div>`);
    }
    );
    qcontainer.innerHTML = dis.join(''); //combining output list into one string of HTML and putting into the page 
}

//answers / results

function showResults(){
    const aContainer =qcontainer.querySelectorAll('.answers'); //taking answers from quiz
    let correct_ans=0; //no.of correect answers
    questions.forEach((currentQ,No) => {
        // selected answer
        const answerContainer = aContainer[No];
        const selector = `input[name=question${No}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;

        //correct answer
        if(userAnswer === currentQ.correct){
            correct_ans=correct_ans+1;
            // green
            aContainer[No].style.color = 'green';
          }
          //wrong or blank
          else{
            // red
            aContainer[No].style.color = 'red';
          }
        });
        var max = localStorage.getItem("Highest Score");
        if(max < correct_ans)
        {
            localStorage.setItem("Highest Score",correct_ans);
        }
        // score secured
        results.innerHTML = `<b id="scored">${correct_ans} out of ${questions.length}<b>`;
        high.innerHTML = `<br><b id="hs"> High Score: ${max} <b>`;
        clearInterval(time);
        retry.style.display = "inline-block";
        //review.style.display = "inline-block";
       // previous_btn.style.display = "none";

}


//page function
function showPage(n){
    page[currentP].classList.remove("active-page");
    page[n].classList.add("active-page");
    currentP = n;
    if(currentP === 0)
    {
        previous_btn.style.display = "none";
    }
    else{
        previous_btn.style.display = "inline-block";
    }
    if(currentP === page.length-1)
    {
        next_btn.style.display = "none";
        submit.style.display = "inline-block";
        exit.style.display = "inline-block";
        retry.style.display = "none";
        //review.style.display = "none";
    }
    else{
        next_btn.style.display = "inline-block";
        submit.style.display = "none";
        exit.style.display = "none";
        retry.style.display = "none";
        //review.style.display = "none";
    }
}
//working of next and previous button
function showNextPage(){
    showPage(currentP + 1);
}
function showPreviousPage(){
    showPage(currentP - 1);
}
// review
/*function check(){
    next_btn.style.display = "inline-block";
    previous_btn.style.display = "inline-block";
    document.getElementById("submit_btn").disabled = false;
    submit.style.display = "none";
}*/

//variables
const qcontainer = document.getElementById("question");
const results = document.getElementById("score");
const high = document.getElementById("hscore");
const submit = document.getElementById("submit_btn");
const exit = document.getElementById("exit_btn");
const retry = document.getElementById("reset_btn");
//const review = document.getElementById("review_btn");

//questions array
const questions = [
    {
    question: "1. Which of the following languages is more suited to a structured program?",
    answers: {
        a: "PL/1",
        b: "FORTRAN",
        c: "BASIC",
        d: "PASCAL"
    },
    correct: "d"
},
{
    question: "2.Which of the following is the 1's complement of 10?",
    answers: {
        a: "01",
        b: "110",
        c: "11",
        d: "10"
    },
    correct: "a"
},
{
    question: "3.The brain of any computer system is",
    answers: {
        a: "ALU",
        b: "Memory",
        c: "CPU",
        d: "None of The Above"
    },
    correct: "c"
},
{
    question: "4.Which part interprets program instructions and initiate control operations.",
    answers: {
        a: "Input",
        b: "Storage Unit",
        c: "Logic Unit",
        d: "Control Unit"
    },
    correct: "d"
},
{
    question: "5.The binary system uses powers of",
    answers: {
        a: "2",
        b: "10",
        c: "8",
        d: "16"
    },
    correct: "a"
},
{
    question: "6. A computer program that converts assembly language to machine language is",
    answers: {
        a: "Compiler",
        b: "Interpreter",
        c: "Assembler",
        d: "None of The Above"
    },
    correct: "c"
},
{
    question: "7.You can use C++ as a procedural, as well as an object-oriented, language",
    answers: {
        a: "True",
        b: "False"
    },
    correct: "a"
},
{
    question: "8. Which of the following type of class allows only one object of it to be created?",
    answers: {
        a: "Virtual Class",
        b: "Abstract Class",
        c: "Singleton Class",
        d: "Friend Class"
    },
    correct: "c"
},
{
    question: "9. Which of the following is not a type of constructor?",
    answers: {
        a: "Copy Constructor",
        b: "Friend Constructor",
        c: "Default Constructor",
        d: "Parameterized Constructor"
    },
    correct: "b"
},
{
    question: "10. Which of the following concepts means wrapping up of data and functions together?",
    answers: {
        a: "Abstraction",
        b: "Encapsulation",
        c: "Inheritance",
        d: "Polymorphism"
    },
    correct: "b"
}
];


buildQuiz();

//timer
let sec = 20;
let time = setInterval(myTimer, 1000);

function myTimer() {
    document.getElementById('timer').innerHTML = sec + " sec left";
    sec--;
    if (sec == -1) {
        clearInterval(time);
        alert("Time out!! :-(");
        document.getElementById("next_btn").disabled = true;
        document.getElementById("previous_btn").disabled = true;
        document.getElementById("submit_btn").disabled = true;
        retry.style.display = "inline-block";
        previous_btn.style.display = "none";
        next_btn.style.display = "none";
        submit.style.display = "none";
        showResults();
    
    }
}

/*function store(){
    var n = document.querySelector('input').value;
    sessionStorage.setItem("Name",n);
}*/
// Pagination
const previous_btn = document.getElementById("previous_btn");
const next_btn = document.getElementById("next_btn");
const page = document.querySelectorAll(".page");

let currentP = 0;

showPage(currentP);

//eventlistener of buttons

submit.addEventListener('click',showResults);
previous_btn.addEventListener('click',showPreviousPage);
next_btn.addEventListener('click',showNextPage);
/*document.getElementById("start").onclick = function(){
    store();
}*/
//review.addEventListener('click',check);
})();