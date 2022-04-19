const Countries = ({ countries, setCountry }) => {
  return (
    <div>
      {countries.length > 10 ? (
        <div>Too many matches, specify another filter</div>
      ) : (
        countries.map((country) => (
          <div key={country.name.common}>
            {country.name.common}{" "}
            <button onClick={() => setCountry(country.name.common)}>
              show
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default Countries;
