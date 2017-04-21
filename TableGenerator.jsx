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
	            {columns.map(col=>
	              <Table.HeaderCell key={col}>
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
	              {columns.map(col=>
	                <Table.Cell key={col}>
	                  {this.strOrComp( col )
	                    ? entry[col]
	                    : <col.as {...entry} />
	                  }
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
  entries 		: PropTypes.array.isRequired,
  loading 		: PropTypes.bool,
  title 			: PropTypes.string,
  tableProps 	: PropTypes.object, // http://react.semantic-ui.com/collections/table
  columns 		: PropTypes.arrayOf(
  								PropTypes.oneOfType([
  									PropTypes.string,
  									PropTypes.shape({
									    name: PropTypes.string,
									    as: PropTypes.func // React Component Proto
								  	})
								  ]))
  							.isRequired,
};
