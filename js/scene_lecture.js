/***********************************************************************************
 *    Definition Vorlesung.
 *    
 *    Hinweis: ready ist ein jQuery Ereignis das aufgerufen wird, sobald der Browser
 *             das erstellen des DOM-Baums beendet hat.
 *    Dokumentation zu TweenMax und allen unterstützen Optionen: http://www.greensock.com/tweenmax/
 **********************************************************************************/
$(document).ready(function($) {
	// Das Hintergrundbild im div wird um 840 pixel nach links verschoben.
	
	// Himmel
	var backgroundSky = TweenMax.to("#lecture > .sky", 1, {left: "364px", ease: Linear.easeNone});
	
	// Baum
	var orangeLeaves = TweenMax.fromTo("#lecture > .tree.leaves.orange", 0.5, {autoAlpha:1}, {ease: Linear.easeNone, autoAlpha:0, delay:0.2});
	var redLeaves	 = TweenMax.fromTo("#lecture > .tree.leaves.red", 0.5, {autoAlpha:1}, {ease: Linear.easeNone, autoAlpha:0, delay:0.2});
	
	// Schnee
	var snow = TweenMax.fromTo("#lecture > .snow", 0.6, {top:"-75%"}, {top:"25%", ease: Linear.easeNone, delay:0.4});
	
	// Sitzreihen
	var row1 = TweenMax.fromTo("#lecture > .row.first", 1, {left: "10%"}, {left:"9%", ease: Linear.easeNone});
	var row2 = TweenMax.fromTo("#lecture > .row.second", 1, {left: "10%"}, {left:"4.5%", ease: Linear.easeNone});
	var row3 = TweenMax.fromTo("#lecture > .row.third", 1, {left: "10%"}, {left:"1%", ease: Linear.easeNone});
	var front = TweenMax.fromTo("#lecture > .front", 1, {left: "10%"}, {left:"-3.3%", ease: Linear.easeNone});
	
	var prof = TweenMax.fromTo("#lecture > .prof", 1, {left: "90%"}, {left:"29%"});
	
	// Personen Reihe 1
	var prow1_1 = TweenMax.fromTo("#lecture > .ppl1.first", 1, {left: "10%"}, {left:"4.5%", ease: Linear.easeNone});
	var prow1_2 = TweenMax.fromTo("#lecture > .ppl1.second", 0.7, {left: "10%", autoAlpha:1}, {left:"4.5%", autoAlpha:0, delay:0.3, ease: Linear.easeNone});
	var prow1_3 = TweenMax.fromTo("#lecture > .ppl1.third", 1, {left: "10%"}, {left:"4.5%", ease: Linear.easeNone});
	var prow1_4 = TweenMax.fromTo("#lecture > .ppl1.fourth", 0.8, {left: "10%", autoAlpha:1}, {left:"4%", autoAlpha:0, ease: Linear.easeNone});
	// Personen Reihe 2
	var prow2_1 = TweenMax.fromTo("#lecture > .ppl2.first", 1, {left: "10%"}, {left:"1%", ease: Linear.easeNone});
	var prow2_2 = TweenMax.fromTo("#lecture > .ppl2.second", 0.3, {left: "10%", autoAlpha:1}, {left:"6%", autoAlpha:0, ease: Linear.easeNone});
	var prow2_3 = TweenMax.fromTo("#lecture > .ppl2.third",1, {left: "10%"}, {left:"1%", ease: Linear.easeNone});
	// personen Reihe 3
	var prow3_1 = TweenMax.fromTo("#lecture > .ppl3.first", 0.6, {left: "10%", autoAlpha:1}, {left:"1%", autoAlpha:0, ease: Linear.easeNone});
	var prow3_2 = TweenMax.fromTo("#lecture > .ppl3.second", 1, {left: "10%"}, {left:"-3.3%", ease: Linear.easeNone}); 
	
	// Gedanken
	var think1 = TweenMax.fromTo("#lecture > .think.first", 1, {top: "56%",left: "32%", autoAlpha:0}, {left:"28.5%", autoAlpha:1});
	var think2 = TweenMax.fromTo("#lecture > .think.second", 1, {top: "52%",left: "88%", autoAlpha:0}, {left:"79%", autoAlpha:1});
	var think3 = TweenMax.fromTo("#lecture > .think.third", 1, {top: "50%",left: "20%", autoAlpha:0}, {left:"11%", autoAlpha:1});

	// Folien
	var ppt1 = TweenMax.fromTo("#lecture > .ppt.first", 0.34, {autoAlpha:1}, {autoAlpha:0});
	var ppt2 = TweenMax.fromTo("#lecture > .ppt.second", 0.33, {autoAlpha:0}, { delay: 0.34, autoAlpha:1});
	var ppt3 = TweenMax.fromTo("#lecture > .ppt.third", 0.33, {autoAlpha:0}, { delay: 0.67, autoAlpha:1});
	
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
			row1, row2, row3,
			front,
			prow1_1,prow1_2,prow1_3,prow1_4,
			prow2_1,prow2_2,prow2_3,
			prow3_1,prow3_2,
			think1, think2, think3,
			ppt1, ppt2, ppt3,
			textTimeline
		])
		// Eigene Erweiterungsmethode um einen Szenenwechsel einzufuegen.
		.addSceneChange($("#lecture > .sceneChange"), $("#selfstudy1"));
	
	// Die Scroll Magic Szene definieren und hinzufuegen. Sie wird in einem Scrollbereich von 5000px bis 7500px abgespielt.
	addScene("lecture", new ScrollScene({duration: 2500})
		.setTween(sceneTimeline)
		.addTo(controller)
		.on("enter", scene_enter)
		.on("progress", scene_progress)
		.on("leave", scene_leave));
			
	/***********************************************************************************
	 *    Event-Handler der beim Eintritt in die Szene aufgerufen wird.
	 *    
	 *    @param event Objekt vom Typ "enter"
	 **********************************************************************************/
	function scene_enter(event) {
	// in scene_intro2.js wird globalCounterFirstTime in scene_progress beim Uhrstellen auf false gesetzt.
	// hier wieder auf true setzen, um urspruenglichen Wert zu erhalten.
		globalCounterFirstTime = true;	
	}
		
	/***********************************************************************************
	 *    Event-Handler der bei Fortschrittsaenderung ("progress") der Szene aufgerufen wird.
	 *    
	 *    @param event Objekt vom Typ "progress"
	 **********************************************************************************/
	function scene_progress(event) {
		/* ScrollPosition auslesen
		target liefert das DOM-Element, das das Event ausgeloest hat, also ScrollScene.
		Parent der ScrollScene ist ScrollMagic (get the parent controller).
		info("scrollPos") liefert die aktuelle ScrollPosition als Ganzzahl. */
		var scrollPosition = event.target.parent().info("scrollPos");
		
		/* ScrollRichtung auslesen
		Objekt vom Typ progress liefert mit .scrollDirection die Scrollrichtung FORWARD REVERSE oder PAUSED. */
		var scrollDirection = event.scrollDirection;
		
		// manuelles setzen der ScrollPosition auf PAUSED, falls sich ScrollPosition nicht, um mehr als +-1px geaendert hat
		if(scrollPosition == (globalTempScrollPosition+1) || scrollPosition == (globalTempScrollPosition-1)){
			scrollDirection = "PAUSED";
		}
		// globale Variablen siehe global.js
		// globale temporaere Scrollposition setzen, um beim naechsten Aufruf dieser Funktion pruefen zu koennen, ob sich der Wert um mehr als 1px geaendert hat
		globalTempScrollPosition = scrollPosition;
		
//console.log(scrollDirection);
//console.log(scrollPosition);
		
		/* 	UhrTyp (sekundenGeschwindigkeit, schnellVorwaerts, schnellRueckwaerts)
			mit Canvas entsprechend der Scrollposition und der Scrollrichtung ein bzw ausblenden */
			if (scrollDirection == "REVERSE") {
				$("#lecture > .clock > .canvasClockFastReverse").css({visibility: "visible"});
				$("#lecture > .clock > .canvasClockFast").css({visibility: "hidden"});
			}
			else if (scrollDirection == "FORWARD") {	
				$("#lecture > .clock > .canvasClockFast").css({visibility: "visible"});
				$("#lecture > .clock > .canvasClockFastReverse").css({visibility: "hidden"});
			}
			
			if ( scrollPosition < 8000 ) {
				$("#lecture > .clock > .canvasClockFast").css({visibility: "hidden"});
				$("#lecture > .clock > .canvasClockFastReverse").css({visibility: "hidden"});
				$("#lecture > .clock > .canvasClock").css({visibility: "visible"});
			}
			else if ( scrollPosition >= 8000 ) {
				$("#lecture > .clock > .canvasClockFast").css({visibility: "visible"});
				$("#lecture > .clock > .canvasClock").css({visibility: "hidden"});
			}
			
			if (scrollDirection == "PAUSED" &&  scrollPosition < 9500  ) {	
				$("#lecture > .clock > .canvasClockFast").css({visibility: "hidden"});
				$("#lecture > .clock > .canvasClockFastReverse").css({visibility: "hidden"});
				$("#lecture > .clock > .canvasClock").css({visibility: "visible"});
			}
			
			// ab ScrollPosition 9500 alle Uhren ausblenden
			if ( scrollPosition > 9500 ) {
				$("#lecture > .clock > .canvasClockFast").css({visibility: "hidden"});
				$("#lecture > .clock > .canvasClockFastReverse").css({visibility: "hidden"});
				$("#lecture > .clock > .canvasClock").css({visibility: "hidden"});
			}		
	}
	
	/***********************************************************************************
	 *    Event-Handler der beim Verlassen der Szene aufgerufen wird.
	 *    
	 *    @param event Objekt vom Typ "leave"
	 **********************************************************************************/
	function scene_leave(event) {
//console.log("Vorlesung verlassen");
//console.log(globalTempScrollPosition);
		// globale Variablen siehe global.js
		// Anzeige der normal tickenden Uhr aktiviert lassen, wenn wenn links aus der Szene herausgegangen wird
		if(globalTempScrollPosition < 8000){
			$("#lecture > .clock > .canvasClockFast").css({visibility: "hidden"});
			$("#lecture > .clock > .canvasClockFastReverse").css({visibility: "hidden"});
			$("#lecture > .clock > .canvasClock").css({visibility: "visible"}); // doppelt gemoppelt, da sowieso visible an der Stelle, aber haelt besser
		}
		else{ // rechts raus alle Uhren deaktivieren
			$("#lecture > .clock > .canvasClockFast").css({visibility: "hidden"});
			$("#lecture > .clock > .canvasClockFastReverse").css({visibility: "hidden"});
			$("#lecture > .clock > .canvasClock").css({visibility: "hidden"});
		}
	}	
});