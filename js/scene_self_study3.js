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
	
	
	var self3_headIn = TweenMax.fromTo("header.self3", 0.3, {top: "10%", left:"-80%"}, { left:"2%",  ease: Linear.easeNone});
	var self3_textIn = TweenMax.fromTo("section.self3", 0.3, {top: "28%", left: "-80%" }, { left:"2%",  ease: Linear.easeNone});
	
	var self3_headOut = TweenMax.to("header.self3", 0.2, {autoAlpha:0, delay:0.3});
	var self3_textOut = TweenMax.to("section.self3", 0.2, {autoAlpha:0, delay:0.3});
	
	var self3_a_headIn 	= TweenMax.fromTo("header.self3_a", 0.3, {top: "10%", left:"-80%"}, { delay:0.2 , left:"2%" ,ease: Linear.easeNone});
	var self3_a_textIn 	= TweenMax.fromTo("section.self3_a", 0.3, {top: "28%", left: "-80%" }, { delay: 0.2, left:"2%",  ease: Linear.easeNone});
	
	var self3_a_headOut = TweenMax.to("header.self3_a", 0.2, {autoAlpha:0, delay:0.6});
	var self3_a_textOut = TweenMax.to("section.self3_a", 0.2, {autoAlpha:0, delay:0.6});
	
	var self3_b_headIn 	= TweenMax.fromTo("header.self3_b", 0.2, {top: "10%", left:"-80%"}, { delay:0.5 , left:"2%" ,ease: Linear.easeNone});
	var self3_b_textIn 	= TweenMax.fromTo("section.self3_b", 0.2, {top: "28%", left: "-80%" }, { delay: 0.5, left:"2%",  ease: Linear.easeNone});
	
	
	var done =  TweenMax.fromTo(".self3.bit", 0.2, {top: "45%", left: "45%", rotation:-15, autoAlpha: 0 }, { autoAlpha:1 ,delay: 0.5, ease: Linear.easeNone});
	
	// Die tatsaechlich errechnete Breite der ersten Szene ermitteln.
	var actualSceneWidth = parseInt($("#selfstudy3").css("width"), 10);
	var sceneChangeElement = $("#selfstudy3 > .sceneChange");
	
	/* Beide tweens fuer den Szenenwechsel, einmal das Gebaeude welches am Ende der ersten Szene startet und dann ganz links wieder hinaus scrollt,
	   und einmal die Szene die sich kurz dahinter mit durch schiebt. */
	 var sceneChangeBuilding = TweenMax.to("#selfstudy3 > .sceneChange", 0.15, {top: "0", left: "-" + sceneChangeElement.css("width"), startAt: {left: actualSceneWidth + "px"}, ease: Linear.easeNone});
	 var nextSceneIn = TweenMax.to("#canteen", 0.15, {top: "0", left: "0", startAt: {left: actualSceneWidth + "px"}, ease: Linear.easeNone});
	
	// Die Zeitleiste
	var timelineTween6 = new TimelineMax()
		.add([
		      day_night,
		      table1Out,
		      table2In,
		      table2Out,
		      table3In,
		      cups1,
		      cups2,
		      cups3,
		      cups4,
		      self3_headIn,
		      self3_textIn,
		      self3_headOut,
		      self3_textOut,
		      self3_a_headIn,
		      self3_a_textIn,
		      self3_a_headOut,
		      self3_a_textOut,
		      self3_b_headIn,
		      self3_b_textIn,
		      done
		      
			])
	//	Die zwei Tweens fuer den Szenenwechsel. Werden erst am 85% der Szene abgespielt.
		.insertMultiple(
			[sceneChangeBuilding, nextSceneIn], 0.85
		);
	
	
	/* Die Scroll Magic Scene fuer die zweite Introszene definieren.
	   Sie geht von 1000px bis 2000px.*/
	var scene = new ScrollScene({offset: 5000, duration: 1000, loglevel: 3})
	//	.setTween(backgroundTween)
		.setTween(timelineTween6)
		.addTo(controller);
});