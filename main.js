const max = 20;
const epsilon = 0; //1e-10;

const vals = [];
// const x = 5;
for (let x = 2; x <= max; x++) {
	vals[x] = 1;
	for (let n = 2; n <= max; n++) {
		const val = f(x, n);
		// console.log(`x=${x}`, `n=${n}`, val);
		vals[x] *= val;
		// if (isNaN(vals[x])) {
		// 	console.log('NaN', x, n, val);
		// }
	}
	console.log(x, vals[x]);
}

function f(x, n) {
	x += epsilon;
	// this is just to compensate for the fact that Math.sin(n * Math.PI) != 0, for some reason
	const sin = x % n == 0 ? 0 : Math.sin((Math.PI * x) / n);
	// const sin = Math.sin((Math.PI * x) / n);
	if (x == n && sin == 0) {
		return 1;
	}
	const val = sin / (x - n);
	if (isNaN(val)) {
		console.log('f: NaN', x, n, sin);
	}
	if (!isFinite(val)) {
		console.log('f val', val, x, n, sin);
		return Math.sign(val) * Number.MAX_VALUE;
	}
	return val;
}

function fPrime(x, n) {
	// this is just to compensate for the fact that Math.sin(n * Math.PI) != 0, for some reason
	const sin = x % n == 0 ? 0 : Math.sin((Math.PI * x) / n);
	return (
		(Math.PI * (x - n) * Math.cos((Math.PI * x) / n) - n * sin) /
		(n * (x - n) * (x - n))
	);
}

function fPrimePrime(x, n) {
	// this is just to compensate for the fact that Math.sin(n * Math.PI) != 0, for some reason
	const sin = x % n == 0 ? 0 : Math.sin((Math.PI * x) / n);
	return (
		(-Math.PI * Math.PI * (x - n) * (x - n) * sin -
			2 * Math.PI * n * (x - n) +
			Math.cos((Math.PI * x) / n) +
			2 * n * n * sin) /
		(n * n * (x - n) * (x - n) * (x - n) * (x - n))
	);
}
