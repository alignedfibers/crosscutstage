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


function updatePosition() {
      /*##################
      Index the elements we need
      ########################*/
      Navigator = document.querySelector("#navigator");
      TitleBar = document.querySelector("#title-bar");
      PageContainer = document.querySelector("#page-container");
      testEl = document.querySelector("#campdone");
      myRec = testEl.getBoundingClientRect();
console.log("myRec bottom: "+myRec.bottom);
console.log("myRec right: "+myRec.right);

      BeforeTitleBarHeight = parseFloat(getComputedStyle(TitleBar, "before").getPropertyValue('height').replace(/px|rem|em/gi,''));
console.log("BeforeTitleBarHeight: "+BeforeTitleBarHeight);
      BeforeTitleBarTop = parseFloat(getComputedStyle(TitleBar, 'before').getPropertyValue('top').replace(/px|rem|em/gi,''));
console.log("BeforeTitleBarTop: "+BeforeTitleBarTop);
      BeforeTitleBarLeft = parseFloat(getComputedStyle(TitleBar, 'before').getPropertyValue('left').replace(/px|rem|em/gi,'')); 
console.log("BeforeTitleBarLeft: "+BeforeTitleBarLeft);
      BeforeTitleBarBottomBumper = BeforeTitleBarTop + BeforeTitleBarHeight;
console.log("BeforeTitleBarBottomBumper: "+BeforeTitleBarBottomBumper);



      TitleBarHeight = parseFloat(getComputedStyle(TitleBar).getPropertyValue("height").replace(/px|rem|em/gi,'')); 
      TitleBarCooridinates = getPosition(TitleBar);
      TitleBarBottomBumper = TitleBarHeight + TitleBarCooridinates.y;

console.log("BeforeTitleBarBottomBumper: "+BeforeTitleBarBottomBumper);
console.log("TitleBarBottomBumper: "+TitleBarBottomBumper);
      NavigatorCoordinates = getPosition(Navigator);
      TitleBarCooridinates = getPosition(TitleBar);
console.log("NavigatorCoordinates.y: "+NavigatorCoordinates.y);
      NavigatorCurPositionProp = getComputedStyle(Navigator).getPropertyValue("position");
      if(NavigatorCoordinates.y <= 54 && NavigatorCurPositionProp == "relative"){
console.log("Nav less than beforetitlebottombumper && Nav Position == Relative");
        Navigator.style.position = "fixed";
        adjustedPosition = 55;
        Navigator.style.top = adjustedPosition+"px";
        Navigator.style.left = "0px";
      }
      if(TitleBarBottomBumper >= 54 && NavigatorCurPositionProp == "fixed"){
          /*################################################
          #If the element affected here is not soley wrapped in an element that has a fixed size and 
          #maintains flow this request for layout and paint caused by the style changes could cause
          #a domino effect -- Note worthy if you need to do anything more drastic than this be careful
          ############################################*/
console.log("titlebarbottombumper >= NavigatorCoordinates.y && Nav Position == fixed");
          Navigator.style.position = "relative";
          Navigator.style.top = "0px";
          Navigator.style.left = "0px";      
      }
}

(function(document) {
      'use strict';
      /*#######################################################
      Grab a reference to our auto-binding template
      and give it some initial binding values
      Learn more about auto-binding templates at http://goo.gl/Dx1u2g
      #############################################*/
      var app = document.querySelector('#app');
      
      // Sets app default base URL
      app.baseUrl = '/';
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
      window.addEventListener("scroll", updatePosition, false);
      window.addEventListener("resize", updatePosition, false);

      // See https://github.com/Polymer/polymer/issues/1381
      window.addEventListener('WebComponentsReady', function() {
        // imports are loaded and elements have been registered
      });
      /*******************
        PSK had additional script here.
        Reference the original project.
      ***************/
})(document);
