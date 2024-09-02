const express = require("express");
const app = express();
const port = 3000;
const { Web3 } = require("web3");
const axios = require("axios");
const contractInfo = require("./constants.json"); // Asegúrate de que la dirección y ABI sean correctas

// Configuración de Web3 y contrato
const address = "0x4ecF57DB88dD6b80cCe52DB98811646264c115e6"; // Tu dirección de wallet en EcoChainColombia
const privateKey = "592b136c805540ea4e9b017ab2bca42f0ddd0911f64500b7839493c2ce0130a7"; // Tu private key
const rpc = "https://didactic-space-rotary-phone-gjg7v9grpx7fww9r-9650.app.github.dev/ext/bc/EcoChainColombia/rpc";
const ipfsAPIUrl = "https://ipfs.infura.io:5001/api/v0/add"; // URL del API de IPFS para añadir archivos

app.use(express.json());

// Endpoint para verificar el saldo
app.get("/", (req, res) => {
  res.send("Hola Bogotá!");
});

app.get("/contract-info", async (req, res) => {
  const lucasNet = new Web3(rpc);
  const balanceLucas = await lucasNet.eth.getBalance(address);
  res.send({
    message: "Hola Bogotá...!",
    balanceLucas: Number(balanceLucas) / 10 ** 18,
  });
});

// Endpoint para transferir un token nativo
app.post("/transfer-native-token", async (req, res) => {
  const EcoChainColombia = new Web3(rpc);
  const account = EcoChainColombia.eth.accounts.wallet.add(privateKey);
  const tx = {
    from: account[0].address,
    to: req.body.receiver,
    value: EcoChainColombia.utils.toWei(String(req.body.amount), "ether"),
  };
  const txReceipt = await lucasNet.eth.sendTransaction(tx);
  res.send({
    message: "Ok",
    statusCode: 200,
    txHash: txReceipt.transactionHash,
  });
});

// Endpoint para transferir "diamantes" desde el smart contract
app.post("/transfer-diamond", async (req, res) => {
  const data = req.body;
  const EcoChainColombia = new Web3(rpc);
  const account = EcoChainColombia.eth.accounts.wallet.add(privateKey);
  let diamonds = new EcoChainColombia.eth.Contract(contractInfo.abi, contractInfo.address);
  const transferDiamond = await diamonds.methods
    .transfer(data.receiver, data.amount)
    .send({ from: account[0].address });

  res.send({
    message: "Ok",
    statusCode: 200,
    txHash: transferDiamond.transactionHash,
  });
});

// Endpoint para manejar la creación y asociación de NFTs
app.post("/mint-nft", async (req, res) => {
  try {
    const { receiver, name, description, image, attributes } = req.body;
    const EcoChainColombia = new Web3(rpc);
    const account = EcoChainColombia.eth.accounts.wallet.add(privateKey);
    let nftContract = new EcoChainColombia.eth.Contract(contractInfo.abi, contractInfo.address);

    // Crear el JSON con los metadatos del NFT
    const nftMetadata = {
      name: name,
      description: description,
      image: image,
      attributes: attributes
    };

    // Subir los metadatos a IPFS
    const formData = new FormData();
    formData.append('file', JSON.stringify(nftMetadata), { filename: 'metadata.json' });
    const ipfsResponse = await axios.post(ipfsAPIUrl, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });

    // Obtener el hash del JSON de IPFS
    const metadataHash = ipfsResponse.data.Hash;

    // Mint del NFT
    const mintTx = await nftContract.methods.safeMint(receiver, `https://gateway.pinata.cloud/ipfs/${metadataHash}`)
      .send({ from: account[0].address });

    res.send({
      message: "NFT creado",
      statusCode: 200,
      txHash: mintTx.transactionHash,
      metadataHash: metadataHash
    });
  } catch (error) {
    console.error("Error al crear NFT:", error);
    res.status(500).send({
      message: "Error al crear NFT",
      error: error.message
    });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

