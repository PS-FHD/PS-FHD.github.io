/***********************************************************************************
 *    Definition Introszene 1.
 *    
 *    Hinweis: ready ist ein jQuery Ereignis das aufgerufen wird, sobald der Browser
 *             das erstellen des DOM-Baums beendet hat.
 **********************************************************************************/
$(document).ready(function($) {
	var backgroundTween = TweenMax.to("#intro1", 1, {backgroundPosition: "-500px 0px", ease: Linear.easeNone});
	var cloudOneTween = TweenMax.to(".cloud.one", 1, {left: "-15%", ease: Linear.easeNone});
	var cloudTwoTween = TweenMax.to(".cloud.two", 1, {left: "-25%", ease: Linear.easeNone});
	var cloudThreeTween = TweenMax.to(".cloud.three", 1, {left: "30%", ease: Linear.easeNone});
	var cloudFourTween = TweenMax.to(".cloud.four", 1, {left: "25%", ease: Linear.easeNone});
	
	// Die Zeitleiste der Szene definieren.
	var timelineTween = new TimelineMax()
		.add([
			backgroundTween,
			cloudOneTween,
			cloudTwoTween,
			cloudThreeTween,
			cloudFourTween
		]);
	
	/* Die Scroll Magic Scene für die erste Introszene definieren.
	   Sie soll ab #intro1 500px lang scrollen, wobei die position des Auslösers für diese Szene ganz an den Anfang gesetzt wird.*/
	var scene = new ScrollScene({triggerElement: "#intro1", duration: 500, triggerHook: 0})
		.setTween(timelineTween)
		.setPin("#intro1")
		.addTo(controller);
});