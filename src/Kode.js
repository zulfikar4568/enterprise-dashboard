function doGet() {

  const ss = SpreadsheetApp.getActiveSpreadsheet(); //get active spreadsheet
  const ws = ss.getSheetByName("City"); //get sheet
  const data = ws.getRange("A1").getDataRegion().getValues(); //get data from A1
  const headers = data.shift(); //get data headers

  // r = row, h = header, i = index
  const jsonArray = data.map(r => {
    let obj = {};
    headers.forEach((h,i) => {
      obj[h] = r[i];
    });
    return obj;
  });

  const response = [{status: 200, data: jsonArray}];
  return sendJSON_(response);
}


function doPost(e) {
  /*
    {
      IdCity: 1,
      NameCity: "Jakarta",
      Description: "Location 1",
      Capacity: 0,
      OEE: 0,
      Output: 0,
      Status: "Red"
    }
  */
 
  let jsonResponse;

  const ss = SpreadsheetApp.getActiveSpreadsheet(); //get active spreadsheet
  const ws = ss.getSheetByName("City"); //get sheet

  const headers = ws.getRange(1,1,1,ws.getLastColumn()).getValues()[0]; //getRange(1row, 1column, number row, number column).get first row;
  const headerOriginalOrder = headers.splice();
  headerOriginalOrder.shift();

  // remove id columns header
  headers.shift();
  headers.sort();
  //All above is to get from template ^^^^

  // Here is from event
  const body = e.postData.contents;
  const bodyJSON = JSON.parse(body);
  const headersPassed = Object.keys(bodyJSON).sort();

  if (!compareTwoArray_(headers, headersPassed)){
    jsonResponse = {status: 500, message: "Invalid Argument Passed!"};
    return sendJSON_(jsonResponse);
  }

  const arrayOfData = headerOriginalOrder.map(h => bodyJSON[h]);

  const aoaIds = ws.getRange(2,1,ws,getLastRow()-1,1).getValues();
  const newIDNumber = getMaxFromArrayOfArray_(aoaIds) + 1;
  arrayOfData.unshift(newIDNumber);
  ws.appendRow([arrayOfData]);
}

//return true if  all item are the same
function compareTwoArray_(arr1, arr2){
  if (arr1.length !== arr2.length) return false;
  for(let i=0; i < arr1.length; i++){
    if(arr1[i] !== arr2[i]) return false;
  }
  return true;
}

function sendJSON_(jsonResponse){
  return ContentService
    .createTextOutput(JSON.stringify(jsonResponse))
    .setMimeType(ContentService.MimeType.JSON);
}

//return highest id
function getMaxFromArrayOfArray_(aoa){
  let maxID = 0;
  aoa.forEach(r => {
    if(r[0] > maxID) maxID = r[0];
  });
  return maxID;
}