class PopularProduct implements Product {
    getPrice(): number {
        return 100;
    }

    getAllHitRatings(): number[] {
        return [5, 4, 3];
    }
}
