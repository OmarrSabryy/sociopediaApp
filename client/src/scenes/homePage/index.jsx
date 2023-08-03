import { Box, useMediaQuery } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { Navbar } from 'scenes';
import {
  UserWidget,
  NewPostWidget,
  PostsWidget,
  AdvertWidget,
  FriendsListWidget,
} from 'scenes/widgets';

const HomePage = () => {
  const { _id, picturePath } = useSelector((state) => state.user);
  console.log(_id);
  const isNonMobileScreen = useMediaQuery('(min-width: 1000px)');

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreen ? 'flex' : 'block'}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreen ? '26%' : undefined}>
          <UserWidget userId={_id} picturePath={picturePath} />
        </Box>
        <Box
          flexBasis={isNonMobileScreen ? '42%' : undefined}
          mt={isNonMobileScreen ? undefined : '2rem'}
        >
          <NewPostWidget picturePath={picturePath} />
          <PostsWidget userId={_id} />
        </Box>
        {isNonMobileScreen && (
          <Box flexBasis="26%">
            <AdvertWidget />
            <Box m="2rem 0">
              <FriendsListWidget userId={_id} />
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;
