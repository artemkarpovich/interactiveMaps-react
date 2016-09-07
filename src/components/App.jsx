import React, { Component, PropTypes } from 'react';
import AppBar from 'material-ui/AppBar';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconButton from 'material-ui/IconButton';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getLocationCategories } from '../actions/index';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categoryName: 'Выберите категорию',
    };

    this.changeCategoryName = this.changeCategoryName.bind(this);
  }

  componentDidMount() {
    this.props.actions.getLocationCategories();
  }

  changeCategoryName(categoryName) {
    this.setState({
      categoryName,
    });
  }

  render() {
    const { locationCategories } = this.props;

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
                      onClick={() => this.changeCategoryName(category.name)}
                    />
                  ) :
                  null
              }
            </IconMenu>
          }
        >
          {this.state.categoryName}
        </AppBar>
        { this.props.children }
      </div>
    );
  }
}

const propTypes = {
  children: PropTypes.object,
  locationCategories: PropTypes.array,
  actions: PropTypes.shape({
    getLocationCategories: PropTypes.func,
  }),
};

App.propTypes = propTypes;

function mapStateToProps(state) {
  return {
    locationCategories: state.locationCategories.categories,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      getLocationCategories,
    }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
