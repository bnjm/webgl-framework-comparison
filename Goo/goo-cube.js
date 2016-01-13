// // (function(){

// 	var canvas    = document.querySelector('#goo-canvas');
	var gooParent = document.querySelector('.goo');

// 	gooParent.clientWidth = window.innerWidth / 4;
// 	gooParent.clientHeight = window.innerHeight;

// 	canvas.height = window.innerHeight;
// 	canvas.clientHeight = window.innerHeight;

	
// 	var gooRunner = new goo.GooRunner({canvas: canvas});
// 	gooRunner.renderer.context.canvas.clientHeight = window.innerHeight;
// 	gooRunner.renderer.domElement.clientHeight = window.innerHeight;
// 	gooRunner.world.gooRunner.renderer.domElement.clientHeight = window.innerHeight;
// 	canvas.height = window.innerHeight;
// 	canvas.width  = gooParent.clientWidth;
// 	var world = gooRunner.world;
// 	world.createEntity(new goo.PointLight(), [100, 100, 100])
// 		.addToWorld();

// 	world.createEntity(new goo.Camera(), new goo.OrbitCamControlScript({spherical: [5,0,0]}))
// 		.addToWorld();
// 	world.createEntity(new goo.Box(), goo.Material.createMaterial(goo.ShaderLib.simpleLit), function (entity) {
// 	    entity.setRotation(world.time, world.time, 0);
// 	}).addToWorld();

// gooRunner.renderer.context.canvas.clientHeight = window.innerHeight;
// // })();

function CameraFollowScript(target) {
    this.target = target;
}

CameraFollowScript.prototype.run = function(entity) {
    if(!this.target) return;

    var pos = this.target.transformComponent.transform.translation;
    var cameraPos = entity.transformComponent.transform.translation;
    cameraPos.x += (pos.x - cameraPos.x) * 0.2;
    cameraPos.y += (pos.y - cameraPos.y) * 0.2 + 0.2; // have the camera 0.2 units above the cube

    entity.transformComponent.setUpdated();
};

require({
    // configure our AMD loader
    //  baseUrl: './lib',
    paths: {
        // package mappings
        goo: 'https://bitbucket.org/gootech/tutorials/downloads/goo.0.3b'
    }
}, ['goo'], function () {
    require([
        'goo/entities/GooRunner',
        'goo/entities/EntityUtils',
        'goo/math/Vector3',
        'goo/renderer/Material',
        'goo/renderer/Camera',
        'goo/entities/components/CameraComponent',
        'goo/entities/components/ScriptComponent',
        'goo/scripts/WASDControlScript',
        'goo/shapes/ShapeCreator',
        'goo/renderer/shaders/ShaderLib',
        'goo/util/Grid',
        'goo/renderer/light/PointLight',
        'goo/entities/components/LightComponent'
    ], function (
        GooRunner,
        EntityUtils,
        Vector3,
        Material,
        Camera,
        CameraComponent,
        ScriptComponent,
        WASDControlScript,
        ShapeCreator,
        ShaderLib,
        Grid,
        PointLight,
        LightComponent) {
        // "use strict"; Helps you make fewer errors by detecting more things that could lead to breakages.
        "use strict";

        // Initialize
        var goo = new GooRunner();
        document.body.appendChild(goo.renderer.domElement);


        // Create box
        var meshData = ShapeCreator.createBox(1, 1, 1);
        var boxEntity = EntityUtils.createTypicalEntity(goo.world, meshData);
        var material = Material.createMaterial(ShaderLib.texturedLit, 'BoxMaterial');
        boxEntity.meshRendererComponent.materials.push(material);
        boxEntity.transformComponent.transform.translation.setd(0, 0.5, 0); // cube is 1 unit tall, raise it to stand on grid

        var scriptComponent = new ScriptComponent();
        scriptComponent.scripts.push(new WASDControlScript({
            domElement: goo.renderer.domElement,
            walkSpeed: 10,
            crawlSpeed: 50
        }));
        boxEntity.setComponent(scriptComponent);

         // Bring the box into the world
        boxEntity.addToWorld();
            
        // Shed some light on it
        var light = new PointLight();
        var lightEntity = goo.world.createEntity('light');
        lightEntity.setComponent(new LightComponent(light)); 
		lightEntity.transformComponent.transform.translation.set(0, 3, 3);
        
        // Add the light to the world
        lightEntity.addToWorld(); 

        // Add camera
        var camera = new Camera(35, 1, 0.1, 1000);
        var cameraEntity = goo.world.createEntity('Camera');
        cameraEntity.setComponent(new CameraComponent(camera));
        cameraEntity.transformComponent.transform.translation.set(0, 0, 10);

        cameraEntity.setComponent(new ScriptComponent(new CameraFollowScript(boxEntity)));

        cameraEntity.addToWorld();
    });
});