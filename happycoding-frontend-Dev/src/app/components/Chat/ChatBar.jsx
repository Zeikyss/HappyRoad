import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

const ChatBar = ({ socket }) => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  // fonction pour quitte le chat 
  const handleLeaveChat = () => {
    localStorage.removeItem('userName');
    navigate('/');
    // window.location.reload();
  };
  // récupére tous les users active du chat
  useEffect(() => {
    socket.on('newUserResponse', (data) => setUsers(data));
  }, [socket, users]);

  return (
    <div className="p-3 bg-fond dark:bg-fond-clair h-auto w-1/3 justify-between">
      <div className='p-3 border border-b-g dark:border-fond '>
        <h4 className="my-4 underline dark:text-fond">Utilisateurs actifs:</h4>
        <div className="mb-2 text-b-g text-xl dark:text-fond">
          {/* font qui mets tout les utilisateurs active*/}
          {users.map((user) => (
            <p className='italic m-2' key={user.socketID}>{user.userName}</p>
          ))}
        </div>
      </div>
      
        <button className="bg-f-red text-b-g absolute bottom-20 left-20 p-4 w-38 rounded-xl  cursor-pointer border border-b-g dark:border-fond" onClick={handleLeaveChat}>
          QUITTER LE CHAT
        </button>
     
    </div>
  );
};

export default ChatBar;