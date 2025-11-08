import { Request, Response } from "express";
declare const _default: {
    getAllCats: (req: Request, res: Response) => Promise<void>;
    getOneCat: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    createCatCard: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    deleteCatCard: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    updateCat: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
};
export default _default;
//# sourceMappingURL=cats.controllers.d.ts.map