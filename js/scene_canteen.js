/***********************************************************************************
 *    Definition Mensa.
 *    
 *    Hinweis: ready ist ein jQuery Ereignis das aufgerufen wird, sobald der Browser
 *             das erstellen des DOM-Baums beendet hat.
 *    Dokumentation zu TweenMax und allen unterstützen Optionen: http://www.greensock.com/tweenmax/
 **********************************************************************************/
$(document).ready(function($) {
	// Das Hintergrundbild im div wird um 840 pixel nach links verschoben.
	
	var student1 = TweenMax.fromTo(".boy.first", 0.2,  {left:"50%", bottom:"0%"}, {ease: Linear.easeNone});
	
	var student2 = TweenMax.fromTo(".boy.second", 0.2, {left: "50%", bottom:"0%", autoAlpha:0}, {left: "50%", bottom:"0%", delay: 0.2, autoAlpha:1});	
	var student3 = TweenMax.fromTo(".boy.third", 0.2, {left: "50%", bottom:"0%", autoAlpha:0}, {left: "50%", bottom:"0%", delay: 0.4, autoAlpha:1});	
	var student4 = TweenMax.fromTo(".boy.fourth", 0.2, {left: "50%", bottom:"0%", autoAlpha:0}, {left: "50%", bottom:"0%", delay: 0.6, autoAlpha:1});	
	var student5 = TweenMax.fromTo(".boy.fifth", 0.2, {left: "50%", bottom:"0%", autoAlpha:0}, {left: "50%", bottom:"0%", delay: 0.8,  autoAlpha:1});
	
	
	var food1 = TweenMax.to(".food.first", 0.62, {left:"-40%", ease: Linear.easeNone});
	var food2 = TweenMax.to(".food.second", 0.62, {left:"-40%", ease: Linear.easeNone, delay:0.07});
	var food3 = TweenMax.to(".food.third", 0.62, {left:"-40%", ease: Linear.easeNone, delay:0.14});
	
	//texte für food
	var pommes 	= TweenMax.to(".food1txt", 0.62, {left:"-40%", ease: Linear.easeNone});
	var bifteki	= TweenMax.to(".food2txt", 0.62, {left:"-40%", ease: Linear.easeNone, delay:0.07});
	var gemuese	= TweenMax.to(".food3txt",  0.62, {left:"-40%", ease: Linear.easeNone, delay:0.14});
	
	var foodSub	= TweenMax.fromTo(".food.subtxt",  0.62, {left: "110%", bottom:"6%", autoAlpha: 0}, {left:"-40%", autoAlpha: 1, ease: Linear.easeNone, delay:0.03});	
	
	var souce1 = TweenMax.to(".souce.first", 0.62, {left:"-40%", ease: Linear.easeNone, delay: 0.28});
	var souce2 = TweenMax.to(".souce.second", 0.62, {left:"-40%", ease: Linear.easeNone, delay:0.35});
	var souce3 = TweenMax.to(".souce.third", 0.62, {left:"-40%", ease: Linear.easeNone, delay:0.42});
	
	// texte für souce
	var curry = TweenMax.to(".souce1txt", 0.62, {left:"-40%", ease: Linear.easeNone, delay: 0.28});
	var pesto = TweenMax.to(".souce3txt", 0.62, {left:"-40%", ease: Linear.easeNone, delay:0.35});
	var tomato = TweenMax.to(".souce2txt", 0.62, {left:"-40%", ease: Linear.easeNone, delay:0.42});
	
	var souceSub = TweenMax.fromTo(".souce.subtxt", 0.62, {left: "110%", bottom:"6%", autoAlpha: 0}, {left:"-40%",autoAlpha:1, ease: Linear.easeNone, delay:0.32});
	
	
	var arrow = TweenMax.fromTo(".arrow", 0.2, {rotation: -10, autoAlpha: 0}, {autoAlpha: 1, delay: 0.7, ease: Linear.easeNone});
	
	var dessert = TweenMax.to(".dessert", 0.3, {left:"70%", delay: 0.4, ease: Linear.easeNone});	
	
	var headIn 	= TweenMax.fromTo("header.canteen", 0.4, {top: "15%", left:"-40%"}, { left:"15%", delay: 0.1, ease: Linear.easeNone});
	var textIn 	= TweenMax.fromTo("section.canteen", 0.4, {top: "23%", left: "-80%" }, { left:"15%", delay: 0.1, ease: Linear.easeNone});
	
	var appLink = TweenMax.fromTo("#canteen > .bit", 0.1, {autoAlpha: 0}, {autoAlpha:1, ease: Linear.easeNone, delay:0.8});
	
	// Die Zeitleiste der Szene
	var sceneTimeline = new TimelineMax()
		.add([
			souce1,
			souce2,
			souce3,
			food1,
			student1,
			student2,
			student3,
			student4,
			student5,
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
		]);
		//Eigene Erweiterungsmethode um einen Szenenwechsel einzufuegen.
		//.addSceneChange($("#canteen > .sceneChange"), $("#nextsceneid"));
	
	// Die Scroll Magic Szene definieren und hinzufuegen. Sie wird in einem Scrollbereich von 15000px bis 17500px abgespielt.
	addScene(new ScrollScene({duration: 2500})
		.setTween(sceneTimeline)
		.addTo(controller));
});