import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { Query } from 'react-apollo';
import GET_CATEGORIES from '../../../graphql/queries/category/getAllCatergories';
import styles from './ProductStyle';

class SelectCategory extends Component {
  state = {
    category: this.props.value || '',
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
    this.props.onChange(event);
  };

  render() {
    const { classes } = this.props;
    const { category } = this.state;
    return (
      <Query query={GET_CATEGORIES}>
        {({ data, loading }) => {
          if (loading) return <MenuItem value="">Chargement ...</MenuItem>;
          if (data) {
            return (
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel
                  htmlFor="outlined-simple"
                >
                  Categories
                </InputLabel>
                <Select
                  value={category}
                  onChange={this.handleChange}
                  input={
                    <OutlinedInput labelWidth={75} name="category" id="outlined-simple" />
                  }
                >
                  {
                    data.categories.map((el) => (
                      <MenuItem
                        key={el.id}
                        value={el.id}
                      >
                        {el.name}
                      </MenuItem>
                    ))
                  }
                </Select>
              </FormControl>
            );
          }
          return null;
        }}
      </Query>

    );
  }
}

export default withStyles(styles)(SelectCategory);
