import React            from 'react';
import TableHeader      from './TableHeader';
import TableContents    from './TableContents';
import MapsList         from './MapsList';
import { PromiseProvider } from 'mongoose';
import {WLayout, WLHeader, WLSide, WLMain, WSidebar, WRow, WCol, WButton}        from 'wt-frontend';
import globe            from '../images/globe.jpg'

const MainContents = (props) => {
    let selected = Object.keys(props.activeMap).length === 0 ? true:false;
    const maps = props.maps;
    return (
        <>
        {
        selected ?
        <WLayout wLayout="header-lside" className="user-maps">
            <WLHeader className="user-maps-header">
                Your Maps
            </WLHeader>
            <WLSide side="left" className="user-maps-side">
                {
                    <MapsList
                        setActiveMap={props.setActiveMap} activeMap = {props.activeMap}
                        maps={maps} deleteMap = {props.deleteMap} renameMap = {props.renameMap}
                    />
                }
            </WLSide>
            <WLMain className="user-maps-main">
                <img src={globe} alt="Welcome Globe" className='user-maps-image'></img>
                <WButton className="new-map-button" onClick = {props.createNewMap}>
                    <div className="center">
                        Add a New Map
                    </div>
                </WButton>
            </WLMain>
        </WLayout>
        :
        <TableContents
                activeMap = {props.activeMap} activeRegion = {props.activeRegion}
                regions = {props.regions} createNewRegion = {props.createNewRegion}
                setActiveRegion = {props.setActiveRegion} toggleRegionViewer={props.toggleRegionViewer}
                spreadSheet={props.spreadSheet} editRegion = {props.editRegion} deleteRegion = {props.deleteRegion}
                handleSort = {props.handleSort} handleAddLandmark = {props.handleAddLandmark}
                deleteLM = {props.deleteLM} renameLM = {props.renameLM} changeParent = {props.changeParent}
                activeSubs = {props.activeSubs} landmarks = {props.landmarks} handleRefetch = {props.handleRefetch}
                test = {props.test} childLandmarks = {props.childLandmarks} imagePath = {props.imagePath}
                undo = {props.undo} redo = {props.redo} tps = {props.tps} setActiveFromSpread = {props.setActiveFromSpread}

        />
        }
        </>
    );
};

export default MainContents;