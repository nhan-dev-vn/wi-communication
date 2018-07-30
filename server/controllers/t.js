function wait(t) {
    setTimeout(function() {console.log(t)}, t);
}
async function main() {
   await wait(1000);
   let arr = [100, 300, 500].map(val => wait(val))
   arr.forEach(async function(func) {
       var result = await func;
       arr.push(result)
   })
   
   // ??? error
}

main()