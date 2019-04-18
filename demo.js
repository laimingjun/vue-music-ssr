var ary = [1, 2, 3, 4]
function fn(ary) {
  ary[0] = 0;
  ary = [0];
  ary[0] = 100
  return ary
}
var res = fn(ary)
console.log(ary);
console.log(res)