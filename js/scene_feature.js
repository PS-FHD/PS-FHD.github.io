/***********************************************************************************
 *    Definition Mensa.
 *    
 *    Hinweis: ready ist ein jQuery Ereignis das aufgerufen wird, sobald der Browser
 *             das erstellen des DOM-Baums beendet hat.
 *    Dokumentation zu TweenMax und allen unterst�tzen Optionen: http://www.greensock.com/tweenmax/
 **********************************************************************************/
$(document).ready(function($) {
	// Das Hintergrundbild im div wird um 840 pixel nach links verschoben.
	
	
	var boy1	= TweenMax.to("#feature > .boy.first", 0.62, {left:"25%", autoAlpha: 0, ease: Linear.easeNone, delay:0.07});
	var boy2	= TweenMax.to("#feature > .boy.second", 0.62, {left:"25%", ease: Linear.easeNone, delay:0.07});
	
	var logosIn	= TweenMax.fromTo("#feature > .logo.first, #feature > .logo.second, #feature > .logo.third, #feature > .logo.fourth, #feature > .logo.fifth, #feature > .logo.sixth, #feature > .logo.seventh,#feature > .logo.eighth,#feature > .logo.ninth", 0.1,  {autoAlpha: 0} , {autoAlpha:1, delay: 0.1,ease: Linear.easeNone});
	var logosOut= TweenMax.fromTo("#feature > .logo.first, #feature > .logo.second, #feature > .logo.third, #feature > .logo.fourth, #feature > .logo.fifth, #feature > .logo.sixth, #feature > .logo.seventh,#feature > .logo.eighth,#feature > .logo.ninth", 0.2,  {autoAlpha: 1} , {autoAlpha:0, delay: 0.3,ease: Linear.easeNone});
	var logos2In	= TweenMax.fromTo("#feature > .logo2.first, #feature > .logo2.second, #feature > .logo2.third, #feature > .logo2.fourth, #feature > .logo2.fifth, #feature > .logo2.sixth, #feature > .logo2.seventh,#feature > .logo2.eighth", 0.1,  {autoAlpha: 0} , {autoAlpha:1, delay: 0.6,ease: Linear.easeNone});
	
	
	var headIn 	= TweenMax.fromTo("#feature > .textblock", 0.1, {top: "15%", left:"-40%"}, { left:"15%", delay: 0.8, ease: Linear.easeNone});

	
	
	
	// Die Zeitleiste der Szene
	var sceneTimeline = new TimelineMax()
		.add([

		      boy1, boy2,
		      logosIn, logosOut,
		      logos2In,
		      headIn
		    ]);
		//Eigene Erweiterungsmethode um einen Szenenwechsel einzufuegen.
		//.addSceneChange($("#canteen > .sceneChange"), $("#nextsceneid"));
	
	// Die Scroll Magic Szene definieren und hinzufuegen. Sie wird in einem Scrollbereich von 15000px bis 17500px abgespielt.
	addScene(new ScrollScene({duration: 5000})
		.setTween(sceneTimeline)
		.addTo(controller));
});