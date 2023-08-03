import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setPosts } from 'state';
import { PostWidget } from '.';
import axios from 'axios';

const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);

  const getPosts = async () => {
    const response = await axios({
      url: `https://sociopedia-backend-sage.vercel.app/posts`,
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch(setPosts({ posts: response.data.posts }));
  };

  const getUserPosts = async () => {
    const response = await axios({
      url: `https://sociopedia-backend-sage.vercel.app/posts/${userId}/posts`,
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch(setPosts({ posts: response.data.posts }));
  };

  useEffect(() => {
    if (isProfile) getUserPosts();
    else getPosts();
  }, [userId]); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <>
      {posts.map((post) => (
        <PostWidget
          key={post._id}
          postId={post._id}
          postUserId={post.userId}
          name={`${post.firstName} ${post.lastName}`}
          description={post.description}
          location={post.location}
          picturePath={post.picturePath}
          userPicturePath={post.userPicturePath}
          likes={post.likes}
          comments={post.comments}
        />
      ))}
    </>
  );
};

export default PostsWidget;
