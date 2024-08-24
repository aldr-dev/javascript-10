import {
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material';
import React from 'react';
import {LoadingButton} from '@mui/lab';
import {useAppSelector} from '../../app/hooks';
import {selectDeleteCommentsIsLoading} from '../../store/comments/commentsSlice';
import DeleteIcon from '@mui/icons-material/Delete';

interface Props {
  id: string;
  author: string;
  content: string;
  onDelete: () => void;
}

const OneComment: React.FC<Props> = ({id,author, content, onDelete}) => {
  const deleteCommentIsLoading = useAppSelector(selectDeleteCommentsIsLoading);

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
        <LoadingButton
          onClick={onDelete}
          sx={{mt: 2}}
          color="primary"
          type="submit"
          loading={deleteCommentIsLoading ? deleteCommentIsLoading === id.toString() : false}
          loadingPosition="start"
          startIcon={<DeleteIcon/>}
          variant="contained">
          <span>Удалить</span>
        </LoadingButton>
      </CardActions>
    </Card>
  );
};

export default OneComment;
