  // table
  $(document).ready(function() {
    $('#table').DataTable( {
      data: bigMac,
      columns: [
          { title: "Country" },
          { title: "Big Mac Price" },
      ]
    } );
} );

var bigMac = [
  ['Ukraine', '1.70'],
  ['Egypt', '1.75']];