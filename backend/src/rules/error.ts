export type ErrorsType = Record<
    string,
    {
        msg: string;
        [key: string]: any;
    }
>;

export class ErrorWithStatus {
    message: string;
    status: number;
    constructor({ message, status, ...args }: { message: string; status: number; [key: string]: any }) {
        this.message = message;
        this.status = status;
        if (args) {
            Object.assign(this, args);
        }
    }
}
