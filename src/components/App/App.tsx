import React, {useEffect, useState} from 'react';
import './App.css';
import {AssetService} from "../../services";
import { generateUUIDv4 } from "@bitjourney/uuid-v4";
import {Asset} from "../../entities";

export const App: React.FC = () => {
  const [assets, setAssets] = useState([] as Asset[]);
  const initState = async (cb: () => Promise<Asset[]>) => {
    setAssets(await cb());
  };

  useEffect(() => {
    initState(async () => {
      await Promise.all([
        AssetService.create({name: 'iPhone XS', serial: generateUUIDv4(), notes: ''}),
        AssetService.create({name: 'Macbook Pro', serial: generateUUIDv4(), notes: ''}),
        AssetService.create({name: 'Nintendo Switch', serial: generateUUIDv4(), notes: ''})
      ]);

      return await AssetService.getAll()
    }).then(() => {
      console.log('Started')
    }).catch((e) => {
      console.error('Not started:', e.toString())
    })

  }, []);


  return (
    <div className="App">
      {JSON.stringify(assets,null,2)}
    </div>
  );
}

export default App;
