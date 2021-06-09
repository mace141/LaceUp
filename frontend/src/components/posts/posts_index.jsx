import React from 'react';

const PostsIndex = ({ posts }) => (
  <div className='post-index'>
    {posts.map(post => (
      <PostIndexItem key={post._id} post={post}/>
    ))}
  </div>
);

export default PostsIndex;