import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActions } from '@mui/material';
import Card from '@mui/material/Card';
import React from 'react';

interface MentorCardProps {
    id: string;
    name: string;
    email: string;
    skills: string[];
}

const MentorCard: React.FC<MentorCardProps> = ({ id, name, email, skills }) => {
    return (
        <Card className="card" sx={{ minWidth: 275 }}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} gutterBottom>
                    {name}
                </Typography>
                <Typography sx={{ fontSize: 14 }} gutterBottom>
                    {email}
                </Typography>
                <Typography sx={{ mb: 1.5 }}>{skills.join(', ')}</Typography>
            </CardContent>
        </Card>
    );
};

export default MentorCard;
