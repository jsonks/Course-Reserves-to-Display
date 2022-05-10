//CONVERT COURSE RESERVES TO DISPLAYS - OPAC

$('#item_coursereserves').html('Displays'); //Change column heading on item details

if (window.location.href.indexOf("opac-course-reserves.pl") > -1) {
    $('title:contains("Courses")').html('Displays'); // Change page title
    $('a:contains("Course reserves")').html($('a:contains("Course reserves")').html().replace(/Course reserves/g, "Displays"));
    $('h1:contains("Courses")').text('Displays');
    $('th:contains("Dept.")').text('Type');
    $('th:contains("Section")').text('Area of the library');
    $('th:contains("Term")').text('Library');
    $('#course_reserves_table_filter input').attr('placeholder', 'Search displays');
}

if (window.location.href.indexOf("opac-course-details.pl") > -1) {
    $('title:contains("Course reserves")').html('Displays'); // Change page title
    $('h1:contains("Course reserves")').html($('h1:contains("Course reserves")').html().replace(/Course reserves/g, "Display"));
    $('a:contains("Course reserves")').html($('a:contains("Course reserves")').html().replace(/Course reserves/g, "Displays"));
    $('li:contains("Course reserves")').html($('li:contains("Course reserves")').html().replace(/Course reserves/g, "Displays"));
    $('.label:contains("Course name")').text('Display name:');
    $('.label:contains("Term")').parent().hide();
    $('.label:contains("Instructors")').parent().hide();
    $('.label:contains("Department")').text('Type:');
    $('.label:contains("Course number")').text('Library:');
    $('.label:contains("Section")').text('Area of the library:');
    $('.btn:contains("New course")').html('<i class="fa fa-plus"></i> Add new display');
    $('.btn:contains("Batch remove reserves")').html('<i class="fa fa-minus"></i> Remove items from existing display');
    $('#course-items-table_filter input').attr('placeholder', 'Search display');
}
