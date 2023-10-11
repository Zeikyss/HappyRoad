import React from "react";
import Chat from "../components/Chat/Chat";

const ChatView = ({socket})=>{

      return ( <div className='flex h-full items-center justify-center text-white'>
                    <Chat socket={socket}/>
       </div>)           

}

export default ChatView;