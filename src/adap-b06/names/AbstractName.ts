import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { InvalidStateException } from "../common/InvalidStateException";
import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";

export abstract class AbstractName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;

    constructor(delimiter: string = DEFAULT_DELIMITER) {
        this.delimiter = delimiter;
    }

    public clone(): Name {        
        const clonedObject = Object.create(this)
        clonedObject.delimiter = this.delimiter
        return clonedObject
    }

    public asString(delimiter: string = this.delimiter): string {
        const components = [];
        for (let i = 0; i < this.getNoComponents(); i++) {
            components.push(this.getComponent(i));
        }
        return components.join(delimiter);
    }

    public toString(): string {
        return this.asString();
    }

    public asDataString(): string {
        let result = "";
        for (let i = 0; i < this.getNoComponents(); i++) {
            const component = this.getComponent(i);
            for (const char of component) {
                if (char === this.delimiter || char === ESCAPE_CHARACTER) {
                    result += ESCAPE_CHARACTER;
                }
                result += char;
            }
            if (i < this.getNoComponents() - 1) {
                result += this.delimiter;
            }
        }
        return result;
    }

    public isEqual(other: Name): boolean {
        if (this.getNoComponents() !== other.getNoComponents()) {
            return false;
        }
        for (let i = 0; i < this.getNoComponents(); i++) {
            if (this.getComponent(i) !== other.getComponent(i)) {
                return false;
            }
        }
        return true;
    }

    public getHashCode(): number {
        let hash = 0;
        for (let i = 0; i < this.getNoComponents(); i++) {
            const component = this.getComponent(i);
            for (const char of component) {
                hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
            }
        }
        return hash;
    }

    public isEmpty(): boolean {
        if(this.getNoComponents()==0){
            return true;
        }
        else {
            return false;
        }
    }

    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    abstract getNoComponents(): number;

    abstract getComponent(i: number): string;
    abstract setComponent(i: number, c: string): Name;

    abstract insert(i: number, c: string): Name;
    abstract append(c: string): Name;
    abstract remove(i: number): Name;

    public concat(other: Name): void {
        for (let i = 1; i <= other.getNoComponents(); i++) {
            this.append( other.getComponent(i))
        }
    }

}