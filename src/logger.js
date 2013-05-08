(function () {

  var Log, Logger;

  Log = function (name, level, message) {

    var self = this;

    // Local variables.
    self.level = level;
    self.message = message;
    self.name = name;
    self.timestamp = new Date();

    self.toString = function () {
      return self.name + " -- " + self.timestamp.toString() + " [" + self.level + "] " + self.message;
    };

  };

  Logger = function (name, isDebugging) {

    var self = this;

    // Local variables.
    self.isDebugging = isDebugging;
    self.logs = [];
    self.name = name;

    self.debug = function (message) {
      self.log("debug", message);
    };

    self.error = function (message) {
      self.log("error", message);
    };

    self.initialize = function () {
      self.writeToConsoleEnabled = self.isDebugging && window.console && window.console.log;
    };

    self.log = function(level, message) {
      // Create a new log and add it to an array.
      var log = new Log(self.name, "debug", message);
      self.logs.push(log);

      // If debugging mode is being used, then write to the console.
      if (self.writeToConsoleEnabled) {
        window.console.log(log.toString());
      }

      return log;
    };

    self.initialize();

  };

  if (!window.QueryParser) {
    window.QueryParser = {};
  }

  window.QueryParser.Logger = Logger;

}());