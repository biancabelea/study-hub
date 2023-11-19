    import React, {FormEvent, useEffect, useState} from "react";
    import './SearchMentors.css';
    import Autocomplete from "@mui/material/Autocomplete";
    import Chip from "@mui/material/Chip";
    import TextField from "@mui/material/TextField";
    import {database} from "../firebaseConfig";
    import { Mentor } from "./MentorsList";
    import logo from "../imgs/img.png";

    const skills = [
        'React',
        'NodeJS',
        '.NET',
        'Java',
        'Python',
        'C++',
        'JavaScript',
        'Ruby',
        'Swift',
        'HTML',
        'CSS',
        'Angular',
        'Vue',
        'Django',
        'REST API',
        'Kotlin',
        'Git',
        'Agile',
        'SQL',
        'NoSQL',
        'Docker',
        'Data structures',
        'Cybersecurity',
        'Networking',
        'Unit testing',
        'Physics',
        'Computer programming',
        'OOP',
        'Mechanics',
        'Statistics',
        'Digital logic',
    ];

function SearchMentors() {
    const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
    const [mentors, setMentors] = useState<Mentor[]>([]);

        useEffect(() => {
            const fetchMentors = async () => {
                try {
                    const snapshot = await database.collection('users').where('userRole', '==', 'Mentor').get();
                    const fetchedMentors: Mentor[] = [];

                    snapshot.forEach((doc) => {
                        const data = doc.data();
                        fetchedMentors.push({
                            id: doc.id,
                            name: data.userName,
                            email: data.userEmail,
                            skills: data.userSkills
                        });
                    });
                    console.log("Fetched mentors", fetchedMentors)
                    setMentors(fetchedMentors);
                } catch (error) {
                    console.error('Error fetching mentors:', error);
                }
            };

        fetchMentors();
    }, []);
    const handleSearchClick = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('Searching for mentors with skills:', selectedSkills);
        let matchingMentors:any[] = [];
        mentors.forEach( m => {
            var count = 0;
            selectedSkills.forEach( s => {

            if (m.skills.includes(s)) {
                count++;
            }

          
            });
            console.log("percentage", (count / selectedSkills.length) * 100);
        console.log("count", count);
        console.log("selected skills", selectedSkills.length)
            if (((count / selectedSkills.length) * 100) >= 50) {
                matchingMentors = [...matchingMentors, m];

            }
        });
        console.log("matching mentors:", matchingMentors);
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
                options={skills.sort()}
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
