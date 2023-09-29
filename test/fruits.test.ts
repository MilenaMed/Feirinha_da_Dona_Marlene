import app from "index";
import supertest from "supertest";
import { faker } from '@faker-js/faker';
import httpStatus from "http-status";

const api = supertest(app);

describe("POST /fruits", () => {
    it("should return 201 when inserting a fruit", async () => {
        const fruit = {
            name: faker.word.verb(),
            price: faker.number.int()
        }

        const { status } = await api.post('/fruits').send(fruit)
        expect(status).toBe(httpStatus.CREATED)
    });
})