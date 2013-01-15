(function($){
  $.widget("ui.multiSortable", $.ui.sortable, {

  version: "0.0.1",
    ready: false,
    options: {
      appendTo: "parent",
      axis: false,
      connectWith: false,
      containment: false,
      cursor: "auto",
      cursorAt: false,
      dropOnEmpty: true,
      forcePlaceholderSize: false,
      forceHelperSize: false,
      grid: false,
      handle: false,
      helper: "original",
      items: "> *",
      opacity: false,
      placeholder: false,
      revert: false,
      scroll: true,
      scrollSensitivity: 20,
      scrollSpeed: 20,
      scope: "default",
      tolerance: "intersect",
      zIndex: 1000,
      multipleSelectKey: 'shiftKey',
      multipleSelectTrigger: '> *',
      multipleSelectClass: 'ui-selected',
      activate: null,
      beforeStop: null,
      change: null,
      deactivate: null,
      out: null,
      over: null,
      receive: null,
      remove: null,
      sort: null,
      start: null,
      stop: null,
      update: null
    },

    _create: function() {
      var options = this.options;

      this._bindClick(options);

      this._bindStart(options);

      this._bindStop(options);

      this.element.sortable(options);
    },

    _setOption: function(option, value) {
      $.Widget.prototype._setOption.apply(this, arguments);
    },

    _bindClick: function(options) {
      this.element.find(options.multipleSelectTrigger).bind("click", function(event){
        if(event[options.multipleSelectKey]){
          $(this).addClass(options.multipleSelectClass);
        } else {
          $("."+options.multipleSelectClass).removeClass(options.multipleSelectClass);
        }
      });
    },

    _bindStart: function(options) {
      this.element.bind("sortstart", function(event, ui) {
        ui.item.siblings("."+options.multipleSelectClass+":not(.ui-sortable-placeholder)").appendTo(ui.item);
      });
    },

    _bindStop: function(options) {
      this.element.bind("sortstop", function(event, ui) {
        ui.item.after(ui.item.find("."+options.multipleSelectClass));
      });
    }

  });
}(jQuery));
