function initializeVariables()
{
	this.currentSelectedQuestion = -1;
//	var m = new model();
//	loadModelDummyData(m);
}

function initialDataLoad()
{
    console.log("in init data load");

	var questions = m.getQuestions("","");
	var questionList = document.getElementsByClassName('question-list')[0];
	while (questionList.firstChild)
    {
		questionList.removeChild(questionList.firstChild);
	}
	for(var i = 0; i < questions.length; i++)
    {
		var currentQuestion = questions[i];
		var currentQuestionID = "q" + currentQuestion.ID;
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

        var voteDiv = document.createElement('div');
        voteDiv.className = "vote";

        var upvoteBtn = document.createElement('button');
        upvoteBtn.type = "button";
        upvoteBtn.className = "upvote";
        upvoteBtn.onclick = function(event)
            {
                event.stopPropagation();
                var el = event.target;
                while (el.className !== "upvote")
                {
                    if (el.tagName === "article")
                        return;
                    el = el.parentNode;
                }
                upvote(el);
            };
        voteDiv.appendChild(upvoteBtn);

        questionDiv.appendChild(voteDiv);

        var scoreDiv = document.createElement('div');
        scoreDiv.className = "score";
        scoreDiv.innerHTML = currentQuestion.upvotes;
        questionDiv.appendChild(scoreDiv);

        var profileDiv = document.createElement('div');
        profileDiv.className = "profile";
        profileDiv.innerHTML = "<img src='img/user" + 
                (Math.floor(Math.random()*(9-1))+1) + ".jpg'>";
        questionDiv.appendChild(profileDiv);

        var textDiv = document.createElement('div');
        textDiv.className = "text";
        textDiv.innerHTML = currentQuestion.title;
        questionDiv.appendChild(textDiv);

        var answersDiv = document.createElement('div');
        answersDiv.className = "answers";
        answersDiv.innerHTML = m.getQuestionAnswers(currentQuestion.ID).length+"<div>answers</div>";
        questionDiv.appendChild(answersDiv);
        
		questionList.appendChild(questionDiv);

        console.log("added a new question to questionList");
	}
}

function upvote(targetEl)
{
    console.log("in upvote from " + targetEl.outerHTML);

    while (targetEl.className !== "question" && targetEl.className !== "answer")
    {
        if (targetEl.className === "article")
            return;
        targetEl = targetEl.parentNode;
    }

    var targetChildNodes = targetEl.childNodes;
    for (var i = 0; i < targetChildNodes.length; i++)
    {
        if (targetChildNodes[i].className === "score")
        {
            var previous = parseInt(targetChildNodes[i].innerHTML);
            previous++;
            targetChildNodes[i].innerHTML = previous;

	        var elements;
            if (targetEl.className === "question")
            {
                m.setQuestionScore(parseInt(targetEl.id.substring(1)),
                                   previous);
            }
            else if (targetEl.className === "answer")
            {
                m.setAnswerScore(parseInt(targetEl.id.substring(1)),
                                 previous);
            }

            break;
        }
    }
}

function downvote(targetEl)
{
    console.log("in downvote from " + targetEl.outerHTML);

    while (targetEl.className !== "question" && targetEl.className !== "answer")
    {
        if (targetEl.className === "article")
            return;
        targetEl = targetEl.parentNode;
    }

    var targetChildNodes = targetEl.childNodes;
    for (var i = 0; i < targetChildNodes.length; i++)
    {
        if (targetChildNodes[i].className === "score")
        {
            var previous = parseInt(targetChildNodes[i].innerHTML);
            previous--;
            targetChildNodes[i].innerHTML = previous;
            break;
        }
    }
}

function openQuestion(questionEl)
{
    console.log("in openQuestion");

    var questionId = parseInt(questionEl.id.substring(1));

    var articleElement = document.getElementsByTagName("article")[0];
    while (document.getElementsByClassName("answer-list").length > 0)
    {
        var elToDelete = document.getElementsByClassName("answer-list")[0];
        elToDelete.parentNode.removeChild(elToDelete);
    }

	var answerListDiv = document.createElement('div');
	answerListDiv.className = "answer-list";
    console.log("created answer list: " + answerListDiv.outerHTML);
	var answers = m.getQuestionAnswers(questionId);
	for(var j = 0; j < answers.length; j++)
    {
		var currentAnswer = answers[j];
		var currentScore = currentAnswer.upvotes;
        var answerId = "a" + currentAnswer.ID;

        var newAnswer = document.createElement("div");
            newAnswer.className = "answer";
            newAnswer.id = answerId;
        
        var voteEl = document.createElement("div");
            voteEl.className = "vote";

        var upvoteEl = document.createElement("button");
            upvoteEl.type = "button";
            upvoteEl.className = "upvote";
            upvoteEl.onclick = function(event)
                {
                    event.stopPropagation();
                    var el = event.target;
                    console.log(el.outerHTML);
                    while (el.className !== "upvote")
                    {
                        if (el.tagName === "article")
                            return;
                        el = el.parentNode;
                    }
                    console.log(el.outerHTML);
                    upvote(el);
                };
        console.log("created upvote btn: " + upvoteEl.outerHTML);

        var downvoteEl = document.createElement("button");
            downvoteEl.type = "button";
            downvoteEl.className = "downvote";
            downvoteEl.onclick = function(event)
                {
                    event.stopPropagation();
                    var el = event.target;
                    while (el.className !== "downvote")
                    {
                        if (el.tagName === "article")
                            return;
                        el = el.parentNode;
                    }
                    downvote(el);
                };

        var scoreEl = document.createElement("div");
            scoreEl.className = "score";
            scoreEl.innerHTML = currentScore;

        var textEl = document.createElement("div");
            textEl.className = "text";
            textEl.innerHTML = currentAnswer.content;

        voteEl.appendChild(upvoteEl);
        voteEl.appendChild(downvoteEl);

        newAnswer.appendChild(voteEl);
        newAnswer.appendChild(scoreEl);
        newAnswer.appendChild(textEl);

        answerListDiv.appendChild(newAnswer);
	}
    questionEl.parentNode.insertBefore(answerListDiv, questionEl.nextSibling);

    console.log("added new answerList to questionList");
}


window.addEventListener("DOMContentLoaded", function() {
	console.log("DOM loaded");
	initializeVariables();
    initialDataLoad();
}, false);
