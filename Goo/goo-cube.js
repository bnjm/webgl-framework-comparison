(function(){

	var canvas    = document.querySelector('#goo-canvas');
    // canvas.height = window.innerHeight;
	var gooParent = document.querySelector('.goo');	
	var gooRunner = new goo.GooRunner({});
	var world     = gooRunner.world;

	world.createEntity(new goo.PointLight(), [100, 100, 100])
		.addToWorld();

	world.createEntity(new goo.Camera(), new goo.OrbitCamControlScript({spherical: [10,10,10]}))
		.addToWorld();

	world.createEntity(new goo.Box(), goo.Material.createMaterial(goo.ShaderLib.simpleLit), function (entity) {
	    entity.setRotation(world.time, world.time, 0);
	}).addToWorld();

    // document.querySelector('')
    var stats = new Stats();
    stats.setMode( 1 ); // 0: fps, 1: ms, 2: mb
    
    // align top-left
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';
    
    document.body.appendChild( stats.domElement );
    
    var update = function () {
    
        stats.begin();
    
        // monitored code goes here
    
        stats.end();
    
        requestAnimationFrame( update );
    
    };
    
    requestAnimationFrame( update );

})();
