(function () {

  var Query;

  Query = function (options) {
    
    var self = this;
    self.options = options;
    
    /**
     * Initialize a new Query instance.
     */
    self.initialize = function () {
      self.logger = new window.QueryParser.Logger("Query", options.debug);
    
      self.$output = null;  
      self.hasOutputSelector = false;
      self.lastQuerySegment = null;
      self.queryPartDelimiters = self.options.queryPartDelimiters;
      self.querySegments = [];
      self.queryString = "";

      if (self.options.outputSelector) {
        self.hasOutputSelector = true;
        self.$output = $(self.options.outputSelector);
        self.logger.debug("Using output: " + self.options.outputSelector);
      }
    };

    self.onQueryStringUpdated = function () {
      self.logger.debug("Query string: " + self.queryString);
      self.splitQueryStringIntoParts();
      if (self.hasOutputSelector) {
        self.$output.html(self.toString());
      }
    };

    self.splitQueryStringIntoParts = function () {
      self.querySegments = [];
      var queryParts = self.queryString.split(self.queryPartDelimiters);

      for (var i = 0, len = queryParts.length; i < len; i += 1) {
        var queryPart = queryParts[i];
        var querySegment = new window.QueryParser.QuerySegment(queryPart);
        self.querySegments.push(querySegment);
        self.lastQuerySegment = querySegment;
      }
    };

    self.setQueryString = function (value) {
      self.queryString = value;
      self.onQueryStringUpdated();
    };

    self.toString = function () {
      var output = "";
      output += "Query String: " + self.queryString + self.options.newline;
      output += "Query Segments: " + self.options.newline;
      for (var i = 0, len = self.querySegments.length; i < len; i += 1) {
        output += i + ": " + self.querySegments[i].toString() + self.options.newline;
      }
      return output;
    };

    self.initialize();

  };

  if (!window.QueryParser) {
    window.QueryParser = {};
  }

  window.QueryParser.Query = Query;

} ());