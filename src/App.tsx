import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import PowerLotto from './components/PowerLotto';
import Lotto649 from './components/Lotto649';
import Lotto539 from './components/Lotto539';
import Lotto39 from './components/Lotto39';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <PowerLotto />
      <Lotto649 />
      <Lotto539 />
      <Lotto39 />
    </div>
  )
}

export default App
