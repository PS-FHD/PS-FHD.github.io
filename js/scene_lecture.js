/***********************************************************************************
 *    Definition Vorlesung.
 *    
 *    Hinweis: ready ist ein jQuery Ereignis das aufgerufen wird, sobald der Browser
 *             das erstellen des DOM-Baums beendet hat.
 *    Dokumentation zu TweenMax und allen unterstützen Optionen: http://www.greensock.com/tweenmax/
 **********************************************************************************/
$(document).ready(function($) {
	// Das Hintergrundbild im div wird um 840 pixel nach links verschoben.
	
	
	var backgroundSky = TweenMax.to(".sky", 1, {left: "-840px", ease: Linear.easeNone});
	

	var row1 = TweenMax.fromTo(".row.first", 1, {left: "10%", top:"79%"}, {left:"-5%", ease: Linear.easeNone});
	var row2 = TweenMax.fromTo(".row.second", 1, {left: "10%", top:"79%"}, {left:"-10%", ease: Linear.easeNone});
	var row3 = TweenMax.fromTo(".row.third", 1, {left: "10%", top:"90%"}, {left:"-15%", ease: Linear.easeNone});
	var front = TweenMax.fromTo(".front", 1, {left: "0%", top:"85%"}, {left:"-20%", ease: Linear.easeNone});
	
	var prof = TweenMax.fromTo(".prof", 1, {left: "90%", top: "37%"}, {left:"29%"});
	
	
	// Die tatsächlich errechnete Breite der ersten Szene ermitteln.
	// var actualSceneWidth = parseInt($("#lecture").css("width"), 10);
	// var sceneChangeElement = $("#lecture > .sceneChange");
	
	/* Beide tweens für den Szenenwechsel, einmal das Gebäude welches am Ende der ersten Szene startet und dann ganz links wieder hinaus scrollt,
	   und einmal die Szene die sich kurz dahinter mit durch schiebt. */
	// var sceneChangeBuilding = TweenMax.to("#intro2 > .sceneChange", 0.15, {top: "0", left: "-" + sceneChangeElement.css("width"), startAt: {left: actualSceneWidth + "px"}, ease: Linear.easeNone});
	// var nextSceneIn = TweenMax.to("#selfstudy1", 0.15, {top: "0", left: "0", startAt: {left: actualSceneWidth + "px"}, ease: Linear.easeNone});
	
	// Die Zeitleiste
	var timelineTween3 = new TimelineMax()
		.add([
		      	backgroundSky,
		      	prof,
		      	row1,
		      	row2,
		      	row3,
		      	front 
				]);
		// Die zwei Tweens für den Szenenwechsel. Werden erst am 85% der Szene abgespielt.
		// .insertMultiple(
			// [sceneChangeBuilding, nextSceneIn], 0.85
		// );
	
	
	/* Die Scroll Magic Scene für die zweite Introszene definieren.
	   Sie geht von 1000px bis 2000px.*/
	var scene = new ScrollScene({offset: 2000, duration: 1000, loglevel: 3})
	//	.setTween(backgroundTween)
		.setTween(timelineTween3)
		.addTo(controller);
});