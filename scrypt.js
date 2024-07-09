let startBtn = document.getElementById("start-btn");
let prevBtn = document.getElementById("prev-btn");
let nextBtn = document.getElementById("next-btn");
let resultText = document.getElementById("result-text");
let testContainer = document.getElementById("test")
let answerOptions = document.getElementById("answer-options");
let finishBtn = document.getElementById("finish-btn");

let currentQuestion = 0;
let score = 0;

fetch('questions.json')
    .then(response => response.json())
    .then(data => {
        const questions = data.questions;
        let checkedAnswers = [];
        //console.log(questions);

        startBtn.addEventListener("click", () => {
            startBtn.style.display = "none";
            testContainer.style.display = "block";
            loadQuestions()
        })

        function loadQuestions(){
            let questionText = document.getElementById("question-text");

            if (currentQuestion === questions.length-1)
                finishBtn.style.display = "block";
            else finishBtn.style.display = "none";

            for (let i of questions[currentQuestion].options){
                let div = document.createElement("div");
                let input = document.createElement("input")
                let label = document.createElement("label");
                input.type = "radio";
                input.name = "test";
                input.classList.add("option")
                div.classList.add("options");
                input.value = i.toString();
                input.id = i.toString();
                label.innerHTML = i.toString();
                label.setAttribute("for", i.toString());
                div.appendChild(input);
                div.appendChild(label);
                answerOptions.appendChild(div);
            }

            for(let inp of document.querySelectorAll(".option")){
                inp.addEventListener("click", ()=>{
                    checkedAnswers[currentQuestion] = inp.value;
                    console.log(inp.value)
                })
            }
            //console.log(checkedAnswers)

            questionText.innerHTML = questions[currentQuestion].question;
        }

        function isCheckedAnswer(){
            for (let inp of document.querySelectorAll(".option")){
                if (inp.value === checkedAnswers[currentQuestion])
                    inp.checked = "checked"
            }
        }

        function removeInput(){
            for(let el of document.querySelectorAll(".options")){
                answerOptions.removeChild(el);
            }
        }

        nextBtn.addEventListener("click", () =>{
            removeInput();
            currentQuestion++;
            //resultText.innerHTML = currentQuestion.toString();
            if (currentQuestion === questions.length-1 ){
                nextBtn.disabled = true;
            }
            if (currentQuestion > 0){
                prevBtn.disabled = false;
            }
            loadQuestions();
            isCheckedAnswer();
        })

        prevBtn.addEventListener("click", () =>{
            removeInput();
            currentQuestion--;

            if (currentQuestion < 1){
                prevBtn.disabled = true;
            }
            if (currentQuestion < questions.length){
                nextBtn.disabled = false;
            }

            loadQuestions();
            isCheckedAnswer();
        })

        finishBtn.addEventListener("click", () =>{
            console.log(checkedAnswers)
            prevBtn.disabled = true;
            score = 0;
            for (let i in checkedAnswers){
                if (checkedAnswers[i] === undefined)
                    checkedAnswers[i] = 0;
                if(checkedAnswers[i] === questions[i].answer)
                    score ++;
                //console.log(typeof i)
            }
            console.log(score)
            resultText.innerHTML = `Результат тесту: ${score}/${questions.length}`
        })
    })




