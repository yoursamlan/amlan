// Window size
$(function() {
  var zIndex = 1;

  var fullHeight = $(window).height(),
      fullWidth  = $(window).width();
 
  
  $(window).resize(function() {
    fullHeight = $(window).height();
    fullWidth = $(window).width();
});

// Settings
	
	$('.status').click(function() {
    $(this).toggleClass('checked');
		if ($(this).hasClass('sAnimateAppsIconOnOpen')) {
			if ($(this).hasClass('sAnimateAppsIconOnOpen') & $(this).hasClass('checked')) {
				$('.taskbar__item').addClass('animateOnOpen');
			} else {
				$('.taskbar__item').removeClass('animateOnOpen');
			}
		}
		if ($(this).hasClass('sHideTaskbarOnInactivity'))  {
			if ($(this).hasClass('sHideTaskbarOnInactivity') & $(this).hasClass('checked')) {
				$('.taskbar').addClass('hideOnInactivity');
			} else {
				$('.taskbar').removeClass('hideOnInactivity');
			}
		}
		if ($(this).hasClass('sEnergySaver'))  {
			if ($(this).hasClass('sEnergySaver') & $(this).hasClass('checked')) {
				$('.powerIcon').parent().addClass('eco');
			} else {
				$('.powerIcon').parent().removeClass('eco');
			}
		}
  });
	
// Taskbar
	
	function startMenuToggle() {
		$('.startmenu').toggleClass('open');
		if (!$('.startmenu').hasClass('open')) {
			setTimeout(function() {
        $('.startmenuSearch').val('');
				$('.app').removeClass('noMatch');
				$('.sep').removeClass('noMatch');
      }, 100);
		} else {
			$('.startmenuSearch').focus();
		}
	}
	function startMenuClose() {
		$('.startmenu').removeClass('open');
		setTimeout(function() {
			$('.startmenuSearch').val('');
			$('.app').removeClass('noMatch');
			$('.sep').removeClass('noMatch');
			//$('.startmenuAppList').scrollTo(0,0);
		}, 100);
	}
	
	$('.openAppsMenu').click(function() {
		startMenuToggle();
	});
	$(document).keydown(function(e) {
		if (e.keyCode === 27) { // 27 == ESC
			startMenuToggle();
		}
	});
	
	$('.desktop').click(function() {
		startMenuClose();
		$('.section').removeClass('active');
		$('.sectionContent').removeClass('active');
	});
	
	$('.section').click(function() {
    var sectionId = $(this).attr('data-section');
		if($(this).hasClass('active')) {
			$(this).removeClass('active');
			$("#" + sectionId).removeClass('active');
		} else {
			$('.section').removeClass('active');
			$('.sectionContent').removeClass('active');
			$(this).addClass('active');
			$("#" + sectionId).addClass('active');
		}
  });
	
	$('.toggleDiary').click(function() {
		if($(this).hasClass('open')) {
			$(this).removeClass('open');
			$('.diary').removeClass('open');
		} else {
			$(this).addClass('open');
			$('.diary').addClass('open');
		}
  });
	
	$('[data-search]').on('keyup', function() {
		var searchVal = $(this).val();
		var filterItems = $('[data-filter-item], .sep');

		if ( searchVal != '' ) {
			filterItems.addClass('noMatch');
			$('[data-filter-item][data-filters*="' + searchVal.toLowerCase() + '"]').removeClass('noMatch');
		} else {
			filterItems.removeClass('noMatch');
		}
	});
	
	$('.session').click(function() {
		$('.systemLockInput').val('');
		$('.startmenu').removeClass('open');
		$('.lockScreen').addClass('locked');
		$('.systemLockInput').focus();
	});
	$('.enter').click(function() {
		$('.lockScreen').removeClass('locked');
	});
	$('.systemLockInput').keydown(function(e) {
		if (e.keyCode === 13 || e.which == 13) {
			$('.lockScreen').removeClass('locked');
		}
	});

	// Notifications system

	$('.notificationItem').draggable({
		axis: "x",
		scroll: false,
		containment: [ fullWidth - 400 , 0, fullWidth, 0],
		start: function() {
			$(this).css({'transition' : 'none'});
    },
		drag : function() {
			let d = ( 360 - $(this).position().left ) / 360;
			$(this).css({'opacity' : d});
		},
    stop: function() {
			let left = $(this).position().left;
			if (left > 200) {
				$(this).addClass('close');
				if ($('.notificationItem.close').length == $('.notificationItem').length) {
					$('.hasNotifications').addClass('false');
					$('.notificationsPanel').addClass('empty');
				} else {
					$('.notificationsPanel').removeClass('empty');
				}
			} else {
				$(this).css({ 'left' : 0 , 'transition' : 'all .15s cubic-bezier(.63,.92,.68,.98)', 'opacity' : 1});
			}
    }
  });
	
	// Notifications widgets
	
	
	
	// Right Click

	$(document).bind("contextmenu", function(event) {
		event.preventDefault();
		$(".context").fadeIn(50).css({top: event.pageY + 0, left: event.pageX + 0});
		let y = Math.floor( $(".context").position().top * -1 );
		let x = Math.floor( $(".context").position().left * -1 );
		$(".context .background").css({top: y, left: x });
	});

	$(document).click(function() {
		isHovered = $(".context").is(":hover");
		if (isHovered == true) {
			$(".context_item").click(function() {
				$(".context").fadeOut(50);
			});
		} else {
			$(".context").fadeOut(50);
		}
	});

	// Window & Taskbar actions
	
  $(function() {
    $('.window:visible').each(function() {
      var appName = $(this).data('window');
      
      $('.taskbar__item[data-window="' + appName + '"]').addClass('taskbar__item--open');
    });
  });
  
  $(function() {
    var initialActive = $('.window').first();
    var appName = $(initialActive).data('window');
    
   $(initialActive).addClass('window--active').css({'z-index' : zIndex++});
   $('.taskbar__item[data-window="' + appName + '"]').addClass('taskbar__item--active');
  });

  
  $('.window').click(function() {
    $('.window').removeClass('window--active');
    
		var appName = $(this).data('window');
		var targetWindow = $('.window[data-window="' + appName + '"]');
		$('.currentAppName').text(appName);
		
    $(this).addClass('window--active');
    $(this).css({'z-index' : zIndex++});
		$('.taskbar__item[data-window]').removeClass('taskbar__item--active');
		$('.taskbar__item[data-window="' + appName + '"]').addClass('taskbar__item--active');
  });
  
  $('.window').resizable({
    stop: function() {
     var initialHeight = $(this).height(),
     initialWidth = $(this).width(),
     initialTop = $(this).position().top,
     initialLeft = $(this).position().left; }
   });

  $('.window').draggable({
		containment: "parent",
    handle: '.window__handler',
    stop: function() {
    var initialHeight = $(this).height(),
        initialWidth = $(this).width(),
        initialTop = $(this).position().top,
        initialLeft = $(this).position().left;
      /*if($(this).position().top < 24) {
        $(this).css({'top' : 24});
      }
      if($(this).position().top > window.innerHeight - 28) {
        $(this).css({'top' : window.innerHeight - 28});
      }
      if($(this).position().left < 0) {
        $(this).css({'left' : 0});
      }
      if(($(this).position().left + $(this).width()) > window.innerWidth) {
        $(this).css({'left' : window.innerWidth - $(this).width()});
      }*/
    },
    start: function(event, ui) {
      $('.window').removeClass('window--active');
      
      $(this).addClass('window--active');
      $(this).css({ 'z-index' : zIndex++ }); 
    }
  });
      if ( $(this).hasClass('window--maximized') ) {
        $(this).removeClass('window--maximized');
        
        $(this).css({ 'height' : initialHeight,
                      'width'  : initialWidth,
                      'top'    : 0,
                      'left'   : 50 });
     }

  function openApp(e) {
    var appName = $(this).data('window');
    var targetWindow = $('.window[data-window="' + appName + '"]');
    var targetTaskbar = $('.taskbar__item[data-window="' + appName + '"]');
    
    e.preventDefault();
    $('.taskbar__item').removeClass('taskbar__item--active');
    
    if ( targetWindow.is(':visible') ) {
      if ( targetWindow.hasClass('window--active') ) {
        $(targetWindow).toggleClass('window--minimized');

        if ( !targetWindow.hasClass('window--minimized') ) {
          var initialHeight = $(targetWindow).height(),
               initialWidth = $(targetWindow).width(),
               initialTop = $(targetWindow).position().top,
               initialLeft = $(targetWindow).position().left;
          
          $('.window').removeClass('window--active');

         $(targetWindow).addClass('window--active').css({ 
            'z-index' : zIndex++
          });
          
          $(targetTaskbar).addClass('taskbar__item--active');
        }
      } else {
        $('.window').removeClass('window--active');
        $(targetWindow).addClass('window--active').css({'z-index' : zIndex++});
        if ( targetWindow.hasClass('window--minimized') ) {
					$(targetWindow).removeClass('window--minimized');
				}
        $(targetTaskbar).addClass('taskbar__item--active');
      }
    } else {
      $('.window').removeClass('window--active');
      
      $('.window[data-window="' + appName + '"]').fadeIn().addClass('window--active').css({ 'z-index' : zIndex++ });
      
      setTimeout(function() {
        $('.window[data-window="' + appName + '"]').removeClass('window--opening');
      }, 0);
      
      $(targetTaskbar).addClass('taskbar__item--active').addClass('taskbar__item--open');
    } 
  }
  
  $('.taskbar__item').click(openApp);
	
	function startMenuOpenApp(e) {
    var appName = $(this).data('window');
    var targetWindow = $('.window[data-window="' + appName + '"]');
    var targetTaskbar = $('.taskbar__item[data-window="' + appName + '"]');
		
		startMenuClose(); // Closes start menu when app is clicked
    
    e.preventDefault();
    $('.taskbar__item').removeClass('taskbar__item--active');
    
    if ( targetWindow.is(':visible') ) {
      if ( targetWindow.hasClass('window--active') ) {
        $(targetWindow).removeClass('window--minimized');

        if ( !targetWindow.hasClass('window--minimized') ) {
          var initialHeight = $(targetWindow).height(),
               initialWidth = $(targetWindow).width(),
               initialTop = $(targetWindow).position().top,
               initialLeft = $(targetWindow).position().left;
          
					$('.window').removeClass('window--active');

					$(targetWindow).addClass('window--active').css({ 
							'z-index' : zIndex++
					});
          
          $(targetTaskbar).addClass('taskbar__item--active');
        }
      } else {
        $('.window').removeClass('window--active');
        $(targetWindow).addClass('window--active').css({'z-index' : zIndex++});
        if ( targetWindow.hasClass('window--minimized') ) {
					$(targetWindow).removeClass('window--minimized');
				}
        $(targetTaskbar).addClass('taskbar__item--active');
      }
    } else {
      $('.window').removeClass('window--active');
      
      $('.window[data-window="' + appName + '"]').fadeIn().addClass('window--active').css({ 'z-index' : zIndex++ });
      
      setTimeout(function() {
        $('.window[data-window="' + appName + '"]').removeClass('window--opening');
      }, 0);
      
      $(targetTaskbar).addClass('taskbar__item--active').addClass('taskbar__item--open');
    } 
  }
	
	$('.app').click(startMenuOpenApp);
  
// Window controls  
  
  $('.window__controls').each(function() {
    var parentWindow = $(this).closest('.window'); 
		var appName = $(parentWindow).data('window');
    
    $(this).find('a').click(function(e) {
      e.preventDefault();
    });
    
    $(this).find('.window__close').click(function(e) {
      $(parentWindow).addClass('window--closing');
      
      setTimeout(function() {
        $(parentWindow).hide().removeClass('window--closing').addClass('window--opening');
      }, 1000);
      
      setTimeout(function() {
        $('.taskbar__item[data-window="' + appName + '"]').removeClass('taskbar__item--open taskbar__item--active');
      }, 1);
    });
    
    $(this).find('.window__minimize').click(function(e) {
      $(parentWindow).addClass('window--minimized');
      //$(parentWindow).css({'left' : window.innerWidth/2 - $(parentWindow).width()/2 });
			setTimeout(function() {
        $('.taskbar__item[data-window="' + appName + '"]').removeClass('taskbar__item--active');
      }, 1);
    });
    
    $(this).find('.window__maximize').click(function(e) {

      $(parentWindow).toggleClass('window--maximized');

      if ( !$(parentWindow).hasClass('window--maximized') ) {
        $(parentWindow).css({ 'height' : initialHeight,
                              'width'  : initialWidth,
                              'top'    : initialTop,
                              'left'   : initialLeft});
      } else {
        initialHeight = $(parentWindow).height();
        initialWidth = $(parentWindow).width();
        initialTop = $(parentWindow).position().top;
        initialLeft = $(parentWindow).position().left;

        $(parentWindow).css({ 'height' : fullHeight,
                              'width'  : fullWidth,
                              'top'    : 0,
                              'left'   : 0 });
      }
    });
  });
});


// Unfocus windows when desktop is clicked
$('.desktop').click(function(e) {
  if ( $('.desktop').has(e.target).length === 0 ) {
  $('.window').removeClass('window--active');
  }
});

// Prevent "open" class on start
/*$(function() {
  $('.taskbar__item--start').click(function() {
    $(this).removeClass('taskbar__item--open taskbar__item--active');
  });
});*/


/* CONSOLE */ 

// Define room level

var lvl = 1;

// Focus
// $('.console-input').focus();

// Output to Console
function output(print) {
  var cmd = $('.console-input').val();
  if(cmd==""){cmd="<span>null</span>";}
  $("#outputs").append("<span class='output-cmd'>" + cmd + "</span>");

  $.each(print, function(index, value) {
    cmd = " >";
    if (value == "") {
      value = "&nbsp;";
      cmd = "&nbsp;";
    }
    $("#outputs").append("<span class='output-text'>" + value + "</span>");
  });
  
  $('.console-input').val("");
  //$('.console-input').focus();
  $('.anim').animate({
    scrollTop: $('#outputs').height()
  }, 500);
}

// Break Value
var newLine = "<br/> &nbsp;";

// User Commands

var helpInfo = {
  "/connect":0,
  "/download":0,
  "/extract":0
};

var cmds = {
  
  "": function() {
  },
  
  "/reload": function() {
    window.location.replace(location.href);
  },
  
  "/rl": function(a) {
    output([lvl]);
  },

  "/clear": function() {
    $("#outputs").html("");
  },

  "/help": function() {

    var print = ["Commands:"];
    print = $.merge(print, Object.keys(helpInfo));

    output(print);
  },

  "/connect": function(a) {
    if(a === "saaNet"){
      output(['Connected to <b>' + a + '</b>']);
      $('#netConnected').addClass('triggered');
      lvl = 2;
    }
    else if(a === "list"){
      output(['Networks:' + '<li><span class="fa fa-signal" style="color:#1DD041;"></span> saaNet</li>' + '<li><span class="fa fa-signal" style="color:#FF5D5A;"></span> Novistar_E831</li>' + '<li><span class="fa fa-signal" style="color:#FF5D5A;"></span> OMO6218</li>' + '<li><span class="fa fa-signal" style="color:#FF5D5A;"></span> Yasstel_h501</li>']);
    }
    else {
      output(['Use /connect <b>[NETWORK/LIST]<b>']);
    }
  },
  
  "/download": function(a) {
    if(a === "fsociety/spectre.iso" && lvl === 2){
      output(['Downloading <b>"spectre.iso"</b> to C:/users/blackhood/desktop']);
      $('#spectreIso').addClass('download');
      lvl = 3;
    }
    /*else if(a !== null){
      output(['<div class="err">Can' + "'" +'t find <b>"' + a + '"</b> in the cloud</div>']);
    }*/
    else{
      output(['Use /download <b>[PATH]<b>']);
    }
  },
  
  "/extract": function(a) {
    if(lvl === 3 && a !== "C:/users/blackhood/desktop/spectre.iso" && a !== null){
      output(['<span class="err"> File not found</div>']);
    }
    else if(lvl === 3 && a === "C:/users/blackhood/desktop/spectre.iso"){
      output(['Extracting <b>"' + a + '"</b>']);
      $('#spectreExo').addClass('extract');
      lvl = 4;
    }
    else {
      output(['Use /extract <b>[PATH]<b>']);
    }
  }
};

// Get User Command
$('.console-input').on('keypress', function(event) {
  if (event.which === 13) {
    var str = $(this).val();
    var data = str.split(' '); data.shift(); data = data.join(' ');
    var cmd = str.split(' ')[0];
    
    if (typeof cmds[cmd] == 'function') {
      if(cmds[cmd].length > 0) {
        cmds[cmd](data);
      } else {
        cmds[cmd]();
      }
    } else {
      output(["<div class='err'>Command not found: '" + cmd + "'</div>", "Use '/help' for list of commands."]);
    }
    $(this).val("");
  }
});

/* CLOCK & DATE*/

var clockVar = {};
  renderTime();
  function renderTime() {
    currentTime = new Date();
    clockVar.y = currentTime.getFullYear();
    clockVar.mth = currentTime.getMonth();
    clockVar.dt = currentTime.getDate();
    clockVar.d = currentTime.getDay();
    clockVar.h = currentTime.getHours();
    clockVar.m = currentTime.getMinutes();
    clockVar.s = currentTime.getSeconds();
    setTimeout('renderTime()', 1000);
    if (clockVar.h < 10) {clockVar.h = "0" + clockVar.h;}
    if (clockVar.m < 10) {clockVar.m= "0" + clockVar.m;	}
    if (clockVar.s < 10) {clockVar.s= "0" + clockVar.s;	}
    var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
		var daysAbv = ["SUN","MON","TUE","WED","THU","FRI","SAT"];
    //$('.fullTime').html(clockVar.h + ":" + clockVar.m + ":" + clockVar.s);
    //$('.date').html(days[clockVar.d] + " " + clockVar.dt + ", " + months[clockVar.mth] + " of " + clockVar.y);
    $('.time').html(clockVar.h + ":" + clockVar.m);
		$('.currentTime').html(clockVar.h + ":" + clockVar.m + ":" + clockVar.s);
		$('.day').html(daysAbv[clockVar.d]);
		$('.dayNumber').html(clockVar.dt);
		$('.month').html(months[clockVar.mth]);
		$('.year').html(clockVar.y);
  }
$(document).ready(function(){
  
  $('.calendar').datepicker({
    inline: true,
    firstDay: 1,
    showOtherMonths: true,
    dayNamesMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    });
 
  function changeBackground(year, month, obj){
    var months = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
    
    months.forEach(function(value){
      $('.calendar_img').removeClass(value);
    });
    
    $('.calendar_img').addClass(months[month - 1]);
  }
  
  var month = $('.ui-datepicker-month').text().toLowerCase();
  $('.calendar_img').addClass(month);
  
})

// Unnecessary jQuery library --> //code.jquery.com/ui/1.11.4/jquery-ui.js