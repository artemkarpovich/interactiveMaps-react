import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import IconButton from 'material-ui/IconButton';
import AppBar from 'material-ui/AppBar';
import KeyboardArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import Map from './../components/Map';
import SelectBoxWithSearch from '../components/SelectBoxWithSearch';
import { getLocationCategories, getLocationsByCategory } from '../actions/index';
import { iMap } from '../styles';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categoryName: 'Выберите категорию в меню',
      userPosition: {},
      categories: false,
    };

    this.getItemsCategory = this.getItemsCategory.bind(this);
    this.handleShowCategory = this.handleShowCategory.bind(this);
  }

  componentDidMount() {
    this.props.actions.getLocationCategories();
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          userPosition: position.coords,
        });
      },
      (error) => alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }

  getItemsCategory(categoryName) {
    this.props.actions.getLocationsByCategory(categoryName);

    this.setState({
      categoryName,
      categories: !this.state.categories,
    });
  }

  handleShowCategory() {
    this.setState({
      categories: !this.state.categories,
    });
  }

  render() {
    const { locationCategories, locations } = this.props;
    return (
      <div>
        <AppBar
          title="IMaps"
          iconElementLeft={
            <IconButton onClick={() => this.handleShowCategory()}><KeyboardArrowDown /></IconButton>
          }
          style={iMap.appBar}
        >
          {this.state.categoryName}
        </AppBar>
        {
          this.state.categories === true ?
            <SelectBoxWithSearch
              items={locationCategories}
              getItemsCategory={this.getItemsCategory}
            /> :
            null
        }
        <Map
          locations={locations}
          userPosition={this.state.userPosition}
          getDirection={this.getDirection}
        />
      </div>
    );
  }
}

const propTypes = {
  children: PropTypes.object,
  locationCategories: PropTypes.array,
  locations: PropTypes.array,
  actions: PropTypes.shape({
    getLocationCategories: PropTypes.func,
    getLocationsByCategory: PropTypes.func,
  }),
};

App.propTypes = propTypes;

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
