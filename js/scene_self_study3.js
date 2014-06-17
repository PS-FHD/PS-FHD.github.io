/***********************************************************************************
 *    Definition Vorlesung.
 *    
 *    Hinweis: ready ist ein jQuery Ereignis das aufgerufen wird, sobald der Browser
 *             das erstellen des DOM-Baums beendet hat.
 *    Dokumentation zu TweenMax und allen unterstuetzen Optionen: http://www.greensock.com/tweenmax/
 **********************************************************************************/
$(document).ready(function($) {
	var dayNight = TweenMax.to("#selfstudy3 > .middleground > .daynight", 1, {left: "-=31.55%", ease: Linear.easeNone});
	
	var table1Out = TweenMax.to("#selfstudy3 > .student.first", 0.1, {autoAlpha: 0, delay: 0.5, ease: Linear.easeNone});
	var table2In  = TweenMax.fromTo("#selfstudy3 > .student.second", 0.1, {autoAlpha: 0}, {autoAlpha: 1, delay: 0.5, ease: Linear.easeNone});
	var table2Out = TweenMax.to("#selfstudy3 > .student.second", 0.1, {autoAlpha: 0, delay: 0.7, ease: Linear.easeNone});
	var table3In  = TweenMax.fromTo("#selfstudy3 > .student.third", 0.1, {autoAlpha: 0}, {autoAlpha: 1, delay: 0.7, ease: Linear.easeNone});
	
	var cups1 = TweenMax.fromTo("#selfstudy3 > .foreground.first", 1, {left: "-80%"}, {left: "500%", ease: Linear.easeNone});
	var cups2 = TweenMax.fromTo("#selfstudy3 > .foreground.second", 1, {left: "-160%"}, {left: "400%", ease: Linear.easeNone});
	var cups3 = TweenMax.fromTo("#selfstudy3 > .foreground.third", 1, {left: "-150%"}, {left: "300%", ease: Linear.easeNone});
	var cups4 = TweenMax.fromTo("#selfstudy3 > .foreground.fourth", 1, {left: "-250%"}, {left: "200%", ease: Linear.easeNone});
	
	var clock2 = TweenMax.fromTo("#selfstudy3 > .middleground > .clock.second", 0.1, {autoAlpha:0}, {autoAlpha:1, delay:0.2, ease: Linear.easeNone});
	var clock3 = TweenMax.fromTo("#selfstudy3 > .middleground > .clock.third", 0.1, {autoAlpha:0}, {autoAlpha:1, delay:0.35, ease: Linear.easeNone});
	var clock4 = TweenMax.fromTo("#selfstudy3 > .middleground > .clock.fourth", 0.1, {autoAlpha:0}, {autoAlpha:1, delay:0.5, ease: Linear.easeNone});
	var clock5 = TweenMax.fromTo("#selfstudy3 > .middleground > .clock.fifth", 0.1, {autoAlpha:0}, {autoAlpha:1, delay:0.65, ease: Linear.easeNone});
	
	var done = TweenMax.fromTo("#selfstudy3 > .bit", 0.1, {rotation: -45, autoAlpha:0}, {autoAlpha:1, delay: 0.7,  ease: Linear.easeNone});
	
	// Textbloecke vorselektieren
	var firstTextblock  = $("#selfstudy3 > .textblock:nth-of-type(1)");
	var secondTextblock = $("#selfstudy3 > .textblock:nth-of-type(2)");
	var thirdTextblock  = $("#selfstudy3 > .textblock:nth-of-type(3)");
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
			dayNight,
			table1Out, table2In, table2Out,	table3In,
			cups1, cups2, cups3, cups4,
			textTimeline,
			done,
			clock2, clock3, clock4, clock5
		])
		// Eigene Erweiterungsmethode um einen Szenenwechsel einzufuegen.
		.addSceneChange($("#selfstudy3 > .sceneChange"), $("#canteen"));
	
	// Die Scroll Magic Szene definieren und hinzufuegen. Sie wird in einem Scrollbereich von 12500px bis 15000px abgespielt.
	addScene("selfstudy3", new ScrollScene({duration: 2500})
		.setTween(sceneTimeline)
		.addTo(controller));
});