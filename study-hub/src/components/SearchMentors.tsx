import React, {FormEvent, useState} from "react";
import './SearchMentors.css';
import Autocomplete from "@mui/material/Autocomplete";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";

const skills = [
    'React',
    'Node',
    '.NET'
];

function SearchMentors() {
    const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

    const handleSearchClick = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Previne reîncărcarea paginii la submit
        // Aici ar fi logica de căutare pe baza skill-urilor selectate
        console.log('Searching for mentors with skills:', selectedSkills);
        // Implementează interogarea serverului sau filtrarea locală aici
    };


    return (
        <div className="body-search">
        <form className="form-search" onSubmit={handleSearchClick}>
            <div className="title">Search for Mentors</div>
            <div>
            <label>Skills you are looking for:</label>
            <Autocomplete
                multiple
                id="fixed-tags-demo"
                value={selectedSkills}
                onChange={(event, newValue) => {
                    setSelectedSkills(newValue);
                }}
                options={skills}
                renderTags={(tagValue, getTagProps) =>
                    tagValue.map((option, index) => (
                        <Chip
                            label={option}
                            {...getTagProps({ index })}
                        />
                    ))
                }
                style={{ backgroundColor: 'white' }}
                renderInput={(params) => (
                    <TextField {...params}/>
                )}
            />
            </div>
            <button type="submit">Search</button>
        </form>
        </div>
    );
};

export default SearchMentors;