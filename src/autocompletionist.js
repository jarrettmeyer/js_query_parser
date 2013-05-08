(function () {

  var Autocompletionist;

  Autocompletionist = function (selector, options) {
    var self = this;

    // Local variables.
    self.options = options || {};
    self.$selector = $(selector);

    self.findMatches = function (term) {
      // Ensure that we have a term. If not, assign an empty string.
      term = (term || "").toLowerCase();

      // Initialize the collection of matches.
      self.matches = [];
      self.numberOfMatches = 0;

      // Find the matches in the array.
      self.keys.forEach(function (key) {
        if (key.toLowerCase().indexOf(term) >= 0) {
          self.matches.push(key);
          self.numberOfMatches += 1;
        }
      });

      return self.matches;
    };

    self.initialize = function () {
      self.keys = self.options.keys || [];
      self.matches = [];
      self.numberOfMatches = 0;
    };

    self.initialize();
  };

  if (!window.QueryParser) {
    window.QueryParser = { };
  }

  window.QueryParser.Autocompletionist = Autocompletionist;
}());