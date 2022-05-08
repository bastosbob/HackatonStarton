import ReactDOM from 'react-dom';
import {AppBar, Toolbar, IconButton, Icon, Typography, TextField} from "@mui/material";
import Button from '@mui/material/Button';
import {useNavigate} from "react-router-dom";
import { useState } from 'react';
import './form.css';
import axios from "axios";


const starton = axios.create({
    baseURL: "https://api.starton.io/v2",
    headers: {
        "x-api-key": "IPmnuocxkcukE5Ec1nkM9u5ETESuL0lJ",
    },
});


const backend = axios.create({
    baseURL: "http://localhost:9090",
    headers: {
        accept: "application/json",
    }
}
);

async function createCollectionFile(name, description, cid, meta) {
  await backend.post("/create", {
   "name": name,
   "description": description,
      "cid": cid,
      "meta": meta
      }
  );
}


async function safeMint(sid) {
    const opensea = {
        external_link: "external-link-url",
        seller_fee_basis_points: 100,
        fee_recipient: ""
    }
}


async function uploadMetadataOnIpfs(imgCid, name, description) {
    const metadataJson = {
        "name": "Ticket for " + name,
        "description": description,
       "image": `ipfs://ipfs/${imgCid}`,

    };

    const ipfsMetadata = await starton.post("/pinning/content/json",
        {
            name: name,
            content: metadataJson,
            isSync: true,
        });
    return ipfsMetadata.data.pinStatus.pin.cid;
}

async function uploadContractMetaDataOnIpfs(imgCid, name, description) {
    const metadataJson = {
        "name": name,
        "description":  description,
        "image": "ipfs://ipfs/" + imgCid,
        "external_link": "",
        "seller_fee_basis_points": 100,
        "fee_recipient": "0x3DD31b03b9e26e003ca24e892914c5c0de9D98BD"
    }

    const ipfsMetadata = await starton.post("/pinning/content/json",
        {
            name: name,
            content: metadataJson,
            isSync: true,
        });
    return ipfsMetadata.data;
}

async function createNftCollection(collectionName, cid) {
    const axios = require("axios")

    const http = axios.create({
        baseURL: "https://api.starton.io/v2",
        headers: {
            "x-api-key": 'IPmnuocxkcukE5Ec1nkM9u5ETESuL0lJ',
        },


    })
    let new_cid = await http.post( '/smart-contract/from-template',
        {
            "network": 'polygon-mumbai',
            "name": collectionName,
            "templateId": 'sct_e851adefe4494fc991207b2c37ed8a83',
            "signerWallet": "0xd82Af86bDAB2a0a1f98CF3bAf4427A97be16B047",
            "speed": "low",
            "params": [
                collectionName,
                'TICKET',
                'ipfs://ipfs/',
                cid,
                '0xd82Af86bDAB2a0a1f98CF3bAf4427A97be16B047'
            ]

        })
    console.log(new_cid.data)
    return new_cid.data.smartContract.address;
}

function Collection() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
   ;


    //create a dropdown with the collections

    async function handle(name,description) {
        let cid = await  uploadContractMetaDataOnIpfs('QmRE5Qmn2Vy3xy9GSG54k3qS8Q3oNUi5seGVecdBQJUZDr', name, '')
        let meta = await uploadMetadataOnIpfs('QmRE5Qmn2Vy3xy9GSG54k3qS8Q3oNUi5seGVecdBQJUZDr', name, '')
        let contract = await createNftCollection(name, cid);
        console.log(meta)
        console.log("contract address: " + contract)
        await createCollectionFile(name, '', contract, meta);
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        handle(name, '');
    }
    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Button onClick={() => navigate('/')}>Home</Button>
                    <Typography variant="h6" color="inherit">
                       New spectacle
                    </Typography>
                </Toolbar>
            </AppBar>
            <form onSubmit={handleSubmit} id="form_react">
                <div>
                    <TextField id="event_name" label="Name of the event"  variant="outlined" onChange={(e) => setName(e.target.value)}/>
                </div>
                <div>
                    <Button type="submit">Submit</Button>
                </div>
            </form>
        </div>
    );
}
export default Collection;

