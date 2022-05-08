//express
const express = require('express');
const app = express();
const port = process.env.PORT || 9090;
//body-parser
const bodyParser = require('body-parser');
const fs = require("fs");
const cors = require("cors");
const axios = require("axios");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const starton = axios.create({
    baseURL: "https://api.starton.io/v2",
    headers: {
        "x-api-key": "IPmnuocxkcukE5Ec1nkM9u5ETESuL0lJ",
    },
});

function getAllAdresss(name) {
    //get all adress fields in json.items
    let json = JSON.parse(fs.readFileSync(`collections/${name}.json`, "utf8"));
    let adresss = [];
    for (let i = 0; i < json.items.length; i++) {
        adresss.push(json.items[i].adress);
    }
    return adresss;
}

async function mint(contractCid, to, cid) {

    starton.post('/smart-contract/polygon-mumbai/' + contractCid + '/call',
        {
            "functionName": 'safeMint',
            "signerWallet": '0xd82Af86bDAB2a0a1f98CF3bAf4427A97be16B047',
            "speed": "low",
            "params": [
                to,
                cid
            ],

        }).then(response => { console.log(response.data) })
}

app.post('/create', (req, res) => {
    console.log("create");
    let name = req.body.name;
    let description = req.body.description;
    let cid = req.body.cid;
    let meta = req.body.meta;
    //create a json file with the name and description and item tab
    let json = {
        name: name,
        description: description,
        cid: cid,
        meta: meta,
        items: []
    }
    fs.writeFile(`collections/${name}.json`, JSON.stringify(json), (err) => {
        if (err) throw err;
        res.send(json);
    });
});


//get the name and description of all the json file in the collections folder and send a json with the name and description
app.get('/get_collections', (req, res) => {
    console.log("get");
    let collections = [];
    fs.readdirSync("collections").forEach(file => {
            let json = JSON.parse(fs.readFileSync(`collections/${file}`, "utf8"));
            collections.push(json);
        }
    );
    res.send(collections);
});


app.get('/get_items/:name', (req, res) => {
    console.log("get");
    let name = req.params.name;
    let json = JSON.parse(fs.readFileSync(`collections/${name}.json`, "utf8"));
    res.send(json.items);
}
);


//write the item in the json file
app.post('/write_item/:name', (req, res) => {
    console.log("write");
    let name = req.params.name;
    let item = req.body.item;
    let json = JSON.parse(fs.readFileSync(`collections/${name}.json`, "utf8"));
    json.items.push(item);
    fs.writeFile(`collections/${name}.json`, JSON.stringify(json), (err) => {
        if (err) throw err;
        res.send(json);
    }
    );

}
);

//execute mint all using
app.post('/mint_all/:name', (req, res) => {
    console.log("mint");
    let name = req.params.name;
    let json = JSON.parse(fs.readFileSync(`collections/${name}.json`, "utf8"));
    let contractCid = json.cid;
    json.items.forEach(item => {
        mint(contractCid, item.address, json.cid);
    }
    );
    res.send(json);
}
);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
}
);
