import React, {useState, useEffect} from "react";
import styled from "styled-components";
import axios from "axios";
import validUrl from "valid-url"


const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.8rem;

 
`

const Form = styled.div`
    border: 1px solid #2d2d2d;
    border-radius: 5px;
    width: 500px;
    height: 200px;
    margin: 0 auto;
    padding: 5px;

    form
    {
        width: 100%;
        text-align:center;

     
        label
        {
            display: inline-block;
            margin-top: 5px;
        }
        .text
        {
           margin-top: 30px; 
           font-size: 0.8rem;
        }

        .button{
            margin-top: 15px;
        }
    }
`




const ShortenUrl = () => {

    const [url, setUrl] = new useState({
        value: "",
        valid: false
    });
    const [notifier, setNotifier] = new useState("");

    useEffect(() => {

        if(url.value.length > 0){
            if(validUrl.isUri(url.value)){
                //validation successfull
                setUrl(prevObject => {
                    return {...prevObject, valid: true}
                })
                //reset
                setNotifier("");
            }else{
            //validation failed
            setUrl(prevObject => {
                return {...prevObject,valid: false}
            })
            setNotifier("Invalid URL. e.g http://www.facebook.com")  
            }
        }else{
            //reset error
            setNotifier("");
        }
    
    }, [url.value])

    //text input handler
    const inputHandler = (e) =>{
        let value = e.target.value;

        setUrl(prevObject => {
            return {...prevObject, value}
        })
 
    }

    //handle submit action
    const submitHandler = async () =>{
      

        //make request to short-url api
        if(url.valid){
            await axios.post('/short-url', {
                longUrl: url.value,
              })
              .then(function (response) {
               
                setNotifier("http://localhost:3000/" + response.data.shortUrl)
              })
              .catch(function (error) {
                setNotifier(error.message);
              });
        }else{
            setNotifier("Invalid URL. e.g http://www.facebook.com")  
        }
    }

    return (
        <>
            <Container>
                <Form>
                <form>  
                    <label>Welcome! To begin enter long URl, new or existing to get short URI </label>
                    <br/>
                    <label>e.g http://www.abc.com</label>
                    <br/>  
                    <input className="text" type="text" value={url.value} onChange={inputHandler}/>
                    <br/>
                    <label>{notifier}</label>
                    <br/>
                    <button className="button" type="button" onClick={submitHandler}>Submit</button>
                </form>           
                </Form>
            </Container>
       </>
    )


}

export default ShortenUrl;