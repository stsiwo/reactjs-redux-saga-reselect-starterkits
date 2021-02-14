import * as React from 'react';
import './style.scss';


const Loading: React.FunctionComponent<{}> = (props) => {

  return (
    <div className="loading-wrapper">
      <div className="loading-box">
        <div className="lds-ellipsis" role="loading-icon">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="loading-message">{"loading ..."}</div>
      </div>
    </div>
  );
}

export default Loading; 

