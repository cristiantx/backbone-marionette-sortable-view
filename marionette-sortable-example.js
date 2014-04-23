var App = new Backbone.Marionette.Application();

App.module('views', function(Views, Proteus, Backbone, Marionette, $, _) {
  "use strict";

  Views.SortableLi = Marionette.SortableItemView.extend({
    template: _.template('<img src="<%=posters.thumbnail%>" alt="" style="margin-right: 20px;"/> <h3 class="inliner"><%=title%></h3>'),
    className: 'box shadow padder'
  });

  Views.SortableList = Marionette.SortableCollectionView.extend({
    itemView: Views.SortableLi
  });

});

App.on('initialize:after', function() {
  App.addRegions({
    exampleContainer: '.example-container',
  });

  var collection = new Backbone.Collection();
  $.getJSON('http://api.rottentomatoes.com/api/public/v1.0/lists/movies/box_office.json?apikey=sm5b9yunxrnxg3wge7sw47s8&limit=15&callback=?')
    .done(function(data) {
      collection.reset(data.movies);
    });

  var exampleView = new App.views.SortableList({
    className:'sortable-view list-unstyled',
    collection: collection
  });

  App.exampleContainer.show(exampleView);

});

App.start();