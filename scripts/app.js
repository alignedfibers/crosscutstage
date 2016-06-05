/*#############
For convenience
###########*/
json = window.JSON;
function obj(){}
function addKeyVal(key, val, obj){
//requires that an object is passed in.
  obj[key] = val;
}
console.log('changes applied');
/*##########################################
Helper functions and Functions for when
it works differently in different browsers
##########################*/
  function getPosition(el) {
  //Find our more about this function here
  //https://www.kirupa.com/html5/get_element_position_using_javascript.htm
    var _top = 0;var _left = 0;var _bottom = 0;var _right = 0;var rect = null;
    if(rect=el.getBoundingClientRect()){return rect;}else{
      while(el){
        if (el.tagName == "BODY") {
          var xScroll = el.scrollLeft || document.documentElement.scrollLeft;
          var yScroll = el.scrollTop || document.documentElement.scrollTop;     
          _left += (el.offsetLeft - xScroll + el.clientLeft);
          _top += (el.offsetTop - yScroll + el.clientTop);
        }else{
          _left += (el.offsetLeft - el.scrollLeft + el.clientLeft);
          _top += (el.offsetTop - el.scrollTop + el.clientTop);
          _bottom = el.offsetHeight+_top;
          _right = el.offsetWidth+_left;
        }
        el = el.offsetParent;
      }
      return {top: _top,left: _left,bottom: _bottom,right: _right};
    }
    return null;
  }
   /*##############*/
  function getViewport() {
  //Find out more about this function here
  // http://andylangton.co.uk/articles/javascript/get-viewport-size-javascript/ 
     var viewPortWidth;
     var viewPortHeight;
     if (typeof window.innerWidth != 'undefined') {
       viewPortWidth = window.innerWidth,
       viewPortHeight = window.innerHeight
     }
     else if (typeof document.documentElement != 'undefined'
     && typeof document.documentElement.clientWidth !=
     'undefined' && document.documentElement.clientWidth != 0) {
        viewPortWidth = document.documentElement.clientWidth,
        viewPortHeight = document.documentElement.clientHeight
     }
     else {
       viewPortWidth = document.getElementsByTagName('body')[0].clientWidth,
       viewPortHeight = document.getElementsByTagName('body')[0].clientHeight
     }
     return {width:viewPortWidth, height:viewPortHeight};
  }
/*##########################################
Functions tied specifically to this page 
dependent on element name, id, class and/or 
location of elements on the page.
##########################*/
  function toggleLoginNavSibling(){
        Toggle = document.querySelector("#droptoggle").nextSibling;
        console.log(json.stringify(Toggle));
        Toggle = Toggle.nextSibling;
        console.log(json.stringify(Toggle));
        if(getComputedStyle(Toggle).getPropertyValue('visibility') === "hidden"){
          Toggle.style.visibility = "visible";
        }else{
          Toggle.style.visibility = "hidden";
        }
  }
  function updatePosition() {
        /*##################
        Index the elements we need
        ########################*/
        Navigator = document.querySelector("#navigator");
        TitleBar = document.querySelector("#title-bar");
        PageContainer = document.querySelector("#page-container");
        CompanyName = document.querySelector("#companyname");
        Outro = document.querySelector('#outro');
        OutroSpan = document.querySelector('#thankyou');
        /*##################
        Take a snap shot of indexed elements 
        cur location relative to viewport
        ########################*/
        CompanyNameRect = getPosition(CompanyName);
        NavigatorRect = getPosition(Navigator);
        TitleBarRect = getPosition(TitleBar);
        OutroRect = getPosition(Outro);
        OutroSpanRect = getPosition(OutroSpan);

        NavigatorCurPositionProp = getComputedStyle(Navigator).getPropertyValue("position");
        if(NavigatorRect.top <= CompanyNameRect.bottom && NavigatorCurPositionProp == "relative"){
          Navigator.style.position = "fixed";
          adjustedPosition = CompanyNameRect.bottom;
          Navigator.style.top = adjustedPosition+"px";
          Navigator.style.left = "0px";
          OutroHeight = OutroRect.bottom - OutroRect.top;
          OutroSpanHeight = OutroSpanRect.bottom - OutroSpanRect.top;
          OutroSpan.classList.remove('verticalTranslateDown');
          OutroSpan.classList.add('verticalTranslateUp');
          Outro.style.height = "auto";
          //Outro.style.background = "rgba(40, 87, 40, 1)";
        }
        if(TitleBarRect.bottom >= NavigatorRect.top && NavigatorCurPositionProp == "fixed"){
            /*################################################
            #If the element affected here is not soley wrapped in an element that has a fixed size and 
            #maintains flow this request for layout and paint caused by the style changes could cause
            #a domino effect -- Note worthy if you need to do anything more drastic than this be careful
            ############################################*/
            Navigator.style.position = "relative";
            Navigator.style.top = "0px";
            Navigator.style.left = "0px";
            //Outro.style.background = "transparent";
            OutroSpan.classList.remove('verticalTranslateUp'); 
            OutroSpan.classList.add('verticalTranslateDown');   
            Outro.style.height = "0px";
        }
  }
  function setBodyPaddingRelViewPort(){
       Body = document.querySelector("body");
       ViewPort = getViewport();
       Padding=(ViewPort.height*.5);
       Body.style.paddingBottom = Padding+"px";
  }

  function updateSize(){
      dealWithCSSQuirks();
      setBodyPaddingRelViewPort();
      updatePosition();
  }
  function dealWithCSSQuirks(){
    //This function sets a css custom property to change its default
    //bottom position, should run only on screen resize and load
    Root = document.body; 
    ThankYou = document.querySelector('#thankyou');
    ThankYouRect = getPosition(ThankYou);
    ThankYouHeight = ThankYouRect.bottom - ThankYouRect.top+20;
    ThankYouNewBottom = 0 - ThankYouHeight;
    ThankYouNewBottom += "px";
    ThankYou.style.setProperty('height',ThankYouHeight);
    ThankYou.style.setProperty('bottom',ThankYouNewBottom);
  };
    //    $( document ).ready(
        /*$.ajax(
                {
                        url: "https://www.crossutproperty.com/stage/getreviews.$
                        success: function(result){
                                //app.reviews = result;
                                console.log(result);
                        }
                }
        );*/ 
      //  );
/*function reqListener () {
  console.log(this.responseText);
}

var oReq = new XMLHttpRequest();
oReq.addEventListener("load", reqListener);
oReq.open("GET", "https://www.crosscutproperty.com/stage/getreviews.html");
oReq.send();*/ 

app.baseUrl = '/stage/';

(function(document) {
      'use strict';
      var app = document.querySelector('#app');
        window.addEventListener("scroll", updatePosition, false);
        window.addEventListener("resize", updateSize, false);
        /*$( document ).ready(
	$.ajax(
		{
			url: "https://www.crossutproperty.com/stage/getreviews.html", 
			success: function(result){
  		      		app.reviews = result;
				console.log(result);
            		}
		}
	)
	);*/
        app.addEventListener('dom-change', function() {
          console.log('Our app is ready to rock!');
        });
        window.addEventListener('WebComponentsReady', function() {
          // imports are loaded and elements have been registered
          app.firebaseAuth = document.querySelector('firebase-auth');
          setBodyPaddingRelViewPort();
          dealWithCSSQuirks();
          //updatePosition();
          console.log('WebComponentsReady fired');
        });
      // Sets app default base URL
      app.baseUrl = '/stage/';
      if (window.location.port === '') {  // if production// Uncomment app.baseURL below and// set app.baseURL to '/your-pathname/' if running from folder in production    
      }
      app.displayInstalledToast = function() {
        if (!Polymer.dom(document).querySelector('platinum-sw-cache').disabled) {
          Polymer.dom(document).querySelector('#caching-complete').show();
        }
      };
      /**************************************
       * Just a container that holds price requests
       * and related details to the request
       *****************/
      app.doccontainer = {
      //This will hold reference sets from various far reach lands for each doc
      //Functionality to act on segmented data as a whole will be built into
      //the objects contained withing, it is not expected to have too many
      //docs loaded at once, a doc in this case is a client, all of the 
      //properties, contacts and activities such as quote request related
      //I hope to be able to export to google docs directly  without
      //having monitor serverside and create a pdf for a paper based company
      }; 
      app.items = [];
  app.handleReviewsAJAX = function(event){
    console.log('anything');
    console.log("This is response: "+event.detail.response);
  };
      app.addItem = function(event) {
        event.preventDefault(); // Don't send the form!
        this.refUserItems.push({
          done: false,
          text: app.newItemValue
        });
        app.newItemValue = '';
      };
      
      app.toggleItem = function(event) {
        this.refUserItems.
          child(event.model.item.uid).
          update({done: event.model.item.done});
      };
      
      app.deleteItem = function(event) {
        this.refUserItems.child(event.model.item.uid).remove();
      };
      app.firebaseURL = 'https://crosscut.firebaseio.com';
      app.firebaseProvider = 'google';


      app.onFirebaseError = function(event) {
        console.log('entered on firebase error event');
        this.$.errorToast.text = event.detail.message;
        this.$.errorToast.show();
      };
      
      app.onFirebaseLogin = function(event) {
      console.log('onFirebaseLogin');
      
          app.ref = new Firebase("https://crosscut.firebaseio.com");  
          var authData = this.ref.getAuth();
          var userId = authData.uid;
          var inScope = "inscope";
          app.refUsers = this.ref.child('users');
          app.refUserId = this.ref.child('users/'+userId);
          app.refUserItems = this.ref.child('users/'+userId+'/items');
          
          app.refUserId.on('value', function (dataSnapshot) {
            if(dataSnapshot.exists()){
                      app.updateItems(dataSnapshot);
            }else{
                      app.refLoggedUser = this.refUsers.child(userId);
                      console.log('items children'+json.stringify(dataSnapshot.child(userId+'/items').val()));
                      var userObj = new obj();
                      addKeyVal('idValue', userId, userObj);
                      app.refLoggedUser.update(userObj,function(err){console.log('useridchilds '+err);});
                      console.log(json.stringify(dataSnapshot.child(userId)));
                      app.updateItems(dataSnapshot);
            }

          }, function (err) {
                      console.log('err userId/idValue.once - expected if user does not have permission to userId/child: '+err);
          });
      };

      app.openToast = function() {
        this.$.toast.open();
      };
      app.updateItems = function(snapshot) {
        console.log('in update items');
        console.log('snapshot val: '+json.stringify(snapshot.val()));
        console.log('snapshot key: '+json.stringify(snapshot.key()));
        console.log('items: '+json.stringify(app.items));
        this.items = [];
        snapshot.child('items').forEach(function(childSnapshot) {
          var item = childSnapshot.val();
          item.uid = childSnapshot.key();
          //console.log('items stringify: '+json.stringify(item));
          this.push('items', item);
          //this.push();
          //app.items.push(app.itemTemp);
          console.log('items: '+json.stringify(childSnapshot.val()));
        }.bind(this));
      };
})(document);

