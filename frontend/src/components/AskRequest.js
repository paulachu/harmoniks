import { inject, observer } from 'mobx-react';
import React, { useState } from 'react';
import compose from 'recompose/compose';
import InputTags from './InputTags';

const AskRequest = ({user, handleNewRequest}) => {
    const [Title, setTitle] = useState("");
    const [Description, setDescription] = useState("");
    const [tags, setTags] = useState([]);

    const handleSubmit = () => {
        const tag_res = [];
        tags.forEach((tag) => tag_res.push(tag.tags));
        const data = {
            "title" : Title,
            "description": Description,
            "skills": tag_res
        };
        user.postRequest(data).then(res => {
            handleNewRequest(res)
        });
    }

    return (
        <div className="container-request">
            <div className="wrapper-1">
                <div className="content-name">
                    <h2>Need help ?</h2>
                </div>
                <div className="content-title">
                    <input
                            value={Title}
                            onChange={(e) => setTitle(e.target.value)}
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
                        rows="3" cols="3" maxlength="500" className="text-container"
                        value={Description}
                        onChange={(e) => setDescription(e.target.value)}>
                    </textarea>
                </div>
                <div className="content-add">
                    <button className="button-submit" onClick={handleSubmit}>Send</button>
                </div>
            </div>
        </div>
    );
};

export default compose(inject("user"), observer) (AskRequest);