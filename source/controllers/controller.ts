import { Request, Response, NextFunction } from 'express';

const getListNFT = async (req: Request, res: Response, next: NextFunction) => {
    // get some posts

    let arr = []
    for (let index = 0; index < 5; index++) {
        arr.push(index);
        
    }
    return res.status(200).json({
        message: arr
    });
};


export default { getListNFT }