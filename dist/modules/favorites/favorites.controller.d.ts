import { Request, Response } from "express";
declare const _default: {
    getAllFavorites: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    getFavorite: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    addFavorite: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    removeFavorite: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
};
export default _default;
//# sourceMappingURL=favorites.controller.d.ts.map