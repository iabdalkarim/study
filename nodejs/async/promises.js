/////////////////////////////
/// code academy examples ///
/////////////////////////////

const shopForBeans = () => {
    return new Promise((resolve, reject) => {
        const beanTypes = ["kidney", "fava", "pinto", "black", "garbanzo"];
        setTimeout(() => {
            let randomIndex = Math.floor(Math.random() * beanTypes.length);
            let beanType = beanTypes[randomIndex];
            console.log(`2. I bought ${beanType} beans because they were on sale.`);
            resolve(beanType);
        }, 1000);
    });
};

async function getBeans() {
    console.log(`1. Heading to the store to buy beans...`);
    let value = await shopForBeans();
    console.log(`3. Great! I'm making ${value} beans for dinner tonight!`);
}

getBeans();
console.log("Describe what happens with this `console.log()` statement as well.");

//////////////////////////////////////////////////////////////////////////////////

const inventory = {
    sunglasses: 1900,
    pants: 1088,
    bags: 1344,
};

// Write your code below:
const myExecutor = (resolve, reject) => {
    if (inventory.sunglasses > 0) {
        resolve("Sunglasses order processed.");
    } else {
        reject("That item is sold out.");
    }
};

const orderSunglasses = () => {
    return new Promise(myExecutor);
};

const orderPromise = orderSunglasses();

console.log(orderPromise);

//////////////////////////////////////////////////////////////////////////////////

let prom = new Promise((resolve, reject) => {
    let num = Math.random();
    if (num < 0.5) {
        resolve("Yay!");
    } else {
        reject("Ohhh noooo!");
    }
});

const handleSuccess = (resolvedValue) => {
    console.log(resolvedValue);
};

const handleFailure = (rejectionReason) => {
    console.log(rejectionReason);
};

prom.then(handleSuccess, handleFailure);

prom.then(handleSuccess).catch(handleFailure);
