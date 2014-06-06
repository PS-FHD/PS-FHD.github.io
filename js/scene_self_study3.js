/***********************************************************************************
 *    Definition Vorlesung.
 *    
 *    Hinweis: ready ist ein jQuery Ereignis das aufgerufen wird, sobald der Browser
 *             das erstellen des DOM-Baums beendet hat.
 *    Dokumentation zu TweenMax und allen unterstuetzen Optionen: http://www.greensock.com/tweenmax/
 **********************************************************************************/
$(document).ready(function($) {
	// Das Hintergrundbild im div wird um 840 pixel nach links verschoben.	
	
	var day_night = TweenMax.fromTo(".daynight", 1, {right: "-15%", top:"18%"}, {right: "22%", ease: Linear.easeNone});
	
	var table1Out = TweenMax.fromTo(".table.first", 0.1, {right: "20%", bottom:"0%"}, {autoAlpha:0, delay:0.5, ease: Linear.easeNone});
	var table2In = TweenMax.fromTo(".table.second", 0.1, {right: "20%", bottom:"0%", autoAlpha:0}, {autoAlpha:1, delay:0.5, ease: Linear.easeNone});
	var table2Out = TweenMax.fromTo(".table.second", 0.1, {right: "20%",bottom :"0%", }, {autoAlpha:0, delay:0.7, ease: Linear.easeNone});
	var table3In = TweenMax.fromTo(".table.third", 0.1, {right: "20%", bottom:"0%", autoAlpha:0}, {autoAlpha:1, delay:0.7, ease: Linear.easeNone});
	
	var cups1 = TweenMax.fromTo(".cups.first", 1, {left:"-80%", top:"64%"}, {left: "500%", ease: Linear.easeNone});
	var cups2 = TweenMax.fromTo(".cups.second", 1, {left:"-160%", top:"66%"}, {left: "400%", ease: Linear.easeNone});
	var cups3 = TweenMax.fromTo(".cups.third", 1, {left:"-150%", top:"86%"}, {left: "300%", ease: Linear.easeNone});
	var cups4 = TweenMax.fromTo(".cups.fourth", 1, {left:"-250%", top:"71%"}, {left: "200%", ease: Linear.easeNone});
	
	// Textbloecke vorselektieren
	var firstTextblock  = $("#selfstudy3 > .textblock:nth-of-type(1)");
	var secondTextblock = $("#selfstudy3 > .textblock:nth-of-type(2)");
	var thirdTextblock  = $("#selfstudy3 > .textblock:nth-of-type(3)");
	
	var clock2 = TweenMax.fromTo(".clock.second", 0.1, {autoAlpha:0}, {autoAlpha:1, delay:0.2, ease: Linear.easeNone});
	var clock3 = TweenMax.fromTo(".clock.third", 0.1, {autoAlpha:0}, {autoAlpha:1, delay:0.35, ease: Linear.easeNone});
	var clock4 = TweenMax.fromTo(".clock.fourth", 0.1, {autoAlpha:0}, {autoAlpha:1, delay:0.5, ease: Linear.easeNone});
	var clock5 = TweenMax.fromTo(".clock.fifth", 0.1, {autoAlpha:0}, {autoAlpha:1, delay:0.65, ease: Linear.easeNone});	
	
	var done = TweenMax.fromTo("#selfstudy3 > .bit", 0.1, {top: "30%", left: "43%", rotation: -45, autoAlpha:0}, {autoAlpha:1, delay: 0.7,  ease: Linear.easeNone});
	
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
			day_night,
			table1Out, table2In, table2Out,	table3In,
			cups1, cups2, cups3, cups4,
			textTimeline,
			done,
			clock2, clock3, clock4, clock5
		])
		// Eigene Erweiterungsmethode um einen Szenenwechsel einzufuegen.
		.addSceneChange($("#selfstudy3 > .sceneChange"), $("#canteen"));
	
	// Die Scroll Magic Szene definieren und hinzufuegen. Sie wird in einem Scrollbereich von 12500px bis 15000px abgespielt.
	addScene(new ScrollScene({duration: 2500})
		.setTween(sceneTimeline)
		.addTo(controller));
});