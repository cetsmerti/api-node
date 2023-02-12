import { compare, hash } from 'bcryptjs'
export class User {
    private _password: string
    constructor(private readonly _email: string, private readonly _name: string, password?: string) {
        if (password) {
            this._password = password
        }
    }
    get email(): string {
        return this._email

    }
    public async serPassword(pass: string, salt: number) {
        this._password = await hash(pass, salt)
    }
    get password(): string {
        return this._password
    }
    get name(): string {
        return this._name
    }
    public async comparePass(pass: string): Promise<boolean> {
        return compare(pass, this.password)
    }
}