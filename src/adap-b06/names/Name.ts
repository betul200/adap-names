export class Name {
    private readonly components: string[];
    private readonly delimiter: string;

    constructor(components: string[], delimiter: string) {
        this.components = [...components];
        this.delimiter = delimiter;
    }

    isEmpty(): boolean {
        return this.components.length === 0;
    }

    getNoComponents(): number {
        return this.components.length;
    }

    getComponent(i: number): string {
        if (i < 0 || i >= this.components.length) {
            throw new Error("Index out of bounds");
        }
        return this.components[i];
    }

    setComponent(i: number, c: string): Name {
        if (i < 0 || i >= this.components.length) {
            throw new Error("Index out of bounds");
        }
        const newComponents = [...this.components];
        newComponents[i] = c;
        return new Name(newComponents, this.delimiter);
    }

    insert(i: number, c: string): Name {
        if (i < 0 || i > this.components.length) {
            throw new Error("Index out of bounds");
        }
        const newComponents = [
            ...this.components.slice(0, i),
            c,
            ...this.components.slice(i),
        ];
        return new Name(newComponents, this.delimiter);
    }

    append(c: string): Name {
        const newComponents = [...this.components, c];
        return new Name(newComponents, this.delimiter);
    }

    remove(i: number): Name {
        if (i < 0 || i >= this.components.length) {
            throw new Error("Index out of bounds");
        }
        const newComponents = [
            ...this.components.slice(0, i),
            ...this.components.slice(i + 1),
        ];
        return new Name(newComponents, this.delimiter);
    }

    concat(other: Name): Name {
        const newComponents = [...this.components, ...other.components];
        return new Name(newComponents, this.delimiter);
    }

    equals(other: any): boolean {
        if (!(other instanceof Name)) {
            return false;
        }
        return (
            this.components.join(this.delimiter) ===
            other.components.join(other.delimiter)
        );
    }

    clone(): Name {
        return new Name(this.components, this.delimiter);
    }

    toString(): string {
        return this.components.join(this.delimiter);
    }
}