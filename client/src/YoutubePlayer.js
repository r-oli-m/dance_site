import React from 'react';

const YouTubePlayer = ({ url, width, height }) => {
  const videoId = url.split('v=')[1];
  const embedUrl = `https://www.youtube.com/embed/${videoId}`;

  return (
    <div className="youtube-player">
      <iframe
        title="YouTube video player"
        width={width}
        height={height}
        src={embedUrl}
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default YouTubePlayer;
