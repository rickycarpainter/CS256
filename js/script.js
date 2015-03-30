function initializeVariables()
{
	this.currentSelectedQuestion = -1;
	var m = new model();
	loadModelDummyData(m);
}

function initialDataLoad()
{
    console.log("in init data load");

	var questions = m.getQuestions("");
	var questionList = document.getElementsByClassName('question-list')[0];
	while (questionList.firstChild)
    {
		questionList.removeChild(questionList.firstChild);
	}
	for(var i = 0; i < questions.length; i++)
    {
		var currentQuestion = questions[i];
		var currentQuestionID = currentQuestion.ID;
		var questionDiv = document.createElement('div');
		questionDiv.className = "question";
        questionDiv.id = currentQuestionID;

        questionDiv.onclick = function(event) 
            { 
                var questionEl = event.target;
                while (questionEl.className !== "question")
                {
                    if (questionEl.tagName === "article")
                        return;
                    questionEl = questionEl.parentNode;
                }
                openQuestion(questionEl)
            };

		var questionHTML = "";
		questionHTML += "<div class='vote'>\n";
        // TODO fix voting
		//questionHTML += "<button type='button' onclick='setQuestion("+currentQuestion.ID+")' class='upvote'></button>\n";
		questionHTML += "<button type='button' class='upvote'></button>\n";
		questionHTML += "</div>\n";
		questionHTML += "<div class='score'>"+currentQuestion.upvotes+"</div>\n";
		questionHTML += "<div class='text'>"+currentQuestion.title+"</div>\n";
		questionHTML += "<div class='answers'>"+m.getQuestionAnswers(currentQuestion.ID).length+"<div>answers</div></div>\n";
		questionDiv.innerHTML =  questionHTML;

		questionList.appendChild(questionDiv);

        console.log("added a new question to questionList");
	}
}

function openQuestion(questionEl)
{
    console.log("in openQuestion");

    var questionId = questionEl.id;

    var articleElement = document.getElementsByTagName("article")[0];
    while (document.getElementsByClassName("answer-list").length > 0)
    {
        var elToDelete = document.getElementsByClassName("answer-list")[0];
        elToDelete.parentNode.removeChild(elToDelete);
    }

	var answerListDiv = document.createElement('div');
	answerListDiv.className = "answer-list";
	var answers = m.getQuestionAnswers(questionId);
	answerListDiv.innerHTML = '';
	for(var j = 0; j < answers.length; j++)
    {
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
    questionEl.insertAdjacentHTML('afterend', answerListDiv.outerHTML);

    console.log("added new answerList to questionList");
}


window.addEventListener("DOMContentLoaded", function() {
	console.log("DOM loaded");
	initializeVariables();
    initialDataLoad();
}, false);
