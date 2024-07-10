class PopularProduct implements Product {
    getPrice(): number {
        return 100;
    }

    getAllHotRatings(): number[] {
        return [5, 4, 3];
    }
}
