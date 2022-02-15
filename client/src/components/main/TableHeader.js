import React                    from 'react';
import { WButton, WRow, WCol }  from 'wt-frontend';

const TableHeader = (props) =>{
    
    const handleNameSort = () =>{
        props.handleSort(props.regions, 1);
    }

    const handleCapSort = () =>{
        props.handleSort(props.regions, 2);
    }

    const handleLeaderSort = () =>{
        props.handleSort(props.regions, 3);
    }


    return(
        <WRow className='table-header'>
            <WCol size="1"></WCol>
            <WCol size="2" onClick={handleNameSort}>Name 
                <i className="material-icons">arrow_downward</i>
            </WCol>
            <WCol size="2" onClick={handleCapSort}>Capital
                <i className="material-icons">arrow_downward</i>
            </WCol>
            <WCol size="2" onClick={handleLeaderSort}>Leader
                <i className="material-icons">arrow_downward</i>
            </WCol>
            <WCol size="1">Flag
                <i className="material-icons">arrow_downward</i>
            </WCol>
            <WCol size="3">Landmarks
                <i className="material-icons">arrow_downward</i>
            </WCol>
        </WRow>
    );
}

export default TableHeader;