"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// export interface TokenPayload {
//   id: string;
//   username:string;
// }
class User {
    constructor(id, username, email, password, role, created_at) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.role = role;
        this.created_at = created_at;
    }
    getId() {
        return this.id;
    }
    getName() {
        return this.username;
    }
    getRole() {
        return this.role;
    }
    toUserModel() {
        return {
            id: this.id,
            username: this.username,
            email: this.email,
            role: this.role,
            createdAt: this.created_at.toISOString(),
        };
    }
    setId(value) {
        this.id = value;
    }
    getUsername() {
        return this.username;
    }
    setUsername(value) {
        this.username = value;
    }
    getEmail() {
        return this.email;
    }
    setEmail(value) {
        this.email = value;
    }
    getPassword() {
        return this.password;
    }
    setPassword(value) {
        this.password = value;
    }
    toUserDB() {
        return {
            id: this.id,
            username: this.username,
            email: this.email,
            role: this.role,
            password: this.password,
            created_at: this.created_at
        };
    }
}
exports.default = User;
