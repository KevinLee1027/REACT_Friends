import React, {useState } from "react";
import {userRegister} from "../../services/registerService";
import toastr from "toastr";

function Register() {

    const [state, setState] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirm: "",
        avatarUrl: "",
        tenantId: "U0498QG2M17"
    });

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
    
        userRegister(payload).then(onRegisterSuccess).catch(onRegisterError);
    
    };
    
    const onRegisterSuccess = (response) => {
    
        toastr.success("Register Success");
        console.log(response);
    };
    
    const onRegisterError = (response) => {
    
        toastr.error("Please complete all fields completely", "Register Fail");
        console.log(response);
    
    };

    return(
        <React.Fragment>
            <div class="container">
                <div class="row pt-3">                    
                    <h1>Register</h1>                    
                    <div class="col-6">
                        <form>
                            <div class="form-group pt-5">
                                <label for="exampleInputFirstName">First Name</label>
                                <input 
                                    type="firstName" 
                                    class="form-control" 
                                    id="firstName" 
                                    name="firstName"
                                    placeholder="Enter Your First Name"
                                    value={state.firstName}
                                    onChange={onFormFieldChange}
                                />
                            </div>     
                            <div class="form-group pt-3">
                                <label for="exampleInputLastName">Last Name</label>
                                <input 
                                    type="lastName" 
                                    class="form-control" 
                                    id="lastName" 
                                    name="lastName"
                                    placeholder="Enter Your Last Name"
                                    value={state.lastName}
                                    onChange={onFormFieldChange}
                                />
                            </div>
                            <div class="form-group pt-3">
                                <label for="exampleInputEmail1">Email address</label>
                                <input 
                                    type="email" 
                                    class="form-control" 
                                    id="email" 
                                    name="email"
                                    aria-describedby="emailHelp" 
                                    placeholder="Enter Your Email Address"
                                    value={state.email}
                                    onChange={onFormFieldChange}
                                />
                            </div>
                            <div class="form-group pt-3">
                                <label for="exampleInputPassword">Password</label>
                                <input 
                                    type="password" 
                                    class="form-control" 
                                    id="password"
                                    name="password"                                     
                                    placeholder="Enter Your Password"
                                    value={state.password}
                                    onChange={onFormFieldChange}
                                />
                            </div>
                            <div class="form-group pt-3">
                                <label for="exampleInputConfirmPassword">Confirm Password</label>
                                <input 
                                    type="password" 
                                    class="form-control" 
                                    id="passwordConfirm" 
                                    name="passwordConfirm"
                                    placeholder="Re-Enter your password"
                                    value={state.passwordConfirm}
                                    onChange={onFormFieldChange}
                                />
                            </div>
                            <div class="form-group pt-3">
                                <label for="exampleInputProfileUrl">Profile Url</label>
                                <input 
                                    type="avatarUrl" 
                                    class="form-control" 
                                    id="avatarUrl"  
                                    name="avatarUrl"
                                    placeholder="Provide a Url to a Image"
                                    value={state.avatarUrl}
                                    onChange={onFormFieldChange}
                                />
                            </div>                   
                            <button onClick={onFormClick} type="button" class="btn btn-primary mt-3" id="registerBtn">Register</button>
                        </form>
                    </div>
                  
                </div>
            </div>
        </React.Fragment>
    );
}

export default Register;