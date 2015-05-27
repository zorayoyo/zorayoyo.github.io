document.addEventListener('touchmove', function(e){ e.preventDefault() })

function $(selector) { return document.querySelector(selector) }
function $$(selector) { return document.querySelectorAll(selector) }

var pages = {};

new PreLoad($('#progress'), [
  'avatar.jpg',
  'birth.png',
  'experience.png',
  'zora-bg.png',
  'zora-logo.png',
  'xiayuhe.jpg',
  'sex.png',
  'qrcode.png',
  'secret.jpg'
], {
  prefix: '../images/',
  complete: function(){
    // var $loader = $('#loader');
    var $pages = $('.container');
    // var $page3s = $$('.page-job');

    $pages.classList.remove('d-n');
    pages = new PageSlide($pages, 'Y');
  }
}).load();
