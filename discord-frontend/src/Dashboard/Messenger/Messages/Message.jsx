import React from 'react';
import { styled } from '@mui/system';
import Avatar from '../../../shared/components/Avatar';
import Typography from '@mui/material/Typography';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import Button from '@mui/material/Button';

const MainContainer = styled("div")({
    width: "97%",
    display: "flex",
    marginTop: "10px",
});

const AvatarContainer = styled("div")({
    width: '70px',
});

const MessageContainer = styled("div")({
    display: 'flex',
    flexDirection: 'column',
});

const MessageContent = styled("div")({
    color: '#DCDDDE'
});

const SameAuthorMessageContent = styled("div")({
    color: '#DCDDDE',
    width: '97%',
});

const SameAuthorMessageText = styled('span')({
    marginLeft: '70px'
});

const Message = ({ content, sameAuthor, username, date, sameDay, isLink, fileName, contentType }) => {
    
    var parts;
    var lastPart;
    var url;

    if(contentType=='location'){
        parts = content.split("=");
        lastPart = parts[parts.length - 1];
        url=`https://maps.googleapis.com/maps/api/staticmap?center=${lastPart}&zoom=14&size=400x400&markers=size:mid%7C=color:red%7C${lastPart}&key=AIzaSyA4tR4smZ_xoVoaaAGPSKefX9K0XfdYOKU`
        //url=`https://maps.googleapis.com/maps/api/staticmap?center=${lastPart}&zoom=14&size=400x300&sensor=flase&markers=size:mid%7C=color:red%7C${lastPart}&key=AIzaSyA4tR4smZ_xoVoaaAGPSKefX9K0XfdYOKU`;
    }
    
    if (sameAuthor && sameDay) {
        if(isLink && contentType =='text'){
            return (
                <SameAuthorMessageContent>
                    <SameAuthorMessageText>
                        <a href={content}>{content}</a>
                    </SameAuthorMessageText>
                </SameAuthorMessageContent>
            );
        }else if(contentType=='location'){
            return (
                <SameAuthorMessageContent>
                    <SameAuthorMessageText>
                        <a href={content}><img style={{width:'500px', marginTop:'10px'}} src={url}/></a>
                    </SameAuthorMessageText>
                </SameAuthorMessageContent>
            );
        }else{
            
            return (
                <SameAuthorMessageContent>
                    <SameAuthorMessageText>
                        {contentType.includes('image')&& <a href={content}><img style={{width:'500px', marginTop:'10px'}} src={content}/></a>}
                        {!contentType.includes('image') && !contentType.includes('text') && <Button sx={{color:"white"}}variant="text" href={content}><CloudDownloadIcon/> {fileName}</Button>}
                        {!contentType.includes('image') && contentType.includes('text') && content}
                    </SameAuthorMessageText>
                </SameAuthorMessageContent>
            );
        }
        /* return (
            <SameAuthorMessageContent>
                <SameAuthorMessageText>{content}</SameAuthorMessageText>
            </SameAuthorMessageContent>
        ); */
    }
    console.log(contentType);
    return <MainContainer>
        <AvatarContainer>
            <Avatar username={username}/>
        </AvatarContainer>
        <MessageContainer>
            <Typography component={'div'} style={{fontSize:"16px", color:"white"}}>
                    {username}{' '}
                    <span style={{fontSize:'12px',color:'#a9c5d6'}}>{date}</span>
                    {isLink && contentType=='text'?(
                        <MessageContent>
                            <a heref={content}>{content}</a>
                        </MessageContent>
                    ):(
                        <MessageContent>
                            {contentType.includes('image')&& <a href={content}><img style={{width:'500px', marginTop:'10px'}} src={content}/></a>}
                            {contentType.includes('location')&& <a href={content}><img style={{width:'500px', marginTop:'10px'}} src={url}/></a>}
                            {!contentType.includes('image') && !contentType.includes('text') && !contentType.includes('location') && <Button sx={{color:"white"}}variant="text" href={content}><CloudDownloadIcon/> {fileName}</Button>}
                            {!contentType.includes('image') && contentType.includes('text') && content}
                        </MessageContent>
                    )

                    }
            </Typography>
        </MessageContainer>
    </MainContainer>;
};

export default Message;