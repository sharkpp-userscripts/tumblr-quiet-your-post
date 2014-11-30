// ==UserScript==
// @name        Tumblr. quiet your post
// @namespace   http://www.sharkpp.net/
// @version     0.1
// @description  Quiet the post with 'is_mine' or 'is_you' tag for tumblr dashboard
// @author      sharkpp
// @copyright   2014, sharkpp
// @license     MIT License
// @include     https://www.tumblr.com/dashboard*
// ==/UserScript==
(function () {
  // from http://ash.jp/web/css/js_style.htm
  var addStyleRule = function(selector, declaration) {
      var isMSIE = /*@cc_on!@*/false;
      var sheet;
      if (document.styleSheets.length) {
        sheet = document.styleSheets[document.styleSheets.length - 1];
      } else {  // StyleSheetがない場合、StyleSheetを作成
        if (isMSIE) {  // for IE8, Sleipnir
          sheet = document.createStyleSheet();
        } else {  // for FireFox, Opera, Safari, Crome
          var head = document.getElementsByTagName('head')[0];
          if (head === null) { return; }
          var style = document.createElement('style');
          head.appendChild(style);
          sheet = style.sheet;
        }
      }
      if (isMSIE) {  // for IE8, Sleipnir
        sheet.addRule(selector, declaration);
      } else {  // for FireFox, Opera, Safari, Crome
        sheet.insertRule(selector + '{' + declaration + '}', sheet.cssRules.length);
      }
  };
  // apply custom style sheet
  var normalBG = '#36465d';
  var hoverBG  = '#3c4b61';
  var containerHeight  = '56px';
  var cssList = [
      [ 'li[class="post_container"] > div[class*="is_mine"]',
              'background-color: '+normalBG+' !important; height: '+containerHeight+' !important;' ],
      [ 'li[class="post_container"]:hover > div[class*="is_mine"]',
              'background-color: '+hoverBG+' !important; height: '+containerHeight+' !important;' ],
      [ 'li[class="post_container"] > div[data-json*=\'"is_you":true\']',
              'background-color: '+normalBG+' !important; height: '+containerHeight+' !important;' ],
      [ 'li[class="post_container"]:hover > div[data-json*=\'"is_you":true\']',
              'background-color: '+hoverBG+'!important; height: '+containerHeight+' !important;' ],
      [ 'li[class="post_container"] > div[class*="is_mine"] div[class*="post_content"]',
              'display: none;' ],
      [ 'li[class="post_container"] > div[class*="is_mine"] div[class*="post_footer"]',
              'display: none;' ],
      [ 'li[class="post_container"] > div[data-json*=\'"is_you":true\'] div[class*="post_content"]',
              'display: none;' ],
      [ 'li[class="post_container"] > div[data-json*=\'"is_you":true\'] div[class*="post_footer"] ',
              'display: none;' ]
    ];
  for (var i = 0, css; css = cssList[i]; i++) {
    addStyleRule(css[0], css[1]);
  }
})();
