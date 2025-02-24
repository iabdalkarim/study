const fs = require("fs");

function readFile(fileName) {
    return new Promise((resolve, reject) => {
        fs.readFile(fileName, "utf-8", (err, data) => {
            if (err) {
                reject(error);
            } else {
                resolve(data);
            }
        });
    });
}

function writeFile(fileName, data) {
    return new Promise((resolve, reject) => {
        fs.writeFile(fileName, data, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

async function readJSONFile(fileName) {
    try {
        const data = await readFile(fileName);
        return JSON.parse(data);
    } catch (error) {
        console.log(error);
        return [];
    }
}

async function main() {
    try {
        const names = await readJSONFile("names.json");
        const addresses = await readJSONFile("address.json");

        const bioData = names.map((name) => {
            const matchingAddress = addresses.find((address) => address.id === name.id);
            return { ...name, ...matchingAddress };
        });

        await writeFile("bio.json", JSON.stringify(bioData, null, 2));
        console.log("bio.json created successfully!");
    } catch (error) {
        console.error("Error combining data:", error);
    }
}

main();
