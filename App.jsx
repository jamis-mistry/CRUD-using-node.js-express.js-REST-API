import { useEffect, useState } from 'react';
import axios from 'axios';
import BreedCard from './components/BreedCard';
import BreedTable from './components/BreedTable';

function App() {
  const [breeds, setBreeds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const response = await axios.get('https://dogapi.dog/api/v2/breeds');
        setBreeds(response.data.data); 
      } catch (error) {
        console.error('Error fetching breed data:', error); 
      } finally {
        setLoading(false);
      }
    };

    fetchBreeds();
  }, []);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Dog Breeds</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {breeds.map((breed) => (
          <BreedCard key={breed.id} {...breed.attributes} />
        ))}
      </div>
      <BreedTable breeds={breeds.map(b => b.attributes)} />
    </div>
  );
}

export default App;

