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
  const ss = SpreadsheetApp.getActiveSpreadsheet(); //get active spreadsheet
  const ws = ss.getSheetByName("Plant"); //get sheet
  
  switch(e.parameter.Action){
    case "delete":
      return doDelete(e, ws);
      break;
    case "update":
      return doUpdate(e, ws);
      break;
    case "insert":
      return doInsert(e, ws);
      break;
  }
}

function doInsert(e, ws){
  let dataArray = [];
  dataArray.push(e.parameter.NamePlant);
  dataArray.push(e.parameter.Description);
  const data = ws.getRange("A1").getDataRegion().getValues();
  
  for (var column=1; column<=dataArray.length+1;column++){
    if(column > 1){
      ws.getRange((data.length+1),column).setValue(dataArray[column-2]);
    }
  }

  message = JSON.stringify({"status": 200, "message": "Insert data has been successed!"});
  return ContentService.createTextOutput(message).setMimeType(ContentService.MimeType.JSON);
}

function doUpdate(e, ws){
  let dataArray = [];
  dataArray.push(e.parameter.NamePlant);
  dataArray.push(e.parameter.Description);
  let IdPlant = e.parameter.IdPlant;

  let flag = 0;
  let lastRow = ws.getLastRow();
  const headers = ws.getRange("A1").getDataRegion().getValues().shift();

  for (var row = 1; row < lastRow; row++){
    let IdPlantServer = ws.getRange(row, 1).getValue();
    if (IdPlant==IdPlantServer){
      for(var column=1; column<=dataArray.length+1;column++){
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