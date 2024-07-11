class RecommendedProduct implements Product {
    getPrice(): number {
        return 200;
    }

    getMyHotRatings(): number[] {
        return [5, 5, 5];
    }
}
