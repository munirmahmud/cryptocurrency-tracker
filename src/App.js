import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './App.css';
import Coin from './components/Coin';

const App = () => {
    const [coins, setCoins] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false`).then(res => {
            setCoins(res.data);
        }).catch(error => console.log(error));
    }, []);

    const handleChange = (e) => {
        setSearch(e.target.value);
    };

    const filteredCoins = coins.filter(coin => (
        coin.name.toLowerCase().includes(search.toLocaleLowerCase())
    ));


    return (
        <div className="coin-app">
            <div className="coin-search">
                <h1 className="coin-text">Search a currency</h1>
                <form>
                    <input type="text" placeholder="Search currency" className="coin-input" onChange={handleChange} />
                </form>
            </div>

            {filteredCoins.length > 0 && filteredCoins.map(coin => <Coin key={coin.id} coin={coin} />)}
            
        </div>
    );
};

export default App;
