
import {   RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './assets/css/style.css'
import './App.css';
function App({router}) {
  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
