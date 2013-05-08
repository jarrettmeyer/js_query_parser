var options = {
  keys: ["aardvark", "badger", "cat", "dog", "dolphin", "eagle"]
};
var autocompletionist = new window.QueryParser.Autocompletionist(options);

module("Autocompletionist tests");

test("can create instance of Autocompletionist", function () {
  ok(autocompletionist instanceof Object);
});

test("can find matches in the array of keys", function () {
  autocompletionist.findMatches("do");
  ok(autocompletionist.matches.length === 2);
});

test("finding matches should be case insensitive", function () {
  autocompletionist.findMatches("DO");
  ok(autocompletionist.matches.length === 2);
});

test("has an array of keys", function () {
  ok(autocompletionist.keys instanceof Array);
});