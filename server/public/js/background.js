let container
let camera, scene, renderer
let uniforms
const vertexShader = `
  varying vec2 vUv;
  void main()	{
    vUv = uv;
    gl_Position = vec4( position, 0.5 );
  }
`
const fragmentShader = `
  uniform vec2 u_resolution;
  uniform vec2 u_mouse;
  uniform float u_time;

 

  void main() {
    vec2 p=1.8*(2.0*gl_FragCoord.xy-u_resolution)/max(u_resolution.x,u_resolution.y);
     for(int i=1;i<10;i++) {
       vec2 newp=p;
       float speed = 3.2; // speed control
       newp.x+=1./float(i)*sin(float(i)*p.y+u_time/(speed)+0.3*float(i))+1.0;
       newp.y+=1./float(i)*cos(float(i)*p.x+u_time/(speed)+0.3*float(i))-1.4;
       p=newp;
     }
     vec3 colorB = vec3(0.450,0.450,0.450);
     vec3 colorA = vec3( 0.02, 0.5*sin(2.5*p.y), 0.2*sin(p.x+p.y));
     vec3 col = mix(colorA, colorB, 0.5);
     gl_FragColor=vec4(col, 0.2);
  }
`

init()
animate()

function init() {
  container = document.getElementById( 'webgl' )

  camera = new THREE.Camera()
  camera.position.z = 1
  scene = new THREE.Scene()

  let geometry = new THREE.PlaneBufferGeometry( 1, 1 )
  uniforms = {
    u_time: { type: "f", value: 1.0 },
    u_resolution: { type: "v2", value: new THREE.Vector2() },
    u_mouse: { type: "v2", value: new THREE.Vector2() }
  }
  let material = new THREE.ShaderMaterial( {
    uniforms: uniforms,
    vertexShader: vertexShader,
    fragmentShader: fragmentShader
  } )
  let mesh = new THREE.Mesh( geometry, material )
  scene.add( mesh )

  renderer = new THREE.WebGLRenderer()
  renderer.setPixelRatio( window.devicePixelRatio )

  container.appendChild( renderer.domElement )

  onWindowResize()
  window.addEventListener( 'resize', onWindowResize, false )
}

function onWindowResize( event ) {
  renderer.setSize( window.innerWidth, window.innerHeight )
  uniforms.u_resolution.value.x = renderer.domElement.width
  uniforms.u_resolution.value.y = renderer.domElement.height
}

function animate() {
  requestAnimationFrame( animate )
  render()
}

function render() {
  uniforms.u_time.value += 0.01
  renderer.render( scene, camera )
}
