import { observer } from 'mobx-react-lite'
import React from 'react'
import { NodeDetailProps } from './NodeTypes'

const BranchDetails: React.FC<NodeDetailProps> = observer(({ node }) => {
    return (
        <>
            <input
                value={node.label}
                style={{ width: '100%', marginBottom: 5 }}
            />
        </>
    )
});

export default BranchDetails;