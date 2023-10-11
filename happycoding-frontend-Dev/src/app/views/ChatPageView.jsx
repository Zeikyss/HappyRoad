import React from "react";
import ChatPage from './../components/Chat/ChatPage';

const ChatPageView = ({socket})=>{

      return ( <div className='flex h-full items-center justify-center text-white'>
                    <ChatPage socket={socket}/>
       </div>)           

}

export default ChatPageView;