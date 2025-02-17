const prompt = require("prompt-sync")({ sigint: true });
const readline = require("readline");

const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";

class Field {
    constructor(field) {
        this.field = field;
        this.currRow = 0;
        this.currCol = 0;
    }

    print() {
        for (const row of this.field) {
            console.log(row.join(""));
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

    static generateField(height, width) {}
}

const myField = new Field([
    ["*", "░", "O"],
    ["░", "O", "░"],
    ["░", "^", "░"],
]);

myField.start();
