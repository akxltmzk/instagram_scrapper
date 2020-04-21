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

  void mainImage(out vec4 fragColor, in vec2 fragCoord);

  void main(void) {
      vec4 col;
      mainImage(col, gl_FragCoord.xy);
      gl_FragColor = col;
  }

  vec3 shape( in vec2 p )
  {
  	p *= 2.2;

  	vec3 s = vec3( 0.0 );
  	vec2 z = p;
  	for( int i=0; i<8; i++ )
  	{
          // transform
  		z += cos(z.yx + cos(z.yx + cos(z.yx+0.8*u_time) ) );

          // orbit traps
  		float d = dot( z-p, z-p );
  		s.x += 0.54/(1.0+d);
  		s.y += d;
  		s.z += sin(atan(z.y-p.y,z.x-p.x));

  	}

  	return s / 8.0;
  }

  void mainImage( out vec4 fragColor, in vec2 fragCoord )
  {
  	vec2 pc = (1.8*fragCoord.xy-u_resolution.xy)/min(u_resolution.y,u_resolution.x);

  	vec2 pa = pc + vec2(0.04,0.0);
  	vec2 pb = pc + vec2(0.0,0.04);

      // shape (3 times for diferentials)
  	vec3 sc = shape( pc );
  	vec3 sa = shape( pa );
  	vec3 sb = shape( pb );

      // color
  	vec3 col = mix( vec3(0.076,0.075,0.080), vec3(1.518,1.600,1.499), sc.x );
  	//col = mix( col, col.zxy, smoothstep(-0.5,0.5,cos(0.5*u_time)) );
  	col *= 0.15*sc.y;
  	col += 0.4*abs(sc.z) - 0.1;

      // light
  	vec3 nor = normalize( vec3( sa.x-sc.x, 0.01, sb.x-sc.x ) );
  	float dif = clamp(0.5 + 0.5*dot( nor,vec3(0.880,0.880,0.880) ),0.0,1.0);
  	col *= 1.072 + 0.7*dif*col;
  	col += 0.3 * pow(nor.y,128.0);

      // vignetting
  	col *= 0.8 - 0.1*length(pc);

  	fragColor = vec4( col, 1.0 );
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
