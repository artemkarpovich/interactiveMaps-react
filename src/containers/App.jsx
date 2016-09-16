import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AppComponent from '../components/App';
import { getLocationCategories, getLocationsByCategory } from '../actions/index';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categoryName: 'Выберите категорию в меню',
      userPosition: {},
      categories: false,
      open: false,
      errorMessage: '',
    };

    this.getItemsCategory = this.getItemsCategory.bind(this);
    this.handleShowCategory = this.handleShowCategory.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    this.props.actions.getLocationCategories();
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          userPosition: position.coords,
        });
      },
      (error) => {
        this.setState({
          open: true,
          errorMessage: error.message,
        });
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }

  getItemsCategory(categoryName) {
    const map = this.refs.app.map;

    this.props.actions.getLocationsByCategory(categoryName);

    this.setState({
      categoryName,
      categories: !this.state.categories,
    });

    map.mapLeaflet.leafletElement.setZoom(12);
  }

  handleShowCategory() {
    this.setState({
      categories: !this.state.categories,
    });
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { locationCategories, locations } = this.props;

    return (
      <AppComponent
        locationCategories={locationCategories}
        locations={locations}
        categoryName={this.state.categoryName}
        userPosition={this.state.userPosition}
        categories={this.state.categories}
        open={this.state.open}
        errorMessage={this.state.errorMessage}
        getItemsCategory={this.getItemsCategory}
        showCategory={this.handleShowCategory}
        closeModal={this.handleClose}
        ref="app"
      />
    );
  }
}

App.propTypes = {
  locationCategories: PropTypes.array,
  locations: PropTypes.array,
  actions: PropTypes.shape({
    getLocationCategories: PropTypes.func,
    getLocationsByCategory: PropTypes.func,
  }),
};

function mapStateToProps(state) {
  return {
    locationCategories: state.locationCategories.categories,
    locations: state.locations.items,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      getLocationCategories,
      getLocationsByCategory,
    }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
