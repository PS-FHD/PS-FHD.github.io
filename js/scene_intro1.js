/***********************************************************************************
 *    Definition Introszene 1.
 *    
 *    Hinweis: ready ist ein jQuery Ereignis das aufgerufen wird, sobald der Browser
 *             das erstellen des DOM-Baums beendet hat.
 **********************************************************************************/
$(document).ready(function($) {
	/* Das Hintergrundbild im div wird um 500 pixel nach links verschoben.
	   Dokumentation zu TweenMax und allen unterstützen Optionen: http://www.greensock.com/tweenmax/ */
	var backgroundTween = TweenMax.to("#intro1", 1, {backgroundPosition: "-500px 0px", ease: Linear.easeNone});
	/* Die Wolken fliegen jeweils von unterschiedlichen Startpositionen aus nach links zu einer jeweiligen Endposition. 
	   Die unterschiedlichen Geschwindigkeiten entstehen dabei durch die unterschiedlichen Abstände zwischen Start- und Endposition. */
	var cloudOneTween   = TweenMax.fromTo(".cloud.one", 1, {left: "50%"}, {left: "-15%", ease: Linear.easeNone});
	var cloudTwoTween   = TweenMax.fromTo(".cloud.two", 1, {left: "30%"}, {left: "-25%", ease: Linear.easeNone});
	var cloudThreeTween = TweenMax.fromTo(".cloud.three", 1, {left: "100%"}, {left: "10%", ease: Linear.easeNone});
	var cloudFourTween  = TweenMax.fromTo(".cloud.four", 1, {left: "180%"}, {left: "25%", ease: Linear.easeNone});
	var airplane = TweenMax.fromTo(".airplane", 1, {left: "-25%"}, {left: "75%", ease: Linear.easeNone});
	var headlines = TweenMax.fromTo("#intro1_textbox", 1, {top: "-30%"}, {top: "3%", ease: Linear.easeNone});
	
	// Die Zeitleiste der Szene definieren.
	var timelineTween = new TimelineMax()
		.add([
			backgroundTween,
			cloudOneTween,
			cloudTwoTween,
			cloudThreeTween,
			cloudFourTween,	
			airplane
			]);
	
	/* Die Scroll Magic Scene für die erste Introszene definieren.
	   Sie soll ab #intro1 1000px lang scrollen, wobei die position des Auslösers für diese Szene ganz an den Anfang gesetzt wird.*/
	var scene = new ScrollScene({triggerElement: "#intro1", duration: 1000, triggerHook: 0})
		.setTween(timelineTween)
		.setPin("#intro1")
		.addTo(controller);
});