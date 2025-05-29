import React, { useState } from 'react'
import { NodeDetailProps } from './NodeTypes'
import { observer } from 'mobx-react-lite';
import { flowStore } from '../FlowStore';
import { PatternItem } from './DataProducerNode';
import { getDefaultValueForType } from '../utils';
import { FaExpandAlt } from "react-icons/fa";
import { RiCollapseDiagonalLine } from "react-icons/ri";
import PatternPopup from '../pattern-components/PatternPopup';
import { DataType } from '../items';



const DataProducerDetails: React.FC<NodeDetailProps> = observer(({ node }) => {
    const [isPatternCollapsed, setIsPatternCollapsed] = useState(true);
    const [isTimeSettingsCollapsed, setIsTimeSettingsCollapsed] = useState(true);

    const togglePattern = () => setIsPatternCollapsed(!isPatternCollapsed);
    const toggleTimeSettings = () => setIsTimeSettingsCollapsed(!isTimeSettingsCollapsed);

    return (
        <div className="grid gap-4">

            {/* Data Type */}
            <div>
                <div className="form-label">Data Type</div>
                <p className="form-input bg-node-yellow-light">{node.dataType}</p>
            </div>
            
            <PatternPopup nodeId={node.id} />

        </div>
    );
});

export default DataProducerDetails;