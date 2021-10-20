import { firebaseApp } from "../options/firebase";
import { getAuth, createUserWithEmailAndPassword ,signInWithEmailAndPassword} from "firebase/auth";

const auth = getAuth(firebaseApp);

export const getUserFireBase = async (email, password)=>{

    let data={};

    const promise = createUserWithEmailAndPassword(auth, email, password);
    try {
    
         data = await promise.then((userCredential) => {
            // Signed in 
            return {user : userCredential.user, errorCode:0};
            // ...
        }).catch((error) => {
            //console.log("catch bitti");
            return {   errorCode : error.code
                ,errorMessage : error.message};
            // ..
        });        

    } catch (error) {
        data={errorCode : error.code}
        console.log("error bitti");
    } 

    return data;
}

export const signInWithEmail = async (email, password)=>{
    
    const promise = signInWithEmailAndPassword(auth, email, password)

    return await promise.then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        //console.log("user *>", user);
        return {user : user, errorCode:0};
        // ...
    })
    .catch((error) => {
        return {   errorCode : error.code
            ,errorMessage : error.message};
    });
}