import React, { useState, useEffect, useCallback} from "react";
import * as peopleService from  "../../services/peopleService";
import FriendCard from "../FriendCard";
import { useNavigate } from "react-router-dom";
import debug from "sabio-debug";

function Friends() {

    const _logger = debug.extend("Friends");

const[pageData, setPageData] = useState({arrayOfPeople:[], peopleComponents:[]}); 
const[filterData, setFilterData] = useState({arrayOfFriends:[], friendComponents:[]});     
const [count, setCount] = useState(0);
const [showResults, setShowResults] = useState(false);
const [showFilterResults, setFilterResults] = useState(false);

const MapPerson = (aPerson) =>{
    
        return (
            <FriendCard 
            person={aPerson} 
            key={"Friend_" + aPerson.id}
            friendCardDelete={onDeleteClicked}

            />
        );            
 };

useEffect(()=>{
    peopleService
        .getFriends()
        .then(onGetPeopleSuccess)
        .catch(onGetPeopleError);
},[]);

const onGetPeopleSuccess = response =>{
   _logger(response);
    let arrayOfPeeps = response.data.items;
    _logger({arrayOfPeeps});

    setPageData((prevState)=>{
        const pd = {...prevState};
        pd.arrayOfPeople = arrayOfPeeps;  
        pd.peopleComponents = arrayOfPeeps.map(MapPerson);
        return pd;
    })

    setFilterData((prevState)=>{
        const fd = {...prevState};
        fd.arrayOfFriends = arrayOfPeeps;  
        fd.friendComponents = arrayOfPeeps.map(MapPerson);
        return fd;
    })
    
};

const onGetPeopleError = err =>{
    console.error(err);
};

const onHeaderClicked = () =>{
    setCount((prevState) =>{
        return prevState + 1;
    });
};

const onShowContentClicked =() =>{
    setShowResults((prevState) => {
        return !prevState;
    });
};
const onShowFilterClicked =() =>{
    setFilterResults((prevState) => {
        return !prevState;
    });
};

const onDeleteClicked = useCallback((myPerson, eObj) =>{
    _logger(myPerson.id.value, { myPerson, eObj });

    peopleService
        .deleteFriend(myPerson.id)
        .then(onDeleteSuccess)
        .catch(onDeleteError)
}, []);

const onDeleteSuccess = idToBeDeleted => {
    _logger("onDeleteSuccess", idToBeDeleted);
    setPageData((prevState) =>{
        const pd = {...prevState};
        pd.arrayOfPeople = [...pd.arrayOfPeople];

        const idxOf = pd.arrayOfPeople.findIndex((person)=>{
            let result = false;

            if (person.id ===idToBeDeleted) {
                result = true;
            }
            return result;
        });
        if (idxOf >= 0) {
            pd.arrayOfPeople.splice(idxOf, 1);
            pd.peopleComponents = pd.arrayOfPeople.map(MapPerson);
        }
        return pd;
    });
}

const onDeleteError = (err) =>{
    console.error("Deleting", err);
}

const navigate = useNavigate();
const onAddFriend = ()=> {
 navigate("/Friends/New");
}

var findJohn = function (peopleArr){
    var returnArr = peopleArr.filter(filterJohn);

    function filterJohn(person){
        let result = false;
        if(person.title === "John"){
            result = true;
        }
        return result;
    }
    return returnArr;

}

const onFindJohnClicked = () =>{
    let arrayOfPeeps = findJohn(filterData.arrayOfFriends);

    setFilterData((prevState)=>{
        const fd = {...prevState};
        fd.arrayOfFriends = arrayOfPeeps;  
        fd.friendComponents = arrayOfPeeps.map(MapPerson);
        return fd;
    })
    onShowContentClicked();
    onShowFilterClicked();

}


    return(
        <React.Fragment>
            <div className="container">
                <h3 onClick={onHeaderClicked}>Rendering {count}</h3>
                <button type="button" className="btn btn-primary mt-3" onClick={onShowContentClicked}> Show Content </button>
                <button type="button" className="btn btn-success mt-3" onClick={onAddFriend}> Add Friend </button>
                <button type="button" className="btn btn-info mt-3" onClick={onFindJohnClicked}> Find John </button>
           
           
                {showResults &&             
                    <div className="row mt-3">
                        {pageData.peopleComponents}    
                    </div>    
                }  
                  {showFilterResults &&             
                    <div className="row mt-3">
                        {filterData.friendComponents}    
                    </div>    
                }        
            </div>                                     
        </React.Fragment>        
    );
}

export default Friends;




