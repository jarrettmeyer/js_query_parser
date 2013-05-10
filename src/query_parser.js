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

  QueryParser = function (selector, userOptions) {

    var self = this;

    /** 
     * Overwrite default options with user values.
     */
    $.extend(options, userOptions);

    self.options = options;
    self.$selector = $(selector);
    
    /**
     * Bind all user interface events.
     */
    self.bindEvents = function () {
      var events = options.events.join(" ");

      self.logger.debug("Debug mode enabled: " + options.debug);
      self.logger.debug("Binding events: " + events);

      self.$selector.on(events, function () {
        self.parseQuery();
      });
    };

    /**
     * Initialize a new QueryParser instance.
     */
    self.initialize = function () {
      self.initializeLogger();
      self.query = new window.QueryParser.Query(self.options);
      self.autocompletionist = new window.QueryParser.Autocompletionist(self);
      self.bindEvents();
    };

    /**
     * Initialize a new logger for the Query Parser instance.
     */
    self.initializeLogger = function () {
      self.logger = new window.QueryParser.Logger("QueryParser", self.options.debug);
      self.logger.debug("Creating new QueryParser instance.");
    };

    /**
     * Parse the query content.
     */
    self.parseQuery = function () {
      var content = self.$selector.val();
      self.query.setQueryString(content);
    };

    self.initialize();
  };

  if (!window.QueryParser) {
    window.QueryParser = {};
  }

  window.QueryParser.QueryParser = QueryParser;
}());