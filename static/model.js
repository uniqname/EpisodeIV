
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

  // self.remove = function(filter) {
  //   var els = self.settings(filter);
  //   $.each(els, function() {
  //     delete settings[this.id]
  //   })
  //   self.trigger("remove", els);
  // }

  // self.toggle = function(id) {
  //   var item = settings[id];
  //   item.done = !item.done;
  //   self.trigger("toggle", item);
  // }

  // @param filter: <empty>, id, "active", "completed"
  // self.settings = function(filter) {
  //   var ret = [];
  //   $.each(settings, function(id, item) {
  //     if (!filter || filter == id || filter == (item.done ? "completed" : "active")) ret.push(item)
  //   })
  //   return ret;
  // }

  // sync database
  self.on("settingsChange edit", function() {
    db.put(settings);
  })

}