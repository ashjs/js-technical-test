'use strict';

import $        from 'jquery';
import Backbone from 'backbone';

export default Backbone.View.extend({
  el: '.js-Comments',

  events: {
    'change .js-filterComments': 'filterComments',
    'click .js-toggleSidebar' : 'toggleSidebar'
  },

  issue: '',
  comments: [],
  users: [],

  initialize: function(issueId) {
    this.issue = issueId;

    $('.js-Comments-issueId').text(this.issue);

    this.getComments();
  },

  getComments: function() {
    var that = this;
    $.ajax({
      url: `https://api.github.com/repos/nodejs/node/issues/${this.issue}/comments`
    }).done((res) => {
      that.comments = res;
      that.displayComments(that.comments);
      that.displayFilters();
      that.initChart();
    });
  },

  displayComments: function(comments) {
    var that = this;
    var userTmp = [];
    comments.forEach( (value) => {
      if($.inArray(value.user.id, userTmp) === -1) {
        userTmp.push(value.user.id);
        that.users.push(value.user);
      }
      that.createComment(value);
    });
  },

  createComment: function(comment) {
    this.$('.js-commentsList').append(`
        <li class="tt-Comments-item js-item${comment.user.id}">
          <img src="${comment.user.avatar_url}" class="tt-Comments-img" />
          <p class="tt-Comments-bubble">${comment.body}</p>
        </li>
      `);
  },

  displayFilters: function() {
    var that = this;
    that.users.forEach( (value) => {
      that.createFilter(value);
    });
  },

  createFilter: function(user) {
    this.$('.js-filtersList').append(`
        <li class="tt-Comments-filter">
          <input class="tt-Input-checkbox js-filterComments" type="checkbox" id="filter-${user.id}" name="filter-${user.id}" value="${user.id}" checked="checked" />
          <label for="filter-${user.id}">${user.login}</label>
        </li>
      `);
  },

  filterComments: function(evt) {
    var input = $(evt.currentTarget);
    if(!input.is(':checked')) {
      $(`.js-item${input.val()}`).addClass('tt-Comments-item--hidden');
    } else {
      $(`.js-item${input.val()}`).removeClass('tt-Comments-item--hidden');
    }

    this.drawChart();
  },

  formatData4Chart: function() {
    var data = [];
    var that = this;
    data.push(['Name', 'Comments length']);
    that.users.forEach(function(user, index) {
      data.push([user.login, 0]);
      that.comments.forEach(function(comment) {
        if(user.id == comment.user.id && $(`#filter-${comment.user.id}`).is(':checked')) {
          data[index+1][1] += comment.body.length;
        }
      });
    });

    return data
  },

  initChart: function() {
    var that = this;
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
      var data = google.visualization.arrayToDataTable(that.formatData4Chart());
      var chart = new google.visualization.PieChart(document.getElementById('piechart'));

      chart.draw(data);
    }
  },

  toggleSidebar: function() {
    $('.js-sidebar').toggleClass('tt-Comments-sidebar--show');
  },
});
