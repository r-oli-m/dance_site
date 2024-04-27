import React, { useState, useEffect } from 'react';
import { supabase } from '../client';
import './CommentSection.css';

const CommentSection = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const fetchComments = async () => {
      const { data, error } = await supabase
        .from('info')
        .select('comments')
        .eq('id', postId)
        .single();

      if (error) {
        console.error('Error fetching comments:', error.message);
        return;
      }

      // Set comments state to the array of comments for the post
      setComments(data.comments || []);
    };

    fetchComments();
  }, [postId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Check if newComment is not empty
    if (newComment.trim() === '') return;

    try {
      // Update comments array for the post in the info table
      const { data, error } = await supabase
        .from('info')
        .update({ comments: [...comments, newComment] })
        .eq('id', postId);

      if (error) {
        console.error('Error adding comment:', error.message);
        return;
      }

      // Update comments state with the new comment
      setComments([...comments, newComment]);
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error.message);
    }
  };

  return (
    <div>
      <h2>Comments</h2>
      <ul>
        {comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          required
        />
        <button type="submit">Post Comment</button>
      </form>
    </div>
  );
};

export default CommentSection;
