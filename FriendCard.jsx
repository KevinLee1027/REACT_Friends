import React from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

function FriendCard(props) {
    const aPerson = props.person;
   
    let navigate = useNavigate();

    const onEditFriend = () =>{
        const state = {type: "FRIEND_VIEW", payload: aPerson};
        navigate(`/Friends/${aPerson.id}`, {state});
    }

    const onLocalPersonClicked = (evt) =>{
        evt.preventDefault();
        props.friendCardDelete(aPerson, evt)
    }


    return (
        <React.Fragment>
        <div className="col-md-3" key={"Friend_" + aPerson.id}>
             <div className="card" style={{width: "18rem"}}>
                <img 
                    className="card-img-top"
                    style={{height: "14rem"}} 
                    src= {aPerson.primaryImageUrl} 
                    alt="Card image cap"
                    key={"Person Image" + aPerson.primaryImageUrl}
                />
            <div className="card-body">
                <h5 className="card-title" key={"Person Title" + aPerson.title}>
                    {aPerson.title} 
                </h5>
            <p className="card-text" key={"Person Headline" + aPerson.headline}>
             {aPerson.headline}
            </p>
            <button type="button" className="link-btn btn btn-danger" onClick={onLocalPersonClicked}>Delete</button>
            <button type="button" className="link-btn btn btn-warning" onClick={onEditFriend}>Edit</button>
        </div>
      </div>
        </div>
        </React.Fragment>
       
    ); 
};

FriendCard.propTypes = {
    friendCard: PropTypes.shape({
        id: PropTypes.number.isRequired,
        primaryImageUrl: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        headline: PropTypes.string.isRequired        
    })
};

export default React.memo(FriendCard);