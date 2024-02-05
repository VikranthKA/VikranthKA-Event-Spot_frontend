import React, { useEffect, useState } from 'react';
import moment from 'moment';
import CountDown from '../Utils/CountDown/CountDown';
import { useParams,useNavigate } from 'react-router-dom';
import { Container, Carousel, Spinner, Row, Col, Card, ListGroup, Badge, Button,Form, CardText } from 'react-bootstrap';
import axios from '../Api_Resources/axios';
import { useDispatch, useSelector } from 'react-redux';
import { startGetEvents, startRaduisEvents } from '../../react-redux/action/eventAction';
import ReviewForm from '../Review/ReviewForm';
import EventCardsDisplay from './EventCardsDisplay';

// Import statements...

function EventInfo() {
  const { eventId } = useParams();
  const [event, setEvent] = useState('');
  const [reviewToggle, setReviewToggle] = useState(false);
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events);

  useEffect(() => {
    dispatch(startGetEvents());
    const eventData = events.find((ele) => ele._id === eventId);
    setEvent(eventData);
  }, [eventId]);

  function readableDate(inputDateString) {
    const momentObject = moment(inputDateString);
    return momentObject.format('LLLL');
  }

  const navigate = useNavigate();

  const handleBookTickets = () => {
    navigate(`/event-booking/${eventId}`);
  };

  return (
    <div>
    <Container className="my-5">
    {event ? (
        <Carousel style={{ height: "400px", width: "100%", margin: "auto" }}>
          {event.posters.map((poster) => (
            <Carousel.Item key={poster._id}>
              <img
                style={{ height: "400px", width: "100%", objectFit: "cover" }}
                className="d-block w-100"
                src={`${process.env.REACT_APP_IMAGE_URL}${poster.image}`}

                alt={poster.ClipName || poster.BrochureName}
              />
              <Carousel.Caption>
                <h3>{poster.ClipName || poster.BrochureName}</h3>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
          {event.youTube && (
            <Carousel.Item>
<iframe
            width="100%"
            height="400px"
            src={event.youTube.url}
            title="youTube-video-player"
            allowFullScreen
  ></iframe>              <Carousel.Caption>
                <h3>{event.youTube.title}</h3>
              </Carousel.Caption>
            </Carousel.Item>
          )}
        </Carousel>
      ) : (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
      <Row>
        <Col>
          <h2 className="my-3">{event?.title}</h2>
          <h5>Venue: {event?.venueName}</h5>
          <h5>Starts At: {readableDate(event?.eventStartDateTime)}</h5>
        </Col>
        <button onClick={handleBookTickets}>Book</button>

        {/* <Col>
          {event.ticketSaleStartTime && new Date(event.ticketSaleStartTime) > new Date() && event.remainingTickets >= 1 ? (
            <button onClick={handleBookTickets}>Book</button>
          ) : (
            <CountDown ticketSaleStartTime={event.ticketSaleStartTime} />
          )}
          {event.ticketSaleStartTime && new Date(event.ticketSaleEndTime) <= new Date() && <h4>Ticket Booking Closed</h4>}
        </Col> */}
      </Row>
      <Row className="my-4">
      </Row>
      <ListGroup as="ol" numbered className="my-4">
        <ListGroup.Item className="fw-bold">Reviews</ListGroup.Item>
{  event.reviews && event?.reviews.map((review) => (
          <ListGroup.Item key={review._id} as="li" className="d-flex justify-content-between align-items-start">
            <div className="ms-2 me-auto">
              <div className="fw-bold">{review.title}</div>
              {review.body}
            </div>
            <Badge bg="primary" pill>
              {review.rating}
            </Badge>
          </ListGroup.Item>
        ))}
        <div style={{ display: 'block' }}>
          {reviewToggle ? (
            <Button onClick={() => setReviewToggle(!reviewToggle)}>cancel</Button>
          ) : (
            <Button onClick={() => setReviewToggle(!reviewToggle)}>create</Button>
          )}
          <Button>Edit</Button>
          <Button>delete</Button>
        </div>
        {reviewToggle && <ReviewForm />}
      </ListGroup>
    </Container>
    <EventCardsDisplay />
    </div>
  );
}

export default EventInfo;

// function EventInfo() {
//   const {eventId} = useParams()
//   const [event,setEvent] = useState("")
//   const [reviewToggle,setReviewToggle] = useState(false)
//   const dispatch = useDispatch()
//   const events = useSelector((state)=>{
//     return state.events
//   })
//   useEffect(() => {
//     dispatch(startGetEvents())
//     const eventData= events.find(ele=>ele._id === eventId)
//     setEvent(eventData)
//     console.log(event,"event")
//   }, [eventId]);
//   // console.log(event.ticketSaleStartTime,"date")


//   function readableDate(inputDateString) {
//     const momentObject = moment(inputDateString);
//     return momentObject.format('LLLL');
//   }
//   const navigate = useNavigate()
  
//   const handleBookTickets = () => {
//     navigate(`/event-booking/${eventId}`)
//   };

//   return (
//     <div>
//     <Container className="my-5">
//       {event ? (
//         <Carousel style={{ height: "400px", width: "100%", margin: "auto" }}>
//           {event.posters.map((poster) => (
//             <Carousel.Item key={poster._id}>
//               <img
//                 style={{ height: "400px", width: "100%", objectFit: "cover" }}
//                 className="d-block w-100"
//                 src={`${process.env.REACT_APP_IMAGE_URL}${poster.image}`}

//                 alt={poster.ClipName || poster.BrochureName}
//               />
//               <Carousel.Caption>
//                 <h3>{poster.ClipName || poster.BrochureName}</h3>
//               </Carousel.Caption>
//             </Carousel.Item>
//           ))}
//           {event.youTube && (
//             <Carousel.Item>
// <iframe
//             width="100%"
//             height="400px"
//             src={event.youTube.url}
//             title="youTube-video-player"
//             allowFullScreen
//   ></iframe>              <Carousel.Caption>
//                 <h3>{event.youTube.title}</h3>
//               </Carousel.Caption>
//             </Carousel.Item>
//           )}
//         </Carousel>
//       ) : (
//         <Spinner animation="border" role="status">
//           <span className="visually-hidden">Loading...</span>
//         </Spinner>
//       )}
//       <Row>
//         <Col>
        
//       <h2 className="my-3">{event?.title}</h2>
//       {/* <h5>{event?.categoryId.name}</h5> */}
//       {/* {console.log(event?.categoryId.name,"cat name")} */}
//       <h5>Venue: {event?.venueName}</h5>
//       <h5>Starts At: {readableDate(event?.eventStartDateTime)}</h5>
//         </Col>
//         <Col>
        
//           {event.ticketSaleStartTime && event.ticketSaleStartTime === new Date() && event.remainingTickets >= 1 ? <button onClick={handleBookTickets}>Book</button> : <CountDown ticketSaleStartTime={event.ticketSaleStartTime} />}
//            {event.ticketSaleStartTime && event.ticketSaleEndTime === new Date() && <h4>Ticket Booking Closed</h4>}
        
//         </Col>
//       </Row>
//       <Row className="my-4">  
//         <Col>
//           <p>
//             <strong>Organiser:</strong> {event?.organiserId.username}
//           </p>
//           <Card className='mt-4'>
//             <Card.Title className="mt-2">Description</Card.Title>
//             <Card.Body>{event?.description}</Card.Body>
//           </Card>
//         </Col>
//         <Col>
//           <Card className='mt-5'>
//             <Card.Title className="mt-3">Actors</Card.Title>
//             <Card.Body>
//               {event?.actors?.map((actor) => (
//                 <CardText key={actor._id}>{actor.name}</CardText>
//               ))}
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//       <ListGroup as="ol" numbered className="my-4">
//         <ListGroup.Item className="fw-bold">Reviews</ListGroup.Item>
//         {event?.reviews.map((review) => (
//           <ListGroup.Item key={review._id} as="li" className="d-flex justify-content-between align-items-start">
//             <div className="ms-2 me-auto">
//               <div className="fw-bold">{review.title}</div>
//               {review.body}
//             </div>
//             <Badge bg="primary" pill>
//               {review.rating}
//             </Badge>
//           </ListGroup.Item>
//         ))}
//         <div style={{display:"block"}}>
//           {reviewToggle ?<Button onClick={()=>setReviewToggle(!reviewToggle)}>cancel</Button> :<Button onClick={()=>setReviewToggle(!reviewToggle)}>create</Button> }
        
//         <Button>Edit</Button><Button>delete</Button>
//         </div>
//         {reviewToggle && <ReviewForm/>}
//       </ListGroup>

//     </Container>
//     <div>

//     </div>
//     <EventCardsDisplay/>
//     </div>
//   );
// }

// export default EventInfo;


