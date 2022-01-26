//DISPLAYS
$(document).ready(function () {
   $('a:contains("Course reserves")').html( $('a:contains("Course reserves")').html().replace( /Course reserves/g, "Displays" ) );

//All displays pages  
if (window.location.href.indexOf("course_reserves") > -1) {
   $('title:contains("Course reserves")').html('Displays'); // Change page title
   }

//Displays home page
if (window.location.href.indexOf("/course_reserves/course-reserves.pl") > -1) {
   $('.btn:contains("New course")').html('<i class="fa fa-plus"></i> Add new display');
   $('.btn:contains("Batch remove reserves")').html('<i class="fa fa-minus"></i> Remove items from existing display');
   $('h1:contains("Courses")').text('Displays');
   $('th:contains("Dept.")').text('Type');
   $('th:contains("Section")').text('Area of the library');
   $('th:contains("Term")').text('Library');
   }

//Add new/edit display  
 if (window.location.href.indexOf("/course_reserves/course.pl") > -1) {
   $('a:contains("New course")').text('New display');
   $('legend:contains("Create course")').text('Create display');
   $('legend:contains("Edit course")').text('Edit display');
   $('label:contains("Department:")').text('Type:');
   $('#department').find('option').get(0).remove();
   $('label:contains("Section:")').text('Area of the library:');
   $('li:contains("Course number")').hide();
   $('label:contains("Course name:")').text('Display name:');
   $('li:contains("Display name:")').insertBefore('li:contains("Type:")');
   $('label:contains("Term:")').text('Library:');
   $('li:contains("Instructors:")').hide();
   $('li:contains("Public note:")').hide();
   $('li:contains("Number of students:")').hide();
   $('li:contains("Enabled?")').hide();
   } 

//Display details  
 if (window.location.href.indexOf("/course_reserves/course-details.pl") > -1) {
   $('a:contains("Course details")').text('Display details');   
   $('.btn:contains("Add reserves")').hide();
   $('.btn:contains("Batch add reserves")').html('<i class="fa fa-plus"></i> Add items');
   $('.btn:contains("Remove all reserves")').html('<i class="fa fa-minus"></i> Remove all items');
   $('.btn:contains("Edit course")').html('<i class="fa fa-pencil"></i> Edit display');
   $('.btn:contains("Delete course")').html('<i class="fa fa-trash"></i> Delete display');
   $('.label:contains("Course name")').text('Display name:');
   $('.label:contains("Term")').text('Library:');
   $('.label:contains("Department")').text('Type');
   $('li:contains("Course number")').hide();   
   $('li:contains("Instructors")').hide();
   $('li:contains("Public note")').hide();
   $('li:contains("Student")').hide();
   $('li:contains("Status")').hide();
   $('h1:contains("Reserves")').text('Items in display');   
   $('th:contains("Other course reserves")').text('Other displays');
   }   

//Batch remove items
 if (window.location.href.indexOf("/course_reserves/batch_rm_items.pl") > -1) {
   $('a:contains("Batch remove reserves")').text('Batch remove items from display');   
   $('.btn:contains("Add reserves")').html('<i class="fa fa-plus"></i> Add items');
   $('p:contains("All course reserve items will be deleted from all courses to which they are attached.")').text('All display items will be deleted from all displays to which they are attached.');
   }     

//Add single item
 if (window.location.href.indexOf("/course_reserves/add_items.pl") > -1) {
   $('a:contains("Add reserves")').text('Add item to display');   
   }
  
//Batch add items
 if (window.location.href.indexOf("/course_reserves/batch_add_items.pl") > -1) {
   $('a:contains("Add reserves")').text('Add items to display');
   $('li:contains("Item type:")').hide();
   $('li:contains("Collection:")').hide();
   $('li:contains("library:")').hide();
   $('li:contains("note:")').hide();
   $('#location_enabled').prop('checked', true);
   $('#location').prop('disabled', false);
   $('#location').find('option').remove().end().append('<option value="340220DISPLAY">Display</option><option value="340250NEW">New</option>').val('340220DISPLAY');
   $('p:contains("Any items with existing course reserves will have their on reserve values updated.")').text('Note: This will temporarily change item shelf location. Upon removal from the display, shelf location will revert back to its originally cataloged value.');
   }  
  
});
