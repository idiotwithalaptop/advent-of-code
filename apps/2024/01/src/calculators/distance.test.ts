import { calculateDistance } from "./distance";

describe("distance calculator", () => {
    it("should calculate the distance between two points", () => {
        const origin = [5, 3, 8, 4, 2, 1, 9, 7, 6];
        const destination = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        expect(calculateDistance(origin, destination)).resolves.toBe(0);
    });

    it("should throw an error if the origin and destination have different lengths", () => {
        const origin = [5, 3, 8, 4, 2, 1, 9, 7, 6];
        const destination = [1, 2, 3, 4, 5, 6, 7, 8];
        expect(calculateDistance(origin, destination)).rejects.toThrow();
    });

    it("should match the example given", () => {
        const origin = [3, 4, 2, 1, 3, 3];
        const destination = [4, 3, 5, 3, 9, 3];
        expect(calculateDistance(origin, destination)).resolves.toBe(11);
    });
});