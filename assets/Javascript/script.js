
const options=document.querySelector('.options').children;
const answerTrackerContainer=document.querySelector('.answers-tracker');
const questionNumberSpan=document.querySelector(".question-num-value")
const totalQuestionSpan=document.querySelector(".total-question")
const correctAnswerSpan=document.querySelector(".correct-answers");
const totalQuestionSpan2=document.querySelector(".total-question2");
const percentage=document.querySelector(".percentage");
const question=document.querySelector(".question");
const greet =document.getElementById("last_greet");
const op1=document.querySelector(".option1");
const op2=document.querySelector(".option2");
const op3=document.querySelector(".option3");
const op4=document.querySelector(".option4");
let questionIndex;
let index=0;
let myArray=[];
let myArr=[];
let score=0;

//questions

const questions=[
{
	q:'Banoret te vjeter te Australis jane:',
	options:['Dravidet','Indianet','Aborigjenet','Eskimet'],
	answer:2 
},
{
	q:'Pergjat brigjeve te Detit Baltik dhe Detit te Veriut shtrihet:',
	options:['Fusha e Panonise','Ultesira Gjermano-Polake','Ultesira e Hindustanit','Fusha e pollogut'],
	answer:1 
},
{
	q:'Sa eshte gjatsija e perimetrit te tokes?',
	options:['40.075 km','40.065 km','40.055 km','40.045 km'],
	answer:0 
},
{
	q:'Cila vije e imagjinuar ndan dy hemisferat e tokes?',
	options:['Ekuatori','Megatori','Blogatori','Ekolatori'],
	answer:0 
},
{
	q:'Cka dallojme te kometat?',
	options:['Koka dhe kembet','Koka dhe krahet','Kembet dhe bishti','Koka dhe bishti'],
	answer:3 
},
{
	q:'Mali me i larte ne Republiken e Maqedonise se veriut eshte?',
	options:['Jakupica','Mali Sharr','Korabi','Karagjica'],
	answer:2 
},
]
totalQuestionSpan.innerHTML=questions.length;

function load() {
	questionNumberSpan.innerHTML=index+1;
	question.innerHTML=questions[questionIndex].q;
	op1.innerHTML=questions[questionIndex].options[0];
	op2.innerHTML=questions[questionIndex].options[1];
	op3.innerHTML=questions[questionIndex].options[2];
	op4.innerHTML=questions[questionIndex].options[3];
	index++;
}
function check(element) {
	if (element.id==questions[questionIndex].answer) {
		//console.log('correct')
		element.classList.add('correct');
		updateAnswerTracker('correct');
		score++;
		console.log("score:"+score)
	}
	else{
		
		//console.log('wrong')
		element.classList.add('wrong');
		updateAnswerTracker('wrong');
	}
	disabledOptions()
}
function disabledOptions(){
	for (let i=0; i<options.length; i++) {
		options[i].classList.add("disabled");
		if (options[i].id==questions[questionIndex].answer) {
			options[i].classList.add("correct");
		}
	}
}
function enableOptions(){
	for (let i=0; i<options.length; i++) {
		options[i].classList.remove("disabled","correct","wrong");
	}
}
function validate() {
	
	if (!options[0].classList.contains("disabled")){
		alert('Please select an option')
	}
	else{
		randomQuestion();
		enableOptions();
	}
}
function next() {
	validate()
}
function randomQuestion() {
	let randomNumber=Math.floor(Math.random()*questions.length);
	let hitDuplicate=0;
	if (index==questions.length) {
		quizOver();
	}
	else{
		if (myArray.length>0) {
			for (let i=0; i<myArray.length; i++) {
				if (myArray[i]==randomNumber) {
					hitDuplicate=1;
					break;
				}
			}
			if (hitDuplicate==1) {
				randomQuestion();
			}
			else{
				questionIndex=randomNumber;
				load();
				myArr.push(questionIndex)
			}
		}
		if (myArray.length==0) {
			questionIndex=randomNumber;
			load();
			myArr.push(questionIndex)
		}
		
		myArray.push(randomNumber);
	
	}
}
function answerTracker() {
	for(let i=0; i<questions.length; i++){
	const div=document.createElement("div")
		answerTrackerContainer.appendChild(div);
	}
}
function updateAnswerTracker(classNam) {
	answerTrackerContainer.children[index-1].classList.add(classNam);
	
}
function quizOver() {
	var score_percent=((score/questions.length)*100).toFixed(2);
	document.querySelector(".quiz-over").classList.add('show');
	correctAnswerSpan.innerHTML=score;
	totalQuestionSpan2.innerHTML=questions.length;
	percentage.innerHTML=score_percent+'%';
	percentage.value=score_percent;
	

	if (percentage.value <50) {
		greet.innerHTML="Mundesh edhe me mire!"
	}
	else
		greet.innerHTML="Bravo!"
	console.log(greet)
}

function tryAgain() {
	window.location.reload();
}
window.onload=function(){
	randomQuestion();
	answerTracker();
}
