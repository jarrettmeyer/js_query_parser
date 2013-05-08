(function () {

  var QuerySegment;

  QuerySegment = function (queryPart) {

    var self = this;

    // Local variables.
    self.comparators = /\s(=|<>|!=|>|>=|<|<=|in)\s/i;
    self.comparator = null;
    self.comparatorIndex = null;
    self.key = null;
    self.queryPart = queryPart;
    self.value = null;

    self.initialize = function () {
      var parts = self.queryPart.split(self.comparators);
      if (parts.length === 3) {
        self.key = parts[0].trim();
        self.comparator = parts[1].trim();
        self.value = parts[2].trim();
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