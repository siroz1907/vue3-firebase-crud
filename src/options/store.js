import { createStore } from 'vuex';

import { getAllPerson,  getPersonPayments } from '../services/app_manage';


//{{ $store.state.title }}
const state ={
    persons:[],
    title:'Title',
    personDetail:{
        personId:0
        ,info:{}
        ,payments:[]
        ,totalPay:0
    },
    isLogin:false
};    

const getters ={

    getIsLogin(state){
        return state.isLogin;
    },
    gettersPersons(state){
        return state.persons;
    },

    getGroupPersons(state){
        const group = [];

        
        state.persons.forEach((el, ind) => {
            if(ind % 2=== 0){
                //console.log("ssss");
                group.push([]);
            }
            group[group.length-1].push(el);
        });

        return group;
    },
    getPersonDetail(state){
        //console.log(state.personDetail);
        return state.personDetail;
    }
};

//mutation lar senk olmalı genelde, datalar direkt ekrana basılıyor
const mutations ={

    setpersons(state, persons){
        state.persons = persons;
        //console.log('setpersons', persons);
    },

    setPersonDetail(state, data){
        const {personId, info , payments } = data;

        //console.log("mutations -setPersonDetail ",  info, payments, personId)//personId, PersonDetailData, data,
        //console.log("mutations -setPersonDetail ",  payments)//personId, PersonDetailData, data,
        let sum=0;

        payments.forEach((el)=>{
            sum+=el.tutar;
        })

        //console.log("info", info);
        //console.log("tutar", payments[0].tutar);

        state.personDetail = {personId:personId, info:info, payments:payments, totalPay: sum} ;
    },
    setSetIsLogin(state, val){
        console.log("setSetIsLogin ->", val);
        state.isLogin = val;
    }
};

//action lar asyc olmalı genelde
const actions = {
    getPersons(context){       
        
        return getAllPerson().then((snapshot)=>{

            //console.log("getpersons", snapshot.value)  
            context.commit('setpersons', snapshot);  
        })   
    },
    getPersonDetail(context, personId){

        return getPersonPayments(personId).then((snapshot)=>{
            
            
            
            //console.log("getPersonDetail", snapshot.value);
            context.commit("setPersonDetail", 
                {
                    personId : personId
                    , info : snapshot.value.info
                    , payments : snapshot.value.payments
            });
        });
    },

    actionGetPersonPayment(context, personId){
        return getPersonPayments(personId).then((snapshot)=>{
            console.log(snapshot);
        })
    },
    actionSetIsLogin(context, val){
        
        //console.log("actionSetIsLogin ->", val);
        
        return context.commit('setSetIsLogin', val);
    }

};

const store = createStore({
    state,
    getters,
    mutations,
    actions
});


export default store;