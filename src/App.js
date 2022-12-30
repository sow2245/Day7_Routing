import React, { useState,useEffect } from "react";
import ReactDom from "react-dom/client";
import CardComponent from "./CardComponent.js";
import data from "./data.json"
import { title } from "./Constants.js";
import SearchComponent from "./SearchComponent.js";
import NoResultsComponent from "./NoResultsComponent.js";

const HeadingComponent=()=>(
<div id="title" className="title-class" tabIndex="1">
    <h2>{title}</h2>
</div>
);


//Way of binding the data for No Results
const CardContainer=({filteredData})=>{
    // Type 1
    // if(!filteredData.length)  return <NoResultsComponent/>;
    // else
    // return filteredData.map((teamMembers)=>(
    //     <CardComponent teamMembers={teamMembers} key={teamMembers.id}/>
    // ));
    //Type 2
    return (!filteredData.length?  <NoResultsComponent/> : filteredData.map((teamMembers)=>(
        <CardComponent teamMembers={teamMembers} key={teamMembers.id}/>
    )));
};

const BodyComponent=()=>{
    const [listOfTeamMembers,setListOfTeamMembers]=useState([]);
    const [filteredData,setFilteredData]=useState([]);
    const [isSearched,setIsSearched]=useState(false);

    useEffect(()=>{
        getTeamMembersDataFromGit();
    },[]);

    async function getTeamMembersDataFromGit() {
        const TeamMemberArr = [];
        for (teamMem of data) {
          const teamData = await fetch(
            `https://api.github.com/users/${teamMem.gitlogin}`
          );
          const teamJsonData = await teamData.json();
          TeamMemberArr.push(teamJsonData);
        }
        setListOfTeamMembers(TeamMemberArr);
    };

    return(
    <div className="card-container">
        <SearchComponent listOfTeamMembers={listOfTeamMembers} setFilteredData={setFilteredData} setIsSearched={setIsSearched}/>
        <CardContainer filteredData={isSearched ? (filteredData.length !=0 ? filteredData : <NoResultsComponent/>): listOfTeamMembers}/>
    </div>);
};


const AppLayout =()=>(
    <>
    <HeadingComponent/>
    <BodyComponent/>
    </>
);

const root = ReactDom.createRoot(document.getElementById("root"));
root.render(<AppLayout/>);