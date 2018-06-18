// import React from 'react'
// import { storiesOf } from '@storybook/react'
// import CSSModules from 'react-css-modules'

// // addons
// import { boolean, number } from '@storybook/addon-knobs'
// import { withNotes } from '@storybook/addon-notes'
// import { withInfo } from '@storybook/addon-info'

// // molecules
// import DataTable from '../../../lib/molecules/table/DataTable'

// // story assets
// import { sampleData, sampleColumns } from '../../pages/tables/sampleData'
// import styles from '../../pages/tables/tableStoryStyles.module.scss'
// import SearchIcon from '../../../lib/atoms/icons/SearchIcon'
// import InputField from '../../../lib/atoms/form/inputField/InputField'

// // pages
// import StorybookPageLayout from '../../pages/shared/storybookPageLayout'

// class TableExample extends React.Component {
//   constructor (props) {
//     super(props)

//     this.state = {
//       search: ''
//     }
//   }

//   rowClickHandler (state, rowInfo, column, instance) {
//     window.alert('row clicked')
//   }

//   render () {
//     let pagination = boolean('Pagination', false)
//     let pageSize
//     if (pagination) {
//       pageSize = number('Page Size', 4)
//     }
//     let showColumnFilters = boolean('Show Column Filters', false)
//     let useExternalFilter = boolean('Use External Filter', false)

//     let data = sampleData
//     if (useExternalFilter && this.state.search) {
//       data = data.filter(row => {
//         return row.name.toLowerCase().includes(this.state.search.toLowerCase()) || row.email.toLowerCase().includes(this.state.search.toLowerCase())
//       })
//     }

//     return (
//       <div>
//         <div className='clearfix'>
//           <h2 styleName='title'>Table Title</h2>
//           {
//             useExternalFilter
//               ? <div styleName='external-filter'>
//                 <InputField
//                   input={{
//                     name: 'external_filter',
//                     value: this.state.search,
//                     onChange: e => this.setState({search: e.target.value})
//                   }}
//                   type='text'
//                   meta={{}}
//                   component={InputField}
//                   insetIcon={SearchIcon}
//                   placeholder='Search by name or email' />
//               </div>
//               : []
//           }
//         </div>

//         <div styleName='table-container'>
//           <DataTable
//             data={data}
//             columns={sampleColumns}
//             pagination={pagination}
//             pageSize={pageSize}
//             rowClickHandler={this.rowClickHandler}
//             destinationSelector='destination'
//             showColumnFilters={showColumnFilters}
//             className='test-table' />
//         </div>
//       </div>
//     )
//   }
// }

// const TableInstance = CSSModules(TableExample, styles, {allowMultiple: true})

// storiesOf('Tables', module)
//   .add('Data Table',
//     withInfo('Basic usage of component:')(
//       withNotes('')(
//         () => (
//           <StorybookPageLayout title='Data Table'>
//             <TableInstance />
//           </StorybookPageLayout>
//         )
//       )
//     )
//   )
