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
	
	var cloud1 = TweenMax.fromTo("#selfstudy2 > .cloud.one", 1, {left: "90%"}, {left: "-10%", ease: Linear.easeNone});
	var cloud2 = TweenMax.fromTo("#selfstudy2 > .cloud.two", 1, {left: "110%"}, {left: "-25%", ease: Linear.easeNone});
	var cloud3 = TweenMax.fromTo("#selfstudy2 > .cloud.three", 1, {left: "60%"}, {left: "-15%", ease: Linear.easeNone});
	
		
	var foreground = TweenMax.fromTo("#selfstudy2 > .foreground", 1, { left: "100%", top: "67%", scale: 0.6}, {left: "-105%", ease: Linear.easeNone});
	
	var crabWalk = TweenMax.fromTo("#selfstudy2 > .crab", 1, {top: "84%", left: "95%"}, {left: "75%", ease: Linear.easeNone});
	
	var textBlockIn = TweenMax.from("#selfstudy2 > .textblock", 0.3, {left: "-60%", ease: Linear.easeNone});
	var textPara2In = TweenMax.from("#selfstudy2 > .textblock p:nth-of-type(2)", 0.3, {left: "-105%", delay: 0.4, ease: Linear.easeNone});
	
	var bit = TweenMax.fromTo("#selfstudy2 > .bit", 1, {top: "79%", left: "-40%", rotation: -1.5}, {left: "30%", top: "76%", ease: Linear.easeNone});

	// Die Zeitleiste der Szene
	var sceneTimeline = new TimelineMax()
		.add([
			backgroundTween,
			cloud1,
			cloud2,
			cloud3,
			foreground,
			textBlockIn,
			textPara2In,
			bit,
			crabWalk
		])
		// Eigene Erweiterungsmethode um einen Szenenwechsel einzufuegen.
		.addSceneChange($("#selfstudy2 > .sceneChange"), $("#selfstudy3"));
	
	// Die Scroll Magic Szene definieren und hinzufuegen. Sie wird in einem Scrollbereich von 10000px bis 12500px abgespielt.
	addScene(new ScrollScene({duration: 2500})
		.setTween(sceneTimeline)
		.addTo(controller));
});