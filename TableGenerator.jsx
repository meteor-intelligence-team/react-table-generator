import React, { Component } from 'react';
import autobind from 'react-autobind';
import PropTypes from 'prop-types';
import { Header, Table } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';

export default class TableGenerator extends Component {
  constructor( props ){
    super( props );
    autobind( this );
  }

  strOrComp( value ){
    return ( typeof value === "string" );
  }

  getCellContent( col, entry ){
    if ( typeof col === "string" ) {
       return entry[col];
    } else if ( typeof col.property === "string" && !col.as ) {
      return entry[col.property];
    } else {
      return ( <col.as property={col.property} {...entry} {...col.additionalProps}/> );
    }
  }

  render(){
    const { title, columns, entries, tableProps } = this.props;

    return (
      <div>
        { title
          ? <Header dividing>{title}</Header>
          : null
        }
        <Table basic='very' celled {...tableProps}>
          <Table.Header>
            <Table.Row>
              {columns.map((col, index)=>
                <Table.HeaderCell key={index}>
                  {this.strOrComp( col )
                    ? col
                    : col.name
                  }
                </Table.HeaderCell>
              )}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {entries.map(entry=>
              <Table.Row key={entry._id}>
                {columns.map((col, index) =>
                  <Table.Cell key={index}>
                    {this.getCellContent(col, entry)}
                  </Table.Cell>
                )}
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </div>
    );
  }
}

TableGenerator.propTypes = {
  entries     : PropTypes.array.isRequired,
  loading     : PropTypes.bool,
  title       : PropTypes.string,
  tableProps  : PropTypes.object, // http://react.semantic-ui.com/collections/table
  columns     : PropTypes.arrayOf(
                  PropTypes.oneOfType([
                    PropTypes.string,
                    PropTypes.shape({
                      property  : PropTypes.string,
                      name      : PropTypes.string,
                      as        : PropTypes.func // React Component Proto
                    }),
                    PropTypes.shape({
                        name  : PropTypes.string,
                        property    : PropTypes.string
                    })
                  ]))
                .isRequired,
};
