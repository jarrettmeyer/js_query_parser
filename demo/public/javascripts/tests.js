var options = {
	debug: true,
	keys: ["Alpha", "Bravo", "Charlie", "Delta", "Echo", "Foxtrot"]
};

var autocompletionist,
    fixtureSelector = "#qunit-fixture",
    queryParser,
    textareaContent = "<textarea id=\"test-textarea\"></textarea>",
    textareaSelector = "#test-textarea",
    $fixture,
    $testTextarea;

function addTextareaToDocument() {
  $fixture = $(fixtureSelector);
  $testTextarea = $(textareaContent);
  $fixture.append($testTextarea);
}

/**
 * Module for autocompletionist tests.
 */
module("Autocompletionist tests", {
	setup: function () {

    addTextareaToDocument();

		// Create the object.
		queryParser = new QueryParser.QueryParser(textareaSelector, options);
		autocompletionist = queryParser.autocompletionist;
	}
});

test("can create instance of Autocompletionist", function () {
  ok(autocompletionist instanceof Object);
});

test("can find matches in the array of keys", function () {
  autocompletionist.findMatches("a");
  equal(autocompletionist.numberOfMatches, 1);
});

test("finding matches should be case insensitive", function () {
  autocompletionist.findMatches("E");
  equal(autocompletionist.matches.length, 1);
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


/**
 * Module for Query Parser tests.
 */
module("Query Parser tests", {
  setup: function () {
    addTextareaToDocument();
    queryParser = new QueryParser.QueryParser(textareaSelector, options);
  }
});

test("can create instance of query parser", function () {
  ok(queryParser instanceof Object);
});



