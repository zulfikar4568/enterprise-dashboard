function doGet() {

  const ss = SpreadsheetApp.getActiveSpreadsheet(); //get active spreadsheet
  const ws = ss.getSheetByName("AssemblyLine"); //get sheet
  const data = ws.getRange("A1").getDataRegion().getValues(); //get data from A1
  const headers = data.shift(); //get data headers

  // r = row, h = header, i = index
  const jsonArray = data.map(r => {
    let obj = {};
    let obj2 = {};
    let obj3 = {};
    let obj4 = {};
    let obj5 = {};
    let obj6 = {};
    let obj7 = {};
    let obj8 = {};
    headers.forEach((h,i) => {
      if (i<=12){
        obj[h] = r[i];
      }else if(i==13){
        obj2[h] = r[i];
        obj[h] = obj2;
      }else if(i==14){
        obj3[h] = r[i];
        obj[h] = obj3;
      }else if(i==15){
        obj4[h] = r[i];
        obj[h] = obj4;
      }else if(i==16){
        obj5[h] = r[i];
        obj[h] = obj5;
      }else if(i==17){
        obj6[h] = r[i];
        obj[h] = obj6;
      }else if(i==18){
        obj7[h] = r[i];
        obj[h] = obj7;
      }else if(i==19){
        obj8[h] = r[i];
        obj[h] = obj8;
      }
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
  const ws = ss.getSheetByName("AssemblyLine"); //get sheet
  
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
  dataArray.push(e.parameter.LineNo);
  dataArray.push(e.parameter.Description);
  dataArray.push(e.parameter.PersonInCharge);
  dataArray.push(e.parameter.PICPhone);
  dataArray.push(e.parameter.PICEmail);
  dataArray.push(e.parameter.OEE);
  dataArray.push(e.parameter.Capacity);
  dataArray.push(e.parameter.Output);
  dataArray.push(e.parameter.Status);
  dataArray.push(e.parameter.Performance);
  dataArray.push(e.parameter.Availability);
  dataArray.push(e.parameter.Quality);
  dataArray.push(e.parameter.Plant);
  dataArray.push(e.parameter.NCRCauseList);
  dataArray.push(e.parameter.NCRCauseList_2);
  dataArray.push(e.parameter.NCRCauseList_3);
  dataArray.push(e.parameter.NCRCauseList_4);
  dataArray.push(e.parameter.NCRCauseList_5);
  dataArray.push(e.parameter.Treshold);
  let IdAssemblyLine = e.parameter.IdAssemblyLine;

  let flag = 0;
  let lastRow = ws.getLastRow();
  const headers = ws.getRange("A1").getDataRegion().getValues().shift();

  for (var row = 1; row < lastRow; row++){
    let IdAssemblyLineServer = ws.getRange(row, 1).getValue();
    if (IdAssemblyLine==IdAssemblyLineServer){
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
  let IdAssemblyLine = e.parameter.IdAssemblyLine;
  let lastRow = ws.getLastRow();

  for (var row = 1; row < lastRow; row++){
    let IdAssemblyLineServer = ws.getRange(row, 1).getValue();
    if (IdAssemblyLine==IdAssemblyLineServer){
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