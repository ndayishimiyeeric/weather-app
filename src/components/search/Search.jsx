import { useState } from 'react';
import { AsyncPaginate } from 'react-select-async-paginate';
import PropTypes from 'prop-types';
import { GEO_API_URL, Geoptions } from '../../Api';

function Search(props) {
  const { onSearch } = props;
  const [search, setSearch] = useState(null);

  const loadOptions = (inputValue) => {
    return fetch(
      `${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
      Geoptions
    )
      .then((response) => response.json())
      .then((response) => {
        return {
          options: response.data.map((city) => {
            return {
              value: `${city.latitude} ${city.longitude}`,
              label: `${city.name}, ${city.countryCode}`,
            };
          }),
        };
      });
  };

  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearch(searchData);
  };

  return (
    <AsyncPaginate
      placeholder="Search for a city..."
      debounceTimeout={6000}
      value={search}
      onChange={handleOnChange}
      loadOptions={loadOptions}
    />
  );
}

export default Search;

Search.propTypes = {
  onSearch: PropTypes.func.isRequired,
};
