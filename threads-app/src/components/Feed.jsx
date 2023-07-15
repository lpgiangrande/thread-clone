/**
 * FEED COMPONENT
 * Renders a Thread component for each thread in the filteredThreads array.
 */

import Thread from "./Thread";
import moment from 'moment'

const Feed = (
  { 
    user, 
    setOpenPopUp, 
    filteredThreads, 
    getThreads, 
    setInteractiveThread
  }
) => {

  return (
    <div className="feed">
      {/* adds an additional check to ensure that filteredThreads is not undefined or null before attempting to map over it */}
      {filteredThreads && filteredThreads.map((filteredThread) => (
        <Thread 
          key={filteredThread.id} 
          user={user} 
          setOpenPopUp={setOpenPopUp}
          filteredThread={filteredThread} 
          getThreads={getThreads}
          setInteractiveThread={setInteractiveThread}
          timePassed={moment(filteredThread.timestamp).fromNow()}
        />
      ))}
    </div>
  );
};

export default Feed;