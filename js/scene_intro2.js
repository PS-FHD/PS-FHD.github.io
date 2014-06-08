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
	
	var shineElement  = $("#intro2 > .students > .shine"); 
	var shineRotation = TweenMax.to(shineElement, 1,  {rotation: 180, ease: Linear.easeNone}); 
	var shineFadeIn   = TweenMax.fromTo(shineElement, 0.2, {autoAlpha: 0}, {autoAlpha: 1, ease: Linear.easeNone});	
	var shineFadeOut  = TweenMax.to(shineElement, 0.2, {autoAlpha: 0, delay: 0.7, ease: Linear.easeNone});
	
	var textBlock = TweenMax.from("#intro2 > .textblock", 0.25, {left: "-40%", ease: Linear.easeNone});
	
	// Die Zeitleiste der Szene
	var sceneTimeline = new TimelineMax()
		.add([
			backgroundTween,
			shineRotation,
			shineFadeIn,
			shineFadeOut,
			textBlock,
		])
		// Eigene Erweiterungsmethode um einen Szenenwechsel einzufuegen.
		.addSceneChange($("#intro2 > .sceneChange"), $("#lecture"));
	
	// Die Scroll Magic Szene definieren und hinzufuegen. Sie wird in einem Scrollbereich von 2500px bis 5000px abgespielt.
	addScene(new ScrollScene({duration: 2500})
		.setTween(sceneTimeline)
		.addTo(controller));
});