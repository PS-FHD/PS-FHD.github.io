var pl_scenes = {};
var pl_sceneIds = [];
var pl_progressMax = 0;
var pl_progress = 0;

$(document).ready(function($) {
	if (!PRELOADER)
		return;
	
	$("*[class='scene']").each(function(i, scene) {
		scene = $(scene);
		var sceneId = scene.attr("id");
		pl_sceneIds.push(sceneId);
		pl_scenes[sceneId] = {"elements": [], "remaining": 0};
		prepareElement(sceneId, scene);
		
		scene.children("*:not([class*='scene'])").each(function(i, sceneChild) {
			sceneChild = $(sceneChild);
			prepareElement(sceneId, sceneChild);
			
			sceneChild.find("*").each(function(i, sceneChildChild) {
				prepareElement(sceneId, $(sceneChildChild));
			});
		});
		
		function prepareElement(sceneId, element) {
			var src = element.attr("src");
			var bgImg = element.css("background-image");
			var hasSrc = (typeof src !== "undefined");
			var hasBgImg = (bgImg != "none");
			
			if (hasBgImg)
				bgImg = bgImg.replace(/.*\s?url\([\'\"]?/, '').replace(/[\'\"]?\).*/, '');
			
			if (hasSrc || hasBgImg) {
				pl_scenes[sceneId].elements.push(element);
				pl_scenes[sceneId].remaining++;
				pl_progressMax++;
				
				element.data("_src", src);
				element.data("_bgimg", bgImg);
				element.data("_scene", sceneId);
			}
			
			if (sceneId != pl_sceneIds[0]) {
				if (hasSrc)
					element.attr("src", "");
				if (hasBgImg)
					element.css("background-image", "none");
			}
		};
	});
	
	pl_restoreSceneResources(pl_sceneIds[0]);
});

function pl_restoreSceneResources(sceneId) {
	$.each(pl_scenes[sceneId].elements, function(i, element) {
		var src = element.data("_src");
		var bgImg = element.data("_bgimg");
		var hasSrc = (typeof src !== "undefined");
		var hasBgImg = (bgImg != "none");
		
		if (hasSrc) {
			element.attr("src", src);
			pl_prepareImage(element);
		}
		if (hasBgImg) {
			var dummy = $(new Image());
			dummy.attr("src", bgImg);
			dummy.data("_scene", sceneId);
			dummy.data("_ref", element);
			pl_prepareImage(dummy);
		}
	});
}

function pl_prepareImage(imgElement) {
	imgElement.bind("load", pl_image_load);
	
	if (imgElement.complete)
		imgElement.load();
}

function pl_image_load() {
	var sceneId = $(this).data("_scene");
	var isDummy = (typeof $(this).data("_ref") !== "undefined");
	
	if (isDummy) {
		var originalElement = $(this).data("_ref");
		originalElement.css("background-image", "url(" + $(this).attr("src") + ")");
		$(this).remove();
	}
	
	$(this).unbind("load", pl_image_load);
	
	var scene = pl_scenes[sceneId];
	scene.remaining--;
	pl_progress++;
	pl_updateProgress();
	
	if (scene.remaining == 0) {
		var sceneIndex = pl_sceneIds.indexOf(sceneId);
		
		if (sceneIndex != pl_sceneIds.length - 1) {
			var nextSceneId = pl_sceneIds[sceneIndex + 1];
			pl_restoreSceneResources(nextSceneId);
		}
	}
}

function pl_updateProgress() {
	var progress = Math.min(100, (pl_progress / pl_progressMax) * 100);
	$("#progressBar").css("width", progress + "%");
	
	if (progress == 100)
		TweenMax.to("#progressBar", 2, {autoAlpha: 0});
}