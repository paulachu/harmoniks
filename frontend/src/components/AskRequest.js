import React, { useState } from 'react';
import InputTags from './InputTags';

const AskRequest = () => {
    const [tags, setTags] = useState([]);
    return (
        <div className="container-request">   
            <div className="wrapper-1">
                <div className="content-name"> 
                    <h2>Need help ?</h2>
                </div>
                <div className="content-title">
                    <input
                            placeholder="Enter your title"
                            type="text"
                            className="box-container"
                            required>
                    </input>
                </div>
                <div className="content-comp">
                    <label>
                            I am looking for : 
                    </label>
                    <InputTags
                        tags={tags}
                        setTags={setTags}
                        limitedToSuggestions={false}
                        max={2}/>
                </div>
                <div className="content-desc">
                    <h4 className="content-desc-1"> Description :</h4>
                    <textarea placeholder="Detailes your request"
                        rows="3" cols="3" maxlength="500" className="text-container">
                    </textarea>
                </div>
                <div className="content-add">
                    <button className="button-submit">Send</button>
                </div>
            </div>
        </div>
    );
};

export default AskRequest;