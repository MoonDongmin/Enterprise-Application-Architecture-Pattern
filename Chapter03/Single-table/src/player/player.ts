export class Player {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    getType(): string {
        return "선수입니다.";
    }
}
