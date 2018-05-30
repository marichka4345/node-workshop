import React from 'react';

const ACTIVE_BTN_STYLES = 'btn btn-outline-primary active';
const INACTIVE_BTN_STYLES = 'btn btn-outline-secondary';

export default ({ device, onUpdateStatus }) => (
<div className="btn-group mr-2" role="group">
  <button
    type="button"
    className={ device.isOn ? ACTIVE_BTN_STYLES : INACTIVE_BTN_STYLES }
    onClick={() => onUpdateStatus(device._id, true)}>
      On
  </button>
  <button
    type="button"
    className={ !device.isOn ? ACTIVE_BTN_STYLES : INACTIVE_BTN_STYLES }
    onClick={ () => onUpdateStatus(device._id, false) }>
      Off
  </button>
</div>);