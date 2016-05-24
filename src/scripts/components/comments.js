'use strict';

import $        from 'jquery';
import Backbone from 'backbone';


export default Backbone.View.extend({
  el: '.js-Comments',

  events: {
  },

  issue: '',
  comments: [],

  initialize: function(issueId) {
    this.issue = issueId;

    this.getComments();
  },

  getComments: function() {
    var that = this;
    $.ajax({
      url: `https://api.github.com/repos/nodejs/node/issues/${this.issue}/comments`
    }).done((res) => {
      that.comments = res;
      that.displayComments(that.comments);
    });
  },

  displayComments: function(comments) {
    var that = this;
    comments.forEach( (value) => {
      that.createComment(value);
    });
  },

  createComment: function(comment) {
    $('.js-commentsList').append(`
        <li class="tt-Comments-item">
          <img src="${comment.user.avatar_url}" class="tt-Comments-img" />
          <p class="tt-Comments-bubble">${comment.body}</p>
        </li>
      `);
  },
});
