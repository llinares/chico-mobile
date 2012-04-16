/*
* Chico Mobile 0.4.2 MIT Licence
* @autor <chico@mercadolibre.com>
* @link http://www.chico-ui.com.ar
* @team Hernan Mammana, Leandro Linares, Guillermo Paz, Natalia Devalle, Nicolas Brizuela
*/

/*--
	CHICO OBJECT
----------------------------*/
;(function (exports, undefined) {

	var ch = (function () {

		var core = {
			"version": "0.4.2"		
		};

		return core;

	})();

	exports.ch = ch;

})(window);

ch.mobile = ( function () {

	//Private methods
	var menu = function (ele, exclude) {
		$(ele).bind("click", function (event) {
			event.preventDefault();
			event.stopPropagation();
			
			// Get some elements
			var $element = $(this),
				child = this.firstChild,
				tabId = "#" + child.href.split("#")[1];

			// Toogle behaivor
			if (!$element.hasClass("ch-selected")) {
				// Show
				$element.addClass("ch-selected");
				$(tabId).removeClass("ch-hide");
				
				// Search focus
				if ($element.hasClass("ch-search")) {
					$(tabId).find("input[type=search]").focus();
				}

				// Hide
				$element.siblings().removeClass("ch-selected");
				//$(tabId).siblings().addClass("ch-hide");

			} else {
				$element.removeClass("ch-selected");
				$(tabId).addClass("ch-hide");
			}
		});
	},

	expando = function (ele, toShow) {

		// If the url have a hash with some element in the expando
		if(location.hash){
			var $anchorInit = $(".ch-expando "+location.hash),
				$toShow = $anchorInit.parent().next();
			
			$toShow.load($anchorInit.attr("href")).removeClass("ch-hide");
			$anchorInit.parent().addClass("ch-selected ch-icon-chevron-up");

		}

		$(ele).bind("click", function (event) {
			event.preventDefault();

			var $toShow = toShow || $(this).next(),
				$anchor = $(this).find("a");

			if ( $toShow.hasClass("ch-hide") ){

				// Is an anchor and the url don't loaded
				if($anchor.length > 0 && location.hash != "#" + $anchor.attr("id")) {
					// Request ajax
					var url = $anchor.attr("href");
					$toShow.load(url)
					//Change location hash
	            	var hash = window.location.hash = "#" + $anchor.attr("id");
				}

				$toShow.removeClass("ch-hide");
				$(this).addClass("ch-selected ch-icon-chevron-up").removeClass("ch-icon-chevron-down");

			}else {
				$(this).removeClass("ch-selected ch-icon-chevron-up").addClass("ch-icon-chevron-down");
				$toShow.addClass("ch-hide");
			}
		} );
	},
	
	agentCompatible = (function(){
		
		// Fix for Android 2.1
		var css = $("<link>").attr({
			"href": "src/css/chico-mobile-compatible.css?v5",
			"rel": "stylesheet"
		}),
			os = MBP.ua.split(";");

		// Font face detection for Android
		if (os[2] == " Android 2.1" || os[2] == " Android 2.1-update1"){		
			$("html").addClass("ch-no-fontface");
			$("head").append(css);
		}

	})(),

	hash = (function (){

	    var arr = {},
	        last = null;

	    var push = function (key, show, hide) {
	      arr[key] = {
	        show: show,
	        hide: hide
	      };
	    },

	    init = function () {
	    
	      var hash = location.hash; 
	    
	      if(arr[hash]){
	        arr[hash].show();
	        last = arr[hash];
	      };

	      if(hash == ""){
	        try {
	          last.hide();  
	        }catch(err){
	          //Some
	        }
	      }

	    },

	    onHashChange = function(event) {
			//get hash function
			var getHashValue = function() {
				var arr = window.location.hash.split("#");
				var hasValue = arr[1];
				//sets default
				if (typeof hasValue == "undefined") {
					return false;
				}

				var hashLen = hasValue.indexOf("?");
				if(hashLen>0){
					hasValue = hasValue.substring(0,hashLen);
				}
				return hasValue;
			}

			//last hash
			var lastHash = getHashValue();

			//checker
			(function watchHash() {
				var hash = getHashValue();

				if (hash !== lastHash) {
					event();
					lastHash = hash;
				}
				
				var t = setTimeout(watchHash, 100);

			})();
		};

		onHashChange(init);

	    //window.onhashchange = init;

	    var Core = {

	      init : init,
	      push : push,
	      arr : arr

	    };

	    return Core;

	})(),
	
	modal = function (trigger, content, fn) {
		// Get some elements
		var $trigger = $(trigger),
			$content = $(content).addClass("ch-modal-content"),
			$view = $("<div>")
				.addClass("ch-modal ch-hide"),
			$index = $("div[data-page=index]"),
			lastScroll;

		// Functions
		var show = function (trigger) {

			// Callbacks on Show
			if (fn) {
				fn.call(trigger);
			}

			// Save last scroll position
			lastScroll = window.pageYOffset;

			// Toogle classes to show and hide
			$index.addClass("ch-hide");
			$view.removeClass("ch-hide");

			// Set scroll to top
			window.scrollTo(0, 1);  

		};
		
		var hide = function () {

			// Toogle classes to show and hide
			$index.removeClass("ch-hide");
			$view.addClass("ch-hide");

			// Update scroll position
			window.scrollTo(0, lastScroll);
      
		}

		// Creates close button and add behaivor
		var $close = $("<a class=\"ch-btn-action ch-btn-small\" data-action=\"close\">Cancelar</a>").bind("click", function(){window.location.hash = "";});
		
    	// Instancing hash navigation
    	hash.push("#!"+$content.attr("id"), show, hide);
   
		$content
			.removeClass("ch-hide")
			.wrapAll($view);
		
		$view.find(".ch-header-action nav").append($close);

		// If you creates some DOM elements by ajax... live works!
		$trigger.live("click", function (event) {
			event.preventDefault();
			event.stopPropagation();
			//show(this);
			var url = window.location.hash = "#!" + $content.attr("id");
		});

	};

	// Public methods
	var Core = {
		menu: menu,
		expando: expando,
		modal: modal
	}

	return Core;

})();