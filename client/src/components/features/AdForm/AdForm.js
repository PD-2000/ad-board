import {Button, Form} from 'react-bootstrap';
import {useState} from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {useForm} from 'react-hook-form';

const AdForm = ({action, actionText, ...props}) => {
  const {register, handleSubmit: validate, formState: {errors}} = useForm();
  const [title, setTitle] = useState(props.title || '');
  const [price, setPrice] = useState(props.price || '');
  const [author, setAuthor] = useState(props.author || '');
  const [location, setLocation] = useState(props.location || '');
  const [publishedDate, setPublishedDate] = useState(new Date());
  const [image, setImage] = useState(props.image || null);
  const [shortDescription, setShortDescription] = useState(props.shortDescription || '');
  const [content, setContent] = useState(props.content || '');
  const [dateError, setDateError] = useState(false);
  const [contentError, setContentError] = useState(false);

  const handleSubmit = () => {
    setContentError(!content)
    setDateError(!publishedDate)
    if(content && publishedDate) {
      action({title, price, author, location, publishedDate, shortDescription, content});
    }
  };

  return (
    <div style={{width: '70%'}} className="m-auto" >
      <Form onSubmit={validate(handleSubmit)}>
        <Form.Group className="mb-4">
          <Form.Label>Title</Form.Label>
          <Form.Control{...register("title", {required: true, minLength: 1})} value={title} onChange={e => setTitle(e.target.value)} />
          {errors.title && <small className="d-block text-danger mt-1">You must give this advertisement a title.</small>}
        </Form.Group>
        <Form.Group className="mb-4">
          <Form.Label>Price</Form.Label>
          <Form.Control{...register("price", {required: true, minLength: 1})} value={price} onChange={e => setPrice(e.target.value)} />
          {errors.price && <small className="d-block text-danger mt-1">You must set the price.</small>}
        </Form.Group>
        <Form.Group className="mb-4">
          <Form.Label>Author</Form.Label>
          <Form.Control {...register("author", {required: true, minLength: 1})} value={author} onChange={e => setAuthor(e.target.value)} />
          {errors.author && <small className="d-block text-danger mt-1">You must give this advertisement an author.</small>}
        </Form.Group>
        <Form.Group className="mb-4">
          <Form.Label>Location</Form.Label>
          <Form.Control {...register("location", {required: true, minLength: 1})} value={location} onChange={e => setLocation(e.target.value)} />
          {errors.location && <small className="d-block text-danger mt-1">You must specify the location.</small>}
        </Form.Group>
        <Form.Group className="mb-4">
          <Form.Label>Publishment date</Form.Label>
          <DatePicker selected={publishedDate} onChange={(date) => setPublishedDate(date)} />
          {dateError && <small className="d-block form-text text-danger mt-2">You must choose when to publish this advertisement.</small>}
        </Form.Group>
        <Form.Group className="mb-4">
          <Form.Label>Image</Form.Label>
          <Form.Control {...register("image", {required: true, minLength: 10})} type="file" value={image} onChange={e => setImage(e.target.value)} />
          {errors.image && <small className="d-block text-danger mt-1">You must attach an image.</small>}
        </Form.Group>
        <Form.Group className="mb-4">
          <Form.Label>Short description</Form.Label>
          <Form.Control {...register("shortDescription", {required: true, minLength: 10})} as="textarea" value={shortDescription} onChange={e => setShortDescription(e.target.value)} />
          {errors.shortDescription && <small className="d-block text-danger mt-1">You must give this advertisement a brief descritpion. A minimum of 10 characters is required.</small>}
        </Form.Group>
        <Form.Group className="mb-4">
          <Form.Label>Ad's content</Form.Label>
          <ReactQuill as="textarea" value={content} onChange={setContent} />
          {contentError && <small className="d-block form-text text-danger mt-1">You must include more details regarding this advertisement.</small>}
        </Form.Group>
        <Button variant="success" type="submit">
          {actionText}
        </Button>
      </Form>
    </div>
  );
}

export default AdForm;