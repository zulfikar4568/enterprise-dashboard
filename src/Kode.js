function doGet() {

  const ss = SpreadsheetApp.getActiveSpreadsheet(); //get active spreadsheet
  const ws = ss.getSheetByName("NCRCauseList"); //get sheet
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
  const ss = SpreadsheetApp.getActiveSpreadsheet(); //get active spreadsheet
  const ws = ss.getSheetByName("NCRCauseList"); //get sheet
  
  switch(e.parameter.Action){
    case "delete":
      return doDelete(e, ws);
      break;
    case "update":
      return doUpdate(e, ws);
      break;
  }
}

function doUpdate(e, ws){
  let dataArray = [];
  dataArray.push(e.parameter.Value);
  dataArray.push(e.parameter.CauseName);
  dataArray.push(e.parameter.CauseSymptom);
  dataArray.push(e.parameter.AffectedPart);
  let IdNCRCauseList = e.parameter.IdNCRCauseList;

  let flag = 0;
  let lastRow = ws.getLastRow();
  const headers = ws.getRange("A1").getDataRegion().getValues().shift();

  for (var row = 1; row < lastRow; row++){
    let IdNCRCauseListServer = ws.getRange(row, 1).getValue();
    if (IdNCRCauseList==IdNCRCauseListServer){
      for(var column=1; column<=headers.length;column++){
        if (column>1){
          ws.getRange(row, column).setValue(dataArray[column-2]);
        }
      }
      flag = true;
    }
  }
  let message, status;
  if (flag==false){
    status = 404
    message = "Id is not found!";
  } else {
    status = 200
    message = "Success update the data";
  }
  message = JSON.stringify({"status": status, "message": message});
  return ContentService.createTextOutput(message).setMimeType(ContentService.MimeType.JSON);
}

function doDelete(e, ws){
  let flag = false;
  let IdNCRCauseList = e.parameter.IdNCRCauseList;
  let lastRow = ws.getLastRow();

  for (var row = 1; row < lastRow; row++){
    let IdNCRCauseListServer = ws.getRange(row, 1).getValue();
    if (IdNCRCauseList==IdNCRCauseListServer){
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