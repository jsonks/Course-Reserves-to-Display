/*2902 - All items in all displays*/
SELECT DATE_FORMAT(t.timestamp, '%m/%d/%Y') AS 'DateAddedToDisplay', DATEDIFF(curdate(), t.timestamp) AS 'DaysOnDisplay', DATE_FORMAT(i.dateaccessioned, '%m/%d/%Y') AS 'DateAccessioned', DATEDIFF(curdate(), i.dateaccessioned) AS 'DaysSinceAccession', c.course_name AS 'DisplayName', b.title, av2.lib AS 'PermanentLocation', av.lib AS 'CurrentLocation', av3.lib AS 'Collection', i.itemcallnumber, i.barcode, i.itemnotes, c.term AS library
FROM course_items t
LEFT JOIN  items i USING (itemnumber)
LEFT JOIN authorised_values av ON (i.location = av.authorised_value AND av.category = 'LOC')
LEFT JOIN authorised_values av2 ON (t.location_storage = av2.authorised_value AND av2.category = 'LOC')
LEFT JOIN authorised_values av3 ON (i.ccode = av3.authorised_value AND av3.category = 'CCODE')
LEFT JOIN biblio b ON (i.biblionumber=b.biblionumber) 
LEFT JOIN course_reserves r USING (ci_id) 
LEFT JOIN courses c USING (course_id)
WHERE c.term = <<Choose Library|branches>>
GROUP BY i.itemnumber
ORDER BY av2.lib, i.itemcallnumber
LIMIT 50000

/*2909 - Items in a "New" display older than X days*/
SELECT DATE_FORMAT(i.dateaccessioned, '%m/%d/%Y') AS 'DateAccessioned', DATEDIFF(curdate(), i.dateaccessioned) AS 'DaysSinceAccession', c.course_name AS 'DisplayName', b.title, av2.lib AS 'PermanentLocation', av3.lib AS 'Coll.', i.itemcallnumber, i.barcode, 
CASE WHEN i.onloan >=1 THEN 'Checked out'
     WHEN h.found IS NOT NULL THEN 'Hold'
     WHEN MAX(bt.datesent)>COALESCE(MAX(bt.datearrived)) THEN 'In Transit'
     WHEN i.itemlost >=1 THEN 'Lost'
     WHEN i.withdrawn >=1 THEN 'Withdrawn'
     ELSE ' ' END AS status
FROM course_items t
LEFT JOIN items i USING (itemnumber)
LEFT JOIN authorised_values av ON (i.location = av.authorised_value AND av.category = 'LOC')
LEFT JOIN authorised_values av2 ON (t.location_storage = av2.authorised_value AND av2.category = 'LOC')
LEFT JOIN authorised_values av3 ON (i.ccode = av3.authorised_value AND av3.category = 'CCODE')
LEFT JOIN biblio b ON (i.biblionumber=b.biblionumber) 
LEFT JOIN course_reserves r USING (ci_id) 
LEFT JOIN courses c USING (course_id)
LEFT JOIN branchtransfers bt ON (i.itemnumber = bt.itemnumber)
LEFT JOIN reserves h ON (i.itemnumber=h.itemnumber)
WHERE c.term = <<Choose Library|branches>>
GROUP BY i.itemnumber
HAVING DaysSinceAccession >= <<Items added over X days ago>>
AND DisplayName LIKE '%New%'
ORDER BY i.itemcallnumber
LIMIT 5000

/*2932 - List books from display for bookshelves plugin feed
Needs to be set to Public: Yes
URL format: https://www.seknfind.org/cgi-bin/koha/svc/report?id=2932&sql_params=1
param is course_id, can list multiple*/
SELECT  IF
  (LEFT(TRIM(bi.isbn), 3) = '978',
    CONCAT(SUBSTR(TRIM(bi.isbn), 4, 9),
    REPLACE(MOD(11 - MOD
        (CONVERT(SUBSTR(TRIM(bi.isbn), 4, 1), UNSIGNED INTEGER)*10 +
         CONVERT(SUBSTR(TRIM(bi.isbn), 5, 1), UNSIGNED INTEGER)*9 +
         CONVERT(SUBSTR(TRIM(bi.isbn), 6, 1), UNSIGNED INTEGER)*8 +
         CONVERT(SUBSTR(TRIM(bi.isbn), 7, 1), UNSIGNED INTEGER)*7 +
         CONVERT(SUBSTR(TRIM(bi.isbn), 8, 1), UNSIGNED INTEGER)*6 +
         CONVERT(SUBSTR(TRIM(bi.isbn), 9, 1), UNSIGNED INTEGER)*5 +
         CONVERT(SUBSTR(TRIM(bi.isbn), 10, 1), UNSIGNED INTEGER)*4 +
         CONVERT(SUBSTR(TRIM(bi.isbn), 11, 1), UNSIGNED INTEGER)*3 +
         CONVERT(SUBSTR(TRIM(bi.isbn), 12, 1), UNSIGNED INTEGER)*2, 11
	  ), 11), '10', 'X')
	),
    LEFT(TRIM(bi.isbn), 10)
  ) AS NormISBN10, b.title, b.author,b.biblionumber
FROM course_items t
LEFT JOIN items i USING (itemnumber)
LEFT JOIN authorised_values av ON (i.location = av.authorised_value AND av.category = 'LOC')
LEFT JOIN authorised_values av2 ON (t.location_storage = av2.authorised_value AND av2.category = 'LOC')
LEFT JOIN authorised_values av3 ON (i.ccode = av3.authorised_value AND av3.category = 'CCODE')
LEFT JOIN biblio b ON (t.biblionumber=b.biblionumber)
LEFT JOIN biblioitems bi ON (b.biblionumber=bi.biblionumber)
LEFT JOIN course_reserves r USING (ci_id) 
LEFT JOIN courses c USING (course_id)
WHERE c.course_id = <<Course ID1>> OR c.course_id = <<Course ID2>> OR c.course_id = <<Course ID3>> OR c.course_id = <<Course ID4>> OR c.course_id = <<Course ID5>> OR c.course_id = <<Course ID6>>
GROUP BY b.biblionumber
ORDER BY dateaccessioned DESC
LIMIT 100

/*2935 - Get item's display location from barcode*/
SELECT course_name, section
FROM courses
LEFT JOIN course_reserves USING (course_id)
LEFT JOIN course_items USING (ci_id)
LEFT JOIN items USING (itemnumber)
WHERE items.barcode = <<Enter barcode>>
