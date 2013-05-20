(function () {

  var QueryParser;

  var options = {
    debug: false,
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
     *
     */
    self.autocomplete = function () {
      var content, currentTermLength, queryStringLength, uneditedQueryPart;
      if (self.autocompletionist.selectedItemValue) {
        //self.logger.debug("Tab autocompletion for value: " + self.autocompletionist.selectedItemValue);
        queryStringLength = self.queryString.length;
        currentTermLength = self.query.currentTerm.length;
        uneditedQueryPart = self.queryString.substr(0, queryStringLength - currentTermLength);
        content = uneditedQueryPart + self.autocompletionist.selectedItemValue + ' ';
        self.$selector.val(content);
        self.setQueryString(content);
        return content;
      }
    };

    /**
     * Bind all user interface events.
     */
    self.bindEvents = function () {

      //self.logger.debug("Debug mode enabled: " + options.debug);
      //self.logger.debug("Binding events: " + events);

      self.$selector.on("focus keyup", function () {
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
      self.isQueryStringUpdated = false;
      self.keyEvents = {
        9: { callback: self.onTabPressed, name: "Tab" },
        13: { callback: self.onEnterPressed, name: "Enter" },
        27: { callback: self.onEscapePressed, name: "Escape" },
        38: { callback: self.onUpArrowPressed, name: "Up Arrow" },
        40: { callback: self.onDownArrowPressed, name: "Down Arrow" }
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

    self.onDownArrowPressed = function () {
      self.autocompletionist.incrementSelectedItemIndex();
      return false;
    };

    self.onEnterPressed = function () {
      self.autocomplete();
      return false;
    };

    self.onEscapePressed = function () {
      self.logger.debug("Escape was pressed. Hiding autocomplete.");
      self.autocompletionist.hide();
      return false;
    };

    self.onKeydown = function (event) {
      var key, keyEvent;
      key = event.which;
      self.logger.debug("Keydown: " + key);
      keyEvent = self.keyEvents[key];
      if (keyEvent) {
        return keyEvent.callback();
      } else {
        self.isQueryStringUpdated = true;
        return true;
      }
    };

    self.onQueryUpdated = function (term) {
      self.autocompletionist.findMatches(term);
    };

    self.onTabPressed = function () {
      //self.logger.debug("Tab was pressed.");
      self.autocomplete();
      return false;
    };

    self.onUpArrowPressed = function () {
      self.autocompletionist.decrementSelectedItemIndex();
      return false;
    };

    /**
     * Parse the query content.
     */
    self.parseQuery = function () {
      if (self.isQueryStringUpdated) {
        var content = self.$selector.val();
        self.setQueryString(content);
        self.isQueryStringUpdated = false;
      }
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