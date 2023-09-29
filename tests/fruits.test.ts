import app from "../src/index";
import supertest from "supertest";
import { faker } from '@faker-js/faker';
import httpStatus from "http-status";
import { fruitFactory } from "./factories/fruit-factory";

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
    it("should return 409 when inserting a fruit that is already registered", async () => {
        const fruit = {
            name: "banana",
            price: faker.number.int()
        }
        fruitFactory.insertFruit(fruit)
        const { status } = await api.post('/fruits').send(fruit)
        expect(status).toBe(httpStatus.CONFLICT)
    });
    it("should return 422 when inserting a fruit with data missing", async () => {
        const fruit = {
            name: faker.word.verb(),
        }

        const { status } = await api.post('/fruits').send(fruit)
        expect(status).toBe(httpStatus.UNPROCESSABLE_ENTITY)
    });
})

describe("GET /fruits", () => {
    it("shoud return 404 when trying to get a fruit by an id that doesn't exist", async () => {
        const { status } = await api.get('/fruits/154')
        expect(status).toBe(httpStatus.NOT_FOUND)
    });
    it("should return 400 when id param is present but not valid", async () => {
        const { status } = await api.get('/fruits/banana')
        expect(status).toBe(httpStatus.BAD_REQUEST)
    });
    it("should return one fruit when given a valid and existing id", async () => {
        const fruit = {
            name: "banana",
            price: faker.number.int()
        }
        fruitFactory.insertFruit(fruit)

        const { status , body } = await api.get('/fruits/1')
        expect(status).toBe(httpStatus.OK)
        expect(body).toEqual({
            id: expect.any(Number),
            name: expect.any(String),
            price: expect.any(Number),

        })
    });
})