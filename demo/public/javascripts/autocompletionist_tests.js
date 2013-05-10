var options = {
	debug: true,
	keys: ["Alpha", "Bravo", "Charlie", "Delta", "Echo", "Foxtrot"]
};

var autocompletionist;
var queryParser;
var $fixture = $("#qunit-fixture");
var $testTextarea;

module("Autocompletionist tests", {
	setup: function () {

		// Add the textarea to the screen.
		$fixture.append("<textarea id\"test-textarea\"></textarea>");
		$testTextarea = $("#test-textarea");

		// Create the object.
		queryParser = new QueryParser.QueryParser("#test-textarea", options);
		autocompletionist = new QueryParser.Autocompletionist(queryParser);
	}
});

test("can create instance of Autocompletionist", function () {
  ok(autocompletionist instanceof Object);
});

test("can find matches in the array of keys", function () {
  autocompletionist.findMatches("a");
  equal(autocompletionist.numberOfMatches, 4);
});

test("finding matches should be case insensitive", function () {
  autocompletionist.findMatches("E");
  equal(autocompletionist.matches.length, 3);
});

test("has an array of keys", function () {
  ok(autocompletionist.keys instanceof Array);
});

test("matches array is empty by default", function () {
	equal(autocompletionist.matches.length, 0);
});

test("number of matches is 0 by default", function () {
	equal(autocompletionist.numberOfMatches, 0);
});

test("show potential matches is false by default", function () {
	ok(autocompletionist.showPotentialMatches === false);
});

test("show potential matches is true when a match is found", function () {
	autocompletionist.findMatches("a");
	ok(autocompletionist.showPotentialMatches === true);
});
