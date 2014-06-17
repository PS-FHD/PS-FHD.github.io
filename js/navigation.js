/**
 * Dieses Script stellt die Funktionalitäten für die Navigation bereit
 * @Author Alexander Dlugosch, David-Kay Posmyk
 */
$(document).ready(function($) {
	//Registriere Navigation
	var navTweens = {
		"intro":     TweenLite.to("#nav1", .5, {height: "2em", paused: true}),
		"lecture":   TweenLite.to("#nav2", .5, {height: "2em", paused: true}),
		"selfstudy": TweenLite.to("#nav3", .5, {height: "2em", paused: true}),
		"tools":     TweenLite.to("#nav4", .5, {height: "2em", paused: true})
	};

	/**
	 * Wird aufgerufen, wenn eine Szene betreten wird.
	 * Animiert die Navigationspunkte so, dass der Aktuelle nach Unten geschoben erscheint und faehrt alle anderen gegebenenfalls zurueck.
	 * @param scene Der Name der Szene.
	 */
	function sceneEnter(scene){
		var currentNav = ""; // Aktueller Navigationspunkt
		switch(scene){
			case "intro1":
			case "intro2":
				currentNav = "intro";
				break;              
			case "lecture": 
				currentNav = "lecture";
				break;
			case "selfstudy1":
			case "selfstudy2":
			case "selfstudy3":
				currentNav = "selfstudy";
				break;
			case "canteen":
			case "feature":
				currentNav = "tools";
				break;
		}
		
		activateNav(currentNav);
	}
	
	/**
	 * Aktiviert einen Navigationspunkt und deaktiviert alle anderen Navigationspunkte.
	 */
	function activateNav(navNameToActivate) {
		// Alle anderen Navigationspunkte zurueckfahren.
		// $.each iteriert durch alle Elemente eines Arrays und ruft fuer jedes Element die angegebene Funktion auf.
		$.each(navTweens, function(name, tween) {
			if (name != navNameToActivate)
			  tween.reverse(); // reverse() bewirkt nichts, wenn das Tween bereits am Anfang seiner Animation ist.
		});
		
		// Sicherstellen, dass der aktuelle Navigationspunk ausgefahren ist.
		navTweens[navNameToActivate].play(); // play() bewirkt nichts, wenn das Tween bereits am Ende seiner Animation ist.
	}
	
	/*
	 * Die Events Enter werden an die einzelnen Szenen gebunden.
	 * Bei einem Eintritt in eine Szene wird eine entsprechende Funktion aufgerufen, die die Navigationstweens entsprechend abspielt oder
	 * zuruecksetzt.
	 */
	$.each(scenes, function(sceneName, scene) {
		scene.on("enter", function() {
			sceneEnter(sceneName);
		});
	});

	/**
	 * Scrolling zur mit dem Navigationspunkt verknüpten Szene
	 * Übergeben wird der gesetzte Wert des hrefs-Attributs
	 * Insofern vom Browser unterstützt, wird die Browser History geupdated
	 */
	$(document).on("click", "nav a[href^=#]", function (e) {
		var linkHref = $(this).attr("href");
		var sceneName = linkHref.substring(1);
		var targetScene = scenes[sceneName]; //die Zielszene

		e.preventDefault(); //normale Funktionsweise der Navigation deaktivieren (a href)
		/* Das globale Tween zum animierten Scrollen nutzen, um zum Start der jeweiligen Szene zu scrollen.
		   updateTo legt neue Zielwerte fest, hierbei die neue Ziel-Scrollposition. Der zweite Parameter
		   resetDuration = true, legt fest dass wenn das Tween gerade inaktiv ist, es automatisch Aktiviert 
		   werden soll und, falls die Animation gerade im gange ist, dass deren Dauer zurueckgesetz wird. */ 
		scrollTween.updateTo({scrollTo: {x: targetScene.offset() + 1}}, true);
	});
	
	/* Eine aktualisierung des Scroll Magic controllers erzwingen, damit dieser die entsprechenden Enter-Ereignisse feuert und so der richtige 
	   Navigationspunkt beim neuladen der Seite aktiviert wird. */
	controller.update(scenes);
	
	var scrollPosition = $(window).scrollLeft();
	/* Wird die Seite neugeladen und befindet sich die Scrollbar ganz am Anfang oder am Ende der Seite, dann befindet sie sich fuer Scroll Magic
	   nicht in einer Szene, daher muss der entsprechende Menuepunkt in diesem Fall manuell aktiviert werden. */
	if (scrollPosition == 0)
		activateNav("intro");
	else if (scrollPosition == totalDuration)
		activateNav("tools");
});