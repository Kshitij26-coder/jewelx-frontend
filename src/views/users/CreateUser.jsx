import React from 'react';
import PageTitle from '../../component/PageTitle';
import TableWithPagination from '../../component/form/Table';

const columns = ['Dessert (100g serving)', 'Calories', 'Fat (g)', 'Carbs (g)', 'Protein (g)'];

const data = [
     { name: 'Frozen yoghurt', calories: 159, fat: 6.0, carbs: 24, protein: 4.0 },
     { name: 'Ice cream sandwich', calories: 237, fat: 9.0, carbs: 37, protein: 4.3 },
     { name: 'Eclair', calories: 262, fat: 16.0, carbs: 24, protein: 6.0 },
     { name: 'Cupcake', calories: 305, fat: 3.7, carbs: 67, protein: 4.3 },
     { name: 'Gingerbread', calories: 356, fat: 16.0, carbs: 49, protein: 3.9 },
];

const CreateUser = props => {
     return (
          <div className="container w-100">
               <PageTitle title={props.update ? 'Update User' : 'Add User'} />
               <TableWithPagination
                    columns={columns}
                    rows={data}
                    count={10}
                    page={7}
                    onPageChange={(e, newPage) => {
                         console.log(newPage);
                    }}
               />
          </div>
     );
};

export default CreateUser;
