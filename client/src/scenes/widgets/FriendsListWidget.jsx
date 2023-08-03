import { Box, Typography, useTheme } from '@mui/material';
import axios from 'axios';
import { Friend, WidgetWrapper } from 'components';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFriends } from 'state';

const FriendsListWidget = ({ userId }) => {
  console.log(userId);
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.friends);

  const getUserFriends = async () => {
    const response = await axios({
      url: `https://sociopedia-backend-sage.vercel.app/user/${userId}/friends`,
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch(setFriends({ friends: response.data.formatedFriends }));
  };

  useEffect(() => {
    getUserFriends();
  }, [userId]); //eslint-disable-line react-hooks/exhaustive-deps
  if (friends?.length === 0) return null;
  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: '1.5rem' }}
      >
        Friends List
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {friends.map((friend) => (
          <Friend
            key={friend._id}
            friendId={friend._id}
            name={`${friend.firstName} ${friend.lastName}`}
            subtitle={friend.location}
            userPicturePath={friend.picturePath}
          />
        ))}
      </Box>
    </WidgetWrapper>
  );
};

export default FriendsListWidget;
