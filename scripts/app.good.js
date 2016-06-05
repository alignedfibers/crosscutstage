/*
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
function getPosition(el) {
  var xPos = 0;
  var yPos = 0;
 
  while (el) {
    if (el.tagName == "BODY") {
      // deal with browser quirks with body/window/document and page scroll
      var xScroll = el.scrollLeft || document.documentElement.scrollLeft;
      var yScroll = el.scrollTop || document.documentElement.scrollTop;
 
      xPos += (el.offsetLeft - xScroll + el.clientLeft);
      yPos += (el.offsetTop - yScroll + el.clientTop);
    } else {
      // for all other non-BODY elements
      xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
      yPos += (el.offsetTop - el.scrollTop + el.clientTop);
    }
 
    el = el.offsetParent;
  }
  return {
    x: xPos,
    y: yPos
  };
}
// deal with the page getting resized or scrolled
//window.addEventListener("scroll", updatePosition, false);
//window.addEventListener("resize", updatePosition, false);

function updatePosition() {
//console.log('entered update position');
  // add your code to update the position when your browser
  // is resized or scrolled
  myElement = document.querySelector("#navigator");
  myElement2 = document.querySelector("#title-bar");
//console.log(myElement.style.position);
  position = getPosition(myElement);
  position2 = getPosition(myElement2);
//parseFloat(childel.css('height').replace(/px|rem|em/gi,''))
BeforeTitleBarHeight = parseFloat(getComputedStyle(myElement2, 'before').getPropertyValue('height').replace(/px|rem|em/gi,''));
  myHeight = parseFloat(getComputedStyle(myElement2).getPropertyValue("height").replace(/px|rem|em/gi,'')); //myElement2.style.height; //remove px from end of string first
  currentPosStyle = getComputedStyle(myElement).getPropertyValue("position");
  p2bottom = myHeight + position2.y;
console.log(position.y + ", " + position.x);
console.log("p2bottom " + p2bottom);
console.log("BeforeTitleBarHeight: "+BeforeTitleBarHeight);
  if(position.y <= 64 && currentPosStyle == "relative"){
      myElement.style.position = "fixed";
      myElement.style.top = "54px";
      myElement.style.left = "0px";
      
  }
  if(p2bottom >= 54 && currentPosStyle == "fixed"){
      myElement.style.position = "relative";
      myElement.style.top = "0px";
      myElement.style.left = "0px";      
  }
}

(function(document) {
  'use strict';

  // Grab a reference to our auto-binding template
  // and give it some initial binding values
  // Learn more about auto-binding templates at http://goo.gl/Dx1u2g
  var app = document.querySelector('#app');
  
  // Sets app default base URL
  app.baseUrl = '/stage';
  if (window.location.port === '') {  // if production
    // Uncomment app.baseURL below and
    // set app.baseURL to '/your-pathname/' if running from folder in production
    // app.baseUrl = '/polymer-starter-kit/';
  }

  app.displayInstalledToast = function() {
    // Check to make sure caching is actually enabled—it won't be in the dev environment.
    if (!Polymer.dom(document).querySelector('platinum-sw-cache').disabled) {
      Polymer.dom(document).querySelector('#caching-complete').show();
    }
  };

  // Listen for template bound event to know when bindings
  // have resolved and content has been stamped to the page
  app.addEventListener('dom-change', function() {
    console.log('Our app is ready to rock!');
  });
  //app.addEventListener("scroll", updatePosition, false);
  //app.addEventListener("resize", updatePosition, false);
  window.addEventListener("scroll", updatePosition, false);
  window.addEventListener("resize", updatePosition, false);

  // See https://github.com/Polymer/polymer/issues/1381
  window.addEventListener('WebComponentsReady', function() {
    // imports are loaded and elements have been registered
  });

  // Main area's paper-scroll-header-panel custom condensing transformation of
  // the appName in the middle-container and the bottom title in the bottom-container.
  // The appName is moved to top and shrunk on condensing. The bottom sub title
  // is shrunk to nothing on condensing.
 /* window.addEventListener('paper-header-transform', function(e) {
    var appName = Polymer.dom(document).querySelector('#mainToolbar .app-name');
    var textEl = Polymer.dom(document).querySelector('#mainToolbar .cchead-txt');
    var middleContainer = Polymer.dom(document).querySelector('#mainToolbar .middle-container');
    var bottomContainer = Polymer.dom(document).querySelector('#mainToolbar .bottom-container');
    var detail = e.detail;
    var heightDiff = detail.height - detail.condensedHeight;
    var yRatio = Math.min(1, detail.y / heightDiff);
    // appName max size when condensed. The smaller the number the smaller the condensed size.
    var maxMiddleScale = 0.70;
    var auxHeight = heightDiff - detail.y;
    var auxScale = heightDiff / (1 - maxMiddleScale);
    var scaleMiddle = Math.max(maxMiddleScale, auxHeight / auxScale + maxMiddleScale);
    var scaleBottom = 1 - yRatio;
    var newyratio = yRatio / 2;

    // Move/translate middleContainer
    Polymer.Base.transform('translate3d(0,' + newyratio * 100 + '%,0)', middleContainer);
    // Scale bottomContainer and bottom sub title to nothing and back
    Polymer.Base.transform('scale(' + scaleBottom + ') translateZ(0)', bottomContainer);

    // Scale middleContainer appName
    Polymer.Base.transform('scale(' + scaleMiddle + ') translateZ(0)', textEl);
    //Polymer.Base.transform('scale(1,' + scaleMiddle + ') translateZ(0)', appName);
  });

  // Scroll page to top and expand header
  app.scrollPageToTop = function() {
    app.$.headerPanelMain.scrollToTop(true);
  };

  app.closeDrawer = function() {
    app.$.paperDrawerPanel.closeDrawer();
  };*/

})(document);
