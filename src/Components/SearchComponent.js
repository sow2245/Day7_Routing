import { useState } from "react";

const searchTeamData=(searchText,listOfTeamMembers,setIsSearched)=>{
    //filtering data for multiple fields
      const setValue = (searchText != "" || searchText != null);
      setIsSearched(setValue);
      const searchTextToLowerCase=searchText.toLowerCase();
      return listOfTeamMembers?.filter((team)=>
         (team.name.toLowerCase().includes(searchTextToLowerCase)
             || team.location?.toLowerCase()?.includes(searchTextToLowerCase))
      );
};

const SearchComponent =({listOfTeamMembers , setFilteredData , setIsSearched})=>{
    const [searchText,setSearchText] = useState("");

    const settingValueForSetSearchText=(e)=>{
        setSearchText(e.target.value);
    };

    return(
    <div className="search">
            <form 
            onSubmit={
                (e)=>{
                    e.preventDefault();
                    const filteredData = searchTeamData(searchText,listOfTeamMembers,setIsSearched);
                    setFilteredData(filteredData);
                }
            }>
                <input id="searchBox" placeholder="search" 
                       value={searchText}
                       onChange={settingValueForSetSearchText}></input>
                <button>Search</button>
            </form>
    </div>
    );
};

export default SearchComponent;