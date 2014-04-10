Marionette.SortableItemView = Marionette.ItemView.extend({
    tagName: "li",

    attributes: {
      "draggable": true
    },

    dragEvents: {
      "dragstart": "start",
      "dragenter": "enter",
      "dragleave": "leave",
      "dragend": "leave",
      "dragover": "over",
      "drop": "drop"
    },

    initialize: function(options) {
      _.extend(this, options);
    },

    // Adds the drag events
    delegateEvents: function(events) {
      var ev = _.extend({}, events, this.dragEvents);
      Marionette.View.prototype.delegateEvents.call(this, ev);
    },

    start: function(e) {
      this.parent.draggedModel = this.model;
      if (e.originalEvent) e = e.originalEvent;
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.dropEffect = "move";
      e.dataTransfer.setData('text', "Drag");
    },

    enter: function(e) {
      e.preventDefault();
      this.$el.addClass(this.overClass);
    },

    leave: function(e) {
      e.preventDefault();
      this.$el.removeClass(this.overClass);
    },

    over: function(e) {
      e.preventDefault();

      return false;
    },

    drop: function(e) {
      e.preventDefault();
      this.leave(e);
      var collection = this.model.collection,
      parent = this.parent,
      currentIndex = this.$el.index();

      collection.remove(parent.draggedModel);
      collection.add(parent.draggedModel, { at: currentIndex });

      collection.trigger('drop', this.parent.draggedModel);
    }

});

Marionette.SortableCollectionView = Marionette.CollectionView.extend({

  tagName: 'ul',
  className: 'sortable-view',

  itemView: Marionette.SortableItemView,

  overClass: 'over',

  collectionEvents: {
    'drop': 'onDropItem'
  },

  buildItemView: function(item, ItemViewType, itemViewOptions){
    var options = _.extend({ model: item,
                             overClass: this.overClass,
                             parent: this
                           },
                           itemViewOptions);

    return new ItemViewType(options);
  },

  appendHtml: function(collectionView, itemView, index){
    var childrenContainer = collectionView.itemViewContainer ? collectionView.$(collectionView.itemViewContainer) : collectionView.$el;
    var children = childrenContainer.children();
    if (children.size() <= index) {
      childrenContainer.append(itemView.el);
    } else {
      childrenContainer.children().eq(index).before(itemView.el);
    }
  },

  onDropItem: function(model) {
    console.log('DROPPED ITEM');
  }


});