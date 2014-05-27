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
	
	// Baum
	var orangeLeaves = TweenMax.fromTo(".tree.leaves.orange", 0.5, {left: "75px", top: "55px", autoAlpha:1}, {ease: Linear.easeNone, autoAlpha:0, delay:0.4});
	var redLeaves	 = TweenMax.fromTo(".tree.leaves.red", 0.75, {autoAlpha:1}, {ease: Linear.easeNone, autoAlpha:0, delay:0.2});
	
	// Schnee
	var snow = TweenMax.fromTo(".snow", 0.8, {top:"-75%"}, {top:"25%", ease: Linear.easeNone, delay:0.2});
	
	// Sitzreihen
	var row1 = TweenMax.fromTo(".row.first", 1, {left: "10%", top:"79%"}, {left:"-5%", ease: Linear.easeNone});
	var row2 = TweenMax.fromTo(".row.second", 1, {left: "10%", top:"79%"}, {left:"-10%", ease: Linear.easeNone});
	var row3 = TweenMax.fromTo(".row.third", 1, {left: "10%", top:"90%"}, {left:"-15%", ease: Linear.easeNone});
	var front = TweenMax.fromTo(".front", 1, {left: "10%", top:"85%"}, {left:"-20%", ease: Linear.easeNone});
	
	var prof = TweenMax.fromTo(".prof", 1, {left: "90%", top: "37%"}, {left:"29%"});
	
	// Personen Reihe 1
	var prow1_1 = TweenMax.fromTo(".ppl1.first", 1, {left: "10%", top:"63.5%",autoAlpha:1}, {left:"7%", autoAlpha:0});
	var prow1_2 = TweenMax.fromTo(".ppl1.second", 1, {left: "30%", top:"63.5%"}, {left:"27%"});
	var prow1_3 = TweenMax.fromTo(".ppl1.third", 1, {left: "50%", top:"63.5%",autoAlpha:1}, {left:"47%", autoAlpha:0});
	var prow1_4 = TweenMax.fromTo(".ppl1.fourth", 1, {left: "90%", top:"63.5%",autoalpha:1}, {left:"87%", autoAlpha:0});
	// Personen Reihe 2
	var prow2_1 = TweenMax.fromTo(".ppl2.first", 1, {left: "20%", top:"68%"}, {left:"15%"});
	var prow2_2 = TweenMax.fromTo(".ppl2.second", 1, {left: "80%", top:"68%",autoAlpha:1}, {left:"75%", autoAlpha:0});
	var prow2_3 = TweenMax.fromTo(".ppl2.third", 1, {left: "90%", top:"68%"}, {left:"85%"});
	// personen Reihe 3
	var prow3_1 = TweenMax.fromTo(".ppl3.first", 1, {left: "40%", top:"75%",autoAlpha:1}, {left:"33%", autoAlpha:0});
	var prow3_2 = TweenMax.fromTo(".ppl3.second", 1, {left: "50%", top:"75%"}, {left:"43%"});
	
	// Die Zeitleiste
	var timelineTween3 = new TimelineMax()
		.add([
			backgroundSky,
			orangeLeaves,
			redLeaves,
			snow,
			prof,
			row1,
			row2,
			row3,
			front,
			prow1_1,prow1_2,prow1_3,prow1_4,
			prow2_1,prow2_2,prow2_3,
			prow3_1,prow3_2
		])
		// Eigene Erweiterungsmethode um einen Szenenwechsel einzufuegen.
		.addSceneChange($("#lecture > .sceneChange"), $("#selfstudy1"));
	
	
	/* Die Scroll Magic Scene für die zweite Introszene definieren.
	   Sie geht von 1000px bis 2000px.*/
	var scene = new ScrollScene({offset: 2000, duration: 1000})
	//	.setTween(backgroundTween)
		.setTween(timelineTween3)
		.addTo(controller);
});