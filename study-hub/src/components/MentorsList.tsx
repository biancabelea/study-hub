import React, { useEffect, useState } from 'react';
import MentorCard from './MentorCard';
import { database } from '../firebaseConfig';
import './MentorsList.css';
import logo from "../imgs/img.png";

export interface Mentor {
    id: string;
    name: string;
    email: string;
    skills: string[];
}

function MentorsList() {
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

    return (
        <>
            <img className="logo" src={logo} alt="logo"></img>
            <div className="mentors-title">Mentors List</div>
            <div className="mentors-list">
            <div className="mentors-cards" style={{ display: 'flex', flexDirection: 'row', alignContent: 'flex-start' }}>
                {mentors.map((mentor) => (
                    <MentorCard key={mentor.id} id={mentor.id} name={mentor.name} email={mentor.email} skills={mentor.skills} />
                ))}
            </div>
        </div>
            </>
    );
}

export default MentorsList;
