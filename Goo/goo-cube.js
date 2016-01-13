(function(){

	var canvas    = document.querySelector('#goo-canvas');
	var gooParent = document.querySelector('.goo');

	gooParent.clientWidth = window.innerWidth / 4;
	gooParent.clientHeight = window.innerHeight;

	canvas.height = window.innerHeight;
	canvas.clientHeight = window.innerHeight;

	
	var gooRunner = new goo.GooRunner({canvas: canvas});
	var world = gooRunner.world;
	world.createEntity(new goo.PointLight(), [100, 100, 100])
		.addToWorld();

	world.createEntity(new goo.Camera(), new goo.OrbitCamControlScript({spherical: [10,10,10]}))
		.addToWorld();
	world.createEntity(new goo.Box(), goo.Material.createMaterial(goo.ShaderLib.simpleLit), function (entity) {
	    entity.setRotation(world.time, world.time, 0);
	}).addToWorld();

gooRunner.renderer.context.canvas.clientHeight = window.innerHeight;
})();
