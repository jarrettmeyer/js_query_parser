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

    // Overwrite default options with user values.
    $.extend(options, userOptions);

    // Local variables.
    self.options = options;
    self.$selector = $(selector);
    self.logger = new window.QueryParser.Logger("QueryParser", self.options.debug);
    self.query = new window.QueryParser.Query(self.options);

    self.bindEvents = function () {
      var events = options.events.join(" ");

      self.logger.debug("Debug mode enabled: " + options.debug);
      self.logger.debug("Binding events: " + events);

      self.$selector.on(events, function () {
        self.parseQuery();
      });
    };

    self.initialize = function () {
      self.logger.debug("Creating new QueryParser instance.");
      self.bindEvents();
    };

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