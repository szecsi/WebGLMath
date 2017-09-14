# WebGLMath
### A Vector math library for WebGL programming. Primarily intended for graphics education, with a focused set of features. Coded by Laszlo Szecsi for courses at the Aquincum Institute of Technology and the Budapest University of Technology and Economics.

## Features

* Scalar, 2D, 3D, and 4D vector, and matrix types, with corresponding array types.
* Support for implementing reflection of ESSL variables, including arrays, and non-vector types Sampler2D and SamplerCube.
* Offers programmer-friendly interface for expressive non-performance-critical code (e.g. scene setup).
* Also offers highly optimized methods for for performance-critical-code (e.g. per frame animation).
* Array methods for optimized bulk processing of data.

### Browser install

Currently, there is no minified version. Include all files in html using script tags. This is intentional to make source code instantly referenceable and debuggable for educational purposes and testing.

### Usage

```
a = b + c
```
can be computed as 
```javascript
var a = b.plus(c);
```
when `a` does not yet exist, and performance does not matter. It is not required that `c` is the same vector type as `b`: it can be a vector of different length, an object literal, or the coordinates can be given as separate arguments.
```javascript
a.set(b).add(c);
```
is about three times faster. Variable `a` needs to exist, and be a vector object. Neither `b` nor `c` are required to be objects of the same vector type: they can be vectors of different length, object literals, or the coordinates can be given as separate arguments.

If `a`, `b` and `c` are vector instances of similar length,
```javascript
a.setSum(b, c);
```
can be used for optimum performance. It is seven times faster than `a.set(b).add(c);`, or twenty times faster than `a = b.plus(c);`.

It is recommended to use optimized methods for time-critical per-frame tasks, while programmer-friendly interfaces are useful for one-time initializations, e.g. when constructing a scene.

Vectors are considered row vectors. Transforming a vector is performed by multiplying the vector with a matrix from the right.
```javascript
var v = new Vec4(1, 2, 3, 1);
var m = new Mat4().rotate(Math.PI/2, {z:1});
v.mul(m); // v <= (-2, 1, 3, 1);
console.table(v);
```

Only 4x4 matrices, i.e. [Mat4](Mat4.html)s, are supported. When transforming [Vec2](Vec2.html)s and [Vec3](Vec3.html)s, there are two options. When using methods [Vec2.prototype.xy01mul](Vec2#xy01mul) or [Vec3.prototype.xyz1mul](Vec3.html#xyz1mul), the vector is augmented to a homogeneous four-element position by appending a zero and a one, or a one, respectively. The extra coordinates from the result are discarded.
```javascript
var v = new Vec2(1, 2);
var m = new Mat4().translate(3, 4);
v.xy01mul(m); // v <= (4, 6), the translated vector
console.table(v);
```

When using methods [Vec2.prototype.xy00mul](Vec2.html#xy00mul) or [Vec3.prototype.xyz0mul](Vec3.html#xyz0mul), the vector is augmented to a homogeneous four-element direction vector by appending zeros. The extra coordinates from the result are discarded.
```javascript
var v = new Vec3(0, 1, 0);
var m = new Mat4().translate(3, 4).rotate(Math.PI/2, {z:1});
v.xyz0mul(m); // v <= (-1, 0, 0), as the direction is invariant to translation
console.table(v);
```

The coordinate system is assumed to be right-handed, i.e. rotations around the `z` axis rotate counterclockwise in the `xy` plane, if `x` points to the right and `y` upwards.

Matrices are represented in the column-major format internally to conform to the WebGL uniform variable layout. However, constructors, `set` methods take array input in the row-major layout to allow explicit matrix specification. Indexing matrix variables is also consistent with this row-major layout.
```javascript
var m = new Mat4([
  1, 0, 0, 0,
  0, 1, 0, 0,
  0, 0, 1, 0,
  2, 3, 5, 1,
]); // a translation matrix
var m2 = new Mat4().translate(-2, -3, -5); //identity multiplied by translation in the opposite direction
m.mul(m2); // m <= identity
var randomVector = Vec4.random(); // create a random vector to test that any vector is transformed to itself
var errorVector = randomVector.minus( randomVector.times(m) ); // errorVector <= (0, 0, 0, 0)
console.table(errorVector);
```