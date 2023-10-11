import React, {useEffect, useState} from 'react';

const ChatBody = ({messages, typingStatus, lastMessageRef}) => {

  const [data, setData] = useState([]);
  const getData = () => {
      fetch('data.json'
          , {
              headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
              }
          }
      )
          .then(function (response) {
              return response.json();
          })
          .then(function (myJson) {
              setData(myJson)
          });
  }
  // récupération du getData()
  useEffect(() => {
      getData()
  }, [])

  return (
    <>

      {/*This shows messages sent from you*/}
      <div className="relative w-cwt mx-auto mt-24 h-cht mb-2 bg-fond border border-b-g dark:bg-fond-clair dark:border-fond overflow-y-auto ">
        {messages.map((message) =>
          message.name === localStorage.getItem('userName') ? (
            <div className="text-xs text-b-g dark:text-fond pr-4" key={message.id}>
              <p className="text-xs text-b-g dark:text-fond  py-2 text-right">You</p>
              <div className="bg-b-g dark:bg-fond text-fond dark:text-b-g max-w-xs h-auto p-2 rounded-xl  ml-auto text-sm  ">
                <p>{message.text}</p>
              </div>
            </div>
          ) : (
            <div className="text-xs text-b-g dark:text-fond pl-4 text-left" key={message.id}>
              <p className='py-2'>{message.name}</p>
              <div className=" bg-b-g dark:bg-navfoo text-fond max-w-xs p-2 rounded-xl ml-0 text-sm h-auto overflow-y-auto">
                <p>{message.text}</p>
              </div>
            </div>
          )
        )}

        <div className="absolute bottom-0 left-4 italic text-xs text-b-g dark:text-fond ">
        <p>{typingStatus}</p>
          </div>
          <div ref={lastMessageRef} />   
        </div>
    </>
  );
};

export default ChatBody;