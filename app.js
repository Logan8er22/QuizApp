var app = angular.module('quizApp', []);

app.directive('quiz', function(quizFactory) {
	return {
		restrict: 'AE',
		$scope: {},
		templateUrl: 'template.html',
		link: function($scope, elem, attrs) {
			$scope.start = function() {
				$scope.id = 0;
				$scope.quizOver = false;
				$scope.inProgress = true;
				$scope.getQuestion();
			};

			$scope.reset = function() {
				$scope.inProgress = false;
				$scope.score = 0;
			}

			$scope.getQuestion = function() {
				var q = quizFactory.getQuestion($scope.id);
				if(q) {
					$scope.question = q.question;
					$scope.options = q.options;
					$scope.answer = q.answer;
					$scope.answerMode = true;
				} else {
					$scope.quizOver = true;
				}
			};

			$scope.checkAnswer = function() {
				if(!$('input[name=answer]:checked').length) return;

				var ans = $('input[name=answer]:checked').val();

				if(ans == $scope.options[$scope.answer]) {
					$scope.score++;
					$scope.correctAns = true;
				} else {
					$scope.correctAns = false;
				}

				$scope.answerMode = false;
			};

			$scope.nextQuestion = function() {
				$scope.id++;
				$scope.getQuestion();
			}

			$scope.reset();
		}
	}
});

app.factory('quizFactory', function() {
	var questions = [
		{
			question: "1. AngularJS directives are used in ________.",
			options: ["Model", "Module", "View", "Controller"],
			answer: 2
		},
		{
			question: "2. Which of the following directive bootstraps AngularJS framework?",
			options: ["ng-init", "ng-app", "ng-controller", "ng-bootstrap"],
			answer: 1
		},
		{
			question: "3. Which of the following is a valid AngularJS expression?",
			options: ["{{ 2 + 2 }}", "{ 2 + 2 }", "(( 2 + 2 ))", "{ (2 + 2) }"],
			answer: 0
		},
		{
			question: "4. AngularJS directives can be written in HTML element as:",
			options: ["Tag", "Attribute", "Class name", "All of the above"],
			answer: 3
		},
		{	
			question: "5. The ng-model directive is used for ________.",
			options: ["One-way data binding", "Two-way data binding", "Binding view to controller", "None of the above"],
			answer: 1
		},
		{
			question: "6. The ng-bind directive binds ________.",
			options: ["Data to model", "View to controller", "Model to HTML element", "Model to $scope"],
			answer: 2
		},
		{
			question: "7. What is $scope?",
			options: ["It transfers data between a controller and view", "It transfers data between model and controller", "It is a global scope in AngularJS", "None of the above"],
			answer: 0
		},
		{
			question: "8. What is service in AngularJS?",
			options: ["Reusable UI component", "Reusable JavaScript function", "Data provider", "None of the above"],
			answer: 1
		},
		{
			question: "9. AngularJS filters ________.",
			options: ["Format the data without changing original data", "Filter the data to display on UI", "Fetch the data from remote server", "Cache the subset of data on the browser"],
			answer: 0
		},
		{
			question: "10. AngularJS module can be created using ________.",
			options: ["angular.module();", "var myModule = new module();", "module.create();", "angular.create();"],
			answer: 0
		}
	];

	return {
		getQuestion: function(id) {
			if(id < questions.length) {
				return questions[id];
			} else {
				return false;
			}
		}
	};
});