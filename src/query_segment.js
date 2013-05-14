(function () {

  var QuerySegment;

  QuerySegment = function (queryPart) {

    var self = this;
    self.queryPart = queryPart;

    /**
     * Initialize a query segment.
     */
    self.initialize = function () {
      self.comparators = /(=|<>|!=|>|>=|<|<=|in)/i;
      self.comparator = null;
      self.comparatorIndex = null;
      self.key = null;
      self.term = null;
      self.value = null;
      self.parseQuerySegment();
    };

    self.parseQuerySegment = function () {
      var parts = self.queryPart.split(self.comparators);
      self.parseTerm();

      if (parts.length > 1) {
        self.key = parts[0].trim();
        self.comparator = parts[1].trim();
        self.value = parts[2].trim();
      }
    };

    self.parseTerm = function () {
      var numberOfSplits, splitByCharacters;

      // By default, the term is equal to the entire part.
      self.term = self.queryPart;

      splitByCharacters = self.term.split(/\s|\(|<|>|=/);
      numberOfSplits = splitByCharacters.length;

      // If the query term ends with an empty space, we can assume that the user has 
      // moved on.
      if (numberOfSplits > 1 && splitByCharacters[numberOfSplits - 1] === "") {
        self.term = "";
        return self.term;
      }

      while (numberOfSplits > 1 && splitByCharacters[0] === "") {
        splitByCharacters = splitByCharacters.splice(1, numberOfSplits - 1);
        numberOfSplits = splitByCharacters.length;
        self.term = splitByCharacters[0];
      }

      return self.term;
    };

    self.toString = function () {
      return "Key: " + self.key + ", Comparator: " + self.comparator + ", Value: " + self.value;
    };

    self.initialize();

  };

  if (!window.QueryParser) {
    window.QueryParser = {};
  }

  window.QueryParser.QuerySegment = QuerySegment;

}());