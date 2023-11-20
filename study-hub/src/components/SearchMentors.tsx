import React, {FormEvent, useEffect, useState} from "react";
import './SearchMentors.css';
import Autocomplete from "@mui/material/Autocomplete";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import {database} from "../firebaseConfig";
import {Mentor} from "./MentorsList";
import MentorCard from "./MentorCard";

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
    const [matchingMentors, setMatchingMentors] = useState<Mentor[]>([]);
    const [autocompleteKey, setAutocompleteKey] = useState<number>(0);

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
        const newMatchingMentors: Mentor[] = [];
        mentors.forEach((m) => {
            let count = 0;

            selectedSkills.forEach((s) => {
                if (m.skills.includes(s)) {
                    count++;
                }
            });

            console.log("percentage", (count / selectedSkills.length) * 100);
            console.log("count", count);
            console.log("selected skills", selectedSkills.length);

            if (((count / selectedSkills.length) * 100) >= 50) {
                newMatchingMentors.push(m);
            }
        });
        setMatchingMentors(newMatchingMentors);
        console.log("matching mentors:", newMatchingMentors);
    };


    return (
        <div className="body-search">
            <form className="form-search" onSubmit={handleSearchClick}>
                <div className="title">Search for Mentors</div>
                <div>
                    <label>Skills you are looking for:</label>
                    <Autocomplete
                        key={autocompleteKey} // Update key to force re-render
                        multiple
                        id="fixed-tags-demo"
                        value={selectedSkills}
                        onChange={(_, newValue) => {
                            setSelectedSkills(newValue);
                            setAutocompleteKey((prevKey) => prevKey + 1); // Increment key
                        }}
                        options={skills.sort()}
                        renderTags={(tagValue, getTagProps) =>
                            tagValue.map((option, index) => (
                                <Chip label={option} {...getTagProps({ index })} />
                            ))
                        }
                        style={{ backgroundColor: "white" }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </div>
                <button type="submit">Search</button>

                <div className="matching-mentors">
                    <h2>Matching Mentors:</h2>
                    {matchingMentors.length > 0 ? (
                        <div className="mentors-list">

                            {matchingMentors.map((mentor) => (
                                <MentorCard
                                    key={mentor.id}
                                    id={mentor.id}
                                    name={mentor.name}
                                    email={mentor.email}
                                    skills={mentor.skills}
                                />
                            ))}
                        </div>
                    ) : (
                        <h3>No mentors matched your criteria.</h3>
                    )}
                </div>
            </form>
        </div>
    );
};

export default SearchMentors;
