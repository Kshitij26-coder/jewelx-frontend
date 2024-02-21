export const getRolesfromAbbrev = role => {
     switch (role) {
          case 'O':
               return 'Owner';
          case 'A':
               return 'Admin';
          case 'E':
               return 'Employee';
     }
};
