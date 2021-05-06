uniform sampler2D imagebw;
uniform sampler2D imagergb;
uniform sampler2D displacement;
uniform float dispFactor;
uniform float effectFactor;
uniform float alpha;

varying vec2 vUv;

void main(){
  vec2 uv = vUv;

  vec4 disp=texture2D(displacement, uv);

  vec2 distortedPosition = vec2(uv.x + dispFactor * (disp.x * effectFactor), uv.y);
  vec2 distortedPosition2 = vec2(uv.x - (1. -dispFactor) * (disp.x * effectFactor), uv.y);
  
  vec4 _texture = texture2D(imagebw, distortedPosition);
  vec4 _texture2 = texture2D(imagergb, distortedPosition2);
  
  vec4 finalTexture = mix(_texture, _texture2, dispFactor);

  finalTexture.a = alpha;

  gl_FragColor = finalTexture;
}