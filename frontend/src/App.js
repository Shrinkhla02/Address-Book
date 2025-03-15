import './App.css';

import React from 'react';
import Layout from './components/Layout';
import AddressManagement from './components/AddressManagement';

function App() {
  return (
    <Layout>
      <AddressManagement />
    </Layout>
  );
}

export default App;

// function App() {
//   const [activeTab, setActiveTab] = useState('add');
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <AddressManagement />
//       <header className="Address Management">
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//       </header>
//     </div>
//   );
// }

// export default App;

