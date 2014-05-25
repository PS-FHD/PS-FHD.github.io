/***********************************************************************************
 *    Definition Vorlesung.
 *    
 *    Hinweis: ready ist ein jQuery Ereignis das aufgerufen wird, sobald der Browser
 *             das erstellen des DOM-Baums beendet hat.
 *    Dokumentation zu TweenMax und allen unterstützen Optionen: http://www.greensock.com/tweenmax/
 **********************************************************************************/
$(document).ready(function($) {
	// Das Hintergrundbild im div wird um 840 pixel nach links verschoben.
	
	
	var backgroundTween = TweenMax.to("#selfstudy2", 1, {backgroundPosition: "-500px 0px", ease: Linear.easeNone});
	
	
	var palm1 = TweenMax.fromTo(".palm.first", 1, {right: "-0.5%", top:"-5%", scaleY:1, scaleX:0.99}, {scaleY:0.99, scaleX:1, repeat: -1, yoyo:true, ease: Linear.easeNone});
	var palm2 = TweenMax.fromTo(".palm.second", 0.9, {right: "-0.5%", top:"23%", scaleY:0.98, scaleX:1}, { scaleY:1, scaleX:0.98, repeat: -1, yoyo:true, ease: Linear.easeNone});
	
	var cloudOneTween = TweenMax.fromTo("#selfstudy2 > .cloud.one", 1, {left: "80%"}, {left: "-15%", ease: Linear.easeNone});
	var cloudTwoTween = TweenMax.fromTo("#selfstudy2 > .cloud.two", 1, {left: "60%"}, {left: "-25%", ease: Linear.easeNone});
		
	var foreground = TweenMax.fromTo("#selfstudy2 > .foreground", 1, { left: "100%", top: "67%", scale: 0.6}, {left: "-105%", ease: Linear.easeNone, delay:0.5});
	
	
	var self2_headIn 	= TweenMax.fromTo("header.self2", 0.3, {top: "10%", left:"-40%"}, { left:"2%",  ease: Linear.easeNone});
	var self2_textIn 	= TweenMax.fromTo("section.self2", 0.3, {top: "28%", left: "-80%" }, { left:"2%",  ease: Linear.easeNone});
	var self2_textOut 	= TweenMax.to("section.self2", 0.2, {autoAlpha:0, delay:0.7});
	var self2_a_textIn 	= TweenMax.fromTo("section.self2_a", 0.3, {top: "28%", left: "-80%" }, { delay: 0.7, left:"2%",  ease: Linear.easeNone});
	var self2_bit_textIn =  TweenMax.fromTo(".self2.bit", 0.3, {top:"580px", left: "-80%", rotation: -2.2 }, { left:"2%",  ease: Linear.easeNone});
	var crabWalk = TweenMax.fromTo("#selfstudy2 > .crab", 1, {top: "84%", left: "95%"}, {left: "75%", ease: Linear.easeNone});
	
	
	
	// Die tatsächlich errechnete Breite der ersten Szene ermitteln.
//	var actualSceneWidth = parseInt($("#lecture").css("width"), 10);
//	var sceneChangeElement = $("#lecture > .sceneChange");
	
	/* Beide tweens für den Szenenwechsel, einmal das Gebäude welches am Ende der ersten Szene startet und dann ganz links wieder hinaus scrollt,
	   und einmal die Szene die sich kurz dahinter mit durch schiebt. */
	// var sceneChangeBuilding = TweenMax.to("#intro2 > .sceneChange", 0.15, {top: "0", left: "-" + sceneChangeElement.css("width"), startAt: {left: actualSceneWidth + "px"}, ease: Linear.easeNone});
	// var nextSceneIn = TweenMax.to("#selfstudy1", 0.15, {top: "0", left: "0", startAt: {left: actualSceneWidth + "px"}, ease: Linear.easeNone});
	
	// Die Zeitleiste
	var timelineTween5 = new TimelineMax()
		.add([
		      backgroundTween,
		      cloudOneTween,
		      cloudTwoTween,
		      foreground,
		      self2_headIn,
		      self2_textIn,
		      self2_textOut,
		      self2_a_textIn,
		      self2_bit_textIn,
		      crabWalk
			]);
		// Die zwei Tweens für den Szenenwechsel. Werden erst am 85% der Szene abgespielt.
		// .insertMultiple(
			// [sceneChangeBuilding, nextSceneIn], 0.85
		// );
	
	
	/* Die Scroll Magic Scene für die zweite Introszene definieren.
	   Sie geht von 1000px bis 2000px.*/
	var scene = new ScrollScene({offset: 4000, duration: 1000, loglevel: 3})
	//	.setTween(backgroundTween)
		.setTween(timelineTween5)
		.addTo(controller);
});