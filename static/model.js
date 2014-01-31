
/* The model */

function EpisodeIV(db) {

  db = db || DB("EpisodeIV-settings");

  var self = $.observable(this);

  self.settings = db.get();

  self.getScripture = function(reference) {
    return $.ajax({
      url: '' + reference.book + '/' + reference.chapter + (reference.verse ? reference.verse : '') + '/';
    }).done(function (data) {
      return data;
    });
  };

  self.settings.set = function(setting, value) {
    settings[setting] = value;
    self.trigger("edit", item);
  };

  self.settings.get = function(setting) {
    settings[setting] = value;
    self.trigger("edit", item);
  };

  // sync database
  self.on("settingsChange edit", function() {
    db.put(settings);
  })

}