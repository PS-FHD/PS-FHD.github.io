/***********************************************************************************
 *    Definition Mensa.
 *    
 *    Hinweis: ready ist ein jQuery Ereignis das aufgerufen wird, sobald der Browser
 *             das erstellen des DOM-Baums beendet hat.
 *    Dokumentation zu TweenMax und allen unterst�tzen Optionen: http://www.greensock.com/tweenmax/
 **********************************************************************************/
$(document).ready(function($) {
	// die Studenten im Hintergrund jeweils ausblenden um Überlagerung zu verhindern.
	var student2In = TweenMax.fromTo("#canteen > .boy.second", 0.05, {autoAlpha: 0}, {autoAlpha: 1});	
	var student3In = TweenMax.fromTo("#canteen > .boy.third", 0.05, {autoAlpha: 0}, {autoAlpha: 1});
	var student4In = TweenMax.fromTo("#canteen > .boy.fourth", 0.05, {autoAlpha: 0}, {autoAlpha: 1});	
	var student5In = TweenMax.fromTo("#canteen > .boy.fifth", 0.05, {autoAlpha: 0}, {autoAlpha: 1});
	var student1Out = TweenMax.to("#canteen > .boy.first", 0.02, {autoAlpha: 0, delay: 0.04, ease: Linear.easeNone});
	var student2Out = TweenMax.to("#canteen > .boy.second", 0.02, {autoAlpha: 0, delay: 0.04, ease: Linear.easeNone});	
	var student3Out = TweenMax.to("#canteen > .boy.third", 0.02, {autoAlpha: 0, delay: 0.04, ease: Linear.easeNone});
	var student4Out = TweenMax.to("#canteen > .boy.fourth", 0.02, {autoAlpha: 0, delay: 0.04, ease: Linear.easeNone});
	
	var studentTimeline = new TimelineMax()
	  .appendMultiple([student2In, student1Out], 0.2)
	  .appendMultiple([student3In, student2Out], 0.1)
	  .appendMultiple([student4In, student3Out], 0.1)
	  .appendMultiple([student5In, student4Out], 0.1);
	  
	
	var food1 = TweenMax.to("#canteen > .food.first", 0.62, {left:"-40%", ease: Linear.easeNone});
	var food2 = TweenMax.to("#canteen > .food.second", 0.62, {left:"-40%", ease: Linear.easeNone, delay:0.07});
	var food3 = TweenMax.to("#canteen > .food.third", 0.62, {left:"-40%", ease: Linear.easeNone, delay:0.14});
	
	//texte f�r food
	var pommes 	= TweenMax.to("#canteen > .food1txt", 0.62, {left:"-38%", ease: Linear.easeNone});
	var bifteki	= TweenMax.to("#canteen > .food2txt", 0.62, {left:"-38%", ease: Linear.easeNone, delay:0.07});
	var gemuese	= TweenMax.to("#canteen > .food3txt",  0.62, {left:"-38%", ease: Linear.easeNone, delay:0.14});
	
	var foodSub	= TweenMax.fromTo("#canteen > .food.subtxt",  0.62, {left: "110%", bottom:"6%", autoAlpha: 0}, {left:"-40%", autoAlpha: 1, ease: Linear.easeNone, delay:0.03});	
	
	var souce1 = TweenMax.to("#canteen > .souce.first", 0.62, {left:"-40%", ease: Linear.easeNone, delay: 0.28});
	var souce2 = TweenMax.to("#canteen > .souce.second", 0.62, {left:"-40%", ease: Linear.easeNone, delay:0.35});
	var souce3 = TweenMax.to("#canteen > .souce.third", 0.62, {left:"-40%", ease: Linear.easeNone, delay:0.42});
	
	// texte f�r souce ; unterschiedliche "left"-Werte für leichten Parallaxeneffekt der Schrift
	var curry = TweenMax.to("#canteen > .souce1txt", 0.62, {left:"-37%", ease: Linear.easeNone, delay: 0.28});
	var pesto = TweenMax.to("#canteen > .souce2txt", 0.62, {left:"-36%", ease: Linear.easeNone, delay:0.42});
	var tomato = TweenMax.to("#canteen > .souce3txt", 0.62, {left:"-38%", ease: Linear.easeNone, delay:0.35});
	
	var souceSub = TweenMax.fromTo("#canteen > .souce.subtxt", 0.62, {left: "110%", bottom:"6%", autoAlpha: 0}, {left:"-40%",autoAlpha:1, ease: Linear.easeNone, delay:0.32});
	
	
	var arrow = TweenMax.fromTo("#canteen > .arrow", 0.1, {rotation: -10, autoAlpha: 0}, {autoAlpha: 1, delay: 0.6, ease: Linear.easeNone});
	
	var dessert = TweenMax.fromTo("#canteen > .dessertlink", 0.3, {left:"120%"}, {left:"70%", delay: 0.3, ease: Linear.easeNone});	
	
	var headIn 	= TweenMax.fromTo("header.canteen", 0.4, {top: "15%", left:"-40%"}, { left:"15%", delay: 0.1, ease: Linear.easeNone});
	var textIn 	= TweenMax.fromTo("section.canteen", 0.4, {top: "23%", left: "-80%" }, { left:"15%", delay: 0.1, ease: Linear.easeNone});
	
	var appLink = TweenMax.fromTo("#canteen > .bit", 0.1, {autoAlpha: 0}, {autoAlpha:1, ease: Linear.easeNone, delay:0.6});
	
	// Die Zeitleiste der Szene
	var sceneTimeline = new TimelineMax()
		.add([
		  studentTimeline,
			souce1,
			souce2,
			souce3,
			food1,
			food1,
			food2,
			food3,
			arrow,
			dessert,
			headIn,
			textIn,
			pommes,
			bifteki,
			gemuese,
			foodSub,
			curry,
			pesto,
			tomato,
			souceSub,
			appLink
		])
		//Eigene Erweiterungsmethode um einen Szenenwechsel einzufuegen.
		.addSceneChange($("#canteen > .sceneChange"), $("#feature"));
	
	// Die Scroll Magic Szene definieren und hinzufuegen. Sie wird in einem Scrollbereich von 15000px bis 17500px abgespielt.
	addScene("canteen", new ScrollScene({duration: 2500})
		.setTween(sceneTimeline)
		.addTo(controller));
});