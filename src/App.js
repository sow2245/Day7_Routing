import React, { useState,useEffect, Children } from "react";
import ReactDom from "react-dom/client";
import CardComponent from "./Components/CardComponent.js";
import data from "./Common/data.json"
import { title } from "./Common/Constants.js";
import SearchComponent from "./Components/SearchComponent.js";
import NoResultsComponent from "./Components/NoResultsComponent.js";
import { createBrowserRouter,RouterProvider,Outlet, Link } from "react-router-dom";
import AboutUsComponent from "./Components/AboutUsComponent.js";
import ErrorComponent   from "./Components/ErrorComponent.js"
import TeamMemberComponent from "./Components/TeamMemberComponent.js";

const HeadingComponent=()=>(
<div id="title" className="title-class" tabIndex="1">
    <h2>{title}</h2>
</div>
);


const CardContainer=({filteredData})=>{
    return (!filteredData.length?  <NoResultsComponent/> : filteredData.map((teamMembers)=>(
        <Link to={`/teammember/${teamMembers.login}`}>
        <CardComponent teamMembers={teamMembers} key={teamMembers.id}/>
        </Link>
    )));
};

const SearchTeamMembersComponent=()=>{
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
    <Outlet/>
    </>
);

const appRouter = createBrowserRouter([
    {
        path : "/",
        element : <AppLayout/>,
        errorElement : <ErrorComponent/>,
        children : [
            {
                path : "/searchteammembers",
                element : <SearchTeamMembersComponent/>
            },
            {
                path : "/teammember/:id",
                element : <TeamMemberComponent/>
            }
        ]
    },
    {
        path : "/aboutus",
        element : <AboutUsComponent/>
    }
]);

const root = ReactDom.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter}/>);