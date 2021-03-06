import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AppComponent from '../components/App';
import {
  getLocationCategories,
  getLocationsByCategory,
  addUserPosition,
  recordError,
  closeModalWindow,
  setItemCoordinates,
} from '../actions/index';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: false,
      categoryName: 'Выберите категорию в меню',
    };

    this.getItemsCategory = this.getItemsCategory.bind(this);
    this.handleShowCategory = this.handleShowCategory.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.storeToJson = this.storeToJson.bind(this);
    this.handleSetItemCoordinates = this.handleSetItemCoordinates.bind(this);
  }

  componentDidMount() {
    window.addEventListener('beforeunload', this.storeToJson);

    this.props.actions.getLocationCategories();

    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.props.actions.addUserPosition(position.coords);
      },
      (error) => {
        this.props.actions.recordError(error);
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }

  getItemsCategory(categoryName) {
    const map = this.app.map;

    this.props.actions.getLocationsByCategory(categoryName);

    this.setState({
      categories: !this.state.categories,
      categoryName,
    });

    window.localStorage.removeItem('lastState');

    map.mapLeaflet.leafletElement.setZoom(12);
  }

  handleShowCategory() {
    this.setState({
      categories: !this.state.categories,
    });
  }

  handleClose() {
    this.props.actions.closeModalWindow();
  }

  storeToJson() {
    const lastState = {
      categoryName: this.state.categoryName,
      locations: this.props.locations,
      itemCoordinates: this.props.itemCoordinates,
    };

    window.localStorage.setItem('lastState', JSON.stringify(lastState));
  }

  handleSetItemCoordinates(to) {
    this.props.actions.setItemCoordinates(to);
  }

  render() {
    const {
      locationCategories,
      locations,
      itemCoordinates,
      geolocation: {
        userPosition,
        errorMessage,
        openModal,
      },
    } = this.props;

    return (
      <AppComponent
        locationCategories={locationCategories}
        locations={locations}
        categoryName={this.state.categoryName}
        userPosition={userPosition}
        categories={this.state.categories}
        openModal={openModal}
        errorMessage={errorMessage}
        itemCoordinates={itemCoordinates}
        getItemsCategory={this.getItemsCategory}
        showCategory={this.handleShowCategory}
        closeModal={this.handleClose}
        setItemCoordinates={this.handleSetItemCoordinates}
        ref={(app) => { this.app = app; }}
      />
    );
  }
}

App.propTypes = {
  locationCategories: PropTypes.array,
  locations: PropTypes.array,
  itemCoordinates: PropTypes.array,
  geolocation: PropTypes.shape({
    userPosition: PropTypes.object,
    errorMessage: PropTypes.string,
    openModal: PropTypes.bool,
  }),
  actions: PropTypes.shape({
    getLocationCategories: PropTypes.func,
    getLocationsByCategory: PropTypes.func,
    addUserPosition: PropTypes.func,
    recordError: PropTypes.func,
    closeModalWindow: PropTypes.func,
    saveCategoryName: PropTypes.func,
    setItemCoordinates: PropTypes.func,
  }),
};

function mapStateToProps(state) {
  return {
    locationCategories: state.locationCategories.categories,
    locations: state.locations.items,
    geolocation: state.geolocation,
    itemCoordinates: state.itemCoordinates,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      getLocationCategories,
      getLocationsByCategory,
      addUserPosition,
      recordError,
      closeModalWindow,
      setItemCoordinates,
    }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
