import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Typography,
  Box,
} from '@mui/material';
import {
  ThumbUpAltRounded,
  ThumbUpAltOutlined,
  Delete,
} from '@mui/icons-material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { deletePost, likePost } from '../../../reducers/postSlice.js';

const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'));

 
  const Likes = () => {
    if (post.likes.length > 0) {
      return post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
        ? (
          <>
            <ThumbUpAltRounded fontSize="small" />
            &nbsp;{post.likes.length > 2
              ? `You and ${post.likes.length - 1} others`
              : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}`}
          </>
        ) : (
          <>
            <ThumbUpAltOutlined fontSize="small" />
            &nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}
          </>
        );
    }

    return (
      <>
        <ThumbUpAltOutlined fontSize="small" />
        &nbsp;Like
      </>
    );
  };

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRadius: { xs: '12px', sm: '15px' },
        position: 'relative',
        width: '100%',
        maxWidth: {
          xs: '94%',      // full width on mobile
          sm: '94%',  // 2 cards per row on small screens
          md: '100%', // 3 cards per row on medium screens
          lg: '350px',     // fixed max width for large screens
          xl: '350px',     // slightly larger on extra large screens
        },
        minHeight: {
          xs: '380px',     // minimum height on mobile
          sm: '450px',     // slightly taller on larger screens

        },
        margin: {
          xs: '8px 20px 8px 0px',  // smaller margin on mobile
          sm: '12px auto',

        },
        boxShadow: {
          xs: 2,           // lighter shadow on mobile
          sm: 3,
          md: 4,
        },
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 6,
        },
      }}
    >
      <CardMedia
        image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'}
        title={post.title}
        sx={{
          paddingTop: '56.25%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          backgroundBlendMode: 'darken',
          border: 'solid',
          height: '100%',
        }}
      />

      {/* Overlay - Author and Date */}
      <Box
        sx={{
          position: 'absolute',
          top: { xs: 12, sm: 16, md: 20 },
          left: { xs: 12, sm: 16, md: 20 },
          color: 'white',
          textShadow: '1px 1px 2px rgba(0,0,0,0.7)',
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontSize: { xs: '0.9rem', sm: '1rem', md: '1.25rem' },
            fontWeight: 600,
            lineHeight: 1.2,
          }}
        >
          {post.name}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.875rem' },
            opacity: 0.9,
          }}
        >
          {moment(post.createdAt).fromNow()}
        </Typography>
      </Box>

      {/* Overlay - Edit Button */}
      <Box
        sx={{
          display: 'flex',
          position: 'absolute',
          top: { xs: 8, sm: 12, md: 16 },
          right: { xs: 4, sm: 8, md: 12 },
          color: 'white',
        }}
      >
        {(user?.result?.sub === post?.creator || user?.result?._id === post?.creator) && (
          <Button
            sx={{
              color: 'white',
              minWidth: { xs: '32px', sm: '40px' },
              padding: { xs: '4px', sm: '8px' },
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              }
            }}
            size="small"
            onClick={() => setCurrentId(post._id)}
          >
            <MoreHorizIcon
              fontSize={window.innerWidth < 600 ? "small" : "default"}
            />
          </Button>
        )}
      </Box>

      {/* Tags */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          margin: { xs: '12px 16px 8px', sm: '16px 20px 12px' },
          flexWrap: 'wrap',
          gap: '4px',
        }}
      >
        <Typography
          variant="body2"
          color="textSecondary"
          component="div"
          sx={{
            fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.875rem' },
            lineHeight: 1.4,
          }}
        >
          {post.tags.map((tag, index) => (
            <span key={index} style={{ marginRight: '6px' }}>
              #{tag}
            </span>
          ))}
        </Typography>
      </Box>

      {/* Title */}
      <Typography
        gutterBottom
        variant="h5"
        component="h2"
        sx={{
          padding: { xs: '0 16px', sm: '0 20px' },
          fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.5rem' },
          fontWeight: 600,
          lineHeight: 1.3,
          display: '-webkit-box',
          WebkitLineClamp: { xs: 2, sm: 3 },
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {post.title}
      </Typography>

      {/* Message */}
      <CardContent
        sx={{
          padding: { xs: '8px 16px', sm: '12px 20px' },
          paddingTop: 0,
          flex: 1,
        }}
      >
        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
          sx={{
            fontSize: { xs: '0.8rem', sm: '0.875rem' },
            lineHeight: 1.5,
            display: '-webkit-box',
            WebkitLineClamp: { xs: 3, sm: 4 },
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {post.message}
        </Typography>
      </CardContent>

      {/* Actions */}
      <CardActions
        sx={{
          padding: { xs: '8px 16px 12px', sm: '12px 20px 16px' },
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: { xs: 'wrap', sm: 'nowrap' },
          gap: { xs: '8px', sm: '0' },
        }}
      >
        <Button
          size="small"
          color="primary"
          disabled={!user?.result}
          onClick={() => dispatch(likePost(post._id))}
          sx={{
            fontSize: { xs: '0.7rem', sm: '0.8rem' },
            padding: { xs: '4px 8px', sm: '6px 12px' },
            minWidth: 'auto',
            borderRadius: '20px',
            '&:hover': {
              backgroundColor: 'rgba(25, 118, 210, 0.04)',
            }
          }}
        >
          <Likes />
        </Button>
        {(user?.result?.sub === post?.creator || user?.result?._id === post?.creator) && (
          <Button
            size="small"
            color="secondary"
            onClick={() => dispatch(deletePost(post._id))}
            sx={{
              fontSize: { xs: '0.7rem', sm: '0.8rem' },
              padding: { xs: '4px 8px', sm: '6px 12px' },
              minWidth: 'auto',
              borderRadius: '20px',
              '&:hover': {
                backgroundColor: 'rgba(244, 67, 54, 0.04)',
              }
            }}
          >
            <Delete fontSize="small" />
            <span style={{ marginLeft: '4px' }}>Delete</span>
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;