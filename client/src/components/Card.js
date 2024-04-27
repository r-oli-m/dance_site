import React from 'react'
import { useState } from 'react'
import './Card.css'
import more from './more.png'
import { Link } from 'react-router-dom'
import { supabase } from '../client'
import YouTubePlayer from '../YoutubePlayer'
import CommentSection from './CommentSection'

const Card = (props) => {

  const [count, setCount] = useState(0)
  const isYouTubeVideo = (url) => {
    return url && (url.includes('youtube.com') || url.includes('youtu.be'));
  };
  const updateCount = async (event) => {
    event.preventDefault();

    await supabase
      .from('from')
      // .update({ betCount: count + 1})
      .eq('id', props.id)

    setCount((count) => count + 1);
  }

  const formatDateDifference = (createdAt) => {
    const currentDate = new Date();
    const createdDate = new Date(createdAt);
    const timeDifference = currentDate - createdDate;

    const minuteDifference = Math.floor(timeDifference / 60000); // Convert milliseconds to minutes

    if (minuteDifference < 1) {
      return 'just now';
    } else if (minuteDifference === 1) {
      return '1 minute ago';
    } else if (minuteDifference < 60) {
      return `${minuteDifference} minutes ago`;
    } else {
      const hourDifference = Math.floor(minuteDifference / 60);
      if (hourDifference === 1) {
        return '1 hour ago';
      } else if (hourDifference < 24) {
        return `${hourDifference} hours ago`;
      } else {
        const dayDifference = Math.floor(hourDifference / 24);
        if (dayDifference === 1) {
          return '1 day ago';
        } else if (dayDifference < 30) {
          return `${dayDifference} days ago`;
        } else {
          const monthDifference = Math.floor(dayDifference / 30);
          if (monthDifference === 1) {
            return '1 month ago';
          } else if (monthDifference < 12) {
            return `${monthDifference} months ago`;
          } else {
            const yearDifference = Math.floor(monthDifference / 12);
            if (yearDifference === 1) {
              return '1 year ago';
            } else {
              return `${yearDifference} years ago`;
            }
          }
        }
      }
    }
  };

  return (
    <div className='whole-post'>
      <div className="Card">
        <Link to={'edit/' + props.id}>
          <img className="moreButton" alt="edit button" src={more} />
        </Link>
        <Link to={'detail/' + props.id} style={{ textDecoration: 'none', color: 'inherit' }}>
          <h2 className="title">{props.title}</h2>
          <p className="descrip">{props.description}</p>
          <p className='created_at'>{formatDateDifference(props.created_at)}</p>
          {/* Conditionally render YouTubePlayer or img based on URL format */}
          {isYouTubeVideo(props.url) ? (
            <YouTubePlayer url={props.url} width='280' height='158' />
          ) : (
            (props.url) ? (
              <img className="image" src={props.url} alt={props.title} />
            ) : null
          )}
        </Link>
        {/* <button className="betButton" onClick={updateCount} >👍 Bet Count: {count}</button> */}

      </div>
      <div className='my_comments'>
        <CommentSection postId={props.id} />
      </div>
    </div>
  );
};

export default Card;