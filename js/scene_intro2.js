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
	
	var textBlockHead = TweenMax.from("#intro2 > .textblock h2", 0.35, {top: "-40%", ease: Linear.easeNone});
	var textBlockPara = TweenMax.from("#intro2 > .textblock p", 0.35, {top: "90%", ease: Linear.easeNone});
	
	// Die Zeitleiste der Szene
	var sceneTimeline = new TimelineMax()
		.add([
			backgroundTween,
			shineRotation,
			shineFadeIn,
			shineFadeOut,
			textBlockHead,
			textBlockPara
		])
		// Eigene Erweiterungsmethode um einen Szenenwechsel einzufuegen.
		.addSceneChange($("#intro2 > .sceneChange"), $("#lecture"));
	
	// Die Scroll Magic Szene definieren. Sie wird in einem Scrollbereich von 1000px bis 2000px abgespielt.
	new ScrollScene({offset: 1000, duration: 1000})
		.setTween(sceneTimeline)
		.addTo(controller);
});