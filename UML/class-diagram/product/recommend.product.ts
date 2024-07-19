class RecommendedProduct implements Product {
    getPrice(): number {
        return 200;
    }

    getMyHitRatings(): number[] {
        return [5, 5, 5];
    }
}
