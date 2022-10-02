import fetch from "node-fetch";
import mongoose from "mongoose";

mongoose.connect('mongodb://localhost/Koin');
const postSchema= new mongoose.Schema({
    blockNumber:{
        type:String
    },
    timeStamp:{
        type:String
    },
    hash:{
        type:String
    },
    nonce:{
        type:String
    },
    blockHash:{
        type:String
    },
    transactionIndex:{
        type:String
    },
    from:{
        type:String
    },
    to:{
        type:String
    },
    value:{
        type:String
    },
    gas:{
        type:String
    },
    gasPrice:{
        type:String
    },
    isError:{
        type:String
    },
    txreceipt_status:{
        type:String
    },
    input:{
        type:String
    },
    contractAddress:{
        type:String
    },
    cumulativeGasUsed:{
        type:String
    },
    gasUsed:{
        type:String
    },
    confirmations:{
        type:String
    },
    methodId:{
        type:String
    },
    functionName:{
        type:String
    }
});
const post= mongoose.model("post",postSchema);
async function getpost(){
    const data=await fetch("https://api.etherscan.io/api?module=account&action=txlist&address=0xce94e5621a5f7068253c42558c147480f38b5e0d&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=YourApiKeyToken");
    const results=await data.json();
    let K=results.result.length;
    console.log(K);
    for(let i=0;i<K;i++){
        const post1=new post({
            blockNumber:results.result[i].blockNumber,
            timeStamp:results.result[i].timeStamp,
            hash:results.result[i].hash,
            nonce:results.result[i].nonce,
            blockHash:results.result[i].blockHash,
            transactionIndex:results.result[i].transactionIndex,
            from:results.result[i].from,
            to:results.result[i].to,
            value:results.result[i].value,
            gas:results.result[i].gas,
            gasPrice:results.result[i].gasPrice,
            isError:results.result[i].isError,
            txreceipt_status:results.result[i].txreceipt_status,
            input:results.result[i].input,
            contractAddress:results.result[i].contractAddress,
            cumulativeGasUsed:results.result[i].cumulativeGasUsed,
            gasUsed:results.result[i].gasUsed,
            confirmations:results.result[i].confirmations,
            methodId:results.result[i].methodId,
            functionName:results.result[i].functionName
        })
        post1.save();
    }
}
getpost();