import React, { Component } from 'react';
import {connect} from 'react-redux';
import {fetchCurrentOrder} from '../store';

class CurrentOrder extends Component {
    componentDidMount() {
        this.props.setOrder(this.props.match.params.orderId)
    }
    render() {
        const {currentOrder} = this.props;
        return (
            <section>
                <h1>{currentOrder.id}</h1>
            </section>
        )
    }
}

const mapStateToProps = state => ({
    currentOrder: state.currentOrder
})

const mapDispatchToProps = dispatch => ({
    setOrder: (orderId) => {
        dispatch(fetchCurrentOrder(orderId))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(CurrentOrder)
