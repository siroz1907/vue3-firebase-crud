import { firebaseApp } from "../options/firebase";
import { ref, onUnmounted } from 'vue';//
//import firestore from 'firebase/firestore';

import { getFirestore, collection, addDoc, query, where, getDocs, onSnapshot } from 'firebase/firestore';//doc,getDocs



const db = getFirestore(firebaseApp);

const personCollection = collection(db, 'kisi');
const paymentCollection = collection(db, 'odemeler');


export const createPerson = person => {
    //console.log("add", kisiCollection);

    return addDoc(personCollection, person);
}


export const getPerson = async (id) => {
    const person = ref([]);

    /*
    const docRef =  doc(db, "person", "41a1H8lu2YvW1Oq5MpFo");
    const docSnap = await getDoc(docRef);
    person.value = docSnap.exists() ? docSnap.data():null;
    */

    const q = query(personCollection, where("id", "==", parseInt(id)));
    const qSnap = await getDocs(q);
    //console.log(" -> qSnap", qSnap)

    qSnap.forEach((doc, ind) => {
        person.value = doc.data();
        //console.log("foreach ->", doc.data(), id)
        if (ind > 0)
            return;
    });

    //console.log("getPerson :", person);

    return person;
}

export const updatePerson = (id, person) => {
    return personCollection.doc(id).update(person);
}


export const deletePerson = id => {
    return personCollection.doc(id).delete;
}

export const getAllPerson = async () => {
    const person = ref([]);
    let close;



    const promise = new Promise((response, reject) => {

        close = onSnapshot(personCollection
            , (snap) => {
                //console.log('SNAP', snap);

                const value = snap.docs.map((doc) => ({ ...doc.data() }));
                /*
                person.value = snap.docs.map((doc)=>{
                        
                        //console.log('MAP',doc.data());
                        const res = (doc.data().adi == undefined ? null:doc.data());
                        //console.log('RES',res);
                        return{...res}
                    }                                
                );
                */

                //console.log('getAllPerson', value);

                response(value);
            }
            , (error) => {
                reject(error);
            });
    });

    person.value = await promise;
    onUnmounted(close);

    return person;
}

export const getPersonPayments = async (id) => {
    const personDetail = ref([]);

    const q = query(personCollection, where("id", "==", parseInt(id)));
    const q2 = query(paymentCollection, where("id", "==", parseInt(id)));

    const info = getDocs(q);
    const payments = getDocs(q2);
    
    personDetail.value = await Promise.all([info, payments]).then((values)=>{
        let data1={};
        let data2=[];
        //let ind2 = 1;

        values[0].forEach((doc)=>{
            //console.log("doc ind1 ->", doc.data());
            data1 = doc.data();
            return;
        })
        
        values[1].forEach((doc2) => {
            //console.log("doc 2 ind2 ->", doc2.data(), ind2);
            //data2 = new Array(ind2);
            //data2[ind2-1] = doc2.data();
            data2.push( doc2.data());

            //console.log("doc 2 ind2 ->", data2[ind2-1], ind2);
            //ind2++;
        });
        
        //console.log("data2 ind2 ->", data2, ind2);

        return {info:data1, payments:data2};
    });

    //console.log("bitti");
    //console.log("kisiDetay",kisiDetay);
    return personDetail;
}