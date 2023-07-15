/**
 * FEED COMPONENT
 * Renders a Thread component for each thread in the filteredThreads array.
 */

import Thread from "./Thread";

const Feed = ({ user, setOpenPopUp, filteredThreads, getThreads }) => {
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
        />
      ))}
    </div>
  );
};

export default Feed;