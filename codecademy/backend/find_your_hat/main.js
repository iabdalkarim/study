const prompt = require("prompt-sync")({ sigint: true });
const readline = require("readline");
const term = require("terminal-kit").terminal;

const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";

function generateRandom(max) {
    return Math.floor(Math.random() * max);
}

class Field {
    constructor(field, startX, startY) {
        this.field = field;
        this.currRow = startY;
        this.currCol = startX;
    }

    print() {
        for (const row of this.field) {
            for (const c of row) {
                switch (c) {
                    case fieldCharacter:
                        term.blue(c);
                        break;
                    case pathCharacter:
                        term.green(c);
                        break;
                    case hat:
                        term.yellow(c);
                        break;
                    case hole:
                        term.red(c);
                        break;
                }
            }
            console.log("");
        }
    }

    move(direction) {
        this.update(direction);
        if (this.isOutOfField()) {
            throw new Error("Out of bound instructions");
        }
        if (this.isHole()) {
            throw new Error("Fall down in a hole");
        }
        if (this.isHatFound()) {
            return true;
        }
        this.field[this.currRow][this.currCol] = pathCharacter;
        return false;
    }

    isHatFound() {
        return this.field[this.currRow][this.currCol] === hat;
    }

    isOutOfField() {
        return (
            this.currRow >= this.field.length ||
            this.currRow < 0 ||
            this.currCol > this.field[0].length ||
            this.currCol < 0
        );
    }

    isHole() {
        return this.field[this.currRow][this.currCol] === hole;
    }

    update(direction) {
        switch (direction) {
            case "d":
                this.currRow++;
                break;
            case "u":
                this.currRow--;
                break;
            case "r":
                this.currCol++;
                break;
            case "l":
                this.currCol--;
                break;
            default:
                throw new Error("Unknown instructions");
        }
    }

    start() {
        while (!myField.isHatFound()) {
            readline.cursorTo(process.stdout, 0, 0);
            readline.clearScreenDown(process.stdout);
            this.print();
            const direction = prompt("Which way?").toLowerCase();
            try {
                this.move(direction);
            } catch (error) {
                console.log(error.message);
                break;
            }
        }
        if (myField.isHatFound()) {
            console.log("Congrats, you found your hat.");
        }
    }

    static generateField(height, width, percentageOfHoles) {
        const field = [];
        for (let h = 0; h < height; h++) {
            field.push(new Array(width).fill(fieldCharacter));
        }
        const numOfHoles = (height * width * percentageOfHoles) / 100;
        // add hat
        field[generateRandom(height)][generateRandom(width)] = hat;
        // add holes
        for (let n = 0; n < numOfHoles; n++) {
            let x = 0,
                y = 0;
            do {
                y = generateRandom(height);
                x = generateRandom(width);
            } while (field[y][x] !== fieldCharacter);

            field[y][x] = hole;
        }
        // add start
        let x = 0,
            y = 0;
        do {
            y = generateRandom(height);
            x = generateRandom(width);
        } while (field[y][x] !== fieldCharacter);
        field[y][x] = pathCharacter;
        return { field, start: { x, y } };
    }
}

const genFieldData = Field.generateField(10, 10, 10);
const myField = new Field(genFieldData.field, genFieldData.start.x, genFieldData.start.y);

myField.start();
