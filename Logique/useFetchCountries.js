import { useEffect, useState } from 'react';
import axios from 'axios';

const useFetchCountries = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        const countryNames = response.data.map(country => country.name.common);
        setCountries(countryNames.sort());
      } catch (error) {
        console.error('Error fetching countries:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  return { countries, loading };
};

export default useFetchCountries;
