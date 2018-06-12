import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postNewReview } from '../store';

class AddReview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      rating: 5
    };
    this.changeHandler = this.changeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }
  changeHandler(evt) {
    const newState = {};
    newState[evt.target.name] = evt.target.value;
    this.setState(newState);
  }
  submitHandler(evt) {
    evt.preventDefault();
    const { userId, productId } = this.props;
    const review = { ...this.state, userId, rating: +this.state.rating };
    this.props.submitDispatch(productId, review);
    this.setState({title: '', description: '', rating: 5})
  }
  render() {
    const isItValid = this.state.title && this.state.description;
    return (
      <form onSubmit={this.submitHandler} className="add-review">
      <h1 className="add-review__heading">Add a review</h1>
      <label htmlFor="title">Title your review:</label>
        <input
          id="title"
          type="text"
          name="title"
          value={this.state.title}
          onChange={this.changeHandler}
        />
      <label htmlFor="description">Describe your purchase:</label>
        <textarea
          id="description"
          type="text"
          name="description"
          value={this.state.description}
          onChange={this.changeHandler}
        />
      <label htmlFor="rating">Rate your purchase:</label>
        <select id="rating" onChange={this.changeHandler} name="rating" value={this.state.rating} >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
        <button className="add-review__button" type="submit" disabled={!isItValid}>Submit</button>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  userId: state.user.id,
  productId: state.currentProduct.id
});

const mapDispatchToProps = dispatch => ({
  submitDispatch: (productId, review) => {
    dispatch(postNewReview(productId, review));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(AddReview);
