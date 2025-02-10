function XYZ() {}

XYZ.prototype.sum = (x, y) => {
    return x + y;
};

function ABC() {}

ABC.prototype = new XYZ();

let a = new ABC();

console.log(a.sum(2, 3));
