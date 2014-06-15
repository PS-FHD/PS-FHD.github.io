/***********************************************************************************
 *    Definition Introszene 1.
 *    
 *    Hinweis: ready ist ein jQuery Ereignis das aufgerufen wird, sobald der Browser
 *             das erstellen des DOM-Baums beendet hat.
 *    Dokumentation zu TweenMax und allen unterstuetzten Optionen: http://www.greensock.com/tweenmax/
 **********************************************************************************/
$(document).ready(function($) {
	// Der Hinweis zum Scrollen wird nach einer halben Sekunde ueber eine Zeitspanne von einer Sekunde eingeblendet.
	var scrollHintIn = TweenMax.from("#intro1 > .scrollhint", 1, {autoAlpha: 0, delay: 0.5, ease: Linear.easeNone});
	/* Nach einer Zeitspanne von fuenf Sekunden, wird eine Daueranimation (repeat: -1) gestartet die staendig vor- und zurueck abgespielt
	   (yoyo) wird. Da keine explizite Easing-Function angegeben wurde, wird Quad.easeOut verwendet. */
	var scrollHintBounce = TweenMax.to("#intro1 > .scrollhint", 1, {left: "78%", repeat: -1, yoyo: true, delay: 1});

	// Der erste Textblock wird ueber 10% der Szene durch Skalierung von 0 auf 1 eingeblendet.
	var textBlockOneIn = TweenMax.from("#intro1 > .textblock:nth-of-type(1)", 0.1, {top: "-10%", scale: 0, ease: Linear.easeNone});
	// ... und wieder ausgeblendet.
	var textBlockOneOut = TweenMax.to("#intro1 > .textblock:nth-of-type(1)", 0.05, {top: "-10%", scale: 0});
	
	// Die einzelnen Woerter werden jeweils durch Skalierung sowie Drehung eingeblendet.
	var bitOneIn = TweenMax.fromTo("#intro1 > .bit.one", 0.1, {left: "2%", top: "37%", scale: 0, rotation: 160}, {scale: 1, rotation: 342});
	var bitTwoIn = TweenMax.fromTo("#intro1 > .bit.two", 0.1, {left: "29%", top: "45%", scale: 0, rotation: 40}, {scale: 1, rotation: 390});
	var bitThreeIn = TweenMax.fromTo("#intro1 > .bit.three", 0.1, {left: "15%", top: "60%", scale: 0}, {scale: 1, rotation: 15});
	// ... und genau so wieder ausgeblendet.
	var bitOneOut = TweenMax.to("#intro1 > .bit.one", 0.05, {scale: 0, rotation: 160});
	var bitTwoOut = TweenMax.to("#intro1 > .bit.two", 0.05, {scale: 0, rotation: 40});
	var bitThreeOut = TweenMax.to("#intro1 > .bit.three", 0.05, {scale: 0, rotation: 15});
	
	// Der zweite Textblock wird durch alpha-blending animiert.
	var textBlockTwoIn = TweenMax.from("#intro1 > .textblock:nth-of-type(2)", 0.1, {autoAlpha: 0, ease: Linear.easeNone}); 
	
	// Zusaetzliche Zeitleiste fuer die Elemente die nacheinander Abgespielt werden sollen.
	var sequenceTimeline = new TimelineMax()
		.append(textBlockOneIn, 0.10) // Ab 10%, ersten Textblock einblenden.
		.append(bitOneIn, 0.005) // ... danach jeweils im Abstand von 0.5% die einzelnen Woerter.
		.append(bitTwoIn, 0.005)
		.append(bitThreeIn, 0.005)
		// Nach weiteren 4%, gleichzeitig den ersten Textblock und die Woerter ausblenden und den Zweiten einblenden.
		.append([
			textBlockOneOut, 
			bitOneOut, bitTwoOut, bitThreeOut,
			textBlockTwoIn,
		], 0.04);

	// Das Hintergrundbild der Szene wird ueber die gesamte Szenenlaenge um 500 pixel nach links verschoben.
	var background = TweenMax.to("#intro1", 1, {backgroundPosition: "-500px 0px", ease: Linear.easeNone});
	
	/* Die Wolken fliegen jeweils von unterschiedlichen Startpositionen aus nach links zu einer jeweiligen Endposition. 
	   Die unterschiedlichen Geschwindigkeiten entstehen dabei durch die unterschiedlichen Abstaende zwischen Start- und Endposition. */
	var cloudOne   = TweenMax.fromTo("#intro1 > .cloud.one", 1, {left: "50%"}, {left: "-15%", ease: Linear.easeNone});
	var cloudTwo   = TweenMax.fromTo("#intro1 > .cloud.two", 1, {left: "30%"}, {left: "-25%", ease: Linear.easeNone});
	var cloudThree = TweenMax.fromTo("#intro1 > .cloud.three", 1, {left: "100%"}, {left: "10%", ease: Linear.easeNone});
	var cloudFour  = TweenMax.fromTo("#intro1 > .cloud.four", 1, {left: "180%"}, {left: "25%", ease: Linear.easeNone});
	
	/* Das Flugzeug fliegt entgegen der Scrollrichtung, gewinnt dabei an Hoehe und schrumpft bis es nicht mehr zu sehen ist
	   Hierbei gibt scale den Vergroesserungsfaktor an. Bei scale: 0 ist das Flugzeug nicht mehr sichtbar. */
	var airplane 	= TweenMax.fromTo("#intro1 > .airplane", 1, {left: "-35%", top: "30%", scale: 2}, {left: "105%", top: "-5%", scale: 0.5, ease: Linear.easeNone});
	
	// Die Zeitleiste der Szene
	var sceneTimeline = new TimelineMax()
		// Tweens hinzufuegen die parallel Abgespielt werden sollen. 
		.add([
			sequenceTimeline,  
			background, 
			cloudOne, cloudTwo, cloudThree, cloudFour,   
			airplane
		])
		// Eigene Erweiterungsmethode um einen Szenenwechsel einzufuegen.
		.addSceneChange($("#intro1 > .sceneChange"), $("#intro2"));
	
	// Die Scroll Magic Szene definieren und hinzufuegen. Sie wird in einem Scrollbereich von 0px bis 2500px abgespielt.
	addScene(new ScrollScene({duration: 5000})
		.setTween(sceneTimeline)
		.addTo(controller)
		.on("enter", scene_enter)
		.on("progress", scene_progress));
	
	/***********************************************************************************
	 *    Event-Handler der beim Starten der Szene (Eintritt in die Szene durch Scrollen) aufgerufen wird.
	 *    'Beendet' den ScrollHint. 
	 *    @param event Die Ereignisdaten.
	 **********************************************************************************/
	function scene_enter(event) {
			scrollHintIn.duration(0.25);
			scrollHintIn.reverse();
			scrollHintBounce.pause();
	}
	
	/***********************************************************************************
	 *    Event-Handler der bei Fortschrittsaenderung der Szene aufgerufen wird.
	 *    
	 *    @param event Die Ereignisdaten.
	 **********************************************************************************/
	function scene_progress(event) {
		// event.scrollDirection liefert als Scrollrichtung FORWARD REVERSE oder PAUSED.
		var scrollDirection = event.scrollDirection;
		
		// Aenderung des Flugzeugbildes bei Richtungswechsel
		if (scrollDirection == "REVERSE") 
			$("#intro1 > .airplane").attr({src: "img/Einleitung/einl_hg_flugzeug_reversed_ver2_239x87.png"});
		else if (scrollDirection == "FORWARD")
			$("#intro1 > .airplane").attr({src: "img/Einleitung/einl_hg_flugzeug_ver2_239x87.png"});
	}
});