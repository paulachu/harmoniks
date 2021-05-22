import React, {useEffect, useState} from "react";
import { WithContext as ReactTags } from "react-tag-input";
import axios from "axios";


const KeyCodes = {
    comma: 188,
    enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];


const InputTags = ({ tags, setTags, limitedToSuggestions, max = 10}) => {
    const createSuggestion = (id, tags) => {
        return { id, tags };
    };
    const [loaded, setLoaded] = useState(false);
    const [suggestions,setSuggestions] = useState([
        createSuggestion("1", "NodeJS"),
        createSuggestion("2", "React"),
        createSuggestion("3", "Python"),
        createSuggestion("4", "Cooking"),
        createSuggestion("5", "UXDesign"),
        createSuggestion("6", "Commerce"),
    ]);

    useEffect(() => {
        if (!loaded) {
            axios.get(process.env.REACT_APP_URI + "/skills").then(res => {
                if (res.data)
                    setSuggestions(res.data.slice());
                setLoaded(true);
            }).catch(err => {
                console.log(err);
            })
        }
    },[loaded]);

    const handleDelete = (i) => {
        setTags(tags.filter((tag, index) => index !== i));
    };
    const handleAddition = (elt) => {
        if (!limitedToSuggestions 
            || suggestions.findIndex(e => e.tags === elt.tags) !== -1)
            if (max > tags.length)
                setTags([...tags, elt]);
    };

    const handleDrag = (tag, currPos, newPos) => {
        const newTags = tags.slice();
        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);
        setTags(newTags);
    };
    return (
        <ReactTags
            tags={tags}
            labelField={"tags"}
            suggestions={suggestions}
            handleDelete={handleDelete}
            handleAddition={handleAddition}
            handleDrag={handleDrag}
            delimiters={delimiters}
            autocomplete={true}
            inputFieldPosition="bottom"
        />
    );
};

export default InputTags;
