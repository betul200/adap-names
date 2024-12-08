import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";
import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { InvalidStateException } from "../common/InvalidStateException";

export class StringArrayName extends AbstractName {
    private readonly components: string[];

    constructor(source: string[], delimiter: string = DEFAULT_DELIMITER) {
        super(delimiter);
        this.components= [...source];
    }

    public getNoComponents(): number {
        return this.components.length;
    }

    public getComponent(i: number): string {
        if (i < 0 || i >= this.getNoComponents()) {
            throw new Error(`out of bounds`);
        }
        return this.components[i];
    }

    public setComponent(i: number, c: string): Name {
        if (i < 0 || i >= this.getNoComponents()) {
            throw new Error(`out of bounds`);
        }
        const newComponents = [...this.components];
        newComponents[i]=c;
        return new StringArrayName(newComponents, this.delimiter);
    }

    public insert(i: number, c: string): Name {
        if (i < 0 || i > this.getNoComponents()) {
            throw new Error(`out of bounds`);
        }
        const newComponents = [...this.components];
        newComponents.splice(i, 0, c);
        return new StringArrayName(newComponents, this.delimiter);
    }

    public append(c: string): Name {
        return new StringArrayName([...this.components, c], this.delimiter);
    }

    public remove(i: number): Name {
        if (i < 0 || i >= this.getNoComponents()) {
            throw new Error(`out of bounds`);
        }
        const newComponents = [...this.components];
        newComponents.splice(i, 1);
        return new StringArrayName(newComponents, this.delimiter);
    }

    public concat(other: Name): Name {
        const newComponents = [];
        for (let i = 0; i < other.getNoComponents(); i++) {
            newComponents.push(other.getComponent(i));
        }
        return new StringArrayName([...this.components, ...newComponents], this.delimiter);
    }
}
