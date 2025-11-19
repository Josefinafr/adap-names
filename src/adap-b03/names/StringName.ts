import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";

export class StringName extends AbstractName {

    protected name: string = "";
    protected noComponents: number = 0;

        protected components: string[] = [];

    constructor(source: string, delimiter?: string) {
        super();
        super(delimiter ?? DEFAULT_DELIMITER);
        this.components = this.parseDataString(source);
        this.updateCache(source);
    }

        private updateCache(dataString?: string): void {
        this.noComponents = this.components.length;
        if (dataString !== undefined) {
            this.name = dataString;
        } else {
            // Data-String über die Logik aus AbstractName erzeugen
            this.name = super.asDataString();
        }
    }

        protected doClone(): Name {
        // clone anhand des aktuellen Data-Strings
        return new StringName(this.asDataString(), this.delimiter);
    }

    public clone(): Name {
        return super.clone();
    }

    public asString(delimiter: string = this.delimiter): string {
        return super.asString(delimiter);
    }

    public asDataString(): string {
        const data = super.asDataString();
        this.updateCache(data);
        return this.name;
    }

    public isEqual(other: Name): boolean {
        return super.isEqual(other);
    }

    public getHashCode(): number {
        return super.getHashCode();
    }

    public isEmpty(): boolean {
        return super.isEmpty();
    }

    public getDelimiterCharacter(): string {
        return super.getDelimiterCharacter();
    }

    public getNoComponents(): number {
          return this.components.length;
    }

    public getComponent(i: number): string {
        this.assertIndexInRange(i);
        return this.components[i];
    }

    public setComponent(i: number, c: string) {
        this.assertIndexInRange(i);
        this.components[i] = c;
        this.updateCache();
    }

    public insert(i: number, c: string) {
        if (i < 0 || i > this.components.length) {
            throw new RangeError("Index out of range");
        }
        this.components.splice(i, 0, c);
        this.updateCache();
    }

    public append(c: string) {
        this.components.push(c);
        this.updateCache();
    }

    public remove(i: number) {
        this.assertIndexInRange(i);
        this.components.splice(i, 1);
        this.updateCache();
    }

    public concat(other: Name): void {
        for (let i = 0; i < other.getNoComponents(); i++) {
            this.components.push(other.getComponent(i));
        }
        this.updateCache();
    }

        private assertIndexInRange(i: number): void {
        if (i < 0 || i >= this.components.length) {
            throw new RangeError("Index out of range");
        }
    }

}