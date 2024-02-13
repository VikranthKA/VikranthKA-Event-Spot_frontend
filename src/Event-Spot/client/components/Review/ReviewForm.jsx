import React, { useState } from 'react';
import ReactStarsRating from 'react-awesome-stars-rating';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch } from 'react-redux';
import { startCreateEvent, startCreateReview, startUpdateReview } from '../../react-redux/action/eventAction';

function ReviewForm(eventId,updatingReview=null,reviewId=null) {
    const [reviewData, setReviewData] = useState({
      title: updatingReview ? updatingReview.title : '',
      body: updatingReview ? updatingReview.body : '',
      rating: updatingReview ? updatingReview.rating : 0,
    })
const dispatch = useDispatch()
  const handleReviewChange = (value, name) => {
    setReviewData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
if(reviewId && eventId){
  dispatch(startUpdateReview(eventId,reviewId,reviewData))

} else{
  dispatch(startCreateReview(eventId,reviewData))
}
 };

  return (
    <div>
      <Form onSubmit={handleReviewSubmit}>
        <FormGroup>
          <Label for="title">Title</Label>
          <Input
            type="text"
            id="title"
            placeholder="Enter title"
            value={reviewData.title}
            onChange={(e) => handleReviewChange(e.target.value, 'title')}
          />
        </FormGroup>
        <FormGroup>
          <Label for="body">Body</Label>
          <Input
            type="textarea"
            id="body"
            placeholder="Enter review body"
            value={reviewData.body}
            onChange={(e) => handleReviewChange(e.target.value, 'body')}
          />
        </FormGroup>
        <FormGroup>
          <Label for="rating">Rating</Label>
          <ReactStarsRating
            value={reviewData.rating}
            count={5}
            onChange={(value) => handleReviewChange(value, 'rating')}
            size={30}
            isHalf={true}
          />
        </FormGroup>
        <Button color="primary" type="submit">
          Submit
        </Button>
      </Form>
      <div>
      </div>
    </div>
  );
}

export default ReviewForm