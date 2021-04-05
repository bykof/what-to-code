import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { getIdeas, getIdea } from '../apiClient';
import Idea from './Idea';

const IdeasCardList = ({ orderType, filterTag }) => {
  const [hasMore, setHasMore] = useState(false);
  const [ideas, setIdeas] = useState([]);
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState(null);
  const setErrorDefault = () => setError(null);
  const retrieveIdeas = async (page = 0) => {
    try {
      setIsLoading(true);
      const response = await getIdeas(orderType, filterTag, page);
      if (response.data.length >= 15) {
        setHasMore(true);
      }
      setIdeas(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
      setErrorDefault();
    }
  };
  const retrieveIdea = async (id) => {
    let response = await getIdea(id);
    let index = ideas.findIndex((idea) => idea.id === id);
    if (index < 0) return;
    let newIdeas = [...ideas];
    newIdeas[index] = response.data;
    setIdeas(newIdeas);
  };

  const loadMore = (page) => {
    const loadMoreIdeas = async () => {
      const response = await getIdeas(orderType, filterTag, page);
      if (response.data.length < 15) {
        setHasMore(false);
      }
      setIdeas([...ideas, ...response.data]);
    };
    loadMoreIdeas();
  };

  useEffect(() => {
    retrieveIdeas();
  }, [orderType, filterTag]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>There was an unexpected error...</p>;
  }

  return (
    <InfiniteScroll
      pageStart={0}
      hasMore={hasMore}
      initialLoad={false}
      loadMore={loadMore}
      useWindow={true}
      threshold={100}
      loader={<div key={'loading'}>Loading more ...</div>}
    >
      {ideas.map((idea) => (
        <Idea
          key={idea.id}
          id={idea.id}
          title={idea.title}
          description={idea.description}
          tags={idea.tags}
          likes={idea.likes}
          clickedLike={() => {
            retrieveIdea(idea.id);
          }}
        />
      ))}
    </InfiniteScroll>
  );
};

export default IdeasCardList;
