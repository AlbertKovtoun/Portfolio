uniform vec3 uModelColor;
uniform float uAlStrength;
uniform float uDlStrength;
uniform vec3 uLightDirection;

uniform samplerCube specMap;

varying vec3 vNormal;
varying vec3 vPosition;

float inverseLerp(float v, float minValue, float maxValue) {
  return (v - minValue) / (maxValue - minValue);
}

float remap(float v, float inMin, float inMax, float outMin, float outMax) {
  float t = inverseLerp(v, inMin, inMax);
  return mix(outMin, outMax, t);
}

vec3 linearTosRGB(vec3 value ) {
  vec3 lt = vec3(lessThanEqual(value.rgb, vec3(0.0031308)));
  
  vec3 v1 = value * 12.92;
  vec3 v2 = pow(value.xyz, vec3(0.41666)) * 1.055 - vec3(0.055);

	return mix(v2, v1, lt);
}

void main() {
  // vec3 modelcolor = vec3(0.9, 0.0, 0.0);
  vec3 modelcolor = uModelColor;
  vec3 lighting = vec3(0.0);

  vec3 normal = normalize(vNormal);
  vec3 viewDir = normalize(cameraPosition - vPosition);

  // Ambient
  vec3 ambient = vec3(uAlStrength);

  // Diffuse lighting
  vec3 lightDir = normalize(vec3(uLightDirection));
  vec3 lightcolor = vec3(1.0);
  float dp = max(0.0, dot(lightDir, normal));

  // Fiddle with the values to get more or less lighting
  // Toon
  dp = smoothstep(0.5, 0.51, dp);

  vec3 diffuse = dp * lightcolor;

  lighting = ambient + diffuse * uDlStrength;

  vec3 color = modelcolor * lighting;

  // gl_FragColor = vec4(pow(color, vec3(1.0 / 2.2)), 1.0);
  gl_FragColor = vec4(color, 1.0);
}