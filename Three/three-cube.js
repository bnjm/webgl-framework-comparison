(function(){
    var scene, camera, renderer;
    var geometry, material, mesh;

    var container = document.querySelector('.three');
    var height = window.innerHeight;
    var aspect = container.clientWidth / height;

    init();
    animate();

    function init() {

        scene = new THREE.Scene();

        camera = new THREE.PerspectiveCamera( 75, aspect, 1, 1000 );
        camera.position.z = 100;

        geometry = new THREE.BoxGeometry( 20, 20, 20);
        material = new THREE.MeshLambertMaterial({color: 0xdddddd});

        var light = new THREE.HemisphereLight( 0xffffff, 0x000000, 1 );
        scene.add( light );

        mesh = new THREE.Mesh( geometry, material );
        scene.add( mesh );

        renderer = new THREE.WebGLRenderer({});
        renderer.setClearColor( 0xeeeeee, 1 ); 
        renderer.setSize( container.clientWidth, height );

        container.appendChild( renderer.domElement );

    }

    function animate() {

        requestAnimationFrame( animate );

        mesh.rotation.x += 0.01;
        mesh.rotation.y += 0.01;

        renderer.render( scene, camera );

    }

    window.addEventListener('resize', function () {
  renderer.setSize(container.clientWidth, window.innerHeight);
  camera.aspect = container.clientWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});
})();

