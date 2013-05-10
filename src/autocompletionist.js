(function () {

  var Autocompletionist;

  Autocompletionist = function (queryParser) {
    
    var self = this;
    self.queryParser = queryParser;    

    /**
     * Find matches for the term in the array of keys.
     */
    self.findMatches = function (term) {
      term = self.ensureValidSearchTerm(term);
      self.initializeMatches();

      if (term === "") {
        return self.matches;
      }

      for (var i = 0; i < self.numberOfKeys; i += 1) {
        var lowerCaseKey = self.lowerCaseKeys[i];
        if (lowerCaseKey.indexOf(term) >= 0) {
          var key = self.keys[i];
          self.logger.debug("Found match for term '" + term + "': " + self.keys[i]);
          self.addMatch(key);
        }
      }

      return self.matches;
    };

    /**
     * Make sure that we have a valid search term. If the term is falsy, use
     * an empty string.
     */
    self.ensureValidSearchTerm = function (term) {
      return (term || "").toString().toLowerCase();
    };

    /**
     * Add match to the matches array.
     */
    self.addMatch = function (match) {
      self.matches.push(match);
      self.numberOfMatches += 1;
      self.showPotentialMatches = true;
    };

    self.initialize = function () {
      self.keys = self.queryParser.options.keys || [];
      self.numberOfKeys = self.keys.length;
      self.showPotentialMatches = false;
      self.initializeLogger();
      self.initializeLowerCaseKeys();
      self.initializeMatches();
    };

    self.initializeLogger = function () {
      self.logger = new window.QueryParser.Logger("Autocompletionist", self.queryParser.options.debug);
      self.logger.debug("Creating new Autocompletionist instance");
    };

    self.initializeLowerCaseKeys = function () {
      self.lowerCaseKeys = [];
      for (var i = 0; i < self.numberOfKeys; i += 1) {
        var key = self.keys[i].toString().toLowerCase();
        self.lowerCaseKeys.push(key);
      }
      return self.lowerCaseKeys;
    };

    self.initializeMatches = function () {
      self.matches = [];
      self.numberOfMatches = 0;
      self.showPotentialMatches = false;
    };

    self.initialize();
  };

  if (!window.QueryParser) {
    window.QueryParser = { };
  }

  window.QueryParser.Autocompletionist = Autocompletionist;
}());