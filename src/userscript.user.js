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
  var BGn = '#36465d';
  var BGh  = '#3c4b61';
  var H = '56px';
  // varriable define for LINE COMPACTION ...
  var pc = 'li[class="post_container"]';
  var is_mine = 'div[class*="is_mine"]';
  var is_you  = 'div[data-json*=\'"is_you":true\']';
  var post_c  = 'div[class*="post_content"]';
  var post_f  = 'div[class*="post_footer"]';
  // ... end
  var cssList = [
      [ pc+' > '+is_mine,            'background-color: '+BGn+' !important; height: '+H+' !important;' ],
      [ pc+':hover > '+is_mine,      'background-color: '+BGh+' !important; height: '+H+' !important;' ],
      [ pc+' > '+is_mine+' '+post_c, 'display: none;' ],
      [ pc+' > '+is_mine+' '+post_f, 'display: none;' ],
      [ pc+' > '+is_you,             'background-color: '+BGn+' !important; height: '+H+' !important;' ],
      [ pc+':hover > '+is_you,       'background-color: '+BGh+' !important; height: '+H+' !important;' ],
      [ pc+' > '+is_you+' '+post_c,  'display: none;' ],
      [ pc+' > '+is_you+' '+post_f,  'display: none;' ]
    ];
  for (var i = 0, css; css = cssList[i]; i++) {
    addStyleRule(css[0], css[1]);
  }
})();
