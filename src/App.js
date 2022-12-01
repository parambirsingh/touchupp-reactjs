import './App.css';
import Header from './components/common/header';
import { RouterProvider } from 'react-router-dom';
import Footer from './components/common/footer';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap.min.css'


function App({router}) {
  return (
    <div>
      {/* <Header /> */}
      <RouterProvider router={router} />
      {/* <Footer /> */}
    </div>
  );
}

export default App;
