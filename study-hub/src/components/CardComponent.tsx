import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {Button, CardActions} from "@mui/material";
import Card from "@mui/material/Card";
import * as React from "react";
import './ViewResources.css';

interface CardComponentProps {
    id: string;
    title: string;
    description: string;
    file: string; // Assuming this is the file URL
}

const CardComponent: React.FC<CardComponentProps> = ({id, title, description, file}) => {
    return (
        <Card className="card" sx={{minWidth: 275}}>
            <CardContent>
                <Typography sx={{fontSize: 14}} gutterBottom>
                    {title}
                </Typography>
                <Typography sx={{mb: 1.5}}>{description}</Typography>
            </CardContent>
            <CardActions className="button">
                <Button size="small" href={file} target="_blank" rel="noopener noreferrer">
                    See file
                </Button>
            </CardActions>
        </Card>
    );
};

export default CardComponent;
