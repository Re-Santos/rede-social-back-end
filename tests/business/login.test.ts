import UserBusiness from "../../src/business/UserBusiness";
import { LoginSchema } from "../../src/dtos/users/login.dto";
import { HashManagerMock } from "../mocks/HashManagerMock";
import { IdGeneratorMock } from "../mocks/IdGeneratorMock";
import { TokenManagerMock } from "../mocks/TokenManagerMock";
import { UserDataBaseMock } from "../mocks/UserDataBaseMock";

describe("testando login", () => {
  const userDataBaseMock = new UserDataBaseMock();
  const hashManagerMock = new HashManagerMock();
  const tokenManagerMock = new TokenManagerMock();
  const userBusiness = new UserBusiness(
    userDataBaseMock,
    new IdGeneratorMock(),
    hashManagerMock,
    tokenManagerMock,
  );

  // Para Cadastrar um usuário antes de fazer login (Renata)
  beforeAll(async () => {
    await userBusiness.signup({
      username: "testuser",
      email: "test@example.com",
      password: "testpassword",
    });
  });

  test("deve gerar um token ao cadastrar", async () => {
    const result = await userBusiness.login({
      email: "test@example.com", // Para usar o email cadastrado acima (Renata)
      password: "testpassword",
    });

    expect(result).toBeDefined();
    expect(result.token).toBeDefined();
  });
});
