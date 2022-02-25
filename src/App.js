import { useEffect, useState } from "react";
import { Pagination, Container } from '@mui/material';

function App() {
  const [posts, setPosts] = useState([])
  const [outPosts, setOutPosts] = useState([])
  const [page, setPage] = useState(1)

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => response.json())
      .then(json => {
        setPosts(json)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setOutPosts(posts.slice(page, page + 19))
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
                  <li key={i.id + i.title}>{i.title}</li>
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