/***********************************************************************************
 *    Definition Vorlesung.
 *    
 *    Hinweis: ready ist ein jQuery Ereignis das aufgerufen wird, sobald der Browser
 *             das erstellen des DOM-Baums beendet hat.
 *    Dokumentation zu TweenMax und allen unterstuetzen Optionen: http://www.greensock.com/tweenmax/
 **********************************************************************************/
$(document).ready(function($) {
	// Das Hintergrundbild im div wird um 500 pixel nach links verschoben.
	var background = TweenMax.to("#outro", 1, {backgroundPosition: "-500px 0px", ease: Linear.easeNone});

	// Sonne von oben rechts nach unten links wandern lassen
	var sun = TweenMax.fromTo("#outro > .sun", 1, {top: "-50%", left:"40%"}, { top:"15%", left:"20%", ease: Linear.easeNone});
	// Bäume im Vordergrund animieren
	var foregroundTree1 = TweenMax.fromTo("#outro > .foreground.tree.first", 0.5, {left: "100%"}, {left: "-105%", delay: 0.1, ease: Linear.easeNone});
	var foregroundTree2 = TweenMax.fromTo("#outro > .foreground.tree.second", 0.4, {left: "100%"}, {left: "38%", delay: 0.6, ease: Linear.easeNone});
	// Wolke animieren
	var cloud = TweenMax.fromTo("#outro > .cloud", 1, {left: "100%"}, {left: "28%", ease: Linear.easeNone});

	// Textbloecke vorselektieren
	var firstTextblock  = $("#outro > .textblock:nth-of-type(1)");
	var secondTextblock = $("#outro > .textblock:nth-of-type(2)");
	// Da die Tweens fuer die Textbloecke hintereinander Abgespielt werden, ist hier eine zusaetzliche Zeitleiste sinnvoll.
	var textTimeline = new TimelineMax()
		// Ab start der Zeitleiste den ersten Textblock ueber eine Dauer von 20% einblenden. 
		.append(TweenMax.from(firstTextblock, 0.30, {left: "-40%", ease: Linear.easeNone}))
		// .. danach 25% lang warten, dann den ersten Textblock ueber eine Dauer von 5% ausblenden.
		.append(TweenMax.to(firstTextblock, 0.05, {delay: 0.35, autoAlpha: 0}))
		// .. danach zweiten Textblock ueber eine Dauer von 20% einblenden etc.
		.append(TweenMax.from(secondTextblock, 0.20, {left: "-40%", ease: Linear.easeNone}))

	// Die Zeitleiste der Szene
	var sceneTimeline = new TimelineMax()
		.add([
			background,
			sun,
			foregroundTree1,
			foregroundTree2,
			cloud,
			textTimeline
		]);
	
	// Die Scroll Magic Szene definieren und hinzufuegen. Sie wird in einem Scrollbereich von 17500px bis 22500px abgespielt.
	addScene("outro", new ScrollScene({duration: 5000})
		.setTween(sceneTimeline)
		.addTo(controller));
});