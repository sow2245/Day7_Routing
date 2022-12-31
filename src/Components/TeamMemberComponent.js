import { useParams } from "react-router-dom";

const TeamMemberComponent = () =>{

    const {id} = useParams();

    return(
            <>
                <h1>Team Member Data : {id}</h1>
            </>
    );
}

export default TeamMemberComponent;