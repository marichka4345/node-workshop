import React from 'react';

import './actionHistory.css';

export default ({ logs }) => (<div className="action-history">
  <h4>Action History</h4>
  {
    logs.map(({ message, timestamp }) => <p key={timestamp}>[{ timestamp }] - { message }</p>)
  }
</div>);