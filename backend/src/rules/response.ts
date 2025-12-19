export class ResponseClient {
    status: boolean;
    message: string;
    result?: any;
    constructor({
        status = true,
        message = "Thao tác thành công!",
        result,
        ...args
    }: { status?: boolean; message?: string; result?: any; [key: string]: any } = {}) {
        this.status = status;
        this.message = message;
        Object.assign(this, args);
        if (result) {
            this.result = result;
        }
    }
}
