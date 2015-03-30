function initializeVariables(){
	this.currentSelectedQuestion = -1;
	var m = new model();
	loadModelDummyData(m);
}

function setQuestion(newID){
	//alert('setting new question');
	this.currentSelectedQuestion = newID;
	//alert('currentlySelectedQuestion is '+currentSelectedQuestion);
	reloadData();
}

function foo(){
	alert('Foo');
}

function reloadData(){
	var questions = m.getQuestions("");
	var questionList = document.getElementById('questions');
	while (questionList.firstChild) {
		questionList.removeChild(questionList.firstChild);
	}
	for(var i = 0; i < questions.length; i++){
		var currentQuestion = questions[i];
		var currentQuestionID = currentQuestion.ID;
		var questionDiv = document.createElement('div');
		questionDiv.className = "question";
		var questionHTML = "";
		questionHTML += "<div class='vote'>\n";
		questionHTML += "<button type='button' onclick='setQuestion("+currentQuestion.ID+")' class='upvote'></button>\n";
		questionHTML += "</div>\n";
		questionHTML += "<div class='score'>"+currentQuestion.upvotes+"</div>\n";
		questionHTML += "<div class='text' onclick='setQuestion("+currentQuestionID+")'>"+currentQuestion.title+"</div>\n";
		questionHTML += "<div class='answers'>"+m.getQuestionAnswers(currentQuestion.ID).length+"<div>answers</div></div>\n";
		questionDiv.innerHTML =  questionHTML;
		questionList.appendChild(questionDiv);
		if(currentQuestion.ID == currentSelectedQuestion){
			//alert(currentQuestion.ID + ' = '+currentSelectedQuestion);
			var answerListDiv = document.createElement('div');
			answerListDiv.className = "answer-list";
			var answers = m.getQuestionAnswers(currentQuestionID);
			answerListDiv.innerHTML = '';
			for(var j = 0; j < answers.length; j++){
				var currentAnswer = answers[j];
				var answerHTML = "<div class='answer'>\n";
				answerHTML += "<div class='vote'>\n";
				answerHTML += "<button class='upvote'></button>\n";
				answerHTML += "<button class='downvote'></button>\n";
				answerHTML += "</div>\n";
				var currentScore = currentAnswer.upvotes - currentAnswer.downvotes;
				answerHTML += "<div class='score'>"+currentScore+"</div>\n";
				answerHTML += "<div class='text'>"+currentAnswer.content+"</div>\n";
				answerHTML += "</div>\n";
				answerListDiv.innerHTML += answerHTML;
			}
			questionList.appendChild(answerListDiv);
		} else {
			//alert('Not loading answers');
		}
	}
	//alert('reloading terminated');
}

window.addEventListener("DOMContentLoaded", function() {
	//alert('DOM loaded');
	initializeVariables();
	reloadData();
}, false);
