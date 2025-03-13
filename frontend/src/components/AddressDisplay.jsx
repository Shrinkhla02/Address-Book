// src/components/AddressDisplay.jsx
// import React from 'react';
// import { COUNTRIES } from '../constants/countries';

// const AddressDisplay = ({ address }) => {
//   const { name, addressLine1, addressLine2, landmark, city, state, zipcode, country } = address;
  
//   const formatAddressLine = () => {
//     const lines = [addressLine1];
    
//     if (addressLine2) {
//       lines.push(addressLine2);
//     }
    
//     if (landmark) {
//       lines.push(`Near ${landmark}`);
//     }
    
//     lines.push(`${city}, ${state} ${zipcode}`);
//     lines.push(COUNTRIES[country]?.name || country);
    
//     return lines;
//   };
  
//   return (
//     <div className="border p-4 rounded-lg">
//       <h4 className="text-lg font-semibold mb-2">{name}</h4>
//       <div className="space-y-1">
//         {formatAddressLine().map((line, index) => (
//           <p key={index} className="text-gray-700">{line}</p>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AddressDisplay;

import React from 'react';
import { COUNTRIES } from '../constants/countries';

const AddressDisplay = ({ address }) => {
  const { name, addressLine1, addressLine2, landmark, city, state, zipcode, country } = address;
  
  const formatAddressLine = () => {
    const lines = [addressLine1];
    
    if (addressLine2) {
      lines.push(addressLine2);
    }
    
    if (landmark) {
      lines.push(`Near ${landmark}`);
    }
    
    lines.push(`${city}, ${state} ${zipcode}`);
    lines.push(COUNTRIES[country]?.name || country);
    
    return lines;
  };
  
  return (
    <div className="border p-4 rounded-lg">
      <h4 className="text-lg font-semibold mb-2">{name}</h4>
      <div className="space-y-1">
        {formatAddressLine().map((line, index) => (
          <p key={index} className="text-gray-700">{line}</p>
        ))}
      </div>
    </div>
  );
};

export default AddressDisplay;