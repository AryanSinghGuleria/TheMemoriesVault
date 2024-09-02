import React, { useState } from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, CardActionArea } from '@mui/material';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import moment from 'moment';
import { useDispatch } from 'react-redux';

import { likePost, deletePost } from '../../../actions/posts';
import useStyles from './styles';
import { useNavigate } from 'react-router';

const Post = ({ post, setCurrentId }) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const dispatch = useDispatch();
  const classes = useStyles();
  const navigate = useNavigate();
  const [likes, setLikes] = useState(post?.likes);

  const userId = user?.result.googleId || user?.result?._id;
  const hasLikedPost = post?.likes?.find((like) => like === userId);

  const handleLike = async () => {
    dispatch(likePost(post._id));
    if (hasLikedPost) {
      setLikes(post.likes.filter((id) => id !== userId));
    } else {
      setLikes([...post.likes, userId]);
    }
  }

  const Likes = () => {
    if (likes.length > 0) {
      return likes.find((like) => like === userId)
        ? (
          <><ThumbUpAltIcon fontSize='small' /> &nbsp;
            {likes.length > 2
              ? `You and ${likes.length - 1} others`
              : `${likes.length} like${likes.length > 1 ? "s" : ""}`}
          </>
        ) : (
          <>
            <ThumbUpOffAltIcon fontSize='small' /> &nbsp; {likes.length}{" "}
            {likes.length === 1 ? "Like" : "Likes"}
          </>
        );
    }
    return (
      <>
        <ThumbUpOffAltIcon fontSize='small' />
        &nbsp; Like
      </>
    );
  };

  const openPost = () => {
    navigate(`/posts/${post._id}`)
  };

  return (
    <Card className={classes.card} raised elevation={6}>
      <CardActionArea component="span" name="test"
        className={classes.cardAction} onClick={openPost}>
        <CardMedia className={classes.media} image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={post.title} />
        <div className={classes.overlay}>
          <Typography variant="h6">{post.name}</Typography>
          <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
        </div>
        {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (

          <div className={classes.overlay2}>
            <Button style={{ color: 'white' }} size="small"
              onClick={(e) => {
                e.stopPropagation();
                setCurrentId(post._id)
              }}>
              <MoreHorizIcon fontSize="default" />
            </Button>
          </div>
        )}
        <div className={classes.details}>
          <Typography variant="body2" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
        </div>
        <Typography className={classes.title} gutterBottom variant="h5" component="h2">{post.title}</Typography>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p" >{post.message.slice(0, 100)}....</Typography>
        </CardContent>

      </CardActionArea>
      <CardActions className={classes.cardActions} >
        <Button size="small" color="primary" disabled={!user} onClick={handleLike}><Likes />  </Button>
        {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
          <Button size="small" color="secondary" onClick={() => dispatch(deletePost(post._id))}>
            <DeleteIcon fontSize="small" /> &nbsp; Delete
          </Button>
        )}
      </CardActions>
    </Card>

  );
};

export default Post;
