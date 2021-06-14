import React from 'react';
import PostIndexItem from './post_index_item';

const PostsIndex = ({ posts }) => (
  <div className='post-index'>
    {posts.map(post => (
      <PostIndexItem key={post._id} post={post}/>
    ))}
  </div>
);

export default PostsIndex;