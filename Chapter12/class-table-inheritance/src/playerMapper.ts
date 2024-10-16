import {Mapper}       from "./mapper";
import {Footballer}   from "./data/footballer";
import {DomainObject} from "./data/domainObject";

class PlayerMapper extends Mapper {
    protected static tableName: string = "Players";

    private bmapper: Mapper; // Assuming mappers for different types are instances of Mapper
    private cmapper: Mapper;
    private fmapper: Mapper;

    constructor(bmapper: Mapper, cmapper: Mapper, fmapper: Mapper) {
        super();
        this.bmapper = bmapper;
        this.cmapper = cmapper;
        this.fmapper = fmapper;
    }

    public find(key: number): Player | null {
        const row = this.findRow(key, this.tableFor(PlayerMapper.tableName));
        if (!row) return null;

        const typeCode = row["type"] as string;

        if (typeCode === this.bmapper.typeCode) {
            return this.bmapper.find(key) as Player;
        } else if (typeCode === this.cmapper.typeCode) {
            return this.cmapper.find(key) as Player;
        } else if (typeCode === this.fmapper.typeCode) {
            return this.fmapper.find(key) as Player;
        } else {
            throw new Error("Unknown type");
        }
    }

    public override update(obj: DomainObject): void {
        const mapper = this.mapperFor(obj);
        mapper.update(obj); // Delegate the update to the correct mapper
    }

    private mapperFor(obj: DomainObject): Mapper {
        if (obj instanceof Footballer) {
            return this.fmapper;
        } else if (obj instanceof Bowler) {
            return this.bmapper;
        } else if (obj instanceof Cricketer) {
            return this.cmapper;
        } else {
            throw new Error("No mapper available");
        }
    }

    public override insert(obj: DomainObject): void {
        return super.insert(obj);
    }

    public override delete(obj: DomainObject): void {
        this.mapperFor(obj).delete(obj);
    }
}
