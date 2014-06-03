/***********************************************************************************
 *    Definition Vorlesung.
 *    
 *    Hinweis: ready ist ein jQuery Ereignis das aufgerufen wird, sobald der Browser
 *             das erstellen des DOM-Baums beendet hat.
 *    Dokumentation zu TweenMax und allen unterstützen Optionen: http://www.greensock.com/tweenmax/
 **********************************************************************************/
$(document).ready(function($) {
	// Das Hintergrundbild im div wird um 840 pixel nach links verschoben.
	
	// ich hab hier irgendwas kaputt gemacht und raffs nicht
	var backgroundSky = TweenMax.to(".sky", 1, {left: "840px", ease: Linear.easeNone});
	
	// Baum
	var orangeLeaves = TweenMax.fromTo(".tree.leaves.orange", 0.5, {autoAlpha:1}, {ease: Linear.easeNone, autoAlpha:0, delay:0.4});
	var redLeaves	 = TweenMax.fromTo(".tree.leaves.red", 0.75, {autoAlpha:1}, {ease: Linear.easeNone, autoAlpha:0, delay:0.2});
	
	// Schnee
	var snow = TweenMax.fromTo(".snow", 0.8, {top:"-75%"}, {top:"25%", ease: Linear.easeNone, delay:0.2});
	
	// Sitzreihen
	var row1 = TweenMax.fromTo(".row.first", 1, {left: "10%"}, {left:"9%", ease: Linear.easeNone});
	var row2 = TweenMax.fromTo(".row.second", 1, {left: "10%"}, {left:"4.5%", ease: Linear.easeNone});
	var row3 = TweenMax.fromTo(".row.third", 1, {left: "10%"}, {left:"1%", ease: Linear.easeNone});
	var front = TweenMax.fromTo(".front", 1, {left: "10%"}, {left:"-3.3%", ease: Linear.easeNone});
	
	var prof = TweenMax.fromTo(".prof", 1, {left: "90%"}, {left:"29%"});
	
	// Personen Reihe 1
	var prow1_1 = TweenMax.fromTo(".ppl1.first", 1, {left: "12%",autoAlpha:1}, {left:"10%", autoAlpha:0});
	var prow1_2 = TweenMax.fromTo(".ppl1.second", 1, {left: "27%"}, {left:"23.5%"});
	var prow1_3 = TweenMax.fromTo(".ppl1.third", 1, {left: "51%",autoAlpha:1}, {left:"47.5%", autoAlpha:0});
	var prow1_4 = TweenMax.fromTo(".ppl1.fourth", 1, {left: "78%",autoalpha:1}, {left:"74.5%", autoAlpha:0});
	// Personen Reihe 2
	var prow2_1 = TweenMax.fromTo(".ppl2.first", 1, {left: "14%"}, {left:"5%"});
	var prow2_2 = TweenMax.fromTo(".ppl2.second", 1, {left: "68%",autoAlpha:1}, {left:"59%", autoAlpha:0});
	var prow2_3 = TweenMax.fromTo(".ppl2.third", 1, {left: "82%"}, {left:"73%"});
	// personen Reihe 3
	var prow3_1 = TweenMax.fromTo(".ppl3.first", 1, {left: "42%",autoAlpha:1}, {left:"31%", autoAlpha:0});
	var prow3_2 = TweenMax.fromTo(".ppl3.second", 1, {left: "55.5%"}, {left:"44.5%"}); 
	
	// Textbloecke vorselektieren
	var firstTextblock  = $("#lecture > .textblock:nth-of-type(1)");
	var secondTextblock = $("#lecture > .textblock:nth-of-type(2)");
	var thirdTextblock  = $("#lecture > .textblock:nth-of-type(3)");
	
	// Da die Tweens fuer die Textbloecke hintereinander Abgespielt werden, ist hier eine zusaetzliche Zeitleiste sinnvoll.
	var textTimeline = new TimelineMax()
		// Ab start der Zeitleiste den ersten Textblock ueber eine Dauer von 10% einblenden. 
		.append(TweenMax.from(firstTextblock, 0.10, {left: "-40%", ease: Linear.easeNone}))
		// .. danach 15% lang warten, dann den ersten Textblock ueber eine Dauer von 5% ausblenden.
		.append(TweenMax.to(firstTextblock, 0.05, {delay: 0.15, autoAlpha: 0}))
		// .. danach zweiten Textblock ueber eine Dauer von 10% einblenden etc.
		.append(TweenMax.from(secondTextblock, 0.10, {left: "-40%", ease: Linear.easeNone}))
		.append(TweenMax.to(secondTextblock, 0.05, {delay: 0.15, autoAlpha: 0}))
		.append(TweenMax.from(thirdTextblock, 0.10, {left: "-40%", ease: Linear.easeNone}));

	// Die Zeitleiste der Szene
	var sceneTimeline = new TimelineMax()
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
			prow3_1,prow3_2,
			textTimeline
		])
		// Eigene Erweiterungsmethode um einen Szenenwechsel einzufuegen.
		.addSceneChange($("#lecture > .sceneChange"), $("#selfstudy1"));
	
	// Die Scroll Magic Szene definieren und hinzufuegen. Sie wird in einem Scrollbereich von 5000px bis 7500px abgespielt.
	addScene(new ScrollScene({duration: 2500})
		.setTween(sceneTimeline)
		.addTo(controller));
});