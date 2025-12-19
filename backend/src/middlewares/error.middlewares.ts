import { NextFunction, Request, Response } from "express";
import { HTTP_STATUS } from "~/constants/httpStatus";
import { ResponseClient } from "~/rules/response";
// đây là hàm xử lý lỗi (tất cả lỗi sẽ được truyền vô đây để xử lý)
export const defaultErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    const { status, ...errs } = err;
    console.log("errs", errs);

    res.status(status || HTTP_STATUS.INTERNAL_SERVER_ERROR).json(
        Object.keys(errs).length > 0
            ? new ResponseClient({
                  status: false,
                  ...errs,
              })
            : { message: "Đã có lỗi xảy ra" },
    );
};
