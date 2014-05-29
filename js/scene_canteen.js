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
	
	
	var food1 = TweenMax.fromTo(".food.first", 0.7, {left: "110%", bottom:"35%"}, {left:"-10%", ease: Linear.easeNone});
	var food2 = TweenMax.fromTo(".food.second", 0.7, {left: "110%", bottom:"35%"}, {left:"-10%", ease: Linear.easeNone, delay:0.07});
	var food3 = TweenMax.fromTo(".food.third", 0.7, {left: "110%", bottom:"35%"}, {left:"-10%", ease: Linear.easeNone, delay:0.14});
	
	var souce1 = TweenMax.fromTo(".souce.first", 0.7, {left: "110%", bottom:"35%"}, {left:"-10%", delay: 0.28, ease: Linear.easeNone});
	var souce2 = TweenMax.fromTo(".souce.second", 0.7, {left: "110%", bottom:"35%"}, {left:"-10%", ease: Linear.easeNone, delay:0.35});
	var souce3 = TweenMax.fromTo(".souce.third", 0.7, {left: "110%", bottom:"35%"}, {left:"-10%", ease: Linear.easeNone, delay:0.42});
	
	var arrow = TweenMax.fromTo(".arrow", 0.3, {left: "90%", top:"-10%"}, {left: "70%", top: "15%", rotation : 698 , delay: 0.6  ,ease: Linear.easeNone});
	
	var dessert = TweenMax.fromTo(".dessert", 0.3, {left: "120%", top:"25%"}, {left:"70%",delay: 0.4 ,ease: Linear.easeNone});
	
	var lamp1 = TweenMax.fromTo(".lamp.first", 1, {left: "20%", top:"0%"}, {left: "15%",ease: Linear.easeNone});
	var lamp2 = TweenMax.fromTo(".lamp.second", 1, {left: "50%", top:"0%"}, {left: "45%",ease: Linear.easeNone});
	var lamp3 = TweenMax.fromTo(".lamp.third", 1, {left: "80%", top:"0%"}, {left: "75%",ease: Linear.easeNone});	
	
	var headIn 	= TweenMax.fromTo("header.canteen", 0.4, {top: "15%", left:"-40%"}, { left:"15%", delay: 0.1, ease: Linear.easeNone});
	var textIn 	= TweenMax.fromTo("section.canteen", 0.4, {top: "23%", left: "-80%" }, { left:"15%", delay: 0.1, ease: Linear.easeNone});
	
	//texte für food
	var pommes 	= TweenMax.fromTo(".food1txt", 0.7, {left: "110%", bottom:"34%"}, {left:"-10%", ease: Linear.easeNone});
	var bifteki	= TweenMax.fromTo(".food2txt", 0.7, {left: "110%", bottom:"34%"}, {left:"-10%", ease: Linear.easeNone, delay:0.07});
	var gemuese	= TweenMax.fromTo(".food3txt",  0.7, {left: "110%", bottom:"34%"}, {left:"-10%", ease: Linear.easeNone, delay:0.14});
	
	var foodSub	= TweenMax.fromTo(".foodsubtxt",  0.7, {left: "85%", bottom:"30%", autoAlpha: 0}, {left:"-10%", autoAlpha: 1, ease: Linear.easeNone, delay:0.14});
	
	// texte für souce
	var curry = TweenMax.fromTo(".souce1txt", 0.7, {left: "110%", bottom:"34%"}, {left:"-10%", delay: 0.28, ease: Linear.easeNone});
	var pesto = TweenMax.fromTo(".souce2txt", 0.7, {left: "110%", bottom:"34%"}, {left:"-10%", ease: Linear.easeNone, delay:0.29});
	var tomato = TweenMax.fromTo(".souce3txt", 0.7, {left: "110%", bottom:"34%"}, {left:"-10%", ease: Linear.easeNone, delay:0.3});
	
	var souceSub = TweenMax.fromTo(".soucesubtxt",  0.7, {left: "85%", bottom:"30%", autoAlpha: 0}, {left:"-10%",autoAlpha:1, ease: Linear.easeNone, delay:0.3});
	
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
			lamp1,
			lamp2,
			lamp3,
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
			souceSub
		]);
		//Eigene Erweiterungsmethode um einen Szenenwechsel einzufuegen.
		//.addSceneChange($("#canteen > .sceneChange"), $("#nextsceneid"));
	
	// Die Scroll Magic Szene definieren. Sie wird in einem Scrollbereich von 15000px bis 17500px abgespielt.
	new ScrollScene({offset: 15000, duration: 2500})
		.setTween(sceneTimeline)
		.addTo(controller);
});