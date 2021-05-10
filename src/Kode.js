function doGet() {

  const ss = SpreadsheetApp.getActiveSpreadsheet(); //get active spreadsheet
  const ws = ss.getSheetByName("Plant"); //get sheet
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

function sendJSON_(jsonResponse){
  return ContentService
    .createTextOutput(JSON.stringify(jsonResponse))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e){
  let flag = false;
  const ss = SpreadsheetApp.getActiveSpreadsheet(); //get active spreadsheet
  const ws = ss.getSheetByName("Plant"); //get sheet
  let IdPlant = e.parameter.IdPlant;
  let lastRow = ws.getLastRow();

  for (var row = 1; row < lastRow; row++){
    let IdPlantServer = ws.getRange(row, 1).getValue();
    if (IdPlant==IdPlantServer){
      ws.deleteRow(row);
      flag = true;
    }
  }
  let message, status;
  if (flag==false){
    status = 404
    message = "Id is not found!";
  } else {
    status = 200
    message = "Success delete the data";
  }
  message = JSON.stringify({"status": status, "message": message});
  return ContentService.createTextOutput(message).setMimeType(ContentService.MimeType.JSON);
}