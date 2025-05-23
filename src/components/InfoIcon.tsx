import * as React from "react";
import Popover from '@mui/material/Popover';

export default function InfoIcon() {
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

    const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };
  
    const open = Boolean(anchorEl);
    
    return (
    <div>
        <button 
            aria-owns={open ? 'mouse-over-popover' : undefined}
            aria-haspopup="true"
            onMouseEnter={handlePopoverOpen}
            onMouseLeave={handlePopoverClose}
            className="bg-blue-400 text-white px-4 py-1 rounded"
        >
            i
        </button>
        <Popover
        id="mouse-over-popover"
        sx={{ pointerEvents: 'none' }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
        }}
        transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
        >
            This is the Data Simulation Framwork, <br />
            where you can create, connect and <br />
            export datastreams by dragging Nodes <br />
            into the workspace. After setting up <br />
            your Streams and Events, export the <br />
            file as a JSON.
        </Popover>
    </div>
  );
}