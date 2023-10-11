import React, { useState } from 'react';

const ChatFooter = ({ socket }) => {
  const [message, setMessage] = useState('');

  const handleTyping = () =>
  socket.emit('typing', `${localStorage.getItem('userName')} is typing`);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim() && localStorage.getItem('userName')) {
                  socket.emit('message', {
                    text: message,
                    name: localStorage.getItem('userName'),
                    id: `${socket.id}${Math.random()}`,
                    socketID: socket.id,
                  })
                }
                setMessage('');
              };
  return (
    <div className="p-4 mx-auto  w-cwt h-20 bg-navfoo border border-b-g dark:border-fond ">
      <form className="w-full h-full flex align-center justify-between" onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Ecrit ton message"
          className="w-4/5 h-full outline-none p-1 text-fond rounded-xl border border-b-g dark:border-fond"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleTyping}
        />
        <button className=" w-36 p-2 rounded-xl bg-btn-mou hover:bg-b-g text-b-g hover:text-fond border-none outline-none cursor-pointer">ENVOI</button>
      </form>
    </div>
  );
};

export default ChatFooter;