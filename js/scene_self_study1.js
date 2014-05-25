/***********************************************************************************
 *    Definition Vorlesung.
 *    
 *    Hinweis: ready ist ein jQuery Ereignis das aufgerufen wird, sobald der Browser
 *             das erstellen des DOM-Baums beendet hat.
 *    Dokumentation zu TweenMax und allen unterstuetzen Optionen: http://www.greensock.com/tweenmax/
 **********************************************************************************/
$(document).ready(function($) {
	// Das Hintergrundbild im div wird um 840 pixel nach links verschoben.
	
	
	var backgroundBooks = TweenMax.to("#selfstudy1", 1, {backgroundPosition: "-500px 0px", ease: Linear.easeNone});
	

	var self1_headIn =  TweenMax.fromTo("header.self1", 0.3, {top: "10%", right:"-80%"}, { right:"2%",  ease: Linear.easeNone});
	var self1_textIn =  TweenMax.fromTo("section.self1", 0.3, {top: "28%", right: "-80%" }, { right:"2%",  ease: Linear.easeNone});
	
	var self1_headOut = TweenMax.to("header.self1", 0.1, {autoAlpha:0, delay:0.7});
	var self1_textOut = TweenMax.to("section.self1", 0.2, {autoAlpha:0, delay:0.7});
	
	// Die tatsächlich errechnete Breite der ersten Szene ermitteln.
	var actualSceneWidth = parseInt($("#selfstudy1").css("width"), 10);
	var sceneChangeElement = $("#selfstudy1 > .sceneChange");
	
	/* Beide tweens fuer den Szenenwechsel, einmal das Gebäude welches am Ende der ersten Szene startet und dann ganz links wieder hinaus scrollt,
	   und einmal die Szene die sich kurz dahinter mit durch schiebt. */
	 var sceneChangeBuilding = TweenMax.to("#selfstudy1 > .sceneChange", 0.15, {top: "0", left: "-" + sceneChangeElement.css("width"), startAt: {left: actualSceneWidth + "px"}, ease: Linear.easeNone});
	 var nextSceneIn = TweenMax.to("#selfstudy2", 0.15, {top: "0", left: "0", startAt: {left: actualSceneWidth + "px"}, ease: Linear.easeNone});
	
	// Die Zeitleiste
	var timelineTween4 = new TimelineMax()
		.add([
		      	backgroundBooks,
		      	self1_headIn,
		      	self1_textIn,
		      	self1_headOut,
		      	self1_textOut
				])
		// Die zwei Tweens fuer den Szenenwechsel. Werden erst am 85% der Szene abgespielt.
		 .insertMultiple(
			 [sceneChangeBuilding, nextSceneIn], 0.85
		 );
	
	
	/* Die Scroll Magic Scene fuer die zweite Introszene definieren.
	   Sie geht von 1000px bis 2000px.*/
	var scene = new ScrollScene({offset: 3000, duration: 1000, loglevel: 3})
	//	.setTween(backgroundTween)
		.setTween(timelineTween4)
		.addTo(controller);
});