
import UserBusiness from "../../src/business/UserBusiness";
import { SignupSchema } from "../../src/dtos/users/signup.dto";
import { HashManagerMock } from "../mocks/HashManagerMock";
import { IdGeneratorMock } from "../mocks/IdGeneratorMock";
import { TokenManagerMock } from "../mocks/TokenManagerMock";
import { UserDataBaseMock } from "../mocks/UserDataBaseMock";

describe("testando signup", () => {
  const userBusiness = new UserBusiness(
    new UserDataBaseMock(),
    new IdGeneratorMock(),
    new HashManagerMock(),
    new TokenManagerMock(),
  );

  test("deve gerar um token ao cadastrar", async () => {
    const result = await userBusiness.signup({
      username: "newuser",
      email: "newuser@email.com",
      password: "password123",
    });

    expect(result).toBeDefined();
    expect(result.token).toBeDefined();
  });
});
