import { Name } from "../names/Name";
import { StringName } from "../names/StringName";
import { Directory } from "./Directory";

export class RootNode extends Directory {

    //protected static ROOT_NODE: RootNode = new RootNode();

    //public static getRootNode() {
    //  return this.ROOT_NODE;
    //}

    constructor() {
        super("", {} as Directory);

        this.parentNode = this;
    }

    protected initialize(pn: Directory): void {
        // absichtlich leer
    }

    public getFullName(): Name {
        return new StringName("", '/');
    }

    public move(to: Directory): void {
        // null operation
    }

    protected doSetBaseName(bn: string): void {
        // null operation
    }

}