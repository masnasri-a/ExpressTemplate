import { Request, Response, NextFunction } from 'express';
import { getParsedNftAccountsByOwner, isValidSolanaAddress, createConnectionConfig, resolveToWalletAddress, } from "@nfteyez/sol-rayz";
import * as web3 from "@solana/web3.js";
import axios from 'axios';
// import fetch from 'node-fetch';

const getListNFT = async (req: Request, res: Response, next: NextFunction) => {
    console.log("TEST");
    
    let address = req.body.address;
    if (address == undefined){
        address = "Bu1KuDHPrbxJCjZknqhZoyPCJ7eZGuME9JVHRL2pD8ZP"
    }
    const publicAddress = await resolveToWalletAddress({
        text: address
      });

    const nftArray = await getParsedNftAccountsByOwner({
        publicAddress: publicAddress,
        connection: new web3.Connection(web3.clusterApiUrl("devnet"))
      });
    let result: { name: any; description: any; image: any; }[] = []
    //
    const promises: any[] = []

      nftArray.map((datas)=>{
        let uri = datas.data.uri
        let data = axios(uri)
        promises.push(data)
        
      })
      const results = await Promise.all(promises);
  const actualDatas = results.map((data) => {
    return {
            "name": data.data.name,
            "description": data.data.description,
            "image": data.data.image
        }
  }); 
      console.log("act =",actualDatas);
    
    console.log("Access GET NFT");
    
    return res.status(200).json({
        message: actualDatas
    });
};


export default { getListNFT }