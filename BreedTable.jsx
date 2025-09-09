import React from 'react';

function formatWeight(weight) {
  if (!weight) return 'N/A';
  if (typeof weight === 'object' && weight.min !== undefined && weight.max !== undefined) {
    return `${weight.min} - ${weight.max}`;
  }
  return weight;
}

function BreedTable({ breeds }) {
  return (
    <div className="overflow-x-auto mt-8">
      <table className="min-w-full bg-white rounded shadow">
        <thead>
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Lifespan</th>
            <th className="px-4 py-2">Male Weight</th>
            <th className="px-4 py-2">Female Weight</th>
            <th className="px-4 py-2">Hypoallergenic</th>
          </tr>
        </thead>
        <tbody>
          {breeds.map((breed, idx) => (
            <tr key={idx} className="border-t">
              <td className="px-4 py-2">{breed.name}</td>
              <td className="px-4 py-2">{breed.life || 'N/A'}</td>
              <td className="px-4 py-2">{formatWeight(breed.male_weight)}</td>
              <td className="px-4 py-2">{formatWeight(breed.female_weight)}</td>
              <td className="px-4 py-2">{breed.hypoallergenic ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BreedTable;