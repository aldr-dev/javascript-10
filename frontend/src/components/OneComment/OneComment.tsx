import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react';

interface Props {
  author: string;
  content: string;
  onDelete: () => void;
}

const OneComment: React.FC<Props> = ({author, content, onDelete}) => {
  return (
    <Card sx={{mb: '15px'}}>
      <CardContent>
        <Typography gutterBottom variant="h4" component="div">
          {author}
        </Typography>
        <Typography variant="h6" component="div">
          {content}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          onClick={onDelete}
          variant="outlined"
          startIcon={<DeleteIcon/>}>Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default OneComment;
