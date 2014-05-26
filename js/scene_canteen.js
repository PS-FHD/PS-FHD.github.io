/***********************************************************************************
 *    Definition Mensa.
 *    
 *    Hinweis: ready ist ein jQuery Ereignis das aufgerufen wird, sobald der Browser
 *             das erstellen des DOM-Baums beendet hat.
 *    Dokumentation zu TweenMax und allen unterstützen Optionen: http://www.greensock.com/tweenmax/
 **********************************************************************************/
$(document).ready(function($) {
	// Das Hintergrundbild im div wird um 840 pixel nach links verschoben.
	
	//var student1In = TweenMax.to(".boy.first", 0.2,  {left: "50%", bottom:"0%"});
	var student1Out = TweenMax.fromTo(".boy.first", 0.2, {left: "50%", bottom:"0%"}, {left: "50%", bottom:"0%", autoAlpha:0, delay: 0.2});
	
	var student2In = TweenMax.fromTo(".boy.second", 0.2, {left: "50%", bottom:"0%", autoAlpha:0}, {left: "50%", bottom:"0%", delay: 0.2, autoAlpha:1});
	var student2Out = TweenMax.to(".boy.second", 0.2,  {delay: 0.4, autoAlpha:0});
	
	var student3In = TweenMax.fromTo(".boy.third", 0.2, {left: "50%", bottom:"0%", autoAlpha:0}, {left: "50%", bottom:"0%", delay: 0.4, autoAlpha:1});
	var student3Out = TweenMax.to(".boy.third", 0.2, {delay: 0.6, autoAlpha:1});
	
	var student4In = TweenMax.fromTo(".boy.fourth", 0.2, {left: "50%", bottom:"0%", autoAlpha:0}, {left: "50%", bottom:"0%", delay: 0.6, autoAlpha:1});
	var student4Out = TweenMax.to(".boy.fourth", 0.2,  {delay: 0.8, autoAlpha:0});
	
	var student5In = TweenMax.fromTo(".boy.fifth", 0.2, {left: "50%", bottom:"0%", autoAlpha:0}, {left: "50%", bottom:"0%", delay: 0.8,  autoAlpha:1});
	
	var souce1 = TweenMax.fromTo(".souce.first", 0.3, {left: "120%", bottom:"40%"}, {left:"-20%", ease: Linear.easeNone});
	var souce2 = TweenMax.fromTo(".souce.second", 0.3, {left: "120%", bottom:"40%"}, {left:"-20%", ease: Linear.easeNone, delay:0.1});
	var souce3 = TweenMax.fromTo(".souce.third", 0.3, {left: "120%", bottom:"40%"}, {left:"-20%", ease: Linear.easeNone, delay:0.2});
	
	var food1 = TweenMax.fromTo(".food", 0.3, {left: "120%", top:"70%"}, {left:"-20%", ease: Linear.easeNone});
	
	var dessert = TweenMax.fromTo(".dessert", 0.3, {left: "120%", top:"25%"}, {left:"70%", ease: Linear.easeNone});
	
	var lamp = TweenMax.fromTo(".lamp", 0.3, {left: "50%", top:"0%"}, {ease: Linear.easeNone});
	var arrow = TweenMax.fromTo(".arrow", 0.3, {left: "90%", top:"-10%"}, {left: "70%", top: "15%", rotation : 690 ,ease: Linear.easeNone});
	
	// Die tatsächlich errechnete Breite der ersten Szene ermitteln.
//	var actualSceneWidth = parseInt($("#lecture").css("width"), 10);
//	var sceneChangeElement = $("#lecture > .sceneChange");
	
	/* Beide tweens für den Szenenwechsel, einmal das Gebäude welches am Ende der ersten Szene startet und dann ganz links wieder hinaus scrollt,
	   und einmal die Szene die sich kurz dahinter mit durch schiebt. */
	// var sceneChangeBuilding = TweenMax.to("#intro2 > .sceneChange", 0.15, {top: "0", left: "-" + sceneChangeElement.css("width"), startAt: {left: actualSceneWidth + "px"}, ease: Linear.easeNone});
	// var nextSceneIn = TweenMax.to("#selfstudy1", 0.15, {top: "0", left: "0", startAt: {left: actualSceneWidth + "px"}, ease: Linear.easeNone});
	
	// Die Zeitleiste
	var timelineTween7 = new TimelineMax()
		.add([
		      souce1,
		      souce2,
		      souce3,
		      food1,
		      //student1In,
		      student1Out,
		      student2In,
		      student2Out,
		      student3In,
		      student3Out,
		      student4In,
		      student4Out,
		      student5In,
		      lamp,
		      arrow,
		      dessert
			]);
		// Die zwei Tweens für den Szenenwechsel. Werden erst am 85% der Szene abgespielt.
		// .insertMultiple(
			// [sceneChangeBuilding, nextSceneIn], 0.85
		// );
	
	
	/* Die Scroll Magic Scene für die zweite Introszene definieren.
	   Sie geht von 1000px bis 2000px.*/
	var scene = new ScrollScene({offset: 6000, duration: 1000, loglevel: 3})
	//	.setTween(backgroundTween)
		.setTween(timelineTween7)
		.addTo(controller);
});