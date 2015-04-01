function question(ID, userID, title, content){
		this.ID = ID;
		this.userID = userID;
		this.title = title;
		this.content = content;
		this.dateSubmitted = new Date();
		this.upvotes = 0;
		this.followed = false;
}

function answer(ID, userID, questionID, content){
		this.ID = ID;
		this.userID = userID;
		this.questionID = questionID;
		this.content = content;
		this.dateSubmitted = new Date();
		this.upvotes = 0;
}

//Manierre

function user(ID){
		this.ID = ID;
		this.score = 0;
		this.name = name;
}

function loadModelDummyData(model){
		var user1 = new user(0);
		user1.score = 50;
		user1.name = "Optimus Prime";
		model.allUsers.push(user1);
		var user2 = new user(1);
		user2.score = 125;
		user2.name = "Megatron";
		model.allUsers.push(user2);
		var user3 = new user(2);
		user3.score = 1025;
		user3.name = "Bumblebee";
		model.allUsers.push(user3);
		var user4 = new user(3);
		user4.score = 200;
		user4.name = "Grimlock"
		model.allUsers.push(user4);
		
		// ID, userID, title, content
		var question1 = new question(0,0,"What is Photosynthesis?","I was really confused about the photosynthesis lecture.  Please tell me what it is with pix plz.");
		question1.dateSubmitted.setDate(5);
		question1.upvotes = 3;
		model.allQuestions.push(question1);
		var question2 = new question(1,1,"What do mitochondria do?","I was really confused about mitochondria.  Pix please!  I can't lose my scholarship...");
		question2.dateSubmitted.setDate(8);
		question2.upvotes = 5;
		model.allQuestions.push(question2);
		var question3 = new question(2,1,"Main difference between plant and animal cells","I know what the obvious difference is -- one is in a plant and one is in an animal, but I can't enumerate all of the significant differences.  What are they?");
		question3.dateSubmitted.setDate(11);
		model.allQuestions.push(question3);
		var question4 = new question(3,1,"How does irregular precipitation affect rainforest ecosystems consisting of marsupials?","Or in another term, do kangaroos hang out in the Amazonian rainforest?  That would be so cool.");
		question4.dateSubmitted.setDate(17);
		question4.upvotes = 10;
		model.allQuestions.push(question4);
		var question5 = new question(4,1,"Why do I keep asking questions?","Am I the only one that keeps asking questions around here?");
		question5.dateSubmitted.setDate(2);
		question5.upvotes = 2;
		model.allQuestions.push(question5);
		
		// ID, USERID, questionID
		var answer1 = new answer(0,2,0,"Hahahaha!  You are so dumb!  I learned that in middle school!");
		answer1.upvotes = -10;
		model.allAnswers.push(answer1);
		var answer2 = new answer(1,3,0,"Don't listen to him, he's a jerk.  This is what Photosynthesis is...");
		answer2.upvotes = 30;
		model.allAnswers.push(answer2);
		var answer3 = new answer(2,2,0,"Are you sure that's what the answer is?  Huh?  You betta' recognize!");
		model.allAnswers.push(answer3);
		var answer4 = new answer(3,3,2,"The differences are that 1.  blah 2. blah and 3. blah");
		answer3.upvotes = 21;
		answer4.upvotes = 25;
		model.allAnswers.push(answer4);
		var answer5 = new answer(4,3,3,"I am Captain Kangaroo, and I approve this message.");
		model.allAnswers.push(answer5);
		var answer5 = new answer(5,3,4,"Yes.  This is because you are awesome.");
		model.allAnswers.push(answer5);
		answer5.upvotes = 4;
		var answer6 = new answer(6,3,1,"Mitochondria party it up with the Krebs Cycle");
		answer6.upvotes = 5;
		model.allAnswers.push(answer6);
		
}

function model(){
	this.allQuestions = [];
	this.allAnswers = [];
	this.allUsers = [];
	
	this.getQuestions = function(sortOrder,searchValue){
		if(sortOrder === "Upvotes"){
			this.allQuestions.sort(function(a,b){
				if(a.upvotes < b.upvotes){
					return 1;
				}
				if(a.upvotes > b.upvotes){
					return -1;
				}
				return 0;
			});
		} else if(sortOrder === "Date Submitted"){
			this.allQuestions.sort(function(a,b){
				if(a.dateSubmitted < b.dateSubmitted){
					return -1;
				}
				if(a.dateSubmitted > b.dateSubmitted){
					return 1;
				}
				return 0;
			});
		} else if(sortOrder === "Question IDs"){
			this.allQuestions.sort(function(a,b){
				if(a.userID < b.userID){
					return -1;
				}
				if(a.userID > b.userID){
					return 1;
				}
				return 0;
			});
		}
		var result = [];
		for(var i = 0; i < this.allQuestions.length; i++){
			var currentQuestion = this.allQuestions[i];
			if (currentQuestion.title.toLowerCase().indexOf(searchValue) > -1){
				result.push(currentQuestion);
			}
		}
		return result;
	};
	
	this.getQuestionAnswers = function(questionID){
		var result = [];
		for(var i = 0; i < this.allAnswers.length; i++){
			if(this.allAnswers[i].questionID == questionID){
				result.push(this.allAnswers[i]);
			}
		}
		return result;
	};

    this.setQuestionScore = function(questionId, newScore)
        {
            for (var i = 0; i < this.allQuestions.length; i++)
            {
                if (this.allQuestions[i].ID === questionId)
                    this.allQuestions[i].upvotes = newScore;
            }
        };
    this.setAnswerScore = function(answerId, newScore)
        {
            for (var i = 0; i < this.allAnswers.length; i++)
            {
                if (this.allAnswers[i].ID === answerId)
                    this.allAnswers[i].upvotes = newScore;
            }
        };
	
	this.getQuestionsForUser = function(userID){
		var result = [];
		for(var i = 0; i < this.allQuestions.length; i++){
			if(this.allQuestions[i].userID == userID){
				result.push(this.allQuestions[i]);
			}
		}
		return result;
	};
	
	this.getAnswersForUser = function(userID){
		var result = [];
		for(var i = 0; i < this.allAnswers.length; i++){
			if(this.allAnswers[i].userID == userID){
				result.push(this.allAnswers[i]);
			}
		}
		return result;
	};
	
	/*
	this.submitQuestion = function(userID, title, content){
		var question = new question(userID, title, content);
		this.allQuestions.push(question);
	}
	
	this.submitAnswer = function(userID, questionID, content){
		var answer = new answer(userID, questionID, content);
		this.allAnswers.push(answer);
	}
	*/
	
	this.getUser = function(userID){
		var result = allUsers[userID];
		return result;
	}
}


var currentUser = 3;
var m = new model();
loadModelDummyData(m);
var answersForQuestion1 = m.getQuestionAnswers(0);
var answersForQuestion2 = m.getQuestionAnswers(2);
var answersForQuestion3 = m.getQuestionAnswers(3);
var answersForQuestion4 = m.getQuestionAnswers(1);
//var stuff = m.getQuestions("Upvotes");
//var stuff = m.getQuestions("Date Submitted");
var user2questions = m.getQuestionsForUser(1);
var user1questions = m.getQuestionsForUser(0);
var user3answers = m.getAnswersForUser(3);
console.log("gets here");



