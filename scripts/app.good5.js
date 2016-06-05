/*##########################################
Helper functions and Functions for when
it works differently in different browsers
##########################*/
function getPosition(el) {
  var _top = 0;
  var _left = 0;
  var _bottom = 0;
  var _right = 0;
  var rect = null;
  if(rect=el.getBoundingClientRect()){
    return rect;
  }else{
    while (el) {
      if (el.tagName == "BODY") {
        // deal with browser quirks with body/window/document and page scroll
        var xScroll = el.scrollLeft || document.documentElement.scrollLeft;
        var yScroll = el.scrollTop || document.documentElement.scrollTop;
   
        _left += (el.offsetLeft - xScroll + el.clientLeft);
        _top += (el.offsetTop - yScroll + el.clientTop);
      } else {
        // for all other non-BODY elements
        _left += (el.offsetLeft - el.scrollLeft + el.clientLeft);
        _top += (el.offsetTop - el.scrollTop + el.clientTop);
        _bottom = el.offsetHeight+_top;
        _right = el.offsetWidth+_left;
      }
      el = el.offsetParent;
    }
    return {
      top: _top,
      left: _left,
      bottom: _bottom,
      right: _right
    };
  }
  return null;
}

/*##########################################
Functions tied specifically to this page 
dependent on element name, id, class and/or 
location of elements on the page.
##########################*/
function updatePosition() {
      /*##################
      Index the elements we need
      ########################*/
      Navigator = document.querySelector("#navigator");
      TitleBar = document.querySelector("#title-bar");
      PageContainer = document.querySelector("#page-container");
      CompanyName = document.querySelector("#companyname");
      Outro = document.querySelector('#outro');


      CompanyNameRect = getPosition(CompanyName);
console.log("CompanyName.bottom: "+CompanyNameRect.bottom);
console.log("CompanyName.top: "+CompanyNameRect.top);


      NavigatorRect = getPosition(Navigator);
console.log("NavigatorRect.top: "+NavigatorRect.top);
console.log("NavigatorRect.bottom: "+NavigatorRect.bottom);
      TitleBarRect = getPosition(TitleBar)
console.log("TitleBarRect.bottom: "+TitleBarRect.bottom);
console.log("TitleBarRect.top: "+TitleBarRect.top);

      NavigatorCurPositionProp = getComputedStyle(Navigator).getPropertyValue("position");
      if(NavigatorRect.top <= CompanyNameRect.bottom && NavigatorCurPositionProp == "relative"){
console.log("Nav less than CompanyNameRect.bottom && Nav Position == Relative");
        Navigator.style.position = "fixed";
        adjustedPosition = CompanyNameRect.bottom;
        Navigator.style.top = adjustedPosition+"px";
        Navigator.style.left = "0px";
      }
      if(TitleBarRect.bottom >= NavigatorRect.top && NavigatorCurPositionProp == "fixed"){
          /*################################################
          #If the element affected here is not soley wrapped in an element that has a fixed size and 
          #maintains flow this request for layout and paint caused by the style changes could cause
          #a domino effect -- Note worthy if you need to do anything more drastic than this be careful
          ############################################*/
console.log("TitleBarRect.bottom >= NavigatorRect.top && Nav Position == fixed");
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
