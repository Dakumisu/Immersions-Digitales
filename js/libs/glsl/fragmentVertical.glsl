varying vec2 vUv;

uniform sampler2D imagebw;
uniform sampler2D imagergb;
uniform sampler2D displacement;

uniform float time;
// uniform float _rot;
uniform float dispFactor;
uniform float effectFactor;
uniform float alpha;


void main(){
  
  vec2 uv=vUv;
  
  // uv -= 0.5;
  // vec2 rotUV = rotate(uv, _rot);
  // uv += 0.5;


  //   vec4 displace = texture2D(displacement, vUv.yx);
  
  vec4 disp=texture2D(displacement,uv.yx);
  // vec2 displacedUV = vec2(vUv.x, vUv.y + disp.r);

  // displacedUV.y = mix(vUv.y, disp.r, 0.1);
  
  //   vec4 color = texture2D(image, displacedUV);
  
  vec2 distortedPosition=vec2(uv.x+dispFactor*(disp.r*effectFactor),uv.y);
  vec2 distortedPosition2=vec2(uv.x-(1.-dispFactor)*(disp.r*effectFactor),uv.y);
  
  vec4 _texture=texture2D(imagebw,distortedPosition);
  vec4 _texture2=texture2D(imagergb,distortedPosition2);
  
  vec4 finalTexture=mix(_texture,_texture2,dispFactor);

  finalTexture.a = alpha;

  gl_FragColor=finalTexture;
  // gl_FragColor = disp;

}