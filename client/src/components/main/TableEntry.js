import React, { useState, useEffect, Component } from 'react';
import { WButton, WInput, WRow, WCol } from 'wt-frontend';

const TableEntry = (props) =>{
    const { data } = props;

    const name = props.name;
    const cap = props.capital;
    const leader = props.leader;

    const nameEdit = props.nameEditing;
    const capEdit = props.capEditing;
    const leaderEdit = props.leaderEditing;
    let imagePath = props.imagePath;
    let image = "";


    const[editingName, toggleNameEdit] = useState(nameEdit);
    const[editingCap, toggleCapEdit] = useState(capEdit);
    const[editingLeader, toggleLeaderEdit] = useState(leaderEdit);
    const[key, changeKey]                  = useState(-1);
    const[imageP, changeImage]               = useState("");
    


    useEffect(() => {
        toggleNameEdit(nameEdit);
        toggleCapEdit(capEdit);
        toggleLeaderEdit(leaderEdit);

        loadImage();
        //try{
            //const { default: src } = await import()
            //image = requestImageFile(`../The World/${imagePath} Flag.png`);
            //image = import(`../The World/${imagePath} Flag.png`);
            //console.log(image);
        //}
        //catch (err) {
            //console.log(err);
        //}
	});

    const loadImage = async () =>{
        try{
            //image = require('../The World' + imagePath + '.png');
            console.log(imagePath);
            image = require('../../assets/The World' + imagePath + '/' + props.name + ' Flag.png');
            changeImage(image);
            //image = requestImageFile;
        }
        catch(e){
            console.log(imagePath);
            console.log(e);
        }
    }

    const handleNameEdit = (e) =>{
        props.toggleEditing();
        toggleNameEdit(false);
        const newName = e.target.value ? e.target.value : 'No Capital';
        const prevName = name;
        if(newName != prevName){
            props.editRegion(props._id, 1, newName, prevName);
        }
    };

    const handleNameEditKey = (e) =>{
        if(e.keyCode === 40 || e.keyCode === 39 || e.keyCode === 38 || e.keyCode === 37){
            const newName = e.target.value ? e.target.value : 'No Capital';
            const prevName = name;
            if(newName != prevName){
                props.editRegion(props._id, 1, newName, prevName);
            }
        }
    };

    const handleCapEdit = (e) =>{
        props.toggleEditing();
        toggleCapEdit(false);
        const newCap = e.target.value ? e.target.value : 'No Capital';
        const prevCap = cap;
        if(newCap != prevCap){
            props.editRegion(props._id, 2, newCap, prevCap);
        }
    };
    const handleCapEditKey = (e) =>{
        if(e.keyCode === 40 || e.keyCode === 39 || e.keyCode === 38 || e.keyCode === 37){
            const newCap = e.target.value ? e.target.value : 'No Capital';
            const prevCap = cap;
            if(newCap != prevCap){
                props.editRegion(props._id, 2, newCap, prevCap);
            }
        }
    };
    
    
    const handleLeaderEdit = (e) =>{
        props.toggleEditing();
        toggleLeaderEdit(false);
        const newLeader = e.target.value ? e.target.value : 'No Leader';
        const prevLeader = leader;
        if(newLeader != prevLeader){
            props.editRegion(props._id, 3, newLeader, prevLeader);
        }
    };
    const handleLeaderEditKey = (e) =>{
        if(e.keyCode === 40 || e.keyCode === 39 || e.keyCode === 38 || e.keyCode === 37){
            const newLeader = e.target.value ? e.target.value : 'No Leader';
            const prevLeader = leader;
            if(newLeader != prevLeader){
                props.editRegion(props._id, 3, newLeader, prevLeader);
            }
        }
    };
    


    const handleNameEditToggle = () =>{
        toggleNameEdit(!editingName)
        props.currentEditing(props.index, 1)
    }
    const handleCapEditToggle = () =>{
        toggleCapEdit(!editingCap)
        props.currentEditing(props.index, 2)
    }
    const handleLeaderEditToggle = () =>{
        toggleLeaderEdit(!editingLeader)
        props.currentEditing(props.index, 3)
    }



    const handleSetActiveRegion = () =>{
        props.setActiveRegion(props.id);
    }
    const handleDeleteSubregion = () =>{
        props.deleteRegion(props._id);
    }
    const handleRegionViewer = () =>{
        props.handleRegionViewerLandmarks(props._id);
    }

    return(
        <WRow className = 'table-entry'>
            <WCol size="1">
                <i className="material-icons" onClick={handleDeleteSubregion}>close</i>
            </WCol>
            <WCol size="2">
            {
                editingName || name === ''
                ? <WInput 
                    className='table-input' onBlur = {handleNameEdit}
                    onKeyDown = {handleNameEditKey}
                    autoFocus={true} defaultValue={name} type='text'
                    wType="outlined" barAnimation="solid" inputClass="table-input-class"
                />
                : <div className = "table-text-name" onClick={handleNameEditToggle}>
                    {name}
                    <i className="material-icons" onClick={handleSetActiveRegion}>navigate_next</i>
                </div>
            } 
            </WCol>
            <WCol size="2">
                {
                    editingCap || cap === ''
                     ? <WInput 
                        className='table-input' onBlur = {handleCapEdit}
                        onKeyDown = {handleCapEditKey}
                        autoFocus={true} defaultValue={cap} type='text'
                        wType="outlined" barAnimation="solid" inputClass="table-input-class"
                     />
                     : <div className = "table-text" onClick={handleCapEditToggle}>
                        {cap}
                     </div>
                } 
            </WCol>
            <WCol size="2">
                {
                    editingLeader || leader === ''
                    ? <WInput 
                    className='table-input' onBlur = {handleLeaderEdit}
                    onKeyDown = {handleLeaderEditKey}
                    autoFocus={true} defaultValue={leader} type='text'
                    wType="outlined" barAnimation="solid" inputClass="table-input-class"
                 />
                 : <div className = "table-text" onClick={(handleLeaderEditToggle)}>
                    {leader}
                    </div>
                }
            </WCol>
            <WCol size="1"><img src = {imageP} alt={props.name} className = 'tableFlags'/></WCol>
            <WCol size="3" onClick={handleRegionViewer}>
                {props.landmarks}
            </WCol>
        </WRow>
    );
}

export default TableEntry;