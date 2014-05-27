/***********************************************************************************
 *    Definition Introszene 2.
 *    
 *    Hinweis: ready ist ein jQuery Ereignis das aufgerufen wird, sobald der Browser
 *             das erstellen des DOM-Baums beendet hat.
 *    Dokumentation zu TweenMax und allen unterstuetzten Optionen: http://www.greensock.com/tweenmax/
 **********************************************************************************/
$(document).ready(function($) {
	// Das Hintergrundbild im div wird um 500 pixel nach links verschoben.
	var backgroundTween = TweenMax.to("#intro2", 1, {backgroundPosition: "-500px 0px", ease: Linear.easeNone});
	
	var shineRotation = TweenMax.to("#intro2 > .shine", 1,  {rotation: 180, ease: Linear.easeNone}); 
	var shineFadeIn   = TweenMax.fromTo("#intro2 > .shine", 0.2, {autoAlpha: 0}, {autoAlpha: 1, ease: Linear.easeNone});	
	var shineFadeOut  = TweenMax.to("#intro2 > .shine", 0.2, {autoAlpha: 0, delay: 0.7, ease: Linear.easeNone});
	
	var kom_head = TweenMax.to("#intro2 > .textblock h2", 0.65, {top: "15%",  ease: Linear.easeNone});
	var kom_text = TweenMax.to("#intro2 > .textblock p", 0.65, {top: "15%", ease: Linear.easeNone});
	
	// Die Zeitleiste
	var timelineTween2 = new TimelineMax()
		.add([
			backgroundTween,
			shineRotation,
			shineFadeIn,
			shineFadeOut,
			kom_head,
			kom_text
		])
		// Eigene Erweiterungsmethode um einen Szenenwechsel einzufuegen.
		.addSceneChange($("#intro2 > .sceneChange"), $("#lecture"));
	
	
	/* Die Scroll Magic Scene fuer die zweite Introszene definieren.
	   Sie geht von 1000px bis 2000px.*/
	var scene = new ScrollScene({offset: 1000, duration: 1000, loglevel: 3})
		.setTween(timelineTween2)
		.addTo(controller);
});