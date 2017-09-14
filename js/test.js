var approx = function(a, b){
  return Math.abs(a - b) < 0.01;
};

var a = new Vec1(9);
var b = a.clone();
var c = new Vec1();
console.assert(b.x === 9);
a.set();
console.assert(a.x === 0);
a.set({x:2, y:3});
console.assert(a.x === 2);
for(var i = 0; i<50; i++){
  a = Vec1.random(-2, 100);
  console.assert(a.x >= -2);
  console.assert(a.x < 100);
  b.setRandom(34, 35);
  console.assert(b.x >= 34);
  console.assert(b.x < 35);
  a.clamp(0, 1);
  console.assert(a.x >= 0);
  console.assert(a.x <= 1);
  a.setClamped(b, 34.4, 34.5);
  console.assert(a.x >= 34.4);
  console.assert(a.x <= 34.5);
}
b.set(1);
c.set(-3);
a.set(b).add(c);
console.assert(a.x === -2);
a = b.plus(c);
console.assert(a.x === -2);
a.setSum(b, c);
console.assert(a.x === -2);

a.set(b).sub(c);
console.assert(a.x === 4);
a = b.minus(c);
console.assert(a.x === 4);
a.setDifference(b, c);
console.assert(a.x === 4);

a.set(b).mul(c);
console.assert(a.x === -3);
a = b.times(c);
console.assert(a.x === -3);
a.setProduct(b, c);
console.assert(a.x === -3);

a.set(b).div(c);
console.assert(approx(a.x , -1/3));
a = b.over(c);
console.assert(approx(a.x , -1/3));
a.setQuotient(b, c);
console.assert(approx(a.x , -1/3));

b.set(2);
a = b.times(7);
console.assert( approx(a.x, 14) );
a.set(b).mul(7);
console.assert( approx(a.x, 14) );
a.setScaled(b, 7);
console.assert( approx(a.x, 14) );

b.set(4);
c.set(3);
console.assert( approx(b.dot(c), 12) );

console.assert( approx(
	a.setDotProductOfVec3s(new Vec3(1, 2, 3), new Vec3(1, -1, 0)).x,
	-1) );
	
console.assert( approx(
	a.setLengthOfVec3(new Vec3(3, 4, 0)).x,
	5) );

//////////////////////////////////////////////////////////////////////////////////

var a = new Vec2(9, 3);
var b = a.clone();
var c = new Vec2();
console.assert(b.x === 9);
console.assert(b.y === 3);
a.set();
console.assert(a.x === 0);
console.assert(a.y === 0);
a.set({x:2, y:3});
console.assert(a.x === 2);
console.assert(a.y === 3);
for(var i = 0; i<50; i++){
  a = Vec2.random({x:-2, y:-3}, {x:100, y:300});
  console.assert(a.x >= -2);
  console.assert(a.x < 100);
  console.assert(a.y >= -3);
  console.assert(a.y < 300);  
  b.setRandom(34, 35);
  console.assert(b.x >= 34);
  console.assert(b.x < 35);
  console.assert(b.y >= 34);
  console.assert(b.y < 35);  
  a.clamp(0, 1);
  console.assert(a.x >= 0);
  console.assert(a.x <= 1);
  a.setClamped(b, 34.4, 34.5);
  console.assert(a.y >= 34.4);
  console.assert(a.y <= 34.5);
}
b.set(1, 4);
c.set(-3, 3);
a.set(b).add(c);
console.assert(a.x === -2);
console.assert(a.y === 7); 
a = b.plus(c);
console.assert(a.x === -2);
console.assert(a.y === 7);
a.setSum(b, c);
console.assert(a.x === -2);
console.assert(a.y === 7);

a.set(b).sub(c);
console.assert(a.x === 4);
console.assert(a.y === 1);
a = b.minus(c);
console.assert(a.x === 4);
console.assert(a.y === 1);
a.setDifference(b, c);
console.assert(a.x === 4);
console.assert(a.y === 1);

a.set(b).mul(c);
console.assert(a.x === -3);
console.assert(a.y === 12);
a = b.times(c);
console.assert(a.x === -3);
console.assert(a.y === 12);
a.setProduct(b, c);
console.assert(a.x === -3);
console.assert(a.y === 12);

a.set(b).div(c);
console.assert(approx(a.x , -1/3));
console.assert(approx(a.y , 4/3));
a = b.over(c);
console.assert(approx(a.x , -1/3));
console.assert(approx(a.y , 4/3));
a.setQuotient(b, c);
console.assert(approx(a.x , -1/3));
console.assert(approx(a.y , 4/3));

b.set(2, 1);
a = b.times(7);
console.assert( approx(a.x, 14) );
console.assert( approx(a.y, 7) );
a.set(b).mul(7);
console.assert( approx(a.x, 14) );
console.assert( approx(a.y, 7) );
a.setScaled(b, 7);
console.assert( approx(a.x, 14) );
console.assert( approx(a.y, 7) );

b.set(4, -1);
c.set(3, -1);
console.assert( approx(b.dot(c), 13) );

b.set(3, 4);
console.assert( approx(b.length(), 5) );
a = b.direction();
b.normalize();
console.assert( approx(a.x, b.x) );
console.assert( approx(a.y, b.y) );

/////////////////////////////////////////////////////////////////

var a = new Vec3(9, 3, 2);
var b = a.clone();
var c = new Vec3();
console.assert(b.x === 9);
console.assert(b.y === 3);
console.assert(b.z === 2);
a.set();
console.assert(a.x === 0);
console.assert(a.y === 0);
console.assert(a.z === 0);
a.set({x:2, y:3, z:4});
console.assert(a.x === 2);
console.assert(a.y === 3);
console.assert(a.z === 4);
for(var i = 0; i<50; i++){
  a = Vec3.random({x:-2, y:-3}, {x:100, y:300});
  console.assert(a.x >= -2);
  console.assert(a.x < 100);
  console.assert(a.y >= -3);
  console.assert(a.y < 300);  
  console.assert(a.z >= 0);
  console.assert(a.z < 1);    
  b.setRandom(34, 35);
  console.assert(b.x >= 34);
  console.assert(b.x < 35);
  console.assert(b.y >= 34);
  console.assert(b.y < 35);  
  console.assert(b.z >= 34);
  console.assert(b.z < 35);    
  a.clamp(0, 1);
  console.assert(a.x >= 0);
  console.assert(a.x <= 1);
  a.setClamped(b, 34.4, 34.5);
  console.assert(a.y >= 34.4);
  console.assert(a.y <= 34.5);
}
b.set(1, 4, 1);
c.set(-3, 3, 3);
a.set(b).add(c);
console.assert(a.x === -2);
console.assert(a.y === 7); 
console.assert(a.z === 4); 
a = b.plus(c);
console.assert(a.x === -2);
console.assert(a.y === 7);
console.assert(a.z === 4); 
a.setSum(b, c);
console.assert(a.x === -2);
console.assert(a.y === 7);
console.assert(a.z === 4); 

a.set(b).sub(c);
console.assert(a.x === 4);
console.assert(a.y === 1);
console.assert(a.z === -2); 
a = b.minus(c);
console.assert(a.x === 4);
console.assert(a.y === 1);
console.assert(a.z === -2); 
a.setDifference(b, c);
console.assert(a.x === 4);
console.assert(a.y === 1);
console.assert(a.z === -2); 

a.set(b).mul(c);
console.assert(a.x === -3);
console.assert(a.y === 12);
console.assert(a.z === 3);
a = b.times(c);
console.assert(a.x === -3);
console.assert(a.y === 12);
console.assert(a.z === 3);
a.setProduct(b, c);
console.assert(a.x === -3);
console.assert(a.y === 12);
console.assert(a.z === 3);

a.set(b).div(c);
console.assert(approx(a.x , -1/3));
console.assert(approx(a.y , 4/3));
console.assert(approx(a.z , 1/3));
a = b.over(c);
console.assert(approx(a.x , -1/3));
console.assert(approx(a.y , 4/3));
console.assert(approx(a.z , 1/3));
a.setQuotient(b, c);
console.assert(approx(a.x , -1/3));
console.assert(approx(a.y , 4/3));
console.assert(approx(a.z , 1/3));

b.set(2, 1, -5);
a = b.times(7);
console.assert( approx(a.x, 14) );
console.assert( approx(a.y, 7) );
console.assert( approx(a.z, -35) );
a.set(b).mul(7);
console.assert( approx(a.x, 14) );
console.assert( approx(a.y, 7) );
console.assert( approx(a.z, -35) );
a.setScaled(b, 7);
console.assert( approx(a.x, 14) );
console.assert( approx(a.y, 7) );
console.assert( approx(a.z, -35) );

b.set(4, -1, 5);
c.set(3, -1, 5);
console.assert( approx(b.dot(c), 13 + 25) );

b.set(3, 4, 0);
console.assert( approx(b.length(), 5) );
a = b.direction();
b.normalize();
console.assert( approx(a.x, b.x) );
console.assert( approx(a.y, b.y) );
console.assert( approx(a.z, b.z) );

//======================================================
var aa1 = new Vec1Array(12);
var ba1 = new Vec1Array(12);
var ca1 = new Vec1Array(12);
ba1.addAll(ba1, new Vec1(5));
ca1.random();
ca1.scale(ca1, 10);
aa1.sub(ba1, ca1);
console.log(Array.prototype.slice.call(aa1.storage));
console.log(Array.prototype.slice.call(ba1.storage));
console.log(Array.prototype.slice.call(ca1.storage));
aa1.mul(aa1, ba1);
console.log(Array.prototype.slice.call(aa1.storage));
aa1.clamp();
console.log(Array.prototype.slice.call(aa1.storage));

var aa2 = new Vec2Array(12);
var ba2 = new Vec2Array(12);
var ca2 = new Vec2Array(12);

ba2.random();
ca2.random();
aa1.dotVec2s(ba2, ca2);
console.log(Array.prototype.slice.call(aa1.storage));
console.log(Array.prototype.slice.call(ba2.storage));
console.log(Array.prototype.slice.call(ca2.storage));

aa1.at(0).x = 333;
aa2.at(3).set(3, 4);
console.assert( approx(aa2.at(3).length(), 5) );

aa2.mulAll(ca2, new Vec2(-1, 2));
console.log(Array.prototype.slice.call(ca2.storage));
console.log(Array.prototype.slice.call(aa2.storage));


console.log(new Vec2(3, 4).addScaled(0.5, Vec2(2, 4)));