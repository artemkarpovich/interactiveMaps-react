import React, { PropTypes, Component } from 'react';
import IconButton from 'material-ui/IconButton';
import AppBar from 'material-ui/AppBar';
import KeyboardArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Map from './../components/Map';
import SelectBoxWithSearch from '../components/SelectBoxWithSearch';
import { iMap } from '../styles';

class App extends Component {
  render() {
    const {
      locationCategories,
      locations,
      categoryName,
      userPosition,
      categories,
      open,
      errorMessage,
      getItemsCategory,
      showCategory,
      closeModal,
    } = this.props;

    const actions = [
      <FlatButton
        label="Ok"
        primary
        onTouchTap={closeModal}
      />,
    ];

    return (
      <div>
        <AppBar
          title="IMaps"
          iconElementLeft={
            <IconButton
              onClick={() => showCategory()}
              style={iMap.appBarIconButton}
            >
              <KeyboardArrowDown />
            </IconButton>
          }
          style={iMap.appBar}
        >
          {categoryName}
        </AppBar>
        {
          categories === true ?
            <SelectBoxWithSearch
              items={locationCategories}
              getItemsCategory={getItemsCategory}
              style={iMap.selectBoxWithSearch}
            /> :
            null
        }
        <Map
          locations={locations}
          userPosition={userPosition}
          ref={(c) => { this.map = c; }}
        />

        <Dialog
          title="ERROR"
          actions={actions}
          modal
          open={open}
          onRequestClose={closeModal}
        >
          {errorMessage}
        </Dialog>
      </div>
    );
  }
}

App.propTypes = {
  locationCategories: PropTypes.array,
  locations: PropTypes.array,
  categoryName: PropTypes.string,
  userPosition: PropTypes.object,
  categories: PropTypes.bool,
  open: PropTypes.bool,
  errorMessage: PropTypes.string,
  getItemsCategory: PropTypes.func,
  showCategory: PropTypes.func,
  closeModal: PropTypes.func,
};

export default App;