'use strict';
$(document).on('pageinit', 'div.index-page', function(){
  $('#slider', this).owlCarousel({
    autoPlay: 5000,
    singleItem: true
  });
  function gotPullUpData(event, data) {
    var iscrollview = data.iscrollview,
      newContent = $('#personalList > .personal:lt(4)').clone();
    $('#personalList').append(newContent);
    iscrollview.refresh(null, null, $.proxy(function(){
      this.scrollToElement('.personal:last-child', 400);
    }), iscrollview);
  }
  function onPullDown(){

  }
  function onPullUp(event, data) {
    setTimeout(function() {
      gotPullUpData(event, data);
    }, 1500);
  }
  $('.iscroll-wrapper', this).bind( {
    'iscroll_onpulldown': onPullDown,
    'iscroll_onpullup': onPullUp
  });
  $('#searchbox', this).on('focus', function(ev){
    ev.preventDefault();
    $(':mobile-pagecontainer').pagecontainer('change', 'pages/search_person.html', {
      transition: 'slide'
    });
  });
  $('.personal', this).on('tap', function(){
    $(':mobile-pagecontainer').pagecontainer('change', 'pages/recommended_personal.html', {
      transition: 'slide'
    });
  });
  $('.team', this).on('tap', function(){
    $(':mobile-pagecontainer').pagecontainer('change', 'pages/recommended_team.html', {
      transition: 'slide'
    });
  });
  $('#moreProfessions', this).on('tap', function(){
    $(':mobile-pagecontainer').pagecontainer('change', 'pages/professions.html', {
      transition: 'slide'
    });
  });
});
$(document).on('pageinit', 'div.grab-page', function(){
  var $overlay = $('<div>').addClass('overlay');
  $('.my-nav-item', this).on('tap', function(ev){
    ev.stopPropagation();
    $('.dropdown-menu').hide().height(0);
    $('.my-nav-item').not(this).removeClass('active');
    if(!$(this).hasClass('active')){
      $(this).addClass('active');
      $('#' + $(this).data('target') + 'Selections').show().height($('.iscroll-wrapper').height());
      $overlay.fadeIn();
    } else {
      $(this).removeClass('active');
      $overlay.fadeOut();
      $('#' + $(this).data('target') + 'Selections').show().height(0);
    }
  });
  $(document).on('tap', function(){
    $('.my-nav-item').removeClass('active');
    $('#professionSelections,#priceSelections,#orderSelections').height(0);
    $overlay.fadeOut();
  });
  $('.select-item', this).on('tap', function(){
    var text = $('a', this).text();
    $(this).addClass('selected').siblings().removeClass('selected');
    var type = $(this).parents('.dropdown-menu').data('type');
    $('.my-nav-item[data-target="' + type + '"]').find('.selectedOpt').text(text);
  });
  $('.dropdown-menu', this).on({
    touchstart: function(ev) {
      var oy = ev.originalEvent.touches[0].pageY;
      $.data(this, 'oy', oy);
      var matrix = $(this).find('.select-items').css('transform');
      matrix = matrix.substring(matrix.indexOf('(') + 1, matrix.indexOf(')')).split(',');
      var otrans = Number(matrix[5]);
      $.data(this, 'otrans', otrans);
    },
    touchmove: function(ev){
      var oy = $(this).data('oy');
      var diff = ev.originalEvent.touches[0].pageY - oy;
      var otrans = $(this).data('otrans');
      console.log($(this).find('.select-items').height());
      if((otrans + diff) < -($(this).find('.select-items').height() - $(this).height()) || (otrans + diff) > 0){
        return;
      }
      $(this).find('.select-items').css('transform', 'translateY(' + (otrans + diff) + 'px)');
    }
  });

  function gotPullUpData(event, data) {
    var iscrollview = data.iscrollview,
      newContent = $('#postList > .post:lt(5)').clone();
    $('#postList').append(newContent);
    iscrollview.refresh();
  }
  function onPullDown(){

  }
  function onPullUp(event, data) {
    setTimeout(function() {
      gotPullUpData(event, data);
    }, 1500);
  }
  $('.iscroll-wrapper', this).bind( {
    'iscroll_onpulldown': onPullDown,
    'iscroll_onpullup': onPullUp
  }).append($overlay);
  $('.post', this).on('tap', function(){
    $(':mobile-pagecontainer').pagecontainer('change', 'grab_details.html');
  });
});

$(document).on('pageinit', 'div.grab-detail-page', function(){
  var BMap = window.BMap;
  var map = new BMap.Map('map');
  var BMAP_ANIMATION_BOUNCE = BMAP_ANIMATION_BOUNCE || 2;
  map.setCurrentCity('北京');
  map.enableScrollWheelZoom(true);
  var myGeo = new BMap.Geocoder();
  var address = '北京市海淀区志强南园3号塔楼';
  $('#address', this).text(address);
  myGeo.getPoint(address, function(point){
    if(point) {
      map.centerAndZoom(point, 16);
      var marker = new BMap.Marker(point);
      map.addOverlay(marker);
      marker.setAnimation(BMAP_ANIMATION_BOUNCE);
      var label = new BMap.Label(address, {
        offset: new BMap.Size(20, -10)
      });
      marker.setLabel(label);
    } else{
      //window.alert('您选择地址没有解析到结果!');
    }
  }, '北京市');
});

$(document).on('pageinit', 'div.share-page', function(){
  $('.share', this).each(function(i, e){
    $(e).imagesLoaded(function(){
      $('.iscroll-wrapper').iscrollview('refresh');
    });
    $(e).on('tap', function(){
      $(':mobile-pagecontainer').pagecontainer('change', 'share_details.html', {
        transition: 'slide'
      });
    });
  });

  function gotPullUpData(event, data) {
    var iscrollview = data.iscrollview,
      newContent = $('#shareList > .share:lt(4)').clone();
    $('#shareList').append(newContent);
    iscrollview.refresh();
  }
  function onPullDown(){

  }
  function onPullUp(event, data) {
    setTimeout(function() {
      gotPullUpData(event, data);
    }, 1500);
  }
  $('.iscroll-wrapper', this).bind( {
    'iscroll_onpulldown': onPullDown,
    'iscroll_onpullup': onPullUp
  });
});

$(document).on('pageinit', 'div.share-detail-page', function(){
  $('.post-image', this).each(function(i, e){
    $(e).imagesLoaded(function(){
      $('.iscroll-wrapper').iscrollview('refresh');
    });
  });

  function gotPullUpData(event, data) {
    var iscrollview = data.iscrollview;
    iscrollview.refresh();
  }
  function onPullDown(){
  }
  function onPullUp(event, data) {
    setTimeout(function() {
      gotPullUpData(event, data);
    }, 1500);
  }
  $('.iscroll-wrapper', this).bind( {
    'iscroll_onpulldown': onPullDown,
    'iscroll_onpullup': onPullUp
  });
});

$(document).on('pageinit', 'div.recommend-personal-page', function(){
  $(this).imagesLoaded(function(){
    $('.iscroll-wrapper').iscrollview('refresh');
  });
  $('.album', this).on('tap', function(){
    $(':mobile-pagecontainer').pagecontainer('change', 'image_viewer.html', {
      transition: 'pop'
    });
  });
  $('.reviews', this).on('tap', function(){
    $(':mobile-pagecontainer').pagecontainer('change', 'personal_reviews.html', {
      transition: 'slide'
    });
  });
  $('.packages', this).on('tap', function(){
    $(':mobile-pagecontainer').pagecontainer('change', 'personal_packages.html', {
      transition: 'slide'
    });
  });
});

$(document).on('pageinit', 'div.personal-package-page', function(){
  $('#slider', this).owlCarousel({
    autoPlay: 5000,
    singleItem: true,
    pagination: false,
    afterMove: function(){
      $('.slider-current').text(this.owl.currentItem + 1);
    }
  });
});

$(document).on('pageinit', 'div.recommend-team-page', function(){
  $('#slider', this).owlCarousel({
    autoPlay: 5000,
    singleItem: true,
    pagination: false,
    afterMove: function(){
      $('.slider-current').text(this.owl.currentItem + 1);
    }
  });
  $(this).imagesLoaded(function(){
    $('.iscroll-wrapper').iscrollview('refresh');
  });
  $('.album', this).on('tap', function(){
    $(':mobile-pagecontainer').pagecontainer('change', 'image_viewer.html', {
      transition: 'pop'
    });
  });
  $('#teamVideos', this).on('tap', function(){
    $(':mobile-pagecontainer').pagecontainer('change', 'video_list.html', {
      transition: 'slide'
    });
  });
});

$(document).on('pageinit', 'div.order-page', function(){
  $('.my-nav-item', this).on('tap', function(){
    $('.my-nav-item').removeClass('active');
    $(this).addClass('active');
  });
  $('.bar-title', this).on('tap', function(){
    $('.bar-nav > .dropdown-menu')
      .addClass('open')
      .one('tap', function(){
        $(this).removeClass('open');
      });
  });
  $('.select-item', this).on('tap', function(ev){
    ev.stopPropagation();
    $('.select-item').removeClass('selected');
    $(this).addClass('selected');
    $('.bar-title > .title-name').text($(this).text());
    $('.bar-nav > .dropdown-menu').removeClass('open');
  });
  function gotPullUpData(event, data) {
    var iscrollview = data.iscrollview,
      newContent = $('#orderList > .order:lt(4)').clone();
    $('#orderList').append(newContent);
    iscrollview.refresh();
  }
  function onPullDown(){

  }
  function onPullUp(event, data) {
    setTimeout(function() {
      gotPullUpData(event, data);
    }, 1500);
  }
  $('.iscroll-wrapper', this).bind( {
    'iscroll_onpulldown': onPullDown,
    'iscroll_onpullup': onPullUp
  });
  $('.bar-nav > .dropdown-menu', this).height($(document.body).height() - $('.bar-nav').height());
});
$.fn.extend({
  fadeNav: function() {
    var originX,originY = 0;
    this.on('iscroll_onscrollstart', function(event){
      if(!$(this).is('.index-page')) {return};
      originX = event.x || event.touches[0].pageX;
      originY = event.y || event.touches[0].pageY;
    });
    this.on('iscroll_onscrollmove', function(event){
      if(!$(this).is('.index-page')) {return};
      var y = event.y || event.touches[0].pageY;
      $(this).find('.bar-nav').css({
        backgroundColor: 'rgba(255, 118, 118, '+(originY - y) / 130+')'
      });
      if(originY - y >= 0) {
        $(this).find('.bar-nav').show();
      } else {
        $(this).find('.bar-nav').hide();
      }
    }); 
    this.on('iscroll_onscrollend', function(event){
      if(!$(this).is('.index-page')) {return};
      $(this).find('.bar-nav').show();
    }); 
  }
});
$(function(){
  $.mobile.page.prototype.options.domCache = true;
});
$(document).on('pagecreate', function(event){
  $(event.target).fadeNav();
});
$(document).on('pageinit', 'div.payment-earnest-page', function(){
  $(this).imagesLoaded(function(){
    $('.iscroll-wrapper').iscrollview('refresh');
  });
});

$(document).on('pageinit', 'div.order-fill-page', function(){
  $('.period', this).not('.disabled').on('tap', function(){
    $('.period').removeClass('selected');
    $(this).addClass('selected');
  });
});

$(document).on('pageinit', 'div.personal-payment-type-page', function(){
  $('.payment-type', this).on('tap', function(){
    $('.payment-type').removeClass('checked');
    $(this).addClass('checked');
  });
});

$(document).on('pageinit', 'div.login-page', function(){
  var height = $(this).innerHeight();
  $('.ui-content', this).outerHeight(height);
});

$(document).on('pageinit', 'div.search-person-page', function(){
  $('#searchForm').on('submit', function(){
    $(':mobile-pagecontainer').pagecontainer('change', 'profession_persons.html', {
      transition: 'slide'
    });
    return false;
  });
  $('.selectbox-option', '#professions-selector').on('tap', function(){
    var txt = $(this).text();
    $('#selectedProfession').text(txt);
    $('#professions-selector').popup('close');
  });
  $('.selectbox-option', '#price-selector').on('tap', function(){
    var txt = $(this).text();
    $('#selectedPrice').text(txt);
    $('#price-selector').popup('close');
  });
});

$(document).on('pageinit', 'div.image-viewer-page', function(){
  $('#slider', this).owlCarousel({
    autoPlay: false,
    singleItem: true,
    pagination: false
  });
});

$(document).on('pageinit', 'div.video-list-page', function(){
  $(this).imagesLoaded(function(){
    $('.iscroll-wrapper').iscrollview('refresh');
  });
});

$(document).on('pageinit', 'div.profession-persons-page', function(){
  $('.personal', this).on('tap', function(){
      $(':mobile-pagecontainer').pagecontainer('change', 'recommended_personal.html', {
        transition: 'slide'
      });
  });
});

$(document).on('pageinit', 'div.coupons-page', function(){
  $('.my-nav-item', this).on('tap', function(){
    $('.my-nav-item').removeClass('nav-active');
    $(this).addClass('nav-active');
    $('.coupon-list').removeClass('current').hide();
    $('#' + $(this).data('target')).fadeIn(function() {
      $(this).addClass('current');
    });
  });
});


