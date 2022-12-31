import { useParams } from "react-router-dom";
import { Component, useEffect,useState } from "react";
import CardComponent from "./CardComponent.js";

const TeamMemberComponent = () =>{

    const {id} = useParams();
    const [teamMemberInfo,setTeamMemberInfo] = useState();

    useEffect( () => {
        fetchTeamMemberInfo()
    },[]);

    async function fetchTeamMemberInfo (){
        const data = await fetch(
                 `https://api.github.com/users/${id}`
        );
        const json = await data.json();
        setTeamMemberInfo(json);
    }

    return <CardComponent teamMembers={teamMemberInfo}/>;
}

export default TeamMemberComponent;