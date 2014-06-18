/***********************************************************************************
 *    Definition Vorlesung.
 *    
 *    Hinweis: ready ist ein jQuery Ereignis das aufgerufen wird, sobald der Browser
 *             das erstellen des DOM-Baums beendet hat.
 *    Dokumentation zu TweenMax und allen unterstuetzen Optionen: http://www.greensock.com/tweenmax/
 **********************************************************************************/
$(document).ready(function($) {
	// Browserfixes anwenden.
	bf_SizeContainerToInnerImg($("#selfstudy3 > .middleground > .background"));
	
	var dayNight = TweenMax.to("#selfstudy3 > .middleground > .daynight", 1, {left: "-=100%", ease: Linear.easeNone});
	
	var table1Out = TweenMax.to("#selfstudy3 > .student.first", 0.1, {autoAlpha: 0, ease: Linear.easeNone});
	var table2In  = TweenMax.fromTo("#selfstudy3 > .student.second", 0.1, {autoAlpha: 0}, {autoAlpha: 1, ease: Linear.easeNone});
	var table2Out = TweenMax.to("#selfstudy3 > .student.second", 0.1, {autoAlpha: 0, ease: Linear.easeNone});
	var table3In  = TweenMax.fromTo("#selfstudy3 > .student.third", 0.1, {autoAlpha: 0}, {autoAlpha: 1, ease: Linear.easeNone});
	var doneBitIn = TweenMax.fromTo("#selfstudy3 > .bit", 0.1, {rotation: -45, autoAlpha: 0}, {autoAlpha: 1, ease: Linear.easeNone});
	
	var clock2 = TweenMax.fromTo("#selfstudy3 > .middleground > .clock.second", 0.1, {autoAlpha: 0}, {autoAlpha: 1, ease: Linear.easeNone});
	var clock3 = TweenMax.fromTo("#selfstudy3 > .middleground > .clock.third", 0.1, {autoAlpha: 0}, {autoAlpha: 1, ease: Linear.easeNone});
	var clock4 = TweenMax.fromTo("#selfstudy3 > .middleground > .clock.fourth", 0.1, {autoAlpha: 0}, {autoAlpha: 1, ease: Linear.easeNone});
	var clock5 = TweenMax.fromTo("#selfstudy3 > .middleground > .clock.fifth", 0.1, {autoAlpha: 0}, {autoAlpha: 1, ease: Linear.easeNone});
	
	var textBlockOneIn = TweenMax.from("#selfstudy3 > .textblock:nth-of-type(1)", 0.05, {left: "-40%", ease: Linear.easeNone});
	var textBlockOneOut = TweenMax.to("#selfstudy3 > .textblock:nth-of-type(1)", 0.05, {autoAlpha: 0});
	var textBlockTwoIn = TweenMax.from("#selfstudy3 > .textblock:nth-of-type(2)", 0.05, {left: "-40%", ease: Linear.easeNone});
	var textBlockTwoOut = TweenMax.to("#selfstudy3 > .textblock:nth-of-type(2)", 0.05, {autoAlpha: 0});
	var textBlockThreeIn = TweenMax.from("#selfstudy3 > .textblock:nth-of-type(3)", 0.05, {left: "-40%", ease: Linear.easeNone});
	
	var tableTimeline = new TimelineMax()
	  .appendMultiple([table1Out, table2In], 0.30)
	  .appendMultiple([table2Out, table3In, doneBitIn], 0.20);
	
	var clockTimeline = new TimelineMax()
	  .append(clock2, 0.09)
	  .append(clock3, 0.09)
	  .append(clock4, 0.09)
	  .append(clock5, 0.07);
	
	// Da die Tweens fuer die Textbloecke hintereinander Abgespielt werden, ist hier eine zusaetzliche Zeitleiste sinnvoll.
	var textBlockTimeline = new TimelineMax()
		// Ab start der Zeitleiste den ersten Textblock ueber eine Dauer von 10% einblenden. 
		.append(textBlockOneIn)
		// .. danach 15% lang warten, dann den ersten Textblock ueber eine Dauer von 5% ausblenden.
		.append(textBlockOneOut, 0.20)
		// .. danach zweiten Textblock ueber eine Dauer von 10% einblenden etc.
		.append(textBlockTwoIn)
		.append(textBlockTwoOut, 0.15)
		.append(textBlockThreeIn);
	
	var cups1 = TweenMax.fromTo("#selfstudy3 > .foreground.first", 1, {left: "-80%"}, {left: "500%", ease: Linear.easeNone});
	var cups2 = TweenMax.fromTo("#selfstudy3 > .foreground.second", 1, {left: "-160%"}, {left: "400%", ease: Linear.easeNone});
	var cups3 = TweenMax.fromTo("#selfstudy3 > .foreground.third", 1, {left: "-150%"}, {left: "300%", ease: Linear.easeNone});
	var cups4 = TweenMax.fromTo("#selfstudy3 > .foreground.fourth", 1, {left: "-250%"}, {left: "200%", ease: Linear.easeNone});
	
	// Die Zeitleiste der Szene
	var sceneTimeline = new TimelineMax()
		.add([
			dayNight,
			cups1, cups2, cups3, cups4,
			tableTimeline,
			textBlockTimeline,
			clockTimeline
		])
		// Eigene Erweiterungsmethode um einen Szenenwechsel einzufuegen.
		.addSceneChange($("#selfstudy3 > .sceneChange"), $("#canteen"));
	
	// Die Scroll Magic Szene definieren und hinzufuegen. Sie wird in einem Scrollbereich von 12500px bis 15000px abgespielt.
	addScene("selfstudy3", new ScrollScene({duration: 10000})
		.setTween(sceneTimeline)
		.addTo(controller));
});