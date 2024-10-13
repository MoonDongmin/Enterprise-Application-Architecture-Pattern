import {AbstractPlayerMapper} from "./abstractPlayerMapper";

export class CricketPlayerMapper extends AbstractPlayerMapper {
    public override get typeCode(): string {
        return "C";
    }

    protected static TABLENAME: string = "CricketPlayer";
}
