'use client';

import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNewsStart, fetchNewsSuccess, fetchNewsFailure } from '../store/features/newsSlice';
import NewsCard from './NewsCard';
import axios from 'axios';
import { Spin } from 'antd';
import { RootState } from '../store/types';

interface Post {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions: {
    likes: number;
    dislikes: number;
  };
}

export default function NewsFeed() {
  const dispatch = useDispatch();
  const { posts, skip, loading } = useSelector((state: RootState) => state.news);
  const observerRef = useRef<HTMLDivElement>(null);

  //  первые посты
  useEffect(() => {
    if (posts.length === 0) {
      dispatch(fetchNewsStart());
      axios
        .get<{ posts: Post[] }>(' https://dummyjson.com/posts?limit=10&skip=0')
        .then((response) => dispatch(fetchNewsSuccess(response.data.posts)))
        .catch((error) => dispatch(fetchNewsFailure(error.message)));
    }
  }, [dispatch, posts.length]);

  //  прокрутка
  useEffect(() => {
    const handleScroll = () => {
      const element = observerRef.current;
      if (element && element.getBoundingClientRect().bottom <= window.innerHeight) {
        dispatch(fetchNewsStart());
        axios
          .get<{ posts: Post[] }>(` https://dummyjson.com/posts?limit=10&skip=${skip}`)
          .then((response) => {
            const newPosts = response.data.posts.filter(
              (p: Post) => !posts.some((post) => post.id === p.id)
            );
            dispatch(fetchNewsSuccess(newPosts));
          })
          .catch((error) => dispatch(fetchNewsFailure(error.message)));
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [dispatch, skip, posts]);

return (
  <div className="flex flex-col items-center py-6">
    <div className="w-full max-w-4xl">
      {posts.length > 0 ? (
        posts.map((post, index) => (
          <div key={`${post.id}-${index}`} className="mb-4">
            <NewsCard post={post} />
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">Новостей нет</p>
      )}
    </div>
    <div ref={observerRef} />
    {loading && (
      <div className="mt-6">
        <Spin size="large" />
      </div>
    )}
  </div>
);
}