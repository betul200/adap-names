import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";
import { IllegalArgumentException } from "../common/IllegalArgumentException";

export class StringName extends AbstractName {

    private readonly name: string = "";
    private readonly noComponents: number;

    constructor(other: string, delimiter?: string) {
        super(delimiter);
        this.name = other;
        this.noComponents = this.name.length;
    }
    public getNoComponents(): number {
        return this.noComponents;
    }

    public getComponent(i: number): string {
        const components = this.name.split(this.delimiter);
        if (i < 0 || i >= components.length) {
            throw new Error(`out of bounds`);
        }
        return components[i];
    }

    public setComponent(i: number, c: string): StringName {
        const components = this.name.split(this.delimiter);
        if (i < 0 || i >= components.length) {
            throw new Error(`out of bounds`);
        }
        components[i] = c;
        return new StringName(components.join(this.delimiter), this.delimiter);
    }

    public insert(i: number, c: string): StringName {
        const components = this.name.split(this.delimiter);
        if (i < 0 || i > components.length) {
            throw new Error(`out of bound`);
        }
        components.splice(i, 0, c);
        return new StringName(components.join(this.delimiter), this.delimiter);
    }

    public append(c: string): StringName {
        return new StringName(this.name + this.delimiter + c, this.delimiter);  
    }

    public remove(i: number):StringName {
        const components = this.name.split(this.delimiter);
        if (i < 0 || i >= components.length) {
            throw new Error(`out of bounds`);
        }
        components.splice(i, 1);
        return new StringName(components.join(this.delimiter), this.delimiter);
    }

    public concat(other: Name): StringName {
        const otherComponents = [];
        for (let i = 0; i < other.getNoComponents(); i++) {
            otherComponents.push(other.getComponent(i));
        }
        return new StringName(
            this.name + this.delimiter + otherComponents.join(this.delimiter),
            this.delimiter
        );
    }

}