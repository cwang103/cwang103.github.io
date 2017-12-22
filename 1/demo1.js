/*----------------------------------------------------------
	Page Configuration
-----------------------------------------------------------*/

(function(){
	var path = "M206.36,256.07c3.48-13.95,5.83-23.38,6.59-37.08a148.92,148.92,0,0,0-2.47-37.08c-1.94-9.68-3.79-19-9.89-29.67-3.32-5.84-8.39-14.72-18.13-21.43-16.35-11.25-42.93-14.25-55.21-1.65-3.93,4-8,11.6-7.42,18.13a83.29,83.29,0,0,0,3.23,14.14l.29.93,9.2,50.21a22.43,22.43,0,0,1-7.21,14c-7.61,6.7-16.94,5-18.13,4.72a72.77,72.77,0,0,1-40-19.29,74,74,0,0,1-16.08-22.85,71.58,71.58,0,0,1,2.58-20.52c4.32-15.49,16.09-17.23,22.69-34.75,2.26-6,4.69-12.77,1.35-18.67-3.8-6.71-12.6-8-14.83-8.24A93.12,93.12,0,0,0,34.13,116,95.2,95.2,0,0,0,17.65,126.7c-5.25,4.23-9.41,7.58-13.18,13.18A46.41,46.41,0,0,0-3,160.38a423.44,423.44,0,0,0-9.72,48.09,431.71,431.71,0,0,0,2,133.4A54.56,54.56,0,0,0,23.73,379.3,44.12,44.12,0,0,0,43.25,382,46.88,46.88,0,0,0,70.5,369.52c1.79-1.44,12.11-10.06,12.64-24.08a30.75,30.75,0,0,0-2.58-13.34A131.94,131.94,0,0,0,41.2,302.68c-.6-.55-5.89-5.27-5.42-12.45a15.67,15.67,0,0,1,12-14L66.6,269.7c4.56-.75,11-1,16.74,2.53,6.28,3.9,8.6,10.47,9.92,13.48C97,294.06,107,304.32,134.8,311.37c.35.09.58.19,1,.31,15.69,4.95,27.79,3.53,36,1.25a63.09,63.09,0,0,0,18.13-14.83C198.26,288,201.08,277.23,206.36,256.07Z",
		firstWalkerObj = $('.maze > .walker')[0],
		walkers = [];

	// handles whatever moves along the path
	function AnimateWalker(walker){
		this.pathAnimator = new PathAnimator( path, {
			duration : 27,
			step     : this.step.bind(this),
			reverse  : false,
			onDone   : this.finish.bind(this)

		});

		this.walker = walker;
		this.color = 'deeppink'; // visually separate different walkers easily

	}


	AnimateWalker.prototype = {
		start : function(){
			//this.walker.style.cssText = "";
			this.startOffset = (this.reverse || this.speed < 0) ? 100 : 0; // if in reversed mode, then animation should start from the end, I.E 100%
			this.pathAnimator.start();   /*-------used to be start--------s*/
		},

		// Execute every "frame"
		step : function(point, angle){
			this.walker.style.cssText = "top:" + point.y + "px;" +
										"left:" + point.x + "px;" +
										"transform:rotate(" + angle + "deg);" +
										"color:" + this.color;
		},

		// Restart animation once it was finished
		finish : function(){
			this.start();
		},

		// Resume animation from the last completed percentage (also updates the animation with new settings' values)
		resume : function( settings ){
			settings = settings || {};
			$.extend(this.pathAnimator.settings, settings);

			this.pathAnimator.start( this.pathAnimator.percent );
				var goPro = document.getElementById("gopro"); 
	    	if (goPro.paused) {
	    	goPro.play();
	    }
		}
	}

	function generateWalker(walkerObj){
		var newAnimatedWalker = new AnimateWalker( walkerObj );
		walkers.push(newAnimatedWalker);
		return newAnimatedWalker;
	}



/*-----------------------------------------------------------
	User Controls
------------------------------------------------------------*/
	
	$('menu').on('change', '.stopPlay input', stopPlay);
		
	$('.speed').trigger('change');

	
	// reset the controller box for new "walker" instances
	function resetController(obj){
		var speed = 30;
		obj.find('.speed').val(speed).next().text(speed + 's');
		obj.find(':checkbox').removeAttr('checked');
	}

	// pause or place the animated object along the path
	function stopPlay(){
		var thisAnimatedWalker = $(this.parentNode.parentNode).data('walker');

		thisAnimatedWalker.pathAnimator.running ? thisAnimatedWalker.pathAnimator.stop() : thisAnimatedWalker.resume.apply(thisAnimatedWalker);
	}

	function changeSpeed(){
		var thisAnimatedWalker = $(this.parentNode).data('walker');
		this.nextElementSibling.innerHTML = this.value + 's';

		thisAnimatedWalker.resume.call(thisAnimatedWalker, { duration:this.value });
	}

	// start "animating" the first Walker on the page
	var walker = generateWalker(firstWalkerObj)
	
	// bind the first Controller to the first Walker
	var firstController = $('menu > div:first');
	resetController( firstController );
	firstController.data( 'walker', walkers[0] );


	// reset checkboxes
	$(':checkbox').removeAttr('checked');
	$('select').prop('selectedIndex', 0);
})();

function playPause() { 
	    var goPro = document.getElementById("gopro"); 
	    if (goPro.paused) {
	    	goPro.play();
	        walker.start();
	    }
	    else {
	        goPro.pause(); 
	        walker.finish();
	    }

}



//----------- GO and STOP button---------
$(document).ready(function() {
	$('#go').show();
	$('#stop').hide();
	$('.one').show();
	$('.two').hide();
	

	$('.stopPlay').click(function() {
		 
	$('#go').toggle();
	$('#stop').toggle();
	$('.one').toggle();
	$('.two').toggle();
	$(this).toggleClass('foo');

	
		
}); 
});

// Nav



