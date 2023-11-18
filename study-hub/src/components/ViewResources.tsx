import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import './ViewResources.css';

function ViewResources() {
    const cardData = [
        {
            title: 'Card 1',
            image: '../imgs/img.png',
            description: 'Description for card 1...',
        },
        {
            title: 'Card 2',
            image: '/static/images/cards/contemplative-reptile.jpg',
            description: 'Description for card 2...',
        },
        // Add more card data as needed
    ];

    return (
        <div className="resources-page">
            <div className="resources-title">Find resources</div>
            <div className="body-cards">
                {cardData.map((card, index) => (
                    <Card className="card" key={index} sx={{ minWidth: 275 }}>
                        <CardContent>
                            <Typography sx={{ fontSize: 14 }} gutterBottom>
                                {card.title}
                            </Typography>
                            <Typography sx={{ mb: 1.5 }}>{card.description}</Typography>
                        </CardContent>
                        <CardActions className="button">
                            <Button size="small">See file</Button>
                        </CardActions>
                    </Card>
                ))}
            </div>
        </div>
    );
}

export default ViewResources;
