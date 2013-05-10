(function () {

  var QuerySegment;

  QuerySegment = function (queryPart) {

    var self = this;
    self.queryPart = queryPart;

    /**
     * Initialize a query segment.
     */
    self.initialize = function () {
      self.comparators = /\s(=|<>|!=|>|>=|<|<=|in)\s/i;
      self.comparator = null;
      self.comparatorIndex = null;
      self.key = null;
      self.value = null;
      self.parseQuerySegment();
    };

    self.parseQuerySegment = function () {
      var parts = self.queryPart.split(self.comparators);
      if (parts.length > 1) {
        self.key = parts[0].trim();
        self.comparator = parts[1].trim();
        self.value = parts[2].trim();
        self.showKeyAutocompleteOptions = false;
      } else {
        self.showKeyAutocompleteOptions = true;
      }
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