import './App.css'
import PowerLotto from './components/PowerLotto';
import Lotto649 from './components/Lotto649';
import Lotto539 from './components/Lotto539';
import Lotto39 from './components/Lotto39';

function App() {
  return (
    <div className="container mx-auto w-full bg-gray-100 p-4 flex flex-col gap-4">
      <PowerLotto />
      <Lotto649 />
      <Lotto539 />
      <Lotto39 />
    </div>
  )
}

export default App
