import { Request, Response, NextFunction } from 'express';
import { getParsedNftAccountsByOwner, isValidSolanaAddress, createConnectionConfig, resolveToWalletAddress, } from "@nfteyez/sol-rayz";
import * as web3 from "@solana/web3.js";

const getListNFT = async (req: Request, res: Response, next: NextFunction) => {
    // get some posts
    let address = req.body.address;
    if (address == undefined){
        address = "Bu1KuDHPrbxJCjZknqhZoyPCJ7eZGuME9JVHRL2pD8ZP"
    }
    const publicAddress = await resolveToWalletAddress({
        text: address
      });

      
    // let connect = new web3.Connection(web3.clusterApiUrl("devnet"));
    // const connect = createConnectionConfig('devnet');
    const nftArray = await getParsedNftAccountsByOwner({
        publicAddress: publicAddress,
        connection: new web3.Connection(web3.clusterApiUrl("devnet"))
      });

    let arr = []
    for (let index = 0; index < 5; index++) {
        arr.push(index);
        
    }
    return res.status(200).json({
        message: nftArray
    });
};


export default { getListNFT }