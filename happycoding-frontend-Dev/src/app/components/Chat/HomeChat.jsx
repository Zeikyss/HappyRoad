import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HomeChat = ({ socket }) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');

  const handleSubmit = (e) => {
     e.preventDefault();
    localStorage.setItem('userName', userName);
    socket.emit('newUser', {userName, socketID: socket.id})
    navigate('/chats');
  };
  
  console.log(socket)
  return (
    <form className="flex flex-col justify-center items-center mb-4" onSubmit={handleSubmit}>
      <h2 className="mb-6 text-b-g dark:text-fond">Entrée dans la discussion</h2>
      <label htmlFor="username" className='text-b-g dark:text-fond mb-2'>Votre speudo ou votre nom</label>
      <input
        type="text"
        minLength={3}
        name="username"
        id="username"
        className="w-1/2 p-2"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <button className=" text-xl w-52 p-2 mt-5 cursor-pointer outline-none border-none rounded-xl text-b-g bg-btn-mou" >ENTREE</button>
    </form>
  );
};

export default HomeChat;