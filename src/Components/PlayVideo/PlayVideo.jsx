import React, { useState, useEffect } from 'react';
import './PlayVideo.css';
import like from '../../assets/like.png';
import dislike from '../../assets/dislike.png';
import share from '../../assets/share.png';
import save from '../../assets/save.png';
import user_profile from '../../assets/user_profile.jpg';
import { API_KEY, value_converter } from '../../data';
import moment from 'moment';
import { useParams } from 'react-router-dom';

const PlayVideo = () => {
   
    const {videoId} = useParams();

    const [apiData, setApiData] = useState(null);
    const [channelData, setChannelData] = useState(null);
    const [commentData, setCommentData] = useState([]);

    useEffect(() => {
        const fetchVideoData = async () => {
            const videoDetails_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`;
            try {
                const response = await fetch(videoDetails_url);
                const data = await response.json();
                setApiData(data.items[0]);
            } catch (error) {
                console.error("Video data fetch karne mein error aaya:", error);
            }
        };

        fetchVideoData();
    }, [videoId]);

    useEffect(() => {
        if (apiData) {
            const fetchOtherData = async () => {
                const channelData_url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&key=${API_KEY}`;
                try {
                    const response = await fetch(channelData_url);
                    const data = await response.json();
                    setChannelData(data.items[0]);
                } catch (error) {
                    console.error("Channel data fetch karne mein error aaya:", error);
                }

                const comment_url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=500&videoId=${videoId}&key=${API_KEY}`;
                try {
                    const response = await fetch(comment_url);
                    const data = await response.json();
                    setCommentData(data.items);
                } catch (error) {
                    console.error("Comments fetch karne mein error aaya:", error);
                }
            };

            fetchOtherData();
        }
    }, [apiData, videoId]);

    return (
        <div className='play-video'>
            {/* Video iframe */}
            {apiData && <iframe src={`https://www.youtube.com/embed/${videoId}?autoplay=1`} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>}
            {/* Video ki details */}
            <h3>{apiData ? apiData.snippet.title : "Title Here"}</h3>
            <div className='play-video-info'>
                <p>{apiData ? value_converter(apiData.statistics.viewCount) : "16K"} View &bull; {apiData ? moment(apiData.snippet.publishedAt).fromNow() : ""}</p>
                <div>
                    <span><img src={like} alt="" />{apiData ? value_converter(apiData.statistics.likeCount) : 155}</span>
                    <span><img src={dislike} alt="" /></span>
                    <span><img src={share} alt="" />Share</span>
                    <span><img src={save} alt="" />Save</span>
                </div>
            </div>
            {/* Publisher ki details */}
            <hr />
            <div className='publisher'>
                <img src={channelData ? channelData.snippet.thumbnails.default.url : ""} alt='' />
                <div>
                    <p>{apiData ? apiData.snippet.channelTitle : ""}</p>
                    <span>{channelData ? value_converter(channelData.statistics.subscriberCount) : "1M"} Subscribers</span>
                </div>
                <button>Subscribers</button>
            </div>
            {/* Video description */}
            <div className='vid-description'>
                <p>{apiData ? apiData.snippet.description.slice(0, 250) : "Description Here"}</p>
                <hr />
                <h4>{apiData ? value_converter(apiData.statistics.commentCount) : 102} Comments</h4>
                
                {/* Comments */}
                {commentData.map((comment, index) => (

              <div key={index} className='comment'>
             <img src={comment.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="" />
             <div>
             <h3>{comment.snippet.topLevelComment.snippet.authorDisplayName} <span>{moment(comment.snippet.topLevelComment.snippet.publishedAt).fromNow()}</span></h3>
             <p>{comment.snippet.topLevelComment.snippet.textOriginal}</p>
            <div className='comment-action'>
             <img src={like} alt="" />
            <span>{value_converter(comment.snippet.topLevelComment.snippet.likeCount)}</span>
             <img src={dislike} alt="" />
             </div>
             </div>
              </div>
                ))}
            </div>
        </div>
    );
}

export default PlayVideo;

