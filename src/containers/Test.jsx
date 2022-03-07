import { useEffect, useState } from "react";
import { Pagination, Container } from '@mui/material';
import { useNavigate } from 'react-router';
import { useLocation, useParams, createSearchParams } from 'react-router-dom';
import { Search } from '../components/Search';

const queryString = require('query-string');

const PER_PAGE = 10
const NORMAL = 'NORMAL'
const SEARCH = 'SEARCH'

function Test() {
  const navigate = useNavigate()
  const location = useLocation()
  const { name } = useParams()
  const locationSearch = queryString.parse(location.search);
  const [mode, setMode] = useState(locationSearch.q ? SEARCH : NORMAL)
  const [posts, setPosts] = useState([])
  const [outPosts, setOutPosts] = useState([])
  const [modPosts, setModPosts] = useState([])
  const [preModPosts, setPreModPosts] = useState([])
  const [page, setPage] = useState(+getPage(location.search) || 1)
  const params = { page }

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => response.json())
      .then(json => {
        setPosts(json)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  useEffect(() => {
    const asd = queryString.parse(location.search);
    if (mode === SEARCH) {
      const indexLast = page * PER_PAGE
      const indexFirst = indexLast - PER_PAGE
      const modPostsQ = posts.filter(post => post.title.toLowerCase().includes(asd.q.toLowerCase()))
      setPreModPosts(modPostsQ)
      setModPosts(modPostsQ.slice(indexFirst, indexLast))
    }
    if (mode === NORMAL) {
      const indexLast = page * PER_PAGE
      const indexFirst = indexLast - PER_PAGE
      setOutPosts(posts.slice(indexFirst, indexLast))
    }
    navigate({
      pathname: `/test/${name}`,
      search: `?${createSearchParams({ ...asd, page })}`,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, posts])

  const filterPosts = (value) => {
    setMode(SEARCH)
    setPage(1)
    const params = { page, q: value };
    navigate({
      pathname: `/test/${name}`,
      search: `?${createSearchParams(params)}`,
    });

    const indexLast = page * PER_PAGE
    const indexFirst = indexLast - PER_PAGE

    const modPostsQ = posts.filter(post => post.title.toLowerCase().includes(value.toLowerCase()))
    setPreModPosts(modPostsQ)
    setModPosts(modPostsQ.slice(indexFirst, indexLast))
  }

  const resetAll = () => {
    setMode(NORMAL)
    setPage(1)
    const indexLast = page * PER_PAGE
    const indexFirst = indexLast - PER_PAGE
    setOutPosts(posts.slice(indexFirst, indexLast))
    navigate({
      pathname: `/test/${name}`,
      search: `?${createSearchParams(params)}`,
    });
  }

  return (
    <Container>
      <div>{mode}</div>
      <Search
        handleSearch={filterPosts}
        handleReset={resetAll}
        q={locationSearch.q}
      >
      </Search>
      {
        posts.length > 0
          ?
          mode === NORMAL
            ?
            outPosts.length === 0
              ? <h6>No results</h6>
              : (
                outPosts.map(i => {
                  return (
                    <li key={i.id + i.title}><b>{i.id}</b>  {i.title}</li>
                  )
                })
              )
            :
            modPosts.length === 0
              ? <h6>No results</h6>
              : (
                modPosts.map(i => {
                  return (
                    <li key={i.id + i.title}><b>{i.id}</b>  {i.title}</li>
                  )
                })
              )


          : <h1>Loading...</h1>
      }
      <Pagination
        count={
          mode === NORMAL
            ? Math.ceil(posts.length / PER_PAGE)
            : Math.ceil(preModPosts.length / PER_PAGE)
        }
        color="secondary"
        page={page}
        onChange={(_, num) => setPage(num)}
      >
      </Pagination>
    </Container>
  );
}
export default Test;

function getPage(search) {
  if (!search) {
    return 1
  }
  const temp = search.indexOf('page') + 5
  return search.charAt(temp)
}
