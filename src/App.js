import { useEffect, useState } from "react";
import { Pagination, Container } from '@mui/material';
import { useNavigate } from 'react-router';
import { useLocation, useParams } from 'react-router-dom';

const PER_PAGE = 10

function App() {
  const navigate = useNavigate()
  const location = useLocation()
  const params = useParams()

  const [posts, setPosts] = useState([])
  const [outPosts, setOutPosts] = useState([])
  const [page, setPage] = useState(+getPage(location.search))

  console.log(page)
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => response.json())
      .then(json => {
        setPosts(json)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  useEffect(() => {

    const indexLast = page * PER_PAGE
    const indexFirst = indexLast - PER_PAGE
    setOutPosts(posts.slice(indexFirst, indexLast))
    navigate(`/?page=${page}`)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, posts])

  return (
    <div className="App">
      <Container>
        {
          outPosts.length > 0
            ? (
              outPosts.map(i => {
                return (
                  <li key={i.id + i.title}><b>{i.id}</b>  {i.title}</li>
                )
              })
            )
            : <h1>Loading...</h1>
        }
        <Pagination
          count={posts.length / 20}
          color="secondary"
          page={page}
          onChange={(_, num) => setPage(num)}
        >
        </Pagination>
      </Container>
    </div>
  );
}
export default App;

function getPage(search) {
  const temp = search.indexOf('page') + 5
  return search.charAt(temp)
}