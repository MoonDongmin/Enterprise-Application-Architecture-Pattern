import {AbstractPlayerMapper} from "./abstractPlayerMapper";

export class BowlerMapper extends AbstractPlayerMapper {
    public override get typeCode(): string {
        return "B";
    }

    protected static TABLENAME: string = "Bowler";
}
