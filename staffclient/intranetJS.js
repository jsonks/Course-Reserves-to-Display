//CONVERT COURSE RESERVES TO DISPLAYS
   var libname = $("#logged-in-info-full .logged-in-branch-name").text();
   var libcode = $("#logged-in-info-full .logged-in-branch-code").text();
  
   //More menu link
   $('#toplevelmenu a:contains("Course reserves")').html('Displays');
  
   //Homepage
   $('.biglinks-list .icon_course_reserves').html('<i class="fa fa-fw fa-book"></i>Displays');
  
   //OPAC Detail
   $('#holdings_course_reserves').html('Displays'); //holdings table header
   $('#catalog_detail .results_summary .label:contains("Courses that have reserved this title")').text('Displays containing this title: '); //link below MARC preview

//All displays pages  
if (window.location.href.indexOf("course_reserves") > -1) {
   $('title:contains("Course reserves")').html('Displays'); // page title
   $('a:contains("Course reserves")').html( $('a:contains("Course reserves")').html().replace( /Course reserves/g, "Displays" ) ); // link text
   $('.btn:contains("New course")').html('<i class="fa fa-plus"></i> Add new display'); //new course button
   $('.btn:contains("Batch remove reserves")').html('<i class="fa fa-minus"></i> Remove items from existing display'); //remove items button
   $('h1:contains("Courses")').text('Displays'); //header 1
   $('th:contains("Dept.")').text('Type'); //table header - dept to type
   $('th:contains("Section")').text('Area of the library'); //table header - section to area of lib
   $('th:contains("Term")').text('Library'); //table header - term to library
   $('th:contains("Course")').text('Library'); //table header - course to library
   $('#course_reserves_table tbody tr:not(:contains("'+ libname +'"))').hide(); // limit to logged in library
   //Show all displays by default
   $('#course_reserves_table').on("init.dt", function() {
      var table = $('#course_reserves_table').DataTable();
      table.page.len(-1);
      table.draw();
   });
   //Add reports to toolbar 
   $('#courses_course_reserves #toolbar').append('<a class="btn btn-default" id="displays_report1" href="/cgi-bin/koha/reports/guided_reports.pl?reports=2902&phase=Run%20this%20report" target="_blank"><i class="fa fa-list"></i> Report: All items in displays</a>  <a class="btn btn-default" id="displays_report2" href="/cgi-bin/koha/reports/guided_reports.pl?reports=2909&phase=Run%20this%20report" target="_blank"><i class="fa fa-clock-o"></i> Report: Items to remove from "New" displays</a>');  
   }

//Add new/edit display page
 if (window.location.href.indexOf("/course_reserves/course.pl") > -1) {
   $('a:contains("New course")').text('New display'); // link text
   //relabel
   $('legend:contains("Create course")').text('Create display');
   $('legend:contains("Edit course")').text('Edit display');
   $('label:contains("Department:")').text('Type:');
   $('label:contains("Section:")').text('Area of the library:');
   $('label:contains("Course name:")').text('Display name:');
   //prepopulate information
   $('label:contains("Course number:")').text('Library:').next().val(libname); 
   $('label:contains("Term:")').next().val(libcode);
   //rearrange
   $('li:contains("Display name:")').insertBefore('li:contains("Type:")');
   //remove blank option
   $('#department').find('option').get(0).remove();
   //hide unused fields
   $('label:contains("Term:")').parent().hide();
   $('li:contains("Instructors:")').hide();
   $('li:contains("Public note:")').hide();
   $('li:contains("Number of students:")').hide();
   $('li:contains("Enabled?")').hide();
   } 

//Display details  
 if (window.location.href.indexOf("/course_reserves/course-details.pl") > -1) {
   //relabel
   $('a:contains("Course details")').text('Display details');   
   $('.btn:contains("Batch add reserves")').html('<i class="fa fa-plus"></i> Add items');
   $('.btn:contains("Remove all reserves")').html('<i class="fa fa-minus"></i> Remove all items');
   $('.btn:contains("Edit course")').html('<i class="fa fa-pencil"></i> Edit display');
   $('.btn:contains("Delete course")').html('<i class="fa fa-trash"></i> Delete display');
   $('.label:contains("Course name")').text('Display name:');
   $('.label:contains("Department")').text('Type:');
   $('.label:contains("Course number")').text('Library:');
   $('.label:contains("Section")').text('Area of the library:');
   $('h1:contains("Reserves")').text('Items in display');   
   $('th:contains("Other course reserves")').text('Other displays');
   //hide
   $('.btn:contains("Add reserves")').hide();
   $('.label:contains("Term")').parent().hide();
   $('li:contains("Instructors")').hide();
   $('li:contains("Public note")').hide();
   $('li:contains("Student")').hide();
   $('li:contains("Status")').hide();
   $('li:contains("Staff note")').hide();
   //hide remove items button and add batch remove button
   $('#rm_items').hide();
   $('#toolbar #edit_course').before('<a class="btn btn-default" id="batch_rm" href="/cgi-bin/koha/course_reserves/batch_rm_items.pl" style="margin-right: 0.33%;"><i class="fa fa-minus"></i> Remove items </a>');
   }   

//Batch remove items
  if (window.location.href.indexOf("/course_reserves/batch_rm_items.pl") > -1) {
   //relabel 
   $('a:contains("Batch remove reserves")').text('Batch remove items from display');   
   $('.btn:contains("Add reserves")').html('<i class="fa fa-plus"></i> Add items');
   $('p:contains("All course reserve items will be deleted from all courses to which they are attached.")').text('All display items will be deleted from all displays to which they are attached.');
   }     

//Add items
  if (window.location.href.indexOf("/course_reserves/add_items.pl") > -1) {
   //relabel
   $('a:contains("Add reserves")').text('Add item to display');
   $('p:contains("Any items with existing course reserves will have their on reserve values updated.")').text('Note: This will temporarily change item cataloging. Upon removal from the display, cataloging will revert back to its original value.');
   //hide 
//   $('li:contains("Item type:")').hide();
   $('li:contains("Collection:")').hide();
   $('li:contains("library:")').hide();
   $('li:contains("note:")').hide();
   $('#already_on_reserve').hide();
}
  
//Batch add items
 if (window.location.href.indexOf("/course_reserves/batch_add_items.pl") > -1) {
   //relabel
   $('a:contains("Add reserves")').text('Add items to display');
   $('a:contains("View course")').text('View display');
   $('p:contains("Any items with existing course reserves will have their on reserve values updated.")').text('Note: This will temporarily change item cataloging. Upon removal from the display, cataloging will revert back to its original value.');
   //hide
//   $('li:contains("Item type:")').hide();
   $('li:contains("Collection:")').hide();
   $('li:contains("library:")').hide();
   $('li:contains("note:")').hide();
   //precheck
   $('#location_enabled').prop('checked', true);
   $('#location').prop('disabled', false);
   //limit shelf location to only two options and prefill with new
   $('#location').find('option').remove().end().append('<option value="340220DISPLAY">Display</option><option value="340250NEW">New</option>').val('340250NEW');
   //collapse addition via bibnumber by default  (uses extra css)
   $('#courses_add_items_step1 legend:contains("Or use biblionumbers of bibliographic records")').replaceWith('<legend data-toggle="collapse" href=".collapsey" class="collapsed">Or use biblionumbers of bibliographic records  <div class="fa fa-chevron-right rotatechevron"></div></legend>');
   $('#courses_add_items_step1 label:contains("Biblionumbers:")').parent().parent().addClass('collapsey collapse');
   $('.collapsed').click(function(){
     $('.rotatechevron').toggleClass('down');
   });
   }

  //Add displays info to holds queue with report
      if ($('#circ_view_holdsqueue').length) {
        $('tr').each(function () {
            let this_row = $(this);
            let bcode = $(this).find(".hq-barcode strong").text();
            $.getJSON("/cgi-bin/koha/svc/report?id=2935&sql_params=" + bcode + "&annotated=1" + new Date().getTime(), function (result) {
                if (result.length === 0) {
                    $(this_row.find('.hq-callnumber')).append("<p></p>");
                } else {
                    for (i = 0; i < result.length; i++) {
                        if (result[i].course_name == null) {
                            $(this_row.find('.hq-callnumber')).append("<p></p>");
                        } else {
                            $(this_row.find('.hq-callnumber')).append("<p style='color: darkviolet;'><em>" + result[i].course_name + " - " + result[i].section + "</em></p>");
                        }
                    }
                }
            });
        });
    }
  
  //Add displays info to returns.pl with report
    if ($('#circ_returns').length) {
        $('tr').each(function () {
            let this_row = $(this);
            let bcode = $(this).find(".ci-barcode a").text();
            $.getJSON("/cgi-bin/koha/svc/report?id=2935&sql_params=" + bcode + "&annotated=1" + new Date().getTime(), function (result) {
                if (result.length === 0) {
                    $(this_row.find('.ci-shelvinglocation')).append("<p></p>");
                } else {
                    for (i = 0; i < result.length; i++) {
                        if (result[i].course_name == null) {
                            $(this_row.find('.ci-shelvinglocation')).append("<p></p>");
                        } else {
                            $(this_row.find('.ci-shelvinglocation')).append("<p style='color: darkviolet;'><em>" + result[i].course_name + " - " + result[i].section + "</em></p>");
                        }
                    }
                }
            });
        });
    }
