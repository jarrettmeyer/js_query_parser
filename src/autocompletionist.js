(function () {

  var Autocompletionist;

  Autocompletionist = function (options) {

    var self = this;
    self.options = options;

    /**
     * Add match to the matches array.
     */
    self.addMatch = function (match) {
      self.matches.push(match);
      self.numberOfMatches += 1;

      var item = $("<li class=\"" + self.itemCssClass + "\">" + match + "</li>");
      self.$list.append(item);
      self.$list.show();
      self.visible = true;
    };

    self.clearListItems = function () {
      if (!self.$list) {
        return;
      }
      self.hide();
      self.$list.find("." + self.itemCssClass).remove();
    };

    /**
     * Make sure that we have a valid search term. If the term is falsy, use
     * an empty string.
     */
    self.ensureValidSearchTerm = function (term) {
      return (term || "").toString().toLowerCase();
    };

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
        if (lowerCaseKey.indexOf(term) === 0) {
          var key = self.keys[i];
          self.logger.debug("Found match for term '" + term + "': " + self.keys[i]);
          self.addMatch(key);
        }
      }

      return self.matches;
    };

    self.hide = function () {
      self.visible = false;
      self.$list.hide();
    };

    self.initialize = function () {
      self.keys = self.options.keys || [];
      self.numberOfKeys = self.keys.length;
      self.listCssClass = "query-parser-autocomplete-list";
      self.itemCssClass = "query-parser-autocomplete-item";
      self.visible = false;
      self.$selector = self.options.selector;
      self.initializeLogger();
      self.initializeLowerCaseKeys();
      self.initializeMatches();
      self.initializeList();
    };

    self.initializeList = function () {
      self.$list = $("<ul class=\"" + self.listCssClass + "\"></ul>");
      var top = self.options.$selector.position().top +
                self.options.$selector.height() +
                parseInt( self.options.$selector.css("padding-top") ) +
                parseInt( self.options.$selector.css("padding-bottom") ) +
                parseInt( self.options.$selector.css("border-top-width") ) +
                parseInt( self.options.$selector.css("border-bottom-width") );
      var left = self.options.$selector.position().left;
      self.$list.css("top", top);
      self.$list.css("left", left);
      self.$list.hide();
      $("body").append(self.$list);
    };

    self.initializeLogger = function () {
      self.logger = new window.QueryParser.Logger("Autocompletionist", self.options.debug);
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
      self.clearListItems();     
    };

    self.initialize();
  };

  if (!window.QueryParser) {
    window.QueryParser = { };
  }

  window.QueryParser.Autocompletionist = Autocompletionist;
}());