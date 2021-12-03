import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const URL = 'https://restcountries.com/v3.1';

  const [search, setSearch] = useState('');
  const [countries, setCountries] = useState([]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const countriesToShow =
    search.length < 1
      ? countries
      : countries.filter((country) =>
          country.name.common.toLowerCase().includes(search.toLowerCase())
        );
  useEffect(() => {
    axios.get(`${URL}/all`).then((response) => {
      setCountries(response.data);
    });
  }, []);
  const singleCountry = countriesToShow[0];

  return (
    <div>
      find countries <input value={search} onChange={handleSearch} />
      <div>
        <ul>
          {countriesToShow.length === 1 ? (
            <div>
              <h2>{singleCountry.name.common}</h2>
              <div>capital {singleCountry.capital[0]}</div>
              <div>population {singleCountry.population}</div>
              <h2>languages</h2>
              <ul>
                {Object.values(singleCountry.languages).map((lang) => (
                  <li key={lang}>{lang}</li>
                ))}
              </ul>
              <div style={{ width: '10%', marginTop: 20 }}>
                <img src={singleCountry.flags.svg} width={'100%'} />
              </div>
            </div>
          ) : countriesToShow.length > 10 ? (
            'Too many matches'
          ) : (
            countriesToShow.map((country) => (
              <li key={country.population}>{country.name.common}</li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

export default App;
