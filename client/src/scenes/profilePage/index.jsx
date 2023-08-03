import { Box, useMediaQuery } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Navbar } from 'scenes';
import {
  FriendsListWidget,
  NewPostWidget,
  PostsWidget,
  UserWidget,
} from 'scenes/widgets';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const currUser = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const isNonMobileScreen = useMediaQuery('(min-width: 1000px)');

  const getUser = async () => {
    const response = await axios({
      url: `http://localhost:3001/user/${userId}`,
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });
    setUser(response.data.user);
  };

  useEffect(() => {
    if (currUser._id === userId) setUser(currUser);
    else getUser();
  }, [userId]); //eslint-disable-line react-hooks/exhaustive-deps
  if (!user) return null;

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreen ? 'flex' : 'block'}
        gap="0.5rem"
        justifyContent="center"
      >
        <Box flexBasis={isNonMobileScreen ? '26%' : undefined}>
          <UserWidget userId={user?._id} picturePath={user?.picturePath} />
          <Box m="2rem 0">
            <FriendsListWidget userId={user?._id} />
          </Box>
        </Box>
        <Box m="2rem 0" />
        <Box
          flexBasis={isNonMobileScreen ? '42%' : undefined}
          mt={isNonMobileScreen ? undefined : '2rem'}
        >
          <NewPostWidget picturePath={currUser.picturePath} />
          <PostsWidget userId={user?._id} isProfile={true} />
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;
