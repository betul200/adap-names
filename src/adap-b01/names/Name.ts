export class Name {

    public readonly DEFAULT_DELIMITER: string = '.';
    private readonly ESCAPE_CHARACTER = '\\';

    private components: string[] = [];
    private delimiter: string = this.DEFAULT_DELIMITER;

    constructor(other: string[], delimiter: string = this.DEFAULT_DELIMITER) {
        this.components = other;
        this.delimiter = delimiter || this.DEFAULT_DELIMITER;
    }
    
    // @methodtype: get-method
    public asNameString(delimiter: string = this.delimiter): string {
    let result = "";
    for (let i = 0; i < this.components.length; i++) {
        result += this.components[i];
    
        if (i < this.components.length - 1) {
            result += delimiter || this.DEFAULT_DELIMITER;
    }
            
    }
    return result;
    }

    // @methodtype: get-method
    public getComponent(i: number): string {
        return this.components[i];
    }

    // @methodtype: set-method
    public setComponent(i: number, c: string): void {
        this.components[i] = c;
    }

    // @methodtype: get-method
    public getNoComponents(): number {
        return this.components.length;
    }

    // @methodtype: regular-method
    public insert(i: number, c: string): void {
        this.components.splice(i,0,c);
    }

    // @methodtype: regular-method
    public append(c: string): void {
        this.components.push(c);
    }

    // @methodtype: regular-method
    public remove(i: number): void {
        this.components.splice(i,1);
    }

}