varying vec2 vUv;

uniform sampler2D imagebw;
uniform sampler2D imagergb;
uniform sampler2D displacement;

uniform float time;
uniform float dispFactor;
uniform float effectFactor;
uniform float alpha;


void main(){
  
  vec2 uv=vUv;
  



  
  vec4 disp=texture2D(displacement,uv.yx);
  
  vec2 distortedPosition=vec2(uv.x+dispFactor*(disp.r*effectFactor),uv.y);
  vec2 distortedPosition2=vec2(uv.x-(1.-dispFactor)*(disp.r*effectFactor),uv.y);
  
  vec4 _texture=texture2D(imagebw,distortedPosition);
  vec4 _texture2=texture2D(imagergb,distortedPosition2);
  
  vec4 finalTexture=mix(_texture,_texture2,dispFactor);

  finalTexture.a = alpha;

  gl_FragColor=finalTexture;

}