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
	
	var shineRotation = TweenMax.to(".shine", 1,  {rotation:180, ease: Linear.easeNone}); 
	var shineFadeIn = TweenMax.fromTo(".shine", 0.2, {autoAlpha: 0}, {autoAlpha: 1 , ease: Linear.easeNone});	
	var shineFadeOut = TweenMax.to(".shine", 0.2, {autoAlpha: 0 , ease: Linear.easeNone, delay:0.7});
	
	var kom_head =  TweenMax.fromTo("#intro2 header", 0.65, {top: "-50%", left:"2%"}, { top:"17%", left:"2%",  ease: Linear.easeNone});
	var kom_text =  TweenMax.fromTo("#intro2 section", 0.65, {left: "2%", top: "100%"}, { left:"2%", top:"35%", ease: Linear.easeNone});
	
	// Die tatsächlich errechnete Breite der ersten Szene ermitteln.
	var actualSceneWidth = parseInt($("#intro2").css("width"), 10);
	var sceneChangeElement = $("#intro2 > .sceneChange");
	/* Beide tweens für den Szenenwechsel, einmal das Gebäude welches am Ende der ersten Szene startet und dann ganz links wieder hinaus scrollt,
	   und einmal die Szene die sich kurz dahinter mit durch schiebt. */
	var sceneChangeBuilding = TweenMax.to("#intro2 > .sceneChange", 0.15, {top: "0", left: "-" + sceneChangeElement.css("width"), startAt: {left: actualSceneWidth + "px"}, ease: Linear.easeNone});
	var nextSceneIn = TweenMax.to("#lecture", 0.15, {top: "0", left: "0", startAt: {left: actualSceneWidth + "px"}, ease: Linear.easeNone});
	
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
		// Die zwei Tweens für den Szenenwechsel. Werden erst am 85% der Szene abgespielt.
		.insertMultiple(
			[sceneChangeBuilding, nextSceneIn], 0.85
		);
	
	
	/* Die Scroll Magic Scene für die zweite Introszene definieren.
	   Sie geht von 1000px bis 2000px.*/
	var scene = new ScrollScene({offset: 1000, duration: 1000, loglevel: 3})
	//	.setTween(backgroundTween)
		.setTween(timelineTween2)
		.addTo(controller);
});