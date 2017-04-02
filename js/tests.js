
var dists = new Vec1Array(10);
var particlePositions = new Vec3Array(10);
particlePositions.$random();
particlePositions.$scale(particlePositions, 20);
particlePositions.$subRepeat(particlePositions, new Vec3(10, 10, 10));

var ahead = new Vec3(1, 3, 6);
ahead.normalize();
dists.$dotRepeat(particlePositions, ahead);