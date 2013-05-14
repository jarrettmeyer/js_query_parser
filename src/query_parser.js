(function () {

  var QueryParser;

  var options = {
    debug: false,
    events: ["blur", "focus", "keyup"],
    keys: [],
    newline: "<br/>",
    outputSelector: null,
    queryPartDelimiters: /\s(?:and|or)\s/i
  };

  /**
   *
   */
  QueryParser = function (selector, userOptions) {

    var self = this;

    // Overwrite default options with user values. Assign the local variables.
    $.extend(options, userOptions);
    self.options = options;
    self.$selector = $(selector);

    /**
     * Bind all user interface events.
     */
    self.bindEvents = function () {
      var events = options.events.join(" ");

      //self.logger.debug("Debug mode enabled: " + options.debug);
      //self.logger.debug("Binding events: " + events);

      self.$selector.on(events, function () {
        self.parseQuery();
      });

      self.$selector.on("blur", function () {
        self.autocompletionist.hide();
      });

      self.$selector.on("keydown", self.onKeydown);
    };

    self.getCurrentTerm = function () {
      return self.query.currentTerm;
    };

    /**
     * Initialize a new QueryParser instance.
     */
    self.initialize = function () {
      self.options.$selector = self.$selector;
      self.initializeLogger();
      self.queryString = "";
      self.query = new window.QueryParser.Query(self.options);
      self.query.setQueryUpdatedCallback(self.onQueryUpdated);
      self.autocompletionist = new window.QueryParser.Autocompletionist(self.options);
      self.keyEvents = {
        9: { callback: self.onTabPressed, name: "Tab" },
        13: { callback: self.onEnterPressed, name: "Enter" }
      };
      self.bindEvents();
    };

    /**
     * Initialize a new logger for the Query Parser instance.
     */
    self.initializeLogger = function () {
      self.logger = new window.QueryParser.Logger("QueryParser", self.options.debug);
      self.logger.debug("Creating new QueryParser instance.");
    };

    self.onEnterPressed = function () {
      //self.logger.debug("Enter was pressed.");
      return false;
    };

    self.onKeydown = function (event) {
      var key, keyEvent;
      key = event.which;
      self.logger.debug("Keyup: " + key);
      keyEvent = self.keyEvents[key];
      if (keyEvent) {
        return keyEvent.callback();
      }
      return true;
    };

    self.onQueryUpdated = function (term) {
      self.autocompletionist.findMatches(term);
    };

    self.onTabPressed = function () {
      //self.logger.debug("Tab was pressed.");
      return false;
    };

    /**
     * Parse the query content.
     */
    self.parseQuery = function () {
      var content = self.$selector.val();
      self.setQueryString(content);
    };

    self.setQueryString = function (value) {
      self.queryString = value;
      self.query.setQueryString(value);
    };

    self.initialize();
  };

  if (!window.QueryParser) {
    window.QueryParser = {};
  }

  window.QueryParser.QueryParser = QueryParser;
}());