import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../client";
import YouTubePlayer from "../YoutubePlayer";

const MateDetail = () => {
    const { id } = useParams();
    const [mate, setMate] = useState(null);

    useEffect(() => {
        const fetchMate = async () => {
            try {
                const { data, error } = await supabase
                    .from("info")
                    .select("*")
                    .eq("id", id)
                    .single();

                if (error) {
                    throw error;
                }

                setMate(data);
            } catch (error) {
                console.error("Error fetching mate:", error.message);
            }
        };

        fetchMate();
    }, [id]);
    const isYouTubeVideo = (url) => {
        return url && (url.includes('youtube.com') || url.includes('youtu.be'));
      };
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

    if (!mate) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <p className='created_at'>{formatDateDifference(mate.created_at)}</p>
            <h2>{mate.title}</h2>
            <p>{mate.description}</p>
            {isYouTubeVideo(mate.url) ? (
                <YouTubePlayer url={mate.url} height='316' width='560'/>
            ) : (
                (mate.url) ? (
                    <img className="image" src={mate.url} alt={mate.title} />
                ) : null
            )}

        </div>
    );
};

export default MateDetail;
