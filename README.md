Backbone Marionette Sortable Collection View
==============================================================

Use HTML5 drag and drop functionalities on collection views.


Usage
------------

```javascript

App.module('views', function(Views, App, Backbone, Marionette, $, _) {
  "use strict";

  Views.SortableLi = Marionette.SortableItemView.extend({
    template: _.template('<img src="<%=posters.thumbnail%>" alt="" /> <h3 class="inliner"><%=title%></h3>'),
    className: 'box padder'
  });

  Views.SortableList = Marionette.SortableCollectionView.extend({
    itemView: Views.SortableLi
  });

  Views.Main = Marionette.Layout.extend({

    regions: {
      content:'#content'
    },

    onRender: function() {
      this.renderSortableCollectionView();
    },

    renderSortableCollectionView: function() {
      var collection = new Backbone.Collection();
      $.getJSON('http://api.rottentomatoes.com/api/public/v1.0/lists/movies/box_office.json?apikey=[your-api-key]&limit=50&callback=?')
        .done(function(data) {
          collection.reset(data.movies);
        });

      var view = new Views.SortableList({
        collection: collection
      });

      this.content.show(view);

      return this;
    }

  });

});

```