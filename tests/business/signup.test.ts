
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
    new TokenManagerMock(),
    new HashManagerMock()
  );

  test("deve gerar um token ao cadastrar", async () => {
    const input = SignupSchema.parse({
      username: "Jane",
      email: "jane@email.com",
      password: "jane123",
    });

    const output = await userBusiness.signup(input);

    expect(output).toEqual({
      token: "token-mock",
    });
  });
});