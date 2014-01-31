/* The presenter */

;(function() {
  'use strict';
  /*
    A Model instance exposed to global space so you can
    use the Todo APi from the console. For example:

    todo.add("My task");
  */
  window.episodeIV = new EpisodeIV();

  // HTML for a single todo item
  var tempalates = {
      book: Handlebars.compile($("#books").html()),
      chapter: Handlebars.compile($("#chapters").html()),
      reader: Handlebars.compile($("#reader").html())
    },
    root = $("#todo-list"),
    nav = $("#filters a");

  episodeIV.renderInto = function (html, container) {
    if (!container) {
      container = "main";
    }
    $(container).html(html);
  }


    $.route(function (hash) {
      hash = hash.replace('#', '').split('/');

      var book = hash[0],
          chapter = hash[1],
          data,
          templ;
      if (chapter) {
        data = episodeIV.getText(book, chapter);
        templ = tempalates.reader;
      } else if (book) {
        data = episodeIV.getChapterForBook(book);
        templ = tempalates.chapter;
      } else {
        data = episodeIV.getBooks('bible');
        templ = tempalates.book;
      }
      data.done(function () {
        episodeIV.renderInto(templ(this))
      });
    });

  /* Listen to user events */

  $(window).keyup(function(e) {
    // up key
    if (e.which === 38) {
      episodeIV.speedUp();
    } else if (e.which === 40) {
      episodeIV.speedDown();
    }
  });

  $("#toggle-all").click(function() {
    $("li", root).each(function() {
      todo.toggle(this.id);
    })
  })

  $("#clear-completed").click(function() {
    todo.remove("completed");
  })



  /* Listen to model events */

  episodeIV.on("settingsChange", function (settingName, newValue) {
    episodeIV.settings[settingName] = newValue;
    episodeIV.db.put(settings);
  }).on("remove", function(items) {
    $.each(items, function() {
      $("#" + this.id).remove()
    })

  }).on("toggle", function(item) {
    toggle($("#" + item.id), !!item.done)

  }).on("edit", function(item) {
    var el = $("#" + item.id);
    el.removeClass("editing");
    $("label, .edit", el).text(item.name).val(item.name);

  // counts
  }).on("add remove toggle", counts)



  /* Routing */

  nav.click(function() {
    return $.route($(this).attr("href"))
  })

  $.route(function(hash) {

    // clear list and add new ones
    // root.empty() && $.each(episodeIV.settings(hash.slice(2)), add)

    // selected class
    // nav.removeClass("selected").filter("[href='" + hash + "']").addClass("selected");

    // update counts
    // counts()
  })



  /* Private functions */

  function toggle(el, flag) {
    el.toggleClass("completed", flag);
    $(":checkbox", el).prop("checked", flag);
  }

  function settingsChange(setting) {

  };

  function add(item) {
    if (this.id) item = this;

    var el = $($.render(template, item)).appendTo(root),
      input = $(".edit", el);


    $(".toggle", el).click(function() {
      todo.toggle(item.id);
    })

    function blur() {
      el.removeClass("editing")
    }

    toggle(el, !!item.done);

    // edit
    input.blur(blur).keydown(function(e) {
      var val = $.trim(this.value);
      if (e.which == 13 && val) {
        item.name = val;
        todo.edit(item);
      }

      if (e.which == 27) blur()
    })

    $("label", el).dblclick(function() {
      el.addClass("editing");
      input.focus()[0].select();
    })

    // remove
    $(".destroy", el).click(function() {
      todo.remove(item.id);
    })

  }

  function counts() {
    var active = todo.items("active").length,
       done = todo.items("completed").length;

    $("#todo-count").html("<strong>" +active+ "</strong> item" +(active == 1 ? "" : "s")+ " left")
    $("#clear-completed").toggle(done > 0).text("Clear completed (" + done + ")")
    $("#footer").toggle(active + done > 0)
  }

})();