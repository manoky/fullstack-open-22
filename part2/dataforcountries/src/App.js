import { useEffect, useState } from "react";
import axios from "axios";
import Search from "./components/Search";
import Countries from "./components/Countries";
import Country from "./components/Country";

const API_URL = "https://restcountries.com/v3.1/all";

function App() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [country, setCountry] = useState("");

  useEffect(() => {
    axios
      .get(API_URL)
      .then((res) => setCountries(res.data))
      .catch((err) => console.error(err));
  }, []);

  const onSearch = (e) => {
    setCountry("");
    setSearchTerm(e.target.value);
  };

  const results = searchTerm
    ? countries.filter((country) =>
        country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const selectedCountry = results.find(
    (co) => co.name.common.toLowerCase() === country.toLowerCase()
  );

  return (
    <div>
      <Search value={searchTerm} onSearch={onSearch} />
      {(results.length > 0 && results.length === 1) || selectedCountry ? (
        <Country country={selectedCountry || results[0]} />
      ) : (
        <Countries countries={results} setCountry={setCountry} />
      )}
    </div>
  );
}

export default App;
