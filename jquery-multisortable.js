(function($){
  $.widget("ui.multiSortable", $.ui.sortable, {

  version: "0.0.1",
    ready: false,
    options: {
      multipleSelectKey: 'shiftKey',
      multipleSelectTrigger: '> *',
      multipleSelectClass: 'ui-selected',
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
