import React, { Component, PropTypes } from 'react';
import { List, ListItem } from 'material-ui/List';
import TextField from 'material-ui/TextField';
import { iMap } from '../styles/index';

class SelectBoxWithSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchString: '',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ searchString: e.target.value });
  }

  render() {
    const { getItemsCategory } = this.props;
    const searchString = this.state.searchString.trim().toLocaleLowerCase();
    let items = this.props.items;
    
    if (searchString.length > 0) {
      items = items.filter(item => item.name.toLowerCase().match(searchString));
    }

    return (
      <div style={iMap.selectBoxWithSearch}>
        <TextField
          floatingLabelText="Search"
          value={this.state.searchString}
          onChange={this.handleChange}
        />
        <List>
          {
            items ? items.map(
              item =>
                <ListItem
                  primaryText={item.name}
                  key={item.id}
                  onClick={() => getItemsCategory(item.name)}
                />
            ) : null
          }
        </List>
      </div>
    );
  }
}

const propTypes = {
  items: PropTypes.array,
  getItemsCategory: PropTypes.func,
};

SelectBoxWithSearch.propTypes = propTypes;

export default SelectBoxWithSearch;
