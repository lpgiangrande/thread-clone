import PopUpThread from "./PopUpThread"
import ThreadInput from "./ThreadInput"

function PopUp({ setOpenPopUp, popUpFeedThreads }) {
  
    return (
      <>
       <div className="popup">
          <p onClick={() => setOpenPopUp(false)}>X</p>
          {popUpFeedThreads?.map(popUpFeedThread => 
            <PopUpThread 
              key={popUpFeedThread.id}
              popUpFeedThread={popUpFeedThread}
            />
          )}
          <ThreadInput />
       </div>
      </>
    )
  }
  
  export default PopUp
  