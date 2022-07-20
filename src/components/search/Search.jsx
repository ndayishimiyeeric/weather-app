import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Select from 'react-select';
import PropTypes from 'prop-types';
import { CgAdd } from 'react-icons/cg';
import { fetchCities } from '../../redux/Cities/Cities';
import styles from './Search.module.css';

function Search(props) {
  const { onSearch } = props;
  const [search, setSearch] = useState(null);
  const [inputData, setInputData] = useState('');

  const dispatch = useDispatch();
  const { cities } = useSelector((state) => state.cities);

  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearch(searchData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputData.trim()) {
      dispatch(fetchCities(inputData));
      setInputData('');
    }
  };

  useEffect(() => {
    if (search) {
      localStorage.setItem('search', JSON.stringify(search));
    }
  }, [search]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          maxLength={3}
          className={styles.input}
          placeholder="Add your city prefix like 'Ki' with no space"
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}
        />
        <button type="submit" className={styles.button}>
          <CgAdd />
        </button>
      </form>

      <Select
        placeholder="Select a city..."
        onChange={handleOnChange}
        value={search}
        options={cities}
        className={styles.select}
      />
    </>
  );
}

export default Search;

Search.propTypes = {
  onSearch: PropTypes.func.isRequired,
};
