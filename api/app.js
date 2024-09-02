const express = require("express");
const app = express();
const port = 3000;
const { Web3 } = require("web3");
const contractInfo = require("./constants.json");

const address = "0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC";
const privateKey =
  "0x56289e99c94b6912bfc12adc093c9b51124f0dc54ac7a766b2bc5ccf558d8027";
const rpc =
  "https://didactic-space-rotary-phone-gjg7v9grpx7fww9r-9650.app.github.dev/ext/bc/EcoChainColombia/rpc";

app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hola Bogotá!");
});

app.get("/contract-info", async (req, res) => {
  const EcoChainColombia = new Web3(rpc);
  const balanceEcoChainColombia = await EcoChainColombia.eth.getBalance(address);
  console.log({ balanceEcoChainColombia });
  res.send({
    message: "Hola Bogotá...!",
    balanceEcoChainColombia: Number(balanceEcoChainColombia) / 10 ** 18,
  });
});

app.post("/transfer-native-token", async (req, res) => {
  const EcoChainColombia = new Web3(rpc);
  const account = EcoChainColombia.eth.accounts.wallet.add(privateKey);
  const tx = {
    from: account[0].address,
    to: req.body.receiver,
    value: EcoChainColombia.utils.toWei(String(req.body.amount), "ether"),
  };
  const txReceipt = await EcoChainColombia.eth.sendTransaction(tx);
  console.log("Tx hash:", txReceipt.transactionHash);
  console.log(txReceipt.transactionHash);
  res.send({
    message: "Ok",
    statusCode: 200,
    txHash: txReceipt.transactionHash,
  });
});

const nftList = {
  Jaguar: "ipfs://Qmf6ukxkycuHSVaF8NkQWVtPwMkh191cEbetdqs6u6JUGX",
  Manati: "ipfs://QmdhVbQohUT6LWUa9Ctos6ecC7gNgGiMcRTALtX6HNFuHE",
  Mono_titi: "ipfs://QmZN4v6ycxag9jpxgeuB17atawxHgYtaprTebrMLdKaFqN",
  Rana_dorada: "ipfs://QmWkx1i1qnHpf6oHj9S3b6Uza6FVQ4oRd8z9CzLqwUaDF8",
  Esmeralda_de_rio: ""
}

app.post("/mint", async (req, res) => {
  const data = req.body;
  const EcoChainColombia = new Web3(rpc);
  const account = EcoChainColombia.eth.accounts.wallet.add(privateKey);
  let colectables = new EcoChainColombia.eth.Contract(
    contractInfo.abi,
    contractInfo.address
  );
console.log(data.receiver, nftList[data.uri])
  const mintColectable = await colectables.methods
  .safeMint(data.receiver, nftList[data.uri])
  .send({
    from: account[0].address,
  });

  res.send({
    message: "Ok",
    statusCode: 200,
    txHash: mintColectable.transactionHash,
  });

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
