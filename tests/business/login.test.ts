// import { UserBusiness } from "../../src/business/UserBusiness";
// import {UserBusiness} from "@src/business/UserBusiness";
import UserBusiness from "../../src/business/UserBusiness";
import { LoginSchema } from "../../src/dtos/users/login.dto";
import { HashManagerMock } from "../mocks/HashManagerMock";
import { IdGeneratorMock } from "../mocks/IdGeneratorMock";
import { TokenManagerMock } from "../mocks/TokenManagerMock";
import { UserDataBaseMock } from "../mocks/UserDataBaseMock";
// import { UserDataBaseMock } from "../UserDataBaseMock";

describe("testando login", () => {
  const userBusiness = new UserBusiness(
    new UserDataBaseMock(),
    new IdGeneratorMock(),
    new TokenManagerMock(),
    new HashManagerMock()
  );

  test("deve gerar um token ao cadastrar", async () => {
    const input = LoginSchema.parse({
      email: "usernormal@email.com",
      password: "hash-mock-usernormal",
    });

    const output = await userBusiness.login(input);

    expect(output).toEqual({
      token: "token-mock-usernormal",
    });
  });
});