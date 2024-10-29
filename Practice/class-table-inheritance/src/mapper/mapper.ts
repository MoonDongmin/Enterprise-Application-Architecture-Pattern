import {DomainObject} from "../domainObject";

export class Mapper {
    protected db: any;

    constructor(db: any) {
        this.db = db;
    }

    // 검색 메서드
    protected findAll() {
        throw new Error("findAll() 메서드는 하위클래스에서 구현해야 합니다.");
    }


    // 삽입 메서드
    protected async insert(obj: DomainObject): Promise<void> {
        throw new Error("insert() 메서드는 하위클래스에서 구현해야 합니다.");
    }

    // 업데이트 메서드
    protected async update(obj: DomainObject): Promise<void> {
        throw new Error("update() 메서드는 하위클래스에서 구현해야 합니다.");
    }

    // 데이터 삭제 메서드
    public async delete(obj: DomainObject): Promise<void> {
        throw new Error("update() 메서드는 하위클래스에서 구현해야 합니다.");
    }
}
