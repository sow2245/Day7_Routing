import { useRouteError } from "react-router-dom";
const ErrorComponent = () =>{
    const errorData = useRouteError();
    return(
        <>
            <h1>OOPS!</h1>
            <h2>Something Went Wrong!</h2>
            <h3>Details : {errorData.statusText || errorData.Message}</h3>
        </>
    );
}

export default ErrorComponent;