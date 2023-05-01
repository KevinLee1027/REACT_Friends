import React, {useState, useEffect} from "react";
import {addFriend, editFriend} from "../../services/peopleService";
import toastr from "toastr";
import { useLocation } from "react-router-dom";

function New() {

    const [state, setState] = useState({
        id:"",
        title: "",
        bio: "",
        summary: "",
        headline: "",
        slug: "",
        statusId: "",
        primaryImage: ""
    });
    const[header, setHeader] = useState(false);

    const location = useLocation();
    console.log(location);
    useEffect(() => {
        if (!!location?.state?.payload.id) {
            setHeader(!header);
            setState((prevState) => {
              const newObject = { ...prevState };
              newObject.title = location.state.payload.title;
              newObject.bio = location.state.payload.bio;
              newObject.summary = location.state.payload.summary;
              newObject.headline = location.state.payload.headline;
              newObject.slug = location.state.payload.slug;
              newObject.statusId = location.state.payload.statusId;
              newObject.id = location.state.payload.id;
              newObject.primaryImage = location.state.payload.primaryImage.imageUrl;
              return newObject;
            });
          }
        }, []);
      

    const onFormFieldChange = event =>{
        console.log("onChange", { syntheticEvent: event });
        
        const target = event.target;
        const value = target.value;
        const name = target.name;
    
        setState((prevState) => {
            console.log("updater onChange");
    
            const updatedFormData = {
                ...prevState,
            };
    
            updatedFormData[name] = value;
    
            return updatedFormData;
        });
    
        console.log("end onChange");
    };
    
    
    const onFormClick = () => {

        const payload = state;
        if(state.id){
            editFriend(payload).then(onEditSuccess).catch(onEditError);
        }
        else{
            addFriend(payload).then(onLoginSuccess).catch(onLoginError);
        }        
    
    };

    
    const onLoginSuccess = (response) => {
    
        toastr.success("Add Success");
        console.log(response);
        state.id = response.data.item;
   
    };
    
    const onLoginError = (response) => {
    
        toastr.error("Please complete all fields completely", "Add Fail");
        console.log(response);
    
    };
    const onEditSuccess = (response) => {
    
        toastr.success("Edit Success");
        console.log(response);
    };
    const onEditError = (response) => {
    
        toastr.error("Please complete all fields completely", "Edit Fail");
        console.log(response);    
    };

 
    return(
    <React.Fragment>
        <div className="container">
            <div className="row pt-5">                
                <h1>{header? "Edit" : "Add"}</h1>                
                <div className="col-6">
                    <form>
                        <div className="form-group pt-3">
                            <label htmlFor="exampleInputFirstName">Title</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="title" 
                                 name="title"
                                placeholder="Title"
                                value={state.title}
                                onChange={onFormFieldChange} 
                            
                            />
                        </div>     
                         <div className="form-group pt-3">
                            <label htmlFor="exampleInputLastName">Bio</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="bio" 
                                name="bio"
                                placeholder="Bio"
                                value={state.bio}
                                onChange={onFormFieldChange} 
                      
                            />
                        </div>
                        <div className="form-group pt-3">
                            <label htmlFor="exampleInputEmail1">Summary</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="summary" 
                                name="summary"                            
                                placeholder="Summary"
                                value={state.summary}
                                onChange={onFormFieldChange} 
                             
                            />
                        </div>
                        <div className="form-group pt-3">
                            <label htmlFor="exampleInputPassword">Headline</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="headline"
                                name="headline"                                     
                                placeholder="Headline"
                                value={state.headline}
                                onChange={onFormFieldChange} 
                          
                            />
                        </div>
                        <div className="form-group pt-3">
                            <label htmlFor="exampleInputConfirmPassword">Slug</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="slug" 
                                name="slug"
                                placeholder="Slug"
                                value={state.slug}
                                onChange={onFormFieldChange} 
                     
                            />
                        </div>
                        <div className="form-group pt-3">
                            <label htmlFor="exampleInputProfileUrl">Status Id</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="statusId"  
                                name="statusId"
                                placeholder="StatusId"
                                value={state.statusId}
                                onChange={onFormFieldChange} 
                       
                            />
                        </div> 
                        <div className="form-group pt-3">
                            <label htmlFor="exampleInputProfileUrl">Primary Image</label>
                            <input 
                                type="url" 
                                className="form-control" 
                                id="primaryImage"  
                                name="primaryImage"
                                placeholder="Provide a Url to a Image"
                                value={state.primaryImage}
                                onChange={onFormFieldChange} 
                       
                            />
                        </div>                    
                        <button onClick={onFormClick} type="button" className="btn btn-primary mt-3" id="addBtn">Submit</button>                       
                     </form>
                </div>          
            </div>
        </div>
    </React.Fragment>
    );
  
}

export default New;

