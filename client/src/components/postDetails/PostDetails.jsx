import React, { useEffect } from 'react';
import { 
  Paper, 
  Typography, 
  CircularProgress, 
  Divider, 
  Box, 
  Card,
  CardMedia,
  CardContent,
  Chip,
  Avatar,
  Container
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchPost, getPostsBySearch } from '../../reducers/postSlice';
import { 
  AccessTime, 
  Person, 
  ChatBubbleOutline, 
  FavoriteBorder,
  Forum
} from '@mui/icons-material';

const PostDetails = () => {
  const { post, posts, isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchPost(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (post) {
      dispatch(getPostsBySearch({ search: 'none', tags: post?.tags.join(',') }));
    }
  }, [post, dispatch]);

  if (isLoading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            minHeight: '60vh' 
          }}
        >
          <CircularProgress size={60} thickness={4} />
        </Box>
      </Container>
    );
  }

  if (!post) return null;

  const openPost = (_id) => navigate(`/posts/${_id}`);

  const recommendedPosts = Array.isArray(posts) 
    ? posts.filter(({ _id }) => _id !== post._id) 
    : [];

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 2, sm: 4 } }}>
      {/* Main Post Card */}
      <Paper 
        elevation={0}
        sx={{ 
          borderRadius: '16px',
          overflow: 'hidden',
          mb: 4,
          border: '1px solid',
          borderColor: 'divider'
        }}
      >
        {/* Hero Image */}
        <Box
          sx={{
            width: '100%',
            height: { xs: '250px', sm: '400px', md: '500px' },
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <img 
            src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} 
            alt={post.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
        </Box>

        {/* Content Section */}
        <Box sx={{ p: { xs: 3, sm: 4, md: 5 } }}>
          {/* Tags */}
          <Box sx={{ mb: 3, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {post.tags?.map((tag, index) => (
              <Chip 
                key={index}
                label={`#${tag}`}
                size="small"
                sx={{ 
                  fontWeight: 500,
                  '&:hover': {
                    backgroundColor: 'primary.main',
                    color: 'white',
                    cursor: 'pointer'
                  }
                }}
              />
            ))}
          </Box>

          {/* Title */}
          <Typography 
            variant="h3" 
            component="h1"
            sx={{ 
              fontWeight: 700,
              mb: 3,
              fontSize: { xs: '1.75rem', sm: '2.5rem', md: '3rem' },
              lineHeight: 1.2
            }}
          >
            {post.title}
          </Typography>

          {/* Author Info */}
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center',
              gap: 3,
              mb: 4,
              flexWrap: 'wrap'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Avatar 
                sx={{ 
                  width: 40, 
                  height: 40,
                  bgcolor: 'primary.main'
                }}
              >
                {post.name?.charAt(0).toUpperCase()}
              </Avatar>
              <Box>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                  Created by
                </Typography>
                <Typography variant="subtitle1" fontWeight={600}>
                  {post.name}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <AccessTime sx={{ fontSize: 20, color: 'text.secondary' }} />
              <Typography variant="body2" color="text.secondary">
                {moment(post.createdAt).fromNow()}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <FavoriteBorder sx={{ fontSize: 20, color: 'text.secondary' }} />
              <Typography variant="body2" color="text.secondary">
                {post.likes?.length || 0} likes
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* Message/Content */}
          <Typography 
            variant="body1" 
            sx={{ 
              fontSize: { xs: '1rem', sm: '1.125rem' },
              lineHeight: 1.8,
              color: 'text.primary',
              mb: 4,
              whiteSpace: 'pre-wrap'
            }}
          >
            {post.message}
          </Typography>

          <Divider sx={{ my: 3 }} />

          {/* Real-time Chat Section */}
          <Box sx={{ 
            bgcolor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
            p: 3, 
            borderRadius: 2,
            mb: 2,
            border: '2px dashed',
            borderColor: 'primary.main',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Decorative circles */}
            <Box sx={{
              position: 'absolute',
              top: -20,
              right: -20,
              width: 100,
              height: 100,
              borderRadius: '50%',
              bgcolor: 'primary.light',
              opacity: 0.1
            }} />
            <Box sx={{
              position: 'absolute',
              bottom: -30,
              left: -30,
              width: 120,
              height: 120,
              borderRadius: '50%',
              bgcolor: 'secondary.light',
              opacity: 0.1
            }} />

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2, position: 'relative', zIndex: 1 }}>
              <Box sx={{
                p: 1.5,
                borderRadius: '12px',
                bgcolor: 'primary.main',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Forum sx={{ color: 'white', fontSize: 28 }} />
              </Box>
              <Box>
                <Typography variant="h6" fontWeight={700}>
                  Real-time Chat
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Connect and discuss with other users
                </Typography>
              </Box>
            </Box>
            
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2, position: 'relative', zIndex: 1 }}>
              💬 Live chat feature coming soon! Engage in real-time conversations with other users interested in this post.
            </Typography>

            {/* Feature Preview */}
            <Box sx={{ 
              display: 'flex', 
              gap: 2, 
              flexWrap: 'wrap',
              position: 'relative',
              zIndex: 1
            }}>
              <Chip 
                label="🚀 Instant messaging" 
                size="small" 
                sx={{ bgcolor: 'white', fontWeight: 500 }}
              />
              <Chip 
                label="👥 User presence" 
                size="small" 
                sx={{ bgcolor: 'white', fontWeight: 500 }}
              />
              <Chip 
                label="✨ Typing indicators" 
                size="small" 
                sx={{ bgcolor: 'white', fontWeight: 500 }}
              />
              <Chip 
                label="📎 File sharing" 
                size="small" 
                sx={{ bgcolor: 'white', fontWeight: 500 }}
              />
            </Box>
          </Box>

          {/* Comments Section */}
          <Box sx={{ 
            bgcolor: 'grey.50', 
            p: 3, 
            borderRadius: 2,
            mb: 2
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <ChatBubbleOutline color="primary" />
              <Typography variant="h6" fontWeight={600}>
                Comments
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              💬 Comments section coming soon! Share your thoughts and engage with the community.
            </Typography>
          </Box>
        </Box>
      </Paper>

      {/* Recommended Posts */}
      {!!recommendedPosts.length && (
        <Box>
          <Typography 
            variant="h4" 
            fontWeight={700}
            sx={{ 
              mb: 3,
              fontSize: { xs: '1.5rem', sm: '2rem' }
            }}
          >
            You might also like
          </Typography>
          
          <Box 
            sx={{ 
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)'
              },
              gap: 3
            }}
          >
            {recommendedPosts.slice(0, 6).map((recPost) => (
              <Card 
                key={recPost._id}
                onClick={() => openPost(recPost._id)}
                sx={{ 
                  cursor: 'pointer',
                  borderRadius: '12px',
                  transition: 'all 0.3s ease',
                  border: '1px solid',
                  borderColor: 'divider',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 6
                  }
                }}
                elevation={0}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={recPost.selectedFile}
                  alt={recPost.title}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent>
                  <Typography 
                    variant="h6" 
                    fontWeight={600}
                    sx={{ 
                      mb: 1,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical'
                    }}
                  >
                    {recPost.title}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Person sx={{ fontSize: 16, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary">
                      {recPost.name}
                    </Typography>
                  </Box>

                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      mb: 2
                    }}
                  >
                    {recPost.message}
                  </Typography>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <FavoriteBorder sx={{ fontSize: 18, color: 'error.main' }} />
                    <Typography variant="body2" color="text.secondary">
                      {recPost.likes?.length || 0}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default PostDetails;