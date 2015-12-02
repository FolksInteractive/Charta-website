/***********************************************************
  This file belongs to Logo Carousel plugin
  and it is copyrighted to AlchemyThemes.com
  
  Version: 0.1
  Last update: 11.27.2013
  Author: AlchemyThemes
 ***********************************************************/
(function($) {
	jQuery.noConflict();
	
	/////////////////////////////////////////////
	// at_shuffle fn made to shuffle the logos //
	/////////////////////////////////////////////
	$.fn.at_shuffle = function() {
 
        var allElems = this.get(),
            getRandom = function(max) {
                return Math.floor(Math.random() * max);
            },
            shuffled = $.map(allElems, function(){
                var random = getRandom(allElems.length),
                    randEl = $(allElems[random]).clone(true)[0];
                allElems.splice(random, 1);
                return randEl;
           });
 
        this.each(function(i){
            $(this).replaceWith($(shuffled[i]));
        });
 
        return $(shuffled);
 
    };
	
	at_logoCarouselObj = function (t, opt) {
		// Default options
		this.defaults = {
			rows: 			4,
			cols:			5,
			height:			300,
			forceFullwidth: false,
			alignment:		'horizontal',
			bgColor:		'transparent',
			tbPadding:		15,
			lrPadding:		30,
			speed:			60,
			speedRandom:	15,
			verticalDir:	'up',
			horizontalDir:	'left',
			hoverStop:		false,
			hoverOpacity:	1,
			logoOpacity:	0.5
		};
		
		// Options
		this.options = $.extend(true, this.defaults, opt);
		
		// Private use variables
		this._source		= t;
		this._itemsNum 		= 0;
		this._displayW 		= 0;
		this._itemsW 		= 0;
		this._itemsH 		= 0;
		this._arrowClicked 	= false;
		
		// Initialization
		if (this._checkDataParams()) {
			if (this._setGeneralStyles()) {
				if (this._checkForceFullwidth()) {
					if (this._cloneLogos()) {
						if (this._createPlaceholder()) {
							this._setEvents();
							this._startAnimations(this.options.speed);
						}
					}
				}
			}
		}
		
		// End of initialization
    };
	
	$.extend(at_logoCarouselObj.prototype, {
		version: "0.1",
		
		_setEvents: function() {
			var _t = this;
			
			// Opacity
			_t._source.find('img').hover(function() {
				jQuery(this).css({'opacity': _t.options.hoverOpacity});
			}, function() {
				jQuery(this).css({'opacity': _t.options.logoOpacity});
			});
			
			// Call to action dismiss
			_t._source.find('.at_logo_carousel_dismiss_button').click(function(event) {
				event.preventDefault();
				_t._source.find('.at_logo_carousel_calltoaction_container').fadeOut();
			});
			
			// Hover
			if (_t.options.hoverStop) {
				_t._source.hover(
					function() {
						_t._source.find('>ul').each(function(i) {
							$(this).stop(true, false).clearQueue();
						});
					},
					function() {
						_t._restartAnimationFromHover();
					}
				);
			}
			
			// Resize
			//$(window).bind("debouncedresize", function() {
			$(window).bind('resize', function() {
				_t._source.find('>ul').each(function(i) {
					$(this).stop(true, false).clearQueue();
				});
				_t._startAnimations(_t.options.speed);
				_t._source.hover();
			});
			
		},
		
		/************************************************
		 ** _setGeneralStyles
		 ************************************************
		 ** Sets the general styling options
		 *************************************************/
		_setGeneralStyles: function() {
			var _t = this;
			
			// General styling options
			_t._source.css({
				'background-color': _t.options.bgColor
			});
				
			if (_t.options.alignment == 'horizontal') {
				/////////////////////////////////////
				// Options for HORIZONTAL carousel //
				/////////////////////////////////////
				_t._source.addClass('at_horizontal');
				_t._source.find('>ul li').css({
					'margin': _t.options.tbPadding+'px '+_t.options.lrPadding+'px'
				});
				_t._source.find('>ul li').each(function() {
					$(this).width($(this).width());
				});
			}
			else {
				///////////////////////////////////
				// Options for VERTICAL carousel //
				///////////////////////////////////
				_t._source.addClass('at_vertical');
				
				_t._source.css({
					'height': _t.options.height
				});
				_t._source.find('>ul li').css({
					'padding': _t.options.tbPadding+'px '+_t.options.lrPadding+'px'
				});
			}
			
			// Return true to continue startup
			return true;
		},
		
		/************************************************
		 ** _checkForceFullwidth
		 ************************************************
		 ** Checks if the forceFullwidth option is true
		 ** and tries to position the carousel full-width
		 *************************************************/
		_checkForceFullwidth: function() {
			var _t = this;
			
			if (_t.options.forceFullwidth == true) {
				var _left = _t._source.offset().left;
				var _leftPos = _t._source.position().left;

				var _right = _t._source.offset().right;
				var _rightPos = _t._source.position().right;
				
				var _width = _t._source.width();
				var _widthW = $(document).width();
				
				if (_left != _leftPos) {
					_t._source.css({
						'margin-left': '-'+_left+'px',
						'width': _widthW+'px'
					});
				}
				else {
					_t._source.css({
						'position': 'absolute',
						'left': '0px',
						'width': '100%'
					});
				}
				
			}
			
			// Return true to continue startup
			return true;
		},
		
		/************************************************
		 ** _createPlaceholder
		 ************************************************
		 ** Creates a placeholder element so all webpage
		 ** content moves down when the 'forceFullwidth'
		 ** makes carousel position:Absolute
		 *************************************************/
		_createPlaceholder: function() {
			var _t = this;
			var _addExtraHeight = 0;
			if (_t.options.alignment == 'horizontal') {
				_addExtraHeight = 30;
			}
			
			var _id = _t._source.attr('data-carousel-id');
			
			if (_t.options.forceFullwidth == true) {
				jQuery('<div class="at_logo_carousel_placeholder" id="at_logo_carousel_placeholder_'+_id+'"></div>').css({
					'height': _t._source.height()+_addExtraHeight
				}).insertAfter(_t._source);
			}
			
			return true;
		},
		
		/************************************************
		 ** _checkDataParams
		 ************************************************
		 ** Check for data-parameters and replace those
		 ** in the options object
		 *************************************************/
		_checkDataParams: function() {
			if (this._source.attr('data-hover-stop')) {				this.options.hoverStop 			= this._source.attr('data-hover-stop'); }
			if (this._source.attr('data-rows')) {					this.options.rows 				= this._source.attr('data-rows'); }
			if (this._source.attr('data-cols')) {					this.options.cols 				= this._source.attr('data-cols'); }
			if (this._source.attr('data-alignment')) {				this.options.alignment 			= this._source.attr('data-alignment'); }
			if (this._source.attr('data-height')) {					this.options.height 			= this._source.attr('data-height'); }
			if (this._source.attr('data-force-fullwidth')) {		this.options.forceFullwidth 	= this._source.attr('data-force-fullwidth'); }
			if (this._source.attr('data-background')) {				this.options.bgColor 			= this._source.attr('data-background'); }
			if (this._source.attr('data-topbottom-padding')) {		this.options.tbPadding 			= this._source.attr('data-topbottom-padding'); }
			if (this._source.attr('data-leftright-padding')) {		this.options.lrPadding 			= this._source.attr('data-leftright-padding'); }
			if (this._source.attr('data-speed')) {					this.options.speed 				= this._source.attr('data-speed'); }
			if (this._source.attr('data-speed-random')) {			this.options.speedRandom 		= this._source.attr('data-speed-random'); }
			if (this._source.attr('data-vertical-direction')) {		this.options.verticalDir 		= this._source.attr('data-vertical-direction'); }
			if (this._source.attr('data-horizontal-direction')) {	this.options.horizontalDir 		= this._source.attr('data-horizontal-direction'); }
			if (this._source.attr('data-hover-opacity')) {			this.options.hoverOpacity 		= this._source.attr('data-hover-opacity'); }
			if (this._source.attr('data-logo-opacity')) {			this.options.logoOpacity 		= this._source.attr('data-logo-opacity'); }

			// Return true to continue startup
			return true;
		},
		
		/************************************************
		 ** _cloneLogos
		 ************************************************
		 ** Clones the logos as many times as needed

		 *************************************************/
		_cloneLogos: function() {
			var _t = this;
			var _container = this._source;
			//var _list = _container.find('> ul');
			//var _listItems = _list.html();
			
			if (_t.options.alignment == 'horizontal') {
				/////////////////////////////////////
				// Options for HORIZONTAL carousel //
				/////////////////////////////////////
				// Duplicate the list as many times as rows needed
				var _new_list = _container.find('> ul').eq(0);
				for (var i = 1; i < _t.options.rows; i++) {
					_new_list.clone().appendTo(_container);
					_container.find('> ul').last().find('li').at_shuffle().at_shuffle();
				}
				// Now shuffle each list, and then repeat the logos
				_container.find('> ul').each(function(i) {
					var _list = $(this);
					var _listItems = _list.html()+_list.html();
					// Repeat logos until width is full
					do {
						_list.append(_listItems);
					} while (_list.width() > _container.width());
					// And now duplicate it because we need to be able to fill 2 screens with logos (for the animation)
					_list.append(_list.html());
					// resize rows to fit all logos
					var _totalWidth = 0;
					_list.find('li').each(function() {
						var _li = jQuery(this);
						//jQuery(this).width(jQuery(this).width());
						_totalWidth += (jQuery(this).width())+(_t.options.lrPadding*2);
					});
					_list.width(_totalWidth);
				
				});
				
				_t._source.css({
					'height': _t._source.height()
				});
				
			}
			else {
				///////////////////////////////////
				// Options for VERTICAL carousel //
				///////////////////////////////////
				
				// Duplicate the list as many times as rows needed
				var _new_list = _container.find('> ul').eq(0);
				for (var i = 1; i < _t.options.cols; i++) {
					_new_list.clone().appendTo(_container);
					_container.find('> ul').last().find('li').at_shuffle().at_shuffle();
				}
				
				// Now shuffle each list, and then repeat the logos
				_container.find('> ul').each(function(i) {
					
					var _list = $(this);
					var _listItems = _list.html()+_list.html();
					
					// Repeat logos until height is full
					do {
						_list.append(_listItems);
					} while (_list.height() <= _container.height());
					// And now duplicate it because we need to be able to fill 2 screens with logos (for the animation)
					_list.append(_list.html());
					
					
					
					// Give them a width so they can all be shown on screen
					_container.find('> ul').css({
						'width': (100/_t.options.cols)+'%',
						'padding': '0px 0px'
					});

				});
				
			}
			
			// Set opacity style for all logos
			_container.find('img').css({'opacity': _t.options.logoOpacity});

			return true;
		},
		
		/************************************************
		 ** _startAnimations
		 ************************************************
		 ** Starts the animations for all the rows
		 *************************************************/
		_startAnimations: function(_time) {
			var t = this;
			
			var _container = this._source;
			
			_container.find('>ul').each(function(i) {
				var random_offset = Math.floor(Math.random() * ((t.options.speedRandom*1000) - 100 + 1)) + 100;
				var thislinerandom = (_time*1000)+random_offset;
				
				$(this).attr('data-speed-timer', thislinerandom);
				
				if (t.options.alignment == 'horizontal') {
					/////////////////////////////////////
					// Options for HORIZONTAL carousel //
					/////////////////////////////////////

					if (t.options.horizontalDir == 'left') {
						//////////
						// LEFT //
						//////////
						jQuery(this).animate(
							{
								//'margin-left': -(jQuery(this).width()-jQuery(window).width())
								'margin-left': -(jQuery(this).width()-_container.width())
							}, 
							thislinerandom,
							"linear",
							function() {
								t._restartAnimation(jQuery(this), thislinerandom);
							}
						);
					}
					else {
						///////////
						// RIGHT //
						///////////
						jQuery(this).css({
							//'margin-left': -(jQuery(this).width()-jQuery(window).width())
							'margin-left': -(jQuery(this).width()-_container.width())
						}).animate(
							{
								'margin-left': 0
							}, 
							thislinerandom,
							"linear",
							function() {
								t._restartAnimation(jQuery(this), thislinerandom);
							}
						);
					}
				}
				else {
					///////////////////////////////////
					// Options for VERTICAL carousel //
					///////////////////////////////////
					
					if (t.options.verticalDir == 'up') {
						////////
						// UP //
						////////
						jQuery(this).animate(
							{
								'margin-top': -(jQuery(this).height()-t._source.height())
							}, 
							thislinerandom,
							"linear",
							function() {
								t._restartAnimation(jQuery(this), thislinerandom);
							}
						);
					}
					else {
						//////////
						// DOWN //
						//////////
						jQuery(this).css({
							'margin-top': -(jQuery(this).height()-t._source.height())
						}).animate(
							{
								'margin-top': 0
							}, 
							thislinerandom,
							"linear",
							function() {
								t._restartAnimation(jQuery(this), thislinerandom);
							}
						);
					}
					
				}
				
			});
		},
		
		/************************************************
		 ** _restartAnimationFromHover
		 ************************************************
		 ** Starts the animations again once the mouse
		 ** leaves the carousel
		 *************************************************/
		_restartAnimationFromHover: function() {
			var t = this;
			var _container = this._source;
			
			_container.find('>ul').each(function(i) {
				var thislinerandom = $(this).attr('data-speed-timer');
				
				if (t.options.alignment == 'horizontal') {
					/////////////////////////////////////
					// Options for HORIZONTAL carousel //
					/////////////////////////////////////

					if (t.options.horizontalDir == 'left') {
						//////////
						// LEFT //
						//////////
						var _startP = 0;
						var _endP = -(jQuery(this).width()-t._source.width());
						var _currP = parseInt(jQuery(this).css('margin-left').replace('px', ''), 10);
						var _speedFix = (_currP*100/_endP)/100;
						
						jQuery(this).animate(
							{
								'margin-left': -(jQuery(this).width()-_container.width())
							}, 
							parseInt(thislinerandom, 10)-(parseInt(thislinerandom, 10)*parseFloat(_speedFix, 10)),
							"linear",
							function() {
								t._restartAnimation(jQuery(this), thislinerandom);
							}
						);
					}
					else {
						///////////
						// RIGHT //
						///////////
						var _startP = -(jQuery(this).width()-_container.width());
						var _endP = 0;
						var _currP = parseInt(jQuery(this).css('margin-left').replace('px', ''), 10);
						var _speedFix = 1-(_currP/_startP);
						
						
						jQuery(this).animate(
							{
								'margin-left': 0
							}, 
							parseInt(thislinerandom, 10)-(parseInt(thislinerandom, 10)*parseFloat(_speedFix, 10)),
							"linear",
							function() {
								t._restartAnimation(jQuery(this), thislinerandom);
							}
						);
					}
				}
				
				else {
					///////////////////////////////////
					// Options for VERTICAL carousel //
					///////////////////////////////////
					
					if (t.options.verticalDir == 'up') {
						////////
						// UP //
						////////
						var _startP = 0;
						var _endP = -(jQuery(this).height()-t._source.height());
						var _currP = parseInt(jQuery(this).css('margin-top').replace('px', ''), 10);
						var _speedFix = (_currP*100/_endP)/100;
						
						jQuery(this).animate(
							{
								'margin-top': -(jQuery(this).height()-t._source.height())
							}, 
							parseInt(thislinerandom, 10)-(parseInt(thislinerandom, 10)*parseFloat(_speedFix, 10)),
							"linear",
							function() {
								t._restartAnimation(jQuery(this), thislinerandom);
							}
						);
					}
					else {
						//////////
						// DOWN //
						//////////
						var _startP = -(jQuery(this).height()-_container.height());
						var _endP = 0;
						var _currP = parseInt(jQuery(this).css('margin-top').replace('px', ''), 10);
						var _speedFix = 1-(_currP/_startP);
						
						jQuery(this).animate(
							{
								'margin-top': 0
							}, 
							parseInt(thislinerandom, 10)-(parseInt(thislinerandom, 10)*parseFloat(_speedFix, 10)),
							"linear",
							function() {
								t._restartAnimation(jQuery(this), thislinerandom);
							}
						);
					}
					
				}
				
			});
			
		},
		
		/************************************************
		 ** _restartAnimation
		 ************************************************
		 ** Starts the animations again once the whole
		 ** set of logos finished their animation
		 *************************************************/
		_restartAnimation: function(_list, _time) {
			var t = this;
			
			// We save the original height or width of the list, so we can generate an index for the animation speed
			if (t.options.alignment == 'horizontal') { var _originalSize = _list.width(); }
			else { var _originalSize = _list.height(); }
			
			// Get the items to delete
			if ((t.options.alignment != 'horizontal') && (t.options.verticalDir != 'up')) {
				var _itemsToDelete = _list.find('li').slice((_list.find('li').length/2)-1);
			}
			else if ((t.options.alignment == 'horizontal') && (t.options.horizontalDir != 'left')) {
				var _itemsToDelete = _list.find('li').slice((_list.find('li').length/2)-1);
			}
			else {
				var _itemsToDelete = _list.find('li').slice(0, (_list.find('li').length/2)-1);
			}
			
			// Create a new html string with the items to delete, so we can add them in the new position
			var _htmlToAdd = '';
			_itemsToDelete.each(function() {
				_htmlToAdd += jQuery(this)[0].outerHTML;
				jQuery(this).remove();
			});
			
			// Lets generate the speed coeficient with the original and the new sizes
			var _speedFix = 2;
			if (t.options.alignment == 'horizontal') { _speedFix = _originalSize / _list.width(); }
			else { _speedFix = _originalSize / _list.height(); }
			
			if (t.options.alignment == 'horizontal') {
				/////////////////////////////////////
				// Options for HORIZONTAL carousel //
				/////////////////////////////////////
				if (t.options.horizontalDir == 'left') {
					//////////
					// LEFT //
					//////////
					var _newWidth = 0;
					_list.find('li').each(function() {
						var _li = jQuery(this);
						_newWidth += (jQuery(this).width())+(t.options.lrPadding*2);
					});
					
					
					_list.css({
						//'margin-left': -(_newWidth-jQuery(window).width())
						'margin-left': -(_newWidth-t._source.width())
					});
					
					_list.append(_htmlToAdd);
		
					_list.animate(
						{
							//'margin-left': -(_list.width()-jQuery(window).width())
							'margin-left': -(_list.width()-t._source.width())
						},
						(_time/_speedFix),
						"linear",
						function() {
							t._restartAnimation(jQuery(this), _time);
						}
					);
					
				}
				else {
					///////////
					// RIGHT //
					///////////
					var _newWidth = 0;
					_list.find('li').each(function() {
						var _li = jQuery(this);
						_newWidth += (jQuery(this).width())+(t.options.lrPadding*2);
					});
					
					_list.prepend(_htmlToAdd);
					var _evenNewerWidth = _list.width();
					
					_list.css({
						'margin-left': -(_evenNewerWidth-_newWidth)
					});
		
					_list.animate(
						{
							'margin-left': 0
						},
						(_time/_speedFix),
						"linear",
						function() {
							t._restartAnimation(jQuery(this), _time);
						}
					);
					
				}
				
			}
			else {
				///////////////////////////////////
				// Options for VERTICAL carousel //
				///////////////////////////////////
				if (t.options.verticalDir == 'up') {
					////////
					// UP //
					////////
					var _newHeight = 0;
					_list.find('li').each(function() {
						var _li = jQuery(this);
						_newHeight += (jQuery(this).height())+(t.options.tbPadding*2);
					});
					
					_list.css({
						'margin-top': -(_newHeight-t._source.height())
					});
					
					_list.append(_htmlToAdd);
		
					_list.animate(
						{
							'margin-top': -(_list.height()-t._source.height())
						},
						(_time/_speedFix),
						"linear",
						function() {
							t._restartAnimation(jQuery(this), _time);
						}
					);
				}
				else {
					//////////
					// DOWN //
					//////////
					var _newHeight = 0;
					_list.find('li').each(function() {
						var _li = jQuery(this);
						_newHeight += (jQuery(this).height())+(t.options.tbPadding*2);
					});
					
					_list.prepend(_htmlToAdd);
					var _evenNewerHeight = _list.height();
					
					_list.css({
						'margin-top': -(_evenNewerHeight-_newHeight)
					});
		
					_list.animate(
						{
							'margin-top': 0
						},
						(_time/_speedFix),
						"linear",
						function() {
							t._restartAnimation(jQuery(this), _time);
						}
					);
				}
				
			}
			
			// Opacity
			t._source.find('img').hover(function() {
				jQuery(this).css({'opacity': t.options.hoverOpacity});
			}, function() {
				jQuery(this).css({'opacity': t.options.logoOpacity});
			});

		}
		
	});
	

	$.fn.logoCarousel = function(opt) {
		$(this).each(function() {
			return new at_logoCarouselObj($(this), opt);
		});
	};
	
		
})(jQuery);