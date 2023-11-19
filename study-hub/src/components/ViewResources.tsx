    import React, { useEffect, useState } from 'react';
    import CardComponent from './CardComponent';
    import { database, storage } from '../firebaseConfig';
    import {useNavigate} from 'react-router-dom';
    import logo from "../imgs/img.png";

    interface Resource {
        id: string;
        title: string;
        description: string;
        filesUrl: string;
        downloadURL: string;
    }

    function ViewResources() {
        const [cardData, setCardData] = useState<Resource[]>([]);

        const navigate = useNavigate();
        const NavigateAdd = () => {
            navigate('/add-resource');
        }

        useEffect(() => {
            const fetchData = async () => {
                try {
                    const snapshot = await database.collection('resources').get();
                    const fetchedData: Resource[] = [];

                    snapshot.forEach((doc) => {
                        const data = doc.data();
                        fetchedData.push({
                            id: doc.id,
                            title: data.title,
                            description: data.description,
                            filesUrl: data.filesUrl,
                            downloadURL: '',
                        });
                    });

                    const dataWithUrls = await Promise.all(
                        fetchedData.map(async (resource) => {
                            if (resource.filesUrl) {
                                const downloadURL = await storage.refFromURL(resource.filesUrl).getDownloadURL();
                                return { ...resource, downloadURL };
                            }
                            return resource;
                        })
                    );
                    console.log('Card data length:', dataWithUrls.length);
                    setCardData(dataWithUrls);
                } catch (error) {
                console.error('Error fetching data:', error);
                }
            };

            fetchData(); // Call the async function directly

        }, []); // Run this effect only once when the component mounts

        return (
            <>
                <img className="logo" src={logo} alt="logo"></img>
                <div className="resources-title">Explore resources</div>
                <div className="resources-page">
                <div className="body-cards" style={{ display: 'flex', flexDirection: 'row', alignContent:'flex-start' }}>
                    {cardData.map((card) => (

                        <CardComponent key={card.id} id={card.id} title={card.title} description={card.description} file={card.downloadURL} />
                    ))}
                    <button onClick={NavigateAdd} className="add-button">+</button>
                </div>
                </div>
            </>
        );

    }

    export default ViewResources;
