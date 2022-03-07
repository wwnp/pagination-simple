import { useState } from 'react';
import { Link } from 'react-router-dom';
function Home() {
  const [value, setValue] = useState('Beef')
  return (
    <>
      <div> Home</div>
      <input type="text" value={value} onChange={e => setValue(e.target.value)} />
      <Link to={`test/${value}`}>To TEST</Link>
    </>
  )

}
export default Home;
