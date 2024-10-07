import { createContext , useContext, useState, useEffect} from "react";
import {initializeApp} from "firebase/app";
import {getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,GoogleAuthProvider,signInWithPopup,onAuthStateChanged} from 'firebase/auth'
import {getFirestore,collection,addDoc,getDocs, doc, getDoc,query,where} from "firebase/firestore";
import {getStorage,ref,uploadBytes,getDownloadURL} from 'firebase/storage'

const FirebaseContext = createContext(null);




const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
  };


const app = initializeApp(firebaseConfig);

export const useFirebase = () => useContext(FirebaseContext);

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();
const firestore = getFirestore(firebaseApp)
const storage = getStorage(firebaseApp)


export const FirebaseProvider = (props) => {

    const signupUserWithEmailAndPassword = (email,password) => {
        createUserWithEmailAndPassword(firebaseAuth,email,password);
    }

    const signinUserWithEmailAndPassword =(email,password) =>{
        signInWithEmailAndPassword(firebaseAuth,email,password)
    }

    const signWithGoogle = () => {
        signInWithPopup(firebaseAuth,googleProvider)
    }

    useEffect(() => {
        onAuthStateChanged(firebaseAuth, user => {
            if(user) setUser(user);
            else setUser(null)
        })
    },[])

    const [user,setUser] = useState(null)

    const getOrders = async(bookId)=>{
        const collectionRef = collection(firestore,'books',bookId,'orders')
        const result = await getDocs(collectionRef)
        return result
    }

    const isloggedIn = user ? true : false

    console.log(user)

    const handleCreateNewListing = async (name,isbn,price,coverPic)=>{
        const imageRef = ref(storage,`uplaods/images/${Date.now()}-${coverPic.name}`)
        const uploadResult = await uploadBytes(imageRef,coverPic)
        return await addDoc(collection(firestore,'books'),{name,
            isbn,
            price,
            imageURL : uploadResult.ref.fullPath,
            userID : user.uid,
            userEmail:user.email,
            displayname:user.displayName ,
            photoURL:user.photoURL || ''
        })
    }

    const listAllBooks =()=> {
        return getDocs(collection(firestore,'books'))
    }

    const getImageURL = (path) => {
        return getDownloadURL(ref(storage,path))
    }

    const getBookById =async(id)=>{
        const docRef = doc(firestore,'books',id)
        const result = await getDoc(docRef)
        return result
    }
    const placeOrder =async(bookId)=>{
        const collectionRef = collection(firestore,"books",bookId,"orders")
        const result = await addDoc(collectionRef,{
            displayName : user.displayName,
            userId :user.uid,
            userEmail :user.email,
            photoURL:user.photoURL,
        })
        return result
    }
    const fetchMyBooks=async(userId)=>{

        
        const collectionRef = collection(firestore,"books")
        const q = query(collectionRef, where("userID",'==',userId))
        const result =await getDocs(q)
        return result
    }



    return(
        <FirebaseContext.Provider value={{signupUserWithEmailAndPassword,signinUserWithEmailAndPassword,signWithGoogle,isloggedIn,handleCreateNewListing,listAllBooks,getImageURL,getBookById,placeOrder,fetchMyBooks,user,getOrders}}>
            {props.children}        
        </FirebaseContext.Provider>
    )
};