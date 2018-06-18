import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import styles from './dataTable.module.scss'
import ReactTable from 'react-table'
import _ from 'lodash'
import ChevronIcon from '../../atoms/icons/ChevronIcon'

class DataTable extends React.Component {
  render () {
    const { data, columns } = this.props

    const defaultFilterMethod = (filter, row, column) => {
      const id = filter.pivotId || filter.id
      return row[id] !== undefined ? _.includes(row[id], filter.value) : true
    }

    const filterMethod = this.props.filterMethod || defaultFilterMethod

    // Lyra customizations
    let parsedColumns = columns.map((columnObj) => {
      // add sort arrows to TH's
      const headerText = columnObj.Header.slice(0)
      const headerComp = () => {
        if (columnObj.sortable === false) {
          return <span>{headerText}</span>
        } else {
          return <span>{headerText}<i className='sort-arrows'><ChevronIcon className='up' isFilled fillColor='currentColor' direction='up' /><ChevronIcon className='down' isFilled fillColor='currentColor' direction='down' /></i></span>
        }
      }
      columnObj = Object.assign({}, columnObj, {Header: headerComp})

      // add styling wrapper for clickable TD's
      if (columnObj.Cell) {
        return columnObj
      } else {
        const cell = (row) => {
          if (row.value) {
            if (row.original[this.props.destinationSelector]) {
              return <span className='clickable-style'>{row.value}</span>
            } else {
              return <span>{row.value}</span>
            }
          } else {
            return <span>&ndash;</span>
          }
        }
        columnObj.Cell = cell
        return columnObj
      }
    })

    return (
      <ReactTable
        data={data}
        showPagination={this.props.pagination}
        showPageSizeOptions={false}
        defaultPageSize={data.length}
        pageSize={this.props.pageSize}
        filterable={this.props.showColumnFilters}
        minRows={0}
        resizable={this.props.resizable}
        defaultSorted={this.props.defaultSorted}
        className={`${this.props.striped ? '-striped' : ''} ${this.props.highlight ? '-highlight' : ''} ${this.props.className}`}
        defaultFilterMethod={filterMethod}
        columns={parsedColumns}
        getTdProps={(state, rowInfo, column, instance) => {
          return {
            onClick: (e, handleOriginal) => {
              if (this.props.rowClickHandler && rowInfo.original[this.props.destinationSelector]) {
                this.props.rowClickHandler(state, rowInfo, column, instance)
              } else {
                // IMPORTANT! React-Table uses onClick internally to trigger
                // events like expanding SubComponents and pivots.
                // By default a custom 'onClick' handler will override this functionality.
                // If you want to fire the original onClick handler, call the
                // 'handleOriginal' function.
                if (handleOriginal) {
                  handleOriginal()
                }
              }
            }
          }
        }} />
    )
  }
}

DataTable.defaultProps = {
  pagination: false,
  showColumnFilters: false,
  striped: true,
  highlight: true,
  resizable: true
}

DataTable.propTypes = {
  data: PropTypes.array.isRequired,
  pageSize: PropTypes.number,
  pagination: PropTypes.bool,
  showColumnFilters: PropTypes.bool,
  filterMethod: PropTypes.func,
  columns: PropTypes.array.isRequired,
  className: PropTypes.string,
  rowClickHandler: PropTypes.func,
  striped: PropTypes.bool,
  highlight: PropTypes.bool,
  resizable: PropTypes.bool,
  defaultSorted: PropTypes.array,
  destinationSelector: PropTypes.string // the property on the data object that determines if the row is clickable
}

/* Prop Notes
========================
- columns must be an object array, with at minimum a 'Header' and 'accessor' property. All other props defined here are supported: https://github.com/react-tools/react-table#columns
- data must be an array of object with key-value pairs that align with the 'accessor' properties set in the columns object
- to give a row a clickable destination, include a 'destination' property for that row within the data object, whose value is the URL to redirect to
*/

export default CSSModules(DataTable, styles, {allowMultiple: true})
