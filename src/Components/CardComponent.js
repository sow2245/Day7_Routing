const CardComponent=(props)=>{
    if( !props?.teamMembers) return null;
    const teamMembers=props.teamMembers;
    return (
        <div id="card" className="cardClass">
            <img src={teamMembers.avatar_url}/>
            <h2>{teamMembers.name}</h2>
            <h3>Company/School Name : {teamMembers.company ? teamMembers.company : "NA"}</h3>
            <h4>Location : {teamMembers.location ? teamMembers.location : "NA"}</h4>
            <h5>Public Repositories : {teamMembers.public_repos}</h5>
        </div>
    );
};

export default CardComponent;