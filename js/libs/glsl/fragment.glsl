varying vec2 vUv;

uniform sampler2D imagebw;
uniform sampler2D imagergb;
uniform sampler2D displacement;

uniform float time;
// uniform float _rot;
uniform float dispFactor;
uniform float effectFactor;
uniform float alpha;

// vec2 rotate(vec2 v, float a) {
  //  float s = sin(a);
  //  float c = cos(a);
  //  mat2 m = mat2(c, -s, s, c);
  //  return m * v;
// }

void main(){
  
  vec2 uv=vUv;
  
  // uv -= 0.5;
  // vec2 rotUV = rotate(uv, _rot);
  // uv += 0.5;


  //   vec4 displace = texture2D(displacement, vUv.yx);
  
  vec4 disp=texture2D(displacement,uv);
  // vec2 displacedUV = vec2(vUv.x, vUv.y + disp.r);

  // displacedUV.y = mix(vUv.y, disp.r, 0.1);
  
  //   vec4 color = texture2D(image, displacedUV);
  
  vec2 distortedPosition=vec2(uv.x+dispFactor*(disp.r*effectFactor),uv.y);
  vec2 distortedPosition2=vec2(uv.x-(1.-dispFactor)*(disp.r*effectFactor),uv.y);
  
  vec4 _texture=texture2D(imagebw,distortedPosition);
  vec4 _texture2=texture2D(imagergb,distortedPosition2);
  
  vec4 finalTexture=mix(_texture,_texture2,dispFactor);
  
  // finalTexture.r = texture2D(imagergb, disp + vec2(.0, .0)).r;
  // finalTexture.g = texture2D(imagergb, disp + vec2(.0, -0.01)).g;
  // finalTexture.b = texture2D(imagergb, disp + vec2(.0, 0.02)).b;

  finalTexture.a = alpha;

  gl_FragColor=finalTexture;
  // gl_FragColor = disp;

}

// void main() {
//   vUv = uv;

//   vec3 pos = position;
//   float noiseFreq = 3.5;
//   float noiseAmp = 0.15; 
//   vec3 noisePos = vec3(pos.x * noiseFreq + uTime, pos.y, pos.z);
//   pos.z += snoise(noisePos) * noiseAmp;

//   gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.);
// }



// =================================================================================
// =================================================================================




// uniform float time;
// uniform float alpha;
// uniform float displaceHover;
// // uniform float progress;
// uniform sampler2D image;
// uniform sampler2D displacement;
// uniform sampler2D tDiffuse;


// uniform vec2 resolution;
// uniform vec2 mouse;
// // uniform float u_Velo;
// // uniform int u_Type;

// varying vec2 vUv;
// // varying vec4 vPosition;




// void main(){
//   vec4 displace = texture2D(displacement, vUv.yx);
//   vec2 displacedUV = vec2(vUv.x, vUv.y + displace.r);
  
//   displacedUV.y = mix(vUv.y, displace.r, displaceHover);
  
//   vec4 color = texture2D(imagebw, displacedUV);
  
//   // color.r = texture2D(image, displacedUV + vec2(time*.002, time*0.03)).r;
//   // color.g = 0.;
//   // color.b = texture2D(image, displacedUV + vec2(time*.002, time*0.07)).b;
//   float activeRGB = displaceHover * 10.0;
//   // color.r = texture2D(imagebw, displacedUV + vec2(.0, 0.5)*activeRGB).r;
//   color.r = texture2D(imagebw, displacedUV + vec2(.0, -0.2) + vec2(.3, 0.)*activeRGB).r;
//   // color.r = texture2D(imagebw, displacedUV + vec2(.3, 0.)*activeRGB).r;
//   color.g = texture2D(imagebw, displacedUV + vec2(.0, -0.01)*activeRGB).g;
//   color.b = texture2D(imagebw, displacedUV + vec2(.0, 0.02)*activeRGB).b;
  
//   color.a = alpha;
  
// //   // // get small circle around mouse, with distances to it
// //   // float c=circle(uv,mouse,0.,.2);
// //   // // get texture 3 times, each time with a different offset, depending on mouse speed:


// //   // float r=texture2D(tDiffuse,uv.xy+=(mouseVelocity*.5)).x;
// //   // float g=texture2D(tDiffuse,uv.xy+=(mouseVelocity*.525)).y;
// //   // float b=texture2D(tDiffuse,uv.xy+=(mouseVelocity*.55)).z;
// //   // // combine it all to final output
// //   // color=vec4(r,g,b,1.);
  
// //   // vec2 newUV = mix(uv, mouse, circle); 
// //   // color = texture2D(tDiffuse,newUV);
  
//   gl_FragColor=color;
// }



// =================================================================================
// =================================================================================



// float circle(vec2 uv,vec2 disc_center,float disc_radius,float border_size){
//   uv-=disc_center;
//   uv*=resolution;
//   float dist=sqrt(dot(uv,uv));
//   return smoothstep(disc_radius+border_size,disc_radius-border_size,dist);
// }

// void main(){
//   vec2 newUV=vUv;
//   float c = circle(vUv,uMouse,0.,.2);
//   float r = texture2D(tDiffuse,newUV.xy+=c*(.1*.5)).x;
//   float g = texture2D(tDiffuse,newUV.xy+=c*(.1*.525)).y;
//   float b = texture2D(tDiffuse,newUV.xy+=c*(.1*.55)).z;
//   vec4 color = vec4(r,g,b,1.);
//   gl_FragColor = color;
// }


// =================================================================================
// =================================================================================




// float circle(vec2 uv,vec2 disc_center,float disc_radius,float border_size){
//   uv-=disc_center;
//   uv*=resolution;
//   float dist=sqrt(dot(uv,uv));
//   return smoothstep(disc_radius+border_size,disc_radius-border_size,dist);
// }

// float map(float value,float min1,float max1,float min2,float max2){
//   return min2+(value-min1)*(max2-min2)/(max1-min1);
// }

// float remap(float value,float inMin,float inMax,float outMin,float outMax){
//   return outMin+(outMax-outMin)*(value-inMin)/(inMax-inMin);
// }

// float hash12(vec2 p){
//   float h=dot(p,vec2(127.1,311.7));
//   return fract(sin(h)*43758.5453123);
// }

// // #define HASHSCALE3 vec3(.1031, .1030, .0973)
// vec2 hash2d(vec2 p)
// {
//   vec3 p3=fract(vec3(p.xyx)*vec3(.1031,.1030,.0973));
//   p3+=dot(p3,p3.yzx+19.19);
//   return fract((p3.xx+p3.yz)*p3.zy);
// }

// void main(){
//   vec2 newUV=v_uv;
//   vec4 color=vec4(1.,0.,0.,1.);
  
//   // colorful
//   // if(uType==0){
//     float c=circle(newUV,uMouse,0.,.2);
//     float r=texture2D(tDiffuse,newUV.xy+=c*(uVelo*.5)).x;
//     float g=texture2D(tDiffuse,newUV.xy+=c*(uVelo*.525)).y;
//     float b=texture2D(tDiffuse,newUV.xy+=c*(uVelo*.55)).z;
//     color=vec4(r,g,b,1.);
//   // }
  
//   // zoom
//   // if(uType==1){
//     // 	float c = circle(newUV, uMouse, 0.0, 0.1+uVelo*2.)*40.*uVelo;
//     // 	vec2 offsetVector = normalize(uMouse - v_uv);
//     // 	vec2 warpedUV = mix(v_uv, uMouse, c * 0.99); //power
//     // 	color = texture2D(tDiffuse,warpedUV) + texture2D(tDiffuse,warpedUV)*vec4(vec3(c),1.);
//   // }
  
//   // // zoom
//   // if(uType==2){
//     // 	float hash = hash12(v_uv*10.);
//     // 	// float c = -circle(newUV, uMouse, 0.0, 0.1+uVelo*2.)*40.*uVelo;
//     // 	// vec2 offsetVector = -normalize(uMouse - v_uv);
//     // 	// vec2 warpedUV = mix(v_uv, uMouse, c * 0.6); //power
//     // 	// vec2 warpedUV1 = mix(v_uv, uMouse, c * 0.3); //power
//     // 	// vec2 warpedUV2 = mix(v_uv, uMouse, c * 0.1); //power
//     // 	// color = vec4(
//       // 	// 	texture2D(tDiffuse,warpedUV ).r,
//       // 	// 	texture2D(tDiffuse,warpedUV1 ).g,
//       // 	// 	texture2D(tDiffuse,warpedUV2 ).b,
//     // 	// 	1.);
//     // 	// color = vec4(,0.,0.,1.);
//     // 	float c = circle(newUV, uMouse, 0.0, 0.1+uVelo*0.01)*10.*uVelo;
//     // 	vec2 offsetVector = normalize(uMouse - v_uv);
//     // 	// vec2 warpedUV = mix(v_uv, uMouse,  20.*hash*c); //power
//     // 	vec2 warpedUV = v_uv + vec2(hash - 0.5)*c; //power
//     // 	color = texture2D(tDiffuse,warpedUV) + texture2D(tDiffuse,warpedUV)*vec4(vec3(c),1.);
//   // }
  
//   gl_FragColor=color;
// }