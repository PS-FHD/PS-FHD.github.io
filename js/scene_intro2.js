/***********************************************************************************
 *    Definition Introszene 2.
 *    
 *    Hinweis: ready ist ein jQuery Ereignis das aufgerufen wird, sobald der Browser
 *             das erstellen des DOM-Baums beendet hat.
 *    Dokumentation zu TweenMax und allen unterstützen Optionen: http://www.greensock.com/tweenmax/
 **********************************************************************************/
$(document).ready(function($) {
	// Das Hintergrundbild im div wird um 500 pixel nach links verschoben.
	var backgroundTween = TweenMax.to("#intro2", 1, {backgroundPosition: "-500px 0px", ease: Linear.easeNone});
	
	var shine 	= TweenMax.fromTo(".shine", 2, {scale: 0}, {rotation:180, scale: 1 , ease: Linear.easeNone});	
	
	var kom_head =  TweenMax.fromTo("#intro2 header", 0.65, {top: "-50%", left:"2%"}, { top:"17%", left:"2%",  ease: Linear.easeNone});
	
	var kom_text =  TweenMax.fromTo("#intro2 section", 0.65, {left: "2%", top: "100%"}, { left:"2%", top:"35%", ease: Linear.easeNone});
	
	
	// Die Zeitleiste
	var timelineTween2 = new TimelineMax()
		.add([
		      	backgroundTween,
				shine,
				kom_head,
				kom_text
				]);
	
	
	/* Die Scroll Magic Scene für die zweite Introszene definieren.
	   Sie geht von 1000px bis 2000px.*/
	var scene = new ScrollScene({offset: 1000, duration: 1000, loglevel: 3})
	//	.setTween(backgroundTween)
		.setTween(timelineTween2)
		.addTo(controller);
});