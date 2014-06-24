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

	// Sonne von oben rechts nach unten links wandern lassen.
	var sun = TweenMax.fromTo("#outro > .sun", 1, {top: "-50%", left:"40%"}, { top:"15%", left:"20%", ease: Linear.easeNone});
	
	// Schwarze Baeume im Vordergrund nach links schieben. 
	var foregroundTree1 = TweenMax.fromTo("#outro > .foreground.tree.first", 0.5, {left: "100%"}, {left: "-105%", delay: 0.1, ease: Linear.easeNone});
	var foregroundTree2 = TweenMax.fromTo("#outro > .foreground.tree.second", 0.4, {left: "100%"}, {left: "38%", delay: 0.6, ease: Linear.easeNone});
	
	// Wolke nach links schieben.
	var cloud = TweenMax.fromTo("#outro > .cloud", 1, {left: "100%"}, {left: "28%", ease: Linear.easeNone});
	
	/* Das Flugzeug fliegt entgegen der Scrollrichtung, gewinnt dabei an Hoehe und schrumpft bis es nicht mehr zu sehen ist
	   Hierbei gibt scale den Vergroesserungsfaktor an. Bei scale: 0 ist das Flugzeug nicht mehr sichtbar. */
	var airplane 	= TweenMax.fromTo("#outro > .airplane", 1, {left: "115%", top: "30%", scale: 2}, {left: "-35%", top: "-5%", scale: 0.2, ease: Linear.easeNone});
	
	// Flugzeugbilder im Browsercache bereitstellen um Flugzeug je nach Scrollrichtung per Richtungswechsel landen bzw starten lassen zu koennen- siehe scene_progress(event)
	var airplaneImgForw	= new Image();
	var airplaneImgRev	= new Image();
	
	airplaneImgForw.src	= "img/Outro/outro_hg_flugzeug_414x150.png"; // Flugzeug vorwaerts
	airplaneImgRev.src	= "img/Outro/outro_hg_flugzeug_reversed_414x150.png"; // Flugzeug rueckwaerts
	
	// Textbloecke vorselektieren.
	var firstTextblock  = $("#outro > .textblock:nth-of-type(1)");
	var secondTextblock = $("#outro > .textblock:nth-of-type(2)");
	
	// Die Zeitleiste fuer die Textbloecke.
	var textTimeline = new TimelineMax()
		// Ab start der Zeitleiste den ersten Textblock ueber eine Dauer von 30% einblenden. 
		.append(TweenMax.from(firstTextblock, 0.30, {left: "-40%", ease: Linear.easeNone}))
		// .. danach 25% lang warten, dann den ersten Textblock ueber eine Dauer von 5% ausblenden.
		.append(TweenMax.to(firstTextblock, 0.05, {delay: 0.35, autoAlpha: 0}))
		// .. danach zweiten Textblock ueber eine Dauer von 20% einblenden etc.
		.append(TweenMax.from(secondTextblock, 0.20, {left: "-40%", ease: Linear.easeNone}));

	// Die Zeitleiste der Szene
	var sceneTimeline = new TimelineMax()
		.add([
			background,
			sun,
			airplane,
			foregroundTree1,
			foregroundTree2,
			cloud,
			textTimeline
		]);
	
	// Die Scroll Magic Szene definieren und hinzufuegen.
	addScene("outro", new ScrollScene({duration: 5000})
		.setTween(sceneTimeline)
		.addTo(controller)
		.on("progress", scene_progress));
		
	/***********************************************************************************
	 *    Event-Handler der bei Fortschrittsaenderung der Szene aufgerufen wird.
	 *    
	 *    @param event Die Ereignisdaten.
	 **********************************************************************************/
	function scene_progress(event) {
		// event.scrollDirection liefert als Scrollrichtung FORWARD REVERSE oder PAUSED.
		var scrollDirection = event.scrollDirection;
		
		// Aenderung des Flugzeugbildes bei Richtungswechsel - PAUSED nicht relevant (aktuelles Bild bleibt automatisch erhalten)
		if (scrollDirection == "REVERSE") 
			$("#outro > .airplane").attr({src: airplaneImgRev.src});
		else if (scrollDirection == "FORWARD")
			$("#outro > .airplane").attr({src: airplaneImgForw.src});
	}
});