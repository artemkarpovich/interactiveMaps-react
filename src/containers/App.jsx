import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import IconButton from 'material-ui/IconButton';
import AppBar from 'material-ui/AppBar';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from '../../node_modules/material-ui/svg-icons/navigation/more-vert';
import Map from './Map';
import { getLocationCategories, getLocationsByCategory } from '../actions/index';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categoryName: 'Выберите категорию в меню',
    };

    this.getCategoryName = this.getCategoryName.bind(this);
  }

  componentDidMount() {
    this.props.actions.getLocationCategories();
  }

  getCategoryName(categoryName) {
    this.props.actions.getLocationsByCategory(categoryName);

    this.setState({
      categoryName,
    });
  }

  render() {
    const { locationCategories, locations } = this.props;

    return (
      <div>
        <AppBar
          title="IMaps"
          iconElementLeft={
            <IconMenu
              iconButtonElement={
                <IconButton><MoreVertIcon /></IconButton>
              }
              targetOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
            >
              {
                locationCategories ?
                  locationCategories.map(category =>
                    <MenuItem
                      primaryText={category.name}
                      key={category.id}
                      onClick={() => this.getCategoryName(category.name)}
                    />
                  ) :
                  null
              }
            </IconMenu>
          }
        >
          {this.state.categoryName}
        </AppBar>
        <Map locations={locations} />
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
