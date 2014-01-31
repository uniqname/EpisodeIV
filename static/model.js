
/* The model */

function EpisodeIV(db) {

  db = db || DB("EpisodeIV-settings");

  var self = $.observable(this);

  self.settings = db.get();

  self.getText = function(reference) {
    return $.ajax({
      // url: '' + reference.book + '/' + reference.chapter + (reference.verse ? reference.verse : '') + '/';
      url: "http://labs.bible.org/api/?passage=John%203&type=json"
    }).done(function (data) {
      return data;
    });
  };

  self.getBooks = function() {
      return ["Gen", "Exod", "Lev", "Num", "Deut", "Josh", "Judg", "Ruth", "1Sam", "2Sam", "1Kgs", "2Kgs", "1Chr", "2Chr", "Ezra", "Neh", "Esth", "Job", "Ps", "Prov", "Eccl", "Song", "Isa", "Jer", "Lam", "Ezek", "Dan", "Hos", "Joel", "Amos", "Obad", "Jonah", "Mic", "Nah", "Hab", "Zeph", "Hag", "Zech", "Mal", "Matt", "Mark", "Luke", "John", "Acts", "Rom", "1Cor", "2Cor", "Gal", "Eph", "Phil", "Col", "1Thess", "2Thess", "1Tim", "2Tim", "Titus", "Phlm", "Heb", "Jas", "1Pet", "2Pet", "1John", "2John", "3John", "Jude", "Rev"];
  };
  self.getChapters = function() {}

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