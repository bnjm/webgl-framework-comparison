(function(){
	var container = document.querySelector('.three');
    var scene, camera, renderer;
    var geometry, material, mesh;

    init();
    animate();

    function init() {

        scene = new THREE.Scene();

        camera = new THREE.PerspectiveCamera( 75, container.clientWidth / window.innerHeight, 1, 10000 );
        camera.position.z = 1000;

        geometry = new THREE.BoxGeometry( 200, 200, 200 );
        material = new THREE.MeshBasicMaterial( { color: 0xff0000} );

        mesh = new THREE.Mesh( geometry, material );
        scene.add( mesh );

        renderer = new THREE.WebGLRenderer();
        renderer.setSize( container.clientWidth, window.innerHeight );

        container.appendChild( renderer.domElement );

    }

    function animate() {

        requestAnimationFrame( animate );

        mesh.rotation.x += 0.01;
        mesh.rotation.y += 0.02;

        renderer.render( scene, camera );

    }

    window.addEventListener('resize', function () {
  renderer.setSize(container.clientWidth, window.innerHeight);
  camera.aspect = container.clientWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});
})();

