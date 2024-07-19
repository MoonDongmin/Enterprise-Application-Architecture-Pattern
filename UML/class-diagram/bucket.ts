class Bucket {
    getProductId(): number[] {
        return [1, 2, 3];
    }
}

let bucket = new Bucket();
console.log(bucket.getProductId());
